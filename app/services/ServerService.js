import { sequelize, Server, ServerTag, ServerTagData, User } from '../models'
import validator from 'validator'
import axios from 'axios'

/**
 * ServerService
 */
export default class ServerService {

  /**
   * 创建服务器
   */
  static async createServer (body) {
    const t = await sequelize.transaction()

    try {

      // 查找是否有重复提交的服务器
      const server = await Server.findOne({
        where: {
          serverIp: body.serverIp,
          serverPort: body.serverPort,
        }
      })

      if (server) {
        throw new Error('该服务器已提交过了，请勿重复提交')
      }

      const result = await axios.get(`http://127.0.0.1:3005/${body.serverIp}/${body.serverPort}`)
      if (result.data == '-1') {
        throw new Error('该服务器处于离线状态，请重试')
      }

      body.serverMaxPlayer = result.data.data.players.max // 服务器最大在线人数
      body.serverOnlinePlayer = result.data.data.players.online // 服务器在线人数
      body.serverPing = '0' // 服务器延迟（ms）
      body.serverVersion = result.data.data.version.name // 服务器版本
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
            userId: body.userId
          })

          if (serverTagData instanceof ServerTagData) {
            resolve(serverTagData)
          }

          reject('数据库提交失败')
        })
      }))

      newServer.serverTags = serverTagDatas
      await t.commit()

      return newServer
    } catch (e) {
      await t.rollback()
      throw e
    }
  }

  /**
   * 分页查询服务器列表
   */
  static async queryServerListByPage (serverTagId, serverType, serverStatus, pageIndex, pageSize) {
    try {
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

      const result = await sequelize.query(`select distinct server.* from server,server_tag_data where server.server_offline_count < 576 ${where} limit ${pageIndex},${pageSize}`, {
        model: Server,
        mapToModel: true // 如果你有任何映射字段,则在此处传递 true
      })

      const [ total ] = await sequelize.query(`select count(DISTINCT server.id) as count from server,server_tag_data where server.server_offline_count < 576 ${where}`)

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

      return {
        list: serverList,
        total: total[0].count
      }
    } catch(e) {
      throw e
    }
  }

  /**
   * 通过 服务器Id 查询服务器基础数据
   * @param {*} serverId 
   * @returns 
   */
  static async queryServerBaseInfoById (serverId) {
    try {
      const server = await Server.findOne({
        where: {
          id: serverId
        }
      });
  
      if (!server) {
        throw new Error('该服务器不存在')
      }
  
      const serverTags = await this.serverTagService.queryServerTagByServerId(server.id)
  
      server.dataValues.serverTags = serverTags
      server._previousDataValues.serverTags = serverTags
  
      //获取历史统计数据
      const totalData = await this.serverService.queryServerTotalData(server.id)
      console.log(totalData)
      server.dataValues.totalData = totalData
      server._previousDataValues.totalData = totalData

      return server
    } catch (e) {
      throw e
    }
  }

  /**
   * 通过服务器Id查询服务器统计数据
   * @param {*} serverId 
   * @returns 
   */
  static async queryServerTotalData (serverId) {
    try {
      // 近7日在线人数
      const [result1] = await sequelize.query(`SELECT avg(online) as online FROM server_data WHERE sid = ${serverId} AND createdAt >= (NOW() - INTERVAL 7 DAY)`)
      const sevenDayOnlinePlayer = (result1.length > 0 && result1[0].online != null) ? parseFloat(result1[0].online) : 0
  
      // 昨日最高
      const [result2] = await sequelize.query(`SELECT max(online) as online FROM server_data WHERE sid = ${serverId} AND createdAt >= (NOW() - INTERVAL 24 HOUR)`)
      const maxDayOnlinePlayer = (result2.length > 0 && result2[0].online != null) ? result2[0].online : 0
  
      // 历史最高
      const [result3] = await sequelize.query(`SELECT max(online) as online FROM server_data WHERE sid = ${serverId}`)
      const maxOnlinePlayer = (result3.length > 0 && result3[0].online != null) ? result3[0].online : 0
  
      return {
        sevenDayOnlinePlayer,
        maxDayOnlinePlayer,
        maxOnlinePlayer,
      }
    } catch (e) {
      throw e
    }
  }
}