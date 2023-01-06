import { ServerTag } from '../models'
import ServerTagService from '../services/ServerTagService'

/**
 * ServertagController
 */
export default class ServerTagController {

  /**
   * 添加服务器标签
   */
  static async addServerTag(req, res, next) {
    try {
      const body = req.body

      if (body.name == '') {
        throw new Error('参数错误')
      }
      
      const newServerTag = await ServerTagService.createServerTag(body, req.user.id)

      res.status(200).json({ code: 0, msg: '服务器标签添加成功', data: newServerTag });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 通过名称分页搜索服务器标签
   */
  static async searchServerTagbyName(req, res, next) {
    try {
      const name = req.query.name || ''
      const pageIndex = parseInt(req.query.pageIndex || 0)
      const pageSize = parseInt(req.query.pageSize || 10)

      if (name == '') {
        throw new Error('参数错误')
      }

      const listData = await ServerTagService.queryServerTagByName(name, pageIndex, pageSize)

      res.status(200).json({ code: 0, msg: '成功查询服务器标签', data: listData });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }
}