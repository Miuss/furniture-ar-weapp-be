import express from 'express'
import AuthController from '../controllers/AuthController'
import { userAuth, adminAuth } from '../middlewares/auth'

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
 *              code:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/login').post(AuthController.login);

/**
 * 微信扫码登录确认
 * @swagger
 * /api/v1/auth/confirmAdminLogin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: 微信扫码登录确认
 *     description: 微信扫码登录确认
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/confirmAdminLogin').post(userAuth, AuthController.updateAdminLoginCode);

/**
 * 微信扫码登录后台
 * @swagger
 * /api/v1/auth/loginAdminNotify:
 *   get:
 *     tags:
 *       - Auth
 *     summary: 微信扫码登录后台
 *     description: 微信扫码登录后台
 *     parameters:
 *      - name: id
 *        in: query
 *        description: 家具Id
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/loginAdminNotify').get(AuthController.loginAdmin)


export default router;
