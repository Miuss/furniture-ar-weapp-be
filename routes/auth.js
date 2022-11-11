import express from 'express'
import { login, register } from '../controllers/Auth'


const router = express.Router();

/**
 * 用户登陆
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 密码登陆
 *     description: 用户登陆
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: miusssss@qq.com
 *              password:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/login').post(login);


/**
 * 用户注册
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 用户注册
 *     description: 用户注册
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: miusssss@qq.com
 *              password:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/register').post(register);


export default router;
