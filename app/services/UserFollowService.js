import { sequelize, UserFollow } from '../models'

export default class UserFollowService {

  static async getUserIsFollow(userId, followUserId) {

    try {
      const result = await UserFollow.findOne({ where: { userId, followUserId } });
      if (result == null) {
        return false;
      }
  
      return true
    } catch(e) {
      throw e
    }
  }

  static async createUserFollow(userId, followUserId) {
    const t = await sequelize.transaction()

    try {
      // 判断用户是否被关注
      const userFollow = await UserFollow.findOne({ where: { userId, followUserId } });
      if (userFollow) {
        throw new Error('请勿重复关注该用户')
      }

      const newUserFollow = await UserFollow.create({
        userId,
        followUserId
      })

      await t.commit()
      return newUserFollow
    } catch(e) {
      await t.rollback()
      throw e
    }
  }

  static async destroyUserFollow(userId, followUserId) {
    const t = await sequelize.transaction()

    try {
      // 判断用户是否被取关
      const userFollow = await UserFollow.findOne({ where: { userId, followUserId } });
      if (!userFollow) {
        throw new Error('请勿重复取关该用户')
      }

      userFollow.destroy();
      await t.commit()
      return true
    } catch(e) {
      await t.rollback()
      throw e
    }
  }

}