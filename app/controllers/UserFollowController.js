import UserFollowService from "../services/UserFollowService";

export default class UserFollowController {
  
  /**
   * 关注用户
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async followUser(req, res, next) {

    try {
      if (req.body.userId == '' || req.body.userId == req.user.id) {
        throw new Error('参数错误')
      }

      await UserFollowService.createUserFollow(req.user.id, req.body.userId)
      res.status(200).json({ code: 0, msg: '关注成功' });
    } catch (e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }

  }

  /**
   * 取关用户
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  static async unFollowUser(req, res, next) {
    
    try {
      if (req.body.userId == '' || req.body.userId == req.user.id) {
        throw new Error('参数错误')
      }

      await UserFollowService.destroyUserFollow(req.user.id, req.body.userId)
      res.status(200).json({ code: 0, msg: '取关成功' });
    } catch (e) {
      console.error(e)
      res.status(200).json({ code: -1, msg: e.message });
    }
    
  }

}