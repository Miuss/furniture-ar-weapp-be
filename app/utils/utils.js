
// 获取客户端请求地址
export const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
}