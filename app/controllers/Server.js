import { sequelize, User, Server, ServerTag, ServerTagData } from '../models'
import { queryServerTotalData } from '../services/Server'
import validator from 'validator'
import axios from 'axios'

/**
 * 用户提交服务器
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addServer = async (req, res, next) => {
  const t = await sequelize.transaction()

  try {
    const body = req.body;
    const serverTags = body.serverTags==''?[]:body.serverTags.split(',').map(i => parseInt(i))

    if (body.name == '' 
      || body.desc == '' 
      || body.serverIp == '' 
      || body.serverPort == '' 
      || body.serverType == ''
      || serverTags.length == 0) {
      throw new Error('参数错误')
    }

    if (body.serverType == 'pe') {
      throw new Error('尚未支持基岩版服务器')
    }

    if (body.name.length > 32) {
      throw new Error('服务器名称太长了，请重试')
    }

    if (body.desc.length > 100) {
      throw new Error('服务器简介太长了，请重试')
    }

    console.log(body.serverWebsite)

    // 检查是否填写服务器网站，并检查格式
    if (body.serverWebsite != undefined && body.serverWebsite != '' && !validator.isURL(body.serverWebsite)) {
      throw new Error('服务器网址格式不正确，请重试')
    }
    
    // 查找是否有重复提交的服务器
    const server = await Server.findOne({ where: {
      serverIp: body.serverIp,
      serverPort: body.serverPort,
    }})
  
    if (server) {
      throw new Error('该服务器已提交过了，请勿重复提交')
    }
    
    const result = await axios.get(`http://127.0.0.1:3005/${body.serverIp}/${body.serverPort}`)
    if (result.data == '-1') {
      throw new Error('该服务器处于离线状态，请重试')
    }

    body.userId = req.user.id // 用户Id
    body.serverMaxPlayer = result.data.data.players.max // 服务器最大在线人数
    body.serverOnlinePlayer = result.data.data.players.online // 服务器在线人数
    body.serverPing = '0' // 服务器延迟（ms）
    body.serverVersion =  result.data.data.version.name // 服务器版本
    body.serverStatus = 'online'  // 服务器状态（online,offline）
    body.serverCountry = 'CN' // 服务器所在国家编号
    body.serverOfflineCount = 0 // 服务器离线次数

    const geoip = await axios.get(`http://ip-api.com/json/${result.data.ip}`)
    if (geoip.data.status == 'success') {
      body.serverCountry = geoip.data.countryCode
    }

    const newServer = await Server.create(body)

    // 提交服务器标签绑定记录数据
    const serverTagDatas = Promise.all(serverTags.map(async (item) => {
      return new Promise(async (resolve, reject) => {
        const serverTagData = await ServerTagData.create({
          serverId: newServer.id,
          serverTagId: item,
          userId: req.user.id
        })

        if (serverTagData instanceof ServerTagData) {
          resolve(serverTagData)
        }

        reject('数据库提交失败')
      })
    }))

    newServer.serverTags = serverTagDatas

    await t.commit()

    res.status(200).json({ code: 0, msg: '服务器发布成功', data: newServer });
  } catch(e) {
    console.error(e)
    await t.rollback()
    res.status(200).json({ code: -1, msg: e.message });
  }
}

/**
 * 分页查询服务器列表
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getServerList = async (req, res, next) => {

  try {
    const serverTagId = req.query.serverTagId || ''
    const serverType = req.query.serverType || ''
    const serverStatus = req.query.serverStatus || ''
    const pageIndex = parseInt(req.query.pageIndex || 0)
    const pageSize = parseInt(req.query.pageSize || 10)
    let where = ''

    // 服务器标签
    if (serverTagId!='') {
      where += `and server.id = server_tag_data.serverId and server_tag_data.serverTagId = '${serverTagId}'`
    }

    //  服务器类型
    if (serverType!='') {
      where += `and server.server_type = '${serverType}'`
    }

    //  服务器状态
    if (serverStatus!='') {
      where += `and server.server_status = '${serverStatus}'`
    }

    where += `and server.deletedAt IS NULL`

    const result = await sequelize.query(`select distinct server.* from server,server_tag_data where 1=1 ${where} limit ${pageIndex},${pageSize}`, {
      model: Server,
      mapToModel: true // 如果你有任何映射字段,则在此处传递 true
    })

    const [ total ] = await sequelize.query(`select count(DISTINCT server.id) as count from server,server_tag_data where 1=1 ${where}`)

    const serverList = await Promise.all(result.map(async (item) => {
      // 查询服务器标签
      const serverTags = await sequelize.query(`select server_tag.* from server_tag left join server_tag_data on server_tag.id = server_tag_data.serverTagId where server_tag_data.serverId = ${item.id}`, {
        model: ServerTag,
        mapToModel: true // 如果你有任何映射字段,则在此处传递 true
      })

      item.dataValues.serverTags = serverTags
      item._previousDataValues.serverTags = serverTags

      // 查询服务器提交人信息
      const user = await User.findOne({
        attributes: ['username', 'description'],
        where: {
          id: item.userId
        }
      });

      item.dataValues.user = user
      item._previousDataValues.user = user

      return item
    }))

    res.status(200).json({ code: 0, msg: '成功获取服务器列表', data: {
      list: serverList,
      total: total[0].count
    } });
  } catch(e) {
    console.error(e)
    res.status(200).json({ code: -1, msg: e.message });
  }

}

/**
 * 获取服务器状态
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getServerStatus = async (req, res, next) => {
  const { ip, port, type} = req.query

  try {
    if (ip == '' || port == '' || type == '') {
      throw new Error('参数错误')
    }

    if (type == 'pe') {
      throw new Error('尚未支持基岩版服务器')
    }

    const server = await Server.findOne({
      where: {
        serverIp: ip,
        serverPort: port
      }
    });

    if (server != null) {
      throw new Error('该服务器已在平台发布过啦')
    }

    const result = await axios.get(`http://127.0.0.1:3005/${ip}/${port}`)

    if (result.data == '-1') {
      throw new Error('无法获取该服务器数据')
    }

    res.status(200).json({ code: 0, msg: '成功获取服务器状态', data: result.data });
  } catch(e) {
    console.error(e)
    res.status(200).json({ code: -1, msg: e.message });
  }
}

/**
 * 获取服务器信息
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getServerInfo = async (req, res, next) => {
  const { id } = req.query

  try {
    if (id == '') {
      throw new Error('参数错误')
    }

    const server = await Server.findOne({
      where: {
        id
      }
    });

    if (!server) {
      throw new Error('该服务器不存在')
    }

    const serverTags = await sequelize.query(`select server_tag.* from server_tag left join server_tag_data on server_tag.id = server_tag_data.serverTagId where server_tag_data.serverId = ${server.id}`, {
      model: ServerTag,
      mapToModel: true // 如果你有任何映射字段,则在此处传递 true
    })

    server.dataValues.serverTags = serverTags
    server._previousDataValues.serverTags = serverTags

    //获取历史统计数据
    const totalData = await queryServerTotalData(server.id)
    console.log(totalData)
    server.dataValues.totalData = totalData
    server._previousDataValues.totalData = totalData

    res.status(200).json({ code: 0, msg: '获取服务器信息成功', data: server });
  } catch(e) {
    console.error(e)
    res.status(200).json({ code: -1, msg: e.message });
  }
}

export {
  addServer,
  getServerList,
  getServerStatus,
  getServerInfo
}