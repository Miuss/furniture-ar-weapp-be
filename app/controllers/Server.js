import { Server } from '../models'
import axios from 'axios'

/**
 * 用户提交服务器
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addServer = async (req, res, next) => {
  try {
    const body = req.body;

    if (body.name == '' 
      || body.desc == '' 
      || body.serverIp == '' 
      || body.serverPort == '' 
      || body.serverType == '') {
      throw new Error('参数错误')
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

    body.uid = req.user.id // 用户Id
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
    console.log(newServer)

    res.status(200).json({ code: 0, msg: '服务器发布成功', data: newServer });
  } catch(e) {
    res.status(200).json({ code: -1, msg: e.message });
  }
}

/**
 * 获取服务器列表
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getServerList = async (req, res, next) => {

  try {
    const result = await Server.findAll();
    console.log(result)
    res.status(200).json({ code: 0, msg: '成功获取服务器列表', data: result });
  } catch(e) {
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
  const { ip, port} = req.query

  try {
    const result = await axios.get(`http://127.0.0.1:3005/${ip}/${port}`)

    if (result.data == '-1') {
      throw new Error('无法获取该服务器数据')
    }

    res.status(200).json({ code: 0, msg: '成功获取服务器状态', data: result.data });
  } catch(e) {
    res.status(200).json({ code: -1, msg: e.message });
  }
}

export {
  addServer,
  getServerList,
  getServerStatus
}