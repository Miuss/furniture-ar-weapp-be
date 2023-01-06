import { sequelize, ServerTag } from '../models'
import { Op } from 'sequelize'

/**
 * ServerTagService
 */
export default class ServerTagService {

  static async queryServerTagList() {
    try {
      const result = await ServerTag.findAll()
    } catch(e) {
      throw e
    }
  }

  /**
   * 创建服务器标签
   */
  static async createServerTag(body, userId) {
    try {
      // 查找是否有重复提交的服务器标签
      const serverTag = await ServerTag.findOne({ where: {
        name: body.name,
      }})

      if (serverTag) {
        throw new Error('该服务器标签已创建过了')
      }

      const newServerTag = await ServerTag.create({
        name: body.name,
        userId
      })

      return newServerTag
    } catch(e) {
      throw e
    }
  }

  /**
   * 模糊查询服务器标签
   */
  static async queryServerTagByName (tagName, pageIndex, pageSize) {
    try {
      const serverTags = await ServerTag.findAll({
        where: {
          name: {
            [Op.like]: `${tagName}%`, 
          }
        },
        offset: pageIndex * pageSize,
        limit: pageSize,
      })

      const total = await ServerTag.count({
        where: {
          name: {
            [Op.like]: `${tagName}%`, 
          }
        }
      })

      return {
        list: serverTags,
        total: total
      }
    } catch (e) {
      throw e
    }
  }

  /**
   * 通过 服务器Id 查询服务器标签
   */
  static async queryServerTagByServerId (serverId) {
    try {
      const serverTags = await sequelize.query(`select server_tag.* from server_tag left join server_tag_data on server_tag.id = server_tag_data.serverTagId where server_tag_data.serverId = ?`, {
        model: ServerTag,
        mapToModel: true, // 如果你有任何映射字段,则在此处传递 true
        replacements: [serverId], 
        type: sequelize.QueryTypes.SELECT
      })
  
      return serverTags
    } catch (e) {
      throw e
    }
  }
}