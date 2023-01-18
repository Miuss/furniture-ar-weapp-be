import { User } from '../models'

export default class UserService {

  /**
   * 查询用户基础数据
   */
  static async queryUserBaseInfo(userId) {
    try {
      const user = await User.findOne({
        attributes: ['id', 'username', 'description', 'email', 'avatarUrl', 'coverUrl', 'updatedAt', 'createdAt'],
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
        attributes: ['id', 'username', 'description', 'email', 'avatarUrl', 'coverUrl', 'updatedAt', 'createdAt'],
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

}