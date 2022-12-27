import { sequelize } from '../models'

export const queryServerTotalData = async (serverId) => {
  
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

}