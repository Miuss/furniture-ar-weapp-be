import { Material } from '../models'

/**
 * @class MaterialService
 */
export default class MaterialService {
  
  static async queryMaterialByFurnitureId(furnitureId, pageIndex = 0, pageSize = 10) {
    let where = {};

    if (furnitureId != '') {
      where = {
        furnitureId,
      }
    }

    return await Material.findAndCountAll({
      where,
      offset: pageIndex * pageSize,
      limit: pageSize,
      order: [
        ['updatedAt', 'DESC']
      ]
    });
  }

  static async queryMaterialInfo(id) {
    const result = await Material.findOne({
      where: {
        id,
      },
    });

    return result;
  }

  // 添加家具材质
  static async addMaterial(furnitureId, name, content, coverUrl, modelUrl, md5, price,modelScale, modelArScale, modelY, userId) {
    const t = await Material.sequelize.transaction();
    try {
      const material = await Material.create({
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
        userId,
      });

      await t.commit();
      return material;
    } catch (e) {
      await t.rollback();
      throw e
    }
  }

  // 删除家具材质
  static async deleteMaterial(id) {
    const t = await Material.sequelize.transaction();
    try {
      const material = await Material.findOne({
        where: {
          id,
        },
      });

      if (material == null) {
        throw new Error('材质不存在');
      }

      await material.destroy();

      await t.commit();
      return material;
    } catch (e) {
      await t.rollback();
      throw e
    }
  }

  // 更新家具材质
  static async updateMaterial(id, furnitureId, name, content, coverUrl, modelUrl, md5, price, modelScale, modelArScale, modelY, userId) {
    const t = await Material.sequelize.transaction();
    try {
      const material = await Material.findOne({
        where: {
          id,
        },
      });

      if (material == null) {
        throw new Error('材质不存在');
      }

      material.name = name;
      material.furnitureId = furnitureId;
      material.price = price;
      material.coverUrl = coverUrl;
      material.content = content;
      material.modelUrl = modelUrl;
      material.md5 = md5;
      material.modelScale = modelScale;
      material.modelArScale = modelArScale;
      material.modelY = modelY;
      material.userId = userId;

      console.log(material)

      await material.save();

      await t.commit();
      return material;
    } catch (e) {
      await t.rollback();
      throw e
    }
  }

}