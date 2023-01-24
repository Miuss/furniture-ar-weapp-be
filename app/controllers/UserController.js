import { User } from '../models'
import UserFollowService from '../services/UserFollowService';
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
      if (req.query.id == '') {
        throw new Error('参数错误')
      }

      const user = await UserService.queryUserBaseInfo(req.query.id);

      if (user == null) {
        throw new Error('用户不存在');
      }

      let isFollow = false

      // 如果登录查询关注服务器
      if (req.user != undefined) {
        isFollow = await UserFollowService.getUserIsFollow(req.user.id, req.query.id)
      }
      
      user.dataValues.isFollow = isFollow
      user._previousDataValues.isFollow = isFollow

      res.status(200).json({ code: 0, msg: '获取用户成功', data: user });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }

  /**
   * 通过ID更新用户信息
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async updateUserInfo (req, res, next) {
    try {
      const userId = req.user.id;
      const bodyKeys = Object.keys(req.body)

      // 合并差重
      const keys = Array.from(new Set([
        ...['username', 'description', 'avatarUrl', 'coverUrl'],
        ...bodyKeys
      ]))

      // 排除无用参数
      if (keys.length > 4) {
        throw new Error('参数错误')
      }

      // 查询用户名称是否存在
      if (bodyKeys.includes('username')) {
        const oldUser = await UserService.queryUserByUsername(req.body.username)
        if (oldUser != null && oldUser.id != userId) {
          throw new Error('该用户名已存在')
        }
      }
 
      const user = await UserService.updateUserBaseInfo(userId, req.body)

      res.status(200).json({ code: 0, msg: '更新用户成功', data: user });
    } catch(e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
  }
}