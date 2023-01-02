import { sequelize } from '../models'
import ServerDataService from '../services/ServerDataService'

/**
 * ServerDataController
 */
export default class ServerDataController {
  /**
   * 获取全平台服务器统计数据
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async getGlobalServerTotalData (req, res, next) {
    try {

      const totalData = await ServerDataService.queryGlobalServerTotalData()

      res.status(200).json({ code: 0, msg: '平台数据获取成功', data: totalData });
    } catch (e) {
      console.error(e);
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 获取服务器的统计数据
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async getServerStatisticsData (req, res, next) {
    try {

      // const starttime = req.query.starttime || ''
      // const endtime = req.query.endtime || ''
      const serverId = req.query.serverId || ''

      if (serverId == '') {
        throw new Error('参数错误')
      }

      const result = await ServerDataService.queryServerDayChartData(serverId)
      
      res.status(200).json({ code: 0, msg: '获取服务器统计数据', data: result });
    } catch(e) {
      console.error(e);
      res.status(200).json({ code: -1, msg: e.message });
    }
  }
}