import { User, sequelize } from '../models'

export default class UserService {

  /**
   * 查询用户基础数据
   */
  static async queryUserBaseInfo(userId) {
    try {
      const user = await User.findOne({
        attributes: ['id', 'username', 'openId', 'avatarUrl', 'updatedAt', 'createdAt'],
        where: {
          id: userId
        }
      });

      return user
    } catch(e) {
      throw e
    }
  }

  /**
   * 通过用户名称查询用户信息
   * @param {*} username 
   */
  static async queryUserByUsername(username) {
    try {
      const user = await User.findOne({
        attributes: ['id', 'username', 'openId', 'avatarUrl', 'coverUrl', 'updatedAt', 'createdAt'],
        where: {
          username
        }
      });

      return user
    } catch(e) {
      throw e
    }
  }

  /**
   * 更新用户基础数据
   * @param {*} userId 
   * @param {*} data 
   */
  static async updateUserBaseInfo(userId, data) {
    try {

      const user = await this.queryUserBaseInfo(userId);

      user.set(data)
  
      await user.save()

      const newUser = await this.queryUserBaseInfo(userId)
  
      return newUser
    } catch(e) {
      throw e
    }
  }

  static async queryUserByPage(pageIndex, pageSize, queryForm = {}) {
    try {
      let where = {};
      const queryKeys = Object.keys(queryForm);
      if (queryKeys.length > 0) {
        queryKeys.forEach(key => {
          where[key] = {
            [Op.like]: `%${queryForm[key]}%`
          }
        })
      }

      const result = await User.findAndCountAll({
        where,
        offset: pageIndex * pageSize,
        limit: pageSize,
        order: [
          ['updatedAt', 'DESC']
        ]
      });
  
      return result;
    } catch(e) {
      throw e;
    }

  }

  static async queryUserInfo(id) {
    try {
      const result = await User.findOne({
        where: {
          id,
        },
      });
  
      if (result == null) {
        throw new Error('用户不存在');
      }
  
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async updateUserInfo(id, data) {
    const t = await sequelize.transaction();
    try {
      const user = await this.queryUserInfo(id);

      if (user == null) {
        throw new Error('用户不存在');
      }
  
      user.set(data);
  
      await user.save();
      await t.commit();
  
      return user
    } catch(e) {
      await t.rollback();
      throw e
    }
  }

  static async removeUser(id) {
    const t = await sequelize.transaction();
    try {
      const user = await this.queryUserInfo(id);

      if (!user) {
        throw new Error('用户不存在')
      }

      await user.destroy();
      await t.commit();

      return user
    } catch(e) {
      await t.rollback();
      throw e
    }
  }

}