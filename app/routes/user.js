import express from 'express'
import { userAuth } from '../middlewares/auth'
import UserController from '../controllers/UserController'

const router = express.Router();

/**
 * 查询用户信息
 * @swagger
 * /api/v1/user/info:
 *   get:
 *     tags:
 *       - User
 *     summary: 查询用户信息
 *     description: 用户注册
 *     responses:
 *       200:
 *         description: success
 */
router.route('/maininfo').get(userAuth, UserController.getMainUserInfo);


router.route('/info').get(UserController.getUserById);


export default router;
