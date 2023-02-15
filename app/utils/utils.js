import md5 from '../utils/md5'

// 获取客户端请求地址
export const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
}

/**
 * 生成随机字符串
 * @param {*} e 
 * @returns 
 */
export const randomString = (e) => {
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
export const matchPassword = (password, salt) => {
  return md5('mcservers' + password + md5(salt))
}

/**
 * 生成随机Token
 * @param {*} user 
 * @returns 
 */
export const createToken = (user) => {
  return md5(md5(user.id) + md5(new Date().getTime()) + user.password)
}

/**
 * 生成盐值
 * @returns 
 */
export const createSalt = () => {
  return md5(md5(Math.ceil(Math.random() * 100) + md5(new Date().getTime()) + Math.ceil(Math.random() * 100)))
}

/**
 * 判断API传参是否为空
 * @param {*} e 
 * @returns 
 */
export const isEmpty = (e) => {
  if (typeof e != Array) {
    if (e == '' || e == undefined || e == null) {
      return true
    }

    return false
  }

  e.forEach((item) => {
    if (item == '' || item == undefined || item == null) {
      return true
    }
  })

  return false
}