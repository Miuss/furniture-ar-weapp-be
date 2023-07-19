import MaterialService from "../services/MaterialService";
import { isEmpty } from '../utils/utils'

export default class MaterialController {

  // 获取家具材质列表
  static async queryMaterialByFurnitureId (req, res, next) {
    try {
      const pageIndex = parseInt(req.query.pageIndex || 0)
      const pageSize = parseInt(req.query.pageSize || 10)
      const { furnitureId } = req.query

      const materials = await MaterialService.queryMaterialByFurnitureId(furnitureId, pageIndex, pageSize);

      res.status(200).json({ code: 0, msg: '成功获取材质列表', data: materials });
    } catch (e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  static async getMaterialInfo (req, res, next) {
    try {
      const { id } = req.query

      if (isEmpty(id)) {
        throw new Error('参数错误')
      }

      const material = await MaterialService.queryMaterialInfo(id)

      res.status(200).json({ code: 0, msg: '成功获取材质详情', data: material });

    } catch (e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  // 添加家具材质
  static async addFurnitureMaterial (req, res, next) {
    try {
      const userId = req.user.id
      const {
        furnitureId,
        name,
        content,
        coverUrl,
        modelUrl,
        price,
        md5,
        modelScale,
        modelArScale,
        modelY
      } = req.body

      if (isEmpty([
        furnitureId,
        name,
        content,
        coverUrl,
        modelUrl,
        price,
        md5,
        modelScale,
        modelArScale,
        modelY,
        userId])) {
        throw new Error('参数错误')
      }

      const result = await MaterialService.addMaterial(
        furnitureId,
        name,
        content,
        coverUrl,
        modelUrl,
        price,
        md5,
        modelScale,
        modelArScale,
        modelY,
        userId)

      res.status(200).json({ code: 0, msg: '成功添加家具材质', data: result });
    } catch (e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  // 删除家具材质
  static async deleteFurnitureMaterial (req, res, next) {
    try {
      const { id } = req.body

      if (isEmpty(id)) {
        throw new Error('参数错误')
      }

      const result = await MaterialService.deleteMaterial(id)

      res.status(200).json({ code: 0, msg: '成功删除家具材质', data: result });
    } catch (e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  // 更新家具材质
  static async updateFurnitureMaterial (req, res, next) {
    try {
      const {
        id,
        furnitureId,
        name,
        content, 
        coverUrl, 
        modelUrl, 
        md5,
        price,
        modelScale,
        modelArScale,
        modelY,
        userId
      } = req.body

      if (isEmpty([
        id,
        furnitureId,
        name,
        content, 
        coverUrl, 
        modelUrl, 
        md5,
        price,
        modelScale,
        modelArScale,
        modelY,
        userId])) {
        throw new Error('参数错误')
      }

      const result = await MaterialService.updateMaterial(
        id,
        furnitureId,
        name,
        content, 
        coverUrl, 
        modelUrl, 
        md5,
        price,
        modelScale,
        modelArScale,
        modelY,
        userId)

      res.status(200).json({ code: 0, msg: '成功更新家具材质', data: result });
    } catch (e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

}