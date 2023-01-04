import { ServerTag } from '../models'
import ServerDataDayReportService from '../services/ServerDataDayReportService'

/**
 * ServerDataDayReportController
 */
export default class ServerDataDayReportController {
  /**
   * 分页获取全平台大数据报表数据
   */
  static async queryServerDataDayReportByPage(req, res, next) {
    try {
      const pageIndex = parseInt(req.query.pageIndex || 0)
      const pageSize = parseInt(req.query.pageSize || 10)

      const listData = await ServerDataDayReportService.queryDayReportDataList(pageIndex, pageSize)

      res.status(200).json({ code: 0, msg: '成功查询大数据报表数据', data: listData });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }
}