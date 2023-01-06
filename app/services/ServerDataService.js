import { sequelize } from '../models'

/**
 * ServerDataService
 */
export default class ServerDataService {

  /**
   * 查询全平台服务器统计数据
   */
  static async queryGlobalServerTotalData () {
    try {
      const [result] = await sequelize.query(`SELECT sum(online) as onlinePlayer, count(status = 'online' or null) as onlineServer, createdAt from server_data where createdAt >= (NOW() - INTERVAL 24 HOUR) group by createdAt ORDER BY createdAt ASC`)
      const totalData = result.map((item) => {
        return {
          onlinePlayer: parseInt(item.onlinePlayer),
          onlineServer: parseInt(item.onlineServer),
          createdAt: item.createdAt
        }
      })

      return totalData
    } catch (e) {
      throw e
    }
  }

  /**
   * 通过 服务器Id 查询服务器每日统计数据
   */
  static async queryServerDayChartData (serverId) {
    try {
      const [result] = await sequelize.query(`SELECT online, ping, createdAt from server_data where createdAt >= (NOW() - INTERVAL 24 HOUR) and sid = ${serverId} ORDER BY createdAt ASC`)
      return result
    } catch (e) {
      throw e
    }
  }

  /**
   * 通过 服务器Id 获取服务器每日统计玩家数据
   */
  static async queryServerDayPlayerOnlineReport (serverId) {
    try {
      const result = await sequelize.query(`
        select 
          avg(online) as avgPlayerOnline, 
          max(online) as maxPlayerOnline, 
          min(online) as minPlayerOnline, 
          DATE_FORMAT(server_data.createdAt, '%Y-%m-%d') as dayDate 
        from 
          server_data 
        where 
          sid = ? and DATE_FORMAT(NOW(), '%Y-%m-%d') != DATE_FORMAT(createdAt, '%Y-%m-%d')
        group by dayDate
        order by dayDate DESC
        limit 0,30
      `, 
      { 
        replacements: [serverId], 
        type: sequelize.QueryTypes.SELECT
      })

      return result
    } catch (e) {
      throw e
    }
  }

}