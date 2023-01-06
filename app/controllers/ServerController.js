import ServerService from '../services/ServerService'
import validator from 'validator'
import axios from 'axios'

/**
 * ServerController
 */
export default class ServerController {
  /**
   * 添加服务器
   */
  static async addServer(req, res, next) {
    try {
      const body = req.body;
      // 用户Id
      body.userId = req.user.id
      // 解析服务器标签
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
  
      // 检查是否填写服务器网站，并检查格式
      if (body.serverWebsite != undefined && body.serverWebsite != '' && !validator.isURL(body.serverWebsite)) {
        throw new Error('服务器网址格式不正确，请重试')
      }

      const server = await ServerService.createServer(body)
  
      res.status(200).json({ code: 0, msg: '服务器发布成功', data: server });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 分页查询服务器列表
   */
  static async getServerList(req, res, next) {
    try {
      const serverTag = req.query.serverTag || ''
      const serverType = req.query.serverType || ''
      const serverStatus = req.query.serverStatus || ''
      const pageIndex = parseInt(req.query.pageIndex || 0)
      const pageSize = parseInt(req.query.pageSize || 10)

      const listData = await ServerService.queryServerListByPage(serverTag, serverType, serverStatus, pageIndex, pageSize)
      
      res.status(200).json({ code: 0, msg: '成功获取服务器列表', data: listData });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }

  }

  /**
   * 获取服务器状态
   */
  static async getServerStatus(req, res, next) {
    const { ip, port, type} = req.query

    try {
      if (ip == '' || port == '' || type == '') {
        throw new Error('参数错误')
      }

      if (type == 'pe') {
        throw new Error('尚未支持基岩版服务器')
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
   */
  static async getServerInfo (req, res, next) {
    const { id } = req.query

    try {
      if (id == '') {
        throw new Error('参数错误')
      }

      const server = await ServerService.queryServerBaseInfoById(id)

      res.status(200).json({ code: 0, msg: '获取服务器信息成功', data: server });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

}