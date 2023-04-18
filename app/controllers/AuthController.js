import { weappConfig } from '../../config'
import { User } from '../models'
import AuthService from '../services/AuthService'
import * as Utils from '../utils/utils'
import Axios from 'axios'

/**
 * AuthController
 */
export default class AuthController {
  /**
   * 用户登陆
   */
  static async login (req, res, next) {
    try {
      const { code } = req.body

      if (Utils.isEmpty([code])) {
        throw new Error('参数错误') 
      }

      const { data } = await Axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${weappConfig.appId}&secret=${weappConfig.appSecrt}&js_code=${code}&grant_type=authorization_code`)
      if (data.errcode) {
        // 登录状态失效
        throw new Error('登录失败，请重试')
      }

      const token = await AuthService.login(req, data.openid, data.session_key)

      res.status(200).json({ code: 0, msg: '登陆成功', data: {
        token: token
      }})
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 确认登录后台
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async updateAdminLoginCode (req, res, next) {
    try {
      const userId = req.user.id;
      const adminKey = req.body.token;

      if (Utils.isEmpty([userId, adminKey])) {
        throw new Error('参数错误')
      }

      await AuthService.updateAdminLoginKey(userId, adminKey)

      res.status(200).json({ code: 0, msg: '更新成功', data: { token : adminKey }})

    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 扫码登录后台
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async loginAdmin (req, res, next) {
    try {
      const adminKey = req.query.token
      
      if (Utils.isEmpty([adminKey])) {
        throw new Error('参数错误')
      }

      const user = await AuthService.loginAdmin(adminKey)

      res.status(200).json({ code: 0, msg: '登陆成功', data: {token: user.token}})

    } catch (e) {
      console.error(e)
      if (e.message=='尚未登录') {
        return res.status(200).json({ code: 0, msg: e.message });
      }
      res.status(200).json({ code: -1, msg: e.message });
    }
  }
}