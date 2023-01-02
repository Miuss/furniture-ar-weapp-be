import { User } from '../models'
import AuthService from '../services/AuthService'
import * as Utils from '../utils/utils'
import * as mailer from '../utils/nodemailer'

/**
 * AuthController
 */
export default class AuthController {
  /**
   * 用户登陆
   */
  static async login (req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        throw new Error('参数错误')
      }

      const token = await AuthService.login(email, password)

      res.status(200).json({ code: 0, msg: '登陆成功', data: {
        token: token
      } })
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 用户注册
   */
  static async register (req, res, next) {
    try {

      const { email, password, repassword, verifyCode } = req.body
      console.log(req.session)

      const registerVerifyCode = req.session.registerVerifyCode // 从session获取验证码
    
      if (verifyCode != registerVerifyCode) {
        throw new Error('邮箱验证码不正确，请重试')
      }
    
      if (password.length < 8) {
        throw new Error('密码长度必须>=8位，请重试')
      }
    
      if (password != repassword) {
        throw new Error('两次输入的密码不一致，请重试')
      }

      await AuthService.register(email, password)
    
      return res.status(200).json({ code: 0, msg: '注册成功' })
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 发送注册邮箱验证码
   */
  static async sendRegEmailCode (req, res, next) {
    try {
      const { email } = req.body

      const registerVerifyCodeTime = req.session.registerVerifyCodeTime // 上次验证码发送时间
    
      if (registerVerifyCodeTime != undefined && registerVerifyCodeTime + 60000 > Date.now()) {
        throw new Error('请勿快速重复此操作')
      }
    
      const code = Utils.randomString(6) //生成随机6位验证码
    
      await mailer.sendEmail({
        email: email,
        title: '注册验证码 ｜ 我的世界服务器网',
        template: 'verifyCode',
        keys: {
          code
        }
      })
    
      req.session.registerVerifyCode = code // 存入session
      req.session.registerVerifyCodeTime = Date.now() // 存入session
    
      res.status(200).json({ code: 0, msg: '发送成功' })
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message })
    }
  }
}