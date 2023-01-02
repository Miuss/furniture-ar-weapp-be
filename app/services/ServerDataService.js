import { sequelize } from '../models'

/**
 * ServerDataService
 */
export default class ServerDataService {

  /**
   * 查询全平台服务器统计数据
   */
  static async queryGlobalServerTotalData() {
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
    } catch(e) {
      throw e
    }
  }

  /**
   * 通过 服务器Id 查询服务器每日统计数据
   */
  static async queryServerDayChartData(serverId) {
    try {
      return await sequelize.query(`SELECT online, ping, createdAt from server_data where createdAt >= (NOW() - INTERVAL 24 HOUR) and sid = ${serverId} ORDER BY createdAt ASC`)
    } catch(e) {
      throw e
    }
  }
  
}