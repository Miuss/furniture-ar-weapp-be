import express from 'express'
import { userAuth } from '../middlewares/auth'
import { getMainUserInfo } from '../controllers/User'

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
router.route('/info').get(userAuth, getMainUserInfo);


export default router;
