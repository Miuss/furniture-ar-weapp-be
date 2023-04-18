
import { Furniture, sequelize } from '../models'
import UserService from '../services/UserService'
import MaterialService from '../services/MaterialService'

export default class FurnitureService {

  /**
   * 获取所有家具
   * @param {*} pageIndex 
   * @param {*} pageSize 
   * @returns 
   */
  static async queryFurnitureByPage(pageIndex, pageSize) {
    const result = await Furniture.findAndCountAll({
      offset: pageIndex * pageSize,
      limit: pageSize,
      order: [
        ['updatedAt', 'DESC']
      ]
    });

    result.rows = await Promise.all(result.rows.map(async item => {

      const materials = await MaterialService.queryMaterialByFurnitureId(item.id)
      item.dataValues.materials = materials
      item._previousDataValues.materials = materials

      const user = await UserService.queryUserBaseInfo(item.userId)
      item.dataValues.user = user
      item._previousDataValues.user = user

      return item
    }))

    return result;
  }

  /**
   * 获取家具详情
   * @param {*} id
   * @returns
   */
  static async queryFurnitureDetail(id) {
    const result = await Furniture.findOne({
      where: {
        id,
      },
    });

    if (result == null) {
      throw new Error('家具不存在');
    }

    return result;
  }

  /**
   * 创建家具
   * @param {*} name 
   * @param {*} price 
   * @param {*} description 
   * @param {*} content
   * @param {*} coverUrl 
   * @returns 
   */
  static async createFurniture(name, price, description, content, coverUrl, userId) {
    const t = await sequelize.transaction()
    try {
      const result = await Furniture.create({
        name,
        price,
        description,
        content,
        coverUrl,
        userId
      });

      await t.commit();

      return result;
    } catch (e) {
      await t.rollback()
      throw e
    }
  }

  /**
   * 更新家具
   * @param {*} id 
   * @param {*} name 
   * @param {*} price 
   * @param {*} description 
   * @param {*} image 
   * @returns 
   */
  static async updateFurniture(name, price, description, content, coverUrl) {
    const t = await sequelize.transaction()
    try {
      const result = await Furniture.update(
        {
          name,
          price,
          description,
          content,
          coverUrl
        },
        {
          where: {
            id,
          },
        }
      );
  
      await t.commit();
  
      return result;
    } catch (e) {
      await t.rollback()
      throw e
    }
  }

  /**
   * 删除家具
   * @param {*} id 
   * @returns 
   */
  static async deleteFurniture(id) {
    const t = await sequelize.transaction()
    try {
      const result = Furniture.destroy({
        where: {
          id,
        },
      });

      await t.commit();
  
      return result;
    } catch (e) {
      await t.rollback()
      throw e
    }
  }

}