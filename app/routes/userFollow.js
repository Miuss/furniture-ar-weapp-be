import express from 'express'
import { userAuth } from '../middlewares/auth'
import UserFollowController from '../controllers/UserFollowController'

const router = express.Router();

/**
 * 关注用户
 * @swagger
 * /api/v1/userFollow/follow:
 *   post:
 *     tags:
 *       - UserFollow
 *     summary: 关注用户
 *     description: 关注用户
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
 router.route('/follow').post(userAuth, UserFollowController.followUser);

 /**
  * 取关用户
  * @swagger
  * /api/v1/userFollow/unFollow:
  *   post:
  *     tags:
  *       - UserFollow
  *     summary: 取关用户
  *     description: 取关用户
  *     requestBody:
  *       content:
  *        application/x-www-form-urlencoded:
  *          schema:
  *            type: object
  *            properties:
  *              userId:
  *                type: string
  *     responses:
  *       200:
  *         description: success
  */
  router.route('/unFollow').post(userAuth, UserFollowController.unFollowUser);

 export default router;