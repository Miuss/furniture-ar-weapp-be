import FurnitureService from '../services/FurnitureService.js'
import MaterialService from '../services/MaterialService.js'
import UserService from '../services/UserService.js'
import { isEmpty } from '../utils/utils'

/**
 * @class FurnitureController
 */
export default class FurnitureController {

  static async getFurnitureListByPage(req, res, next) {
    try {
      const pageIndex = parseInt(req.query.pageIndex || 0)
      const pageSize = parseInt(req.query.pageSize || 10)

      const listData = await FurnitureService.queryFurnitureByPage(pageIndex, pageSize)
      
      res.status(200).json({ code: 0, msg: '成功获取家具列表', data: listData });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  static async getFurnitureDetail(req, res, next) {
    try {
      const id = req.query.id

      if (isEmpty(id)) {
        throw new Error('参数错误')
      }

      const detailData = await FurnitureService.queryFurnitureDetail(id)

      const user = await UserService.queryUserBaseInfo(detailData.userId)

      detailData.dataValues.user = user
      detailData._previousDataValues.user = user
      
      const materials = await MaterialService.queryMaterialByFurnitureId(detailData.id)

      detailData.dataValues.materials = materials
      detailData._previousDataValues.materials = materials
      
      res.status(200).json({ code: 0, msg: '成功获取家具详情', data: detailData });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  static async addFurniture(req, res, next) {
    try {

      const { name, price, content, description, coverUrl } = req.body

      if (isEmpty([name, price, content, description, coverUrl])) {
        throw new Error('参数错误')
      }

      const result = await FurnitureService.createFurniture(name, price, description, content, coverUrl, req.user.id)

      res.status(200).json({ code: 0, msg: '成功添加家具', data: result });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  static async updateFurniture(req, res, next) {
    try {
      const { name, price, content, description, coverUrl } = req.body

      if (isEmpty([id, name, price, description, image])) {
        throw new Error('参数错误')
      }

      const result = await FurnitureService.updateFurniture(id, name, price, description, content, coverUrl)
      
      res.status(200).json({ code: 0, msg: '成功更新家具信息', data: result });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  static async removeFurniture(req, res, next) {
    try {
      const id = req.query.id

      if (isEmpty(id)) {
        throw new Error('参数错误')
      }

      const result = await FurnitureService.deleteFurniture(id)
      
      res.status(200).json({ code: 0, msg: '成功删除家具', data: result });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  

}