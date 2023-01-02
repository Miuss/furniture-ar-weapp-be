import express from 'express'
import AuthController from '../controllers/AuthController'

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
router.route('/login').post(AuthController.login);


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
 *              repassword:
 *                type: string
 *              password:
 *                type: string
 *              verifyCode:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/register').post(AuthController.register);

/**
 * 发送验证码
 * @swagger
 * /api/v1/auth/sendCode:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 发送验证码
 *     description: 发送验证码
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: miusssss@qq.com
 *     responses:
 *       200:
 *         description: success
 */
router.route('/sendCode').post(AuthController.sendRegEmailCode);

export default router;
