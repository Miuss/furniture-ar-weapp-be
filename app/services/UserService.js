import { User } from '../models'

export default class UserService {

  /**
   * 查询用户基础数据
   */
  static async queryUserBaseInfo(userId) {
    const user = await User.findOne({
      attributes: ['id', 'username', 'description', 'email'],
      where: {
        id: userId
      }
    });

    return user
  }

}