import express from 'express'
import { userAuth } from '../middlewares/auth'
import UserController from '../controllers/UserController'

const router = express.Router();

/**
 * 查询自己的用户信息
 * @swagger
 * /api/v1/user/maininfo:
 *   get:
 *     tags:
 *       - User
 *     summary: 查询用户自己的信息
 *     description: 查询用户自己的信息
 *     responses:
 *       200:
 *         description: success
 */
router.route('/maininfo').get(userAuth, UserController.getMainUserInfo);

/**
 * 查询用户信息
 * @swagger
 * /api/v1/user/info:
 *   get:
 *     tags:
 *       - User
 *     summary: 查询用户信息
 *     description: 查询用户信息
 *     parameters:
 *      - name: id
 *        in: query
 *        description: 用户Id
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/info').get(UserController.getUserById);


/**
 * 更新用户信息
 * @swagger
 * /api/v1/user/maininfo:
 *   put:
 *     tags:
 *       - User
 *     summary: 更新用户信息
 *     description: 更新用户信息
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              description:
 *                type: string
 *              avatarUrl:
 *                type: string
 *              coverUrl:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/maininfo').put(userAuth, UserController.updateUserInfo);


export default router;
