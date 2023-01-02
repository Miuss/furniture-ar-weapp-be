import { User } from '../models'
import UserService from '../services/UserService'

/**
 * UserController
 */
export default class UserController {

  /**
   * 查询用户个人信息
   */

  static async getMainUserInfo(req, res, next) {
    try {

      const userId = req.user.id

      const user = await UserService.queryUserBaseInfo(userId)
    
      res.status(200).json({ code: 0, msg: '成功获取用户信息', data: user });

    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 通过ID查询用户信息
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async getUserById (req, res, next) {
    try {
      if (req.params.id == '') {
        throw new Error('参数错误')
      }

      const user = await UserService.queryUserBaseInfo(req.params.id);

      res.status(200).json({ code: 0, msg: '获取用户成功', data: user });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }
}