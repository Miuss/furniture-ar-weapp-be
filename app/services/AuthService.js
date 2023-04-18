import { User, sequelize } from '../models'
import * as Utils from '../utils/utils'
import Axios from 'axios'

/**
 * AuthService
 */
export default class AuthService {

  /**
   * 用户登录
   */
  static async login (req, openId, sessionKey) {
    try {
      const user = await User.findOne({ where: { openId } })

      if (!user) {
        // 未注册
        return await this.register(req, openId, sessionKey)
      }
      // 登陆成功
      const token = Utils.createToken(user)
      user.sessionKey = sessionKey
      user.ip = Utils.getClientIp(req)
      user.lastLoginAt = new Date()
      user.token = token
      await user.save()

      return token

    } catch (e) {
      throw e
    }
  }

  /**
   * 用户注册
   */
  static async register (req, openId, sessionKey) {
    try {
      const token = Utils.createToken({ openId })
      const saveUser = await User.create({
        username: '微信用户' + Utils.randomString(6),
        openId,
        roles: 'member',
        sessionKey,
        ip: Utils.getClientIp(req),
        token: token
      })

      return token
    } catch (e) {
      throw e
    }
  }

  static async updateAdminLoginKey (id, key) {
    const t = await sequelize.transaction()
    try {
      const user = await User.findOne({ where: { roles: 'admin', id: id } })

      if (!user) {
        throw new Error('管理员不存在')
      }

      user.adminKey = key
      await user.save()

      await t.commit()

      return user
    } catch (e) {
      await t.rollback()
      throw e
    }
  }

  static async loginAdmin (key) {
    const t = await sequelize.transaction()
    try {
      const user = await User.findOne({ where: { roles: 'admin', adminKey: key } })

      if (!user) {
        throw new Error('尚未登录')
      }

      user.adminKey = ''
      await user.save()

      await t.commit()

      return user
    } catch (e) {
      await t.rollback()
      throw e
    }
  }


}