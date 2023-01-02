import { User } from '../models'
import * as Utils from '../utils/utils'

/**
 * AuthService
 */
export default class AuthService {

  /**
   * 用户登录
   */
  static async login (email, password) {
    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        throw new Error('密码错误，请重试')
      }

      // 加密提交的密码
      const passwordMatch = Utils.matchPassword(password, user.salt)

      if (passwordMatch != user.password) {
        // 密码错误
        throw new Error('密码错误，请重试')
      }

      // 登陆成功
      const token = Utils.createToken(user)

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
  static async register (email, password) {
    try {
      // 查找是否有重复注册的用户
      const user = await User.findOne({ where: { email } })

      if (user) {
        throw new Error('该邮箱已注册，请直接登陆')
      }

      const salt = Utils.createSalt() // 生成加密盐值
      const passwordMatch = Utils.matchPassword(password, salt)  // 生成加密后的密码

      const saveUser = await User.create({
        username: '方块人' + Utils.randomString(6),
        email,
        password: passwordMatch,
        salt,
      })

      console.log(`用户注册成功（#${saveUser.id}）`)
    } catch (e) {
      throw e
    }
  }

}