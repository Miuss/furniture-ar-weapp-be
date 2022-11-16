const { User } = require('../models')
import md5 from '../utils/md5'
import * as mailer from '../utils/nodemailer'

/**
 * 用户登陆
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const login = async (req, res, next) => {
  const { email, password } = req.body

  console.log(email, password);

  if (!email || !password) {
    return res.status(200).json({ code: -3, msg: '参数错误' })
  }

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(200).json({ code: -1, msg: '密码错误，请重试' })
  }

  // 加密提交的密码
  const passwordMatch = matchPassword(password, user.salt)

  if (passwordMatch != user.password) {
    // 密码错误
    return res.status(200).json({ code: -2, msg: '密码错误，请重试' })
  }

  // 登陆成功
  const token = this.createToken(user)

  user.token = token
  await user.save()

  res.status(200).json({ code: 0, msg: '登陆成功', data: {
    token: token
  } })
}

/**
 * 用户注册
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const register = async (req, res, next) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ where: { email } })

  if (user) {
    return res.status(200).json({ code: -1, msg: '该邮箱已注册，请直接登陆' })
  }

  const salt = createSalt() // 生成加密盐值
  const passwordMatch = matchPassword(password, salt)  // 生成加密后的密码

  const saveUser = await User.create({ 
    username: '方块人'+randomString(6),
    email,
    password: passwordMatch,
    salt,
  })
  console.log(`用户注册成功（#${saveUser.id}）`)

  return res.status(200).json({ code: 0, msg: '注册成功' })
}

/**
 * 发送验证码
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const sendCode = async (req, res, next) => {
  const { email } = req.body
  
  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(200).json({ code: -1, msg: '用户不存在' })
  }

  const code = randomString(6)  // 生成随机6位验证码

  mailer.sendEmail({
    email: 'miusssss@qq.com',
    title: '测试邮件',
    template: 'verifyCode',
    keys: {
      name: user.username,
      code
    }
  })

  return res.status(200).json({ code: 0, msg: '发送成功' })
}

/**
 * 生成随机字符串
 * @param {*} e 
 * @returns 
 */
const randomString = (e) => {    
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678",
  a = t.length,
  n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

/**
 * 密码加密
 * @param {*} password 
 * @param {*} salt 
 * @returns 
 */
const matchPassword = (password, salt) => {
  return md5('mcservers' + password+ md5(salt))
}

/**
 * 生成随机Token
 * @param {*} user 
 * @returns 
 */
const createToken = (user) => {
  return md5(md5(user.id)+md5(new Date().getTime())+user.password)
}

/**
 * 生成盐值
 * @returns 
 */
const createSalt = () => {
  return md5(md5(Math.ceil(Math.random()*100)+md5(new Date().getTime())+Math.ceil(Math.random()*100)))
}

export {
  login,
  register,
  sendCode
}