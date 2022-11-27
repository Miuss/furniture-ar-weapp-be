import express from 'express'
import { userAuth } from '../middlewares/auth'
import { addServer, getServerStatus, getServerList } from '../controllers/Server'

const router = express.Router();

/**
 * 添加服务器
 * @swagger
 * /api/v1/server/add:
 *   post:
 *     tags:
 *       - Server
 *     summary: 用户创建服务器
 *     description: 用户提交MC服务器数据
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              desc:
 *                type: string
 *              serverIp:
 *                type: string
 *              serverPort:
 *                type: string
 *              serverType:
 *                type: string
 *              serverTags:
 *                type: array
 *     responses:
 *       200:
 *         description: success
 */
router.route('/add').post(userAuth, addServer);

/**
 * 获取服务器列表
 * @swagger
 * /api/v1/server/list:
 *   get:
 *     tags:
 *       - Server
 *     summary: 获取服务器列表
 *     description: 获取服务器列表
 *     responses:
 *       200:
 *         description: success
 */
router.route('/list').get(getServerList);

/**
 * 获取服务器数据
 * @swagger
 * /api/v1/server/status:
 *   get:
 *     tags:
 *       - Server
 *     summary: 获取MC服务器状态
 *     description: 获取MC服务器状态
 *     parameters:
 *      - name: ip
 *        in: query
 *        description: IP地址
 *        required: false
 *        type: string
 *      - name: port
 *        in: query
 *        description: 端口号
 *        required: false
 *        type: integer
 *     responses:
 *       200:
 *         description: success
 */
router.route('/status').get(userAuth, getServerStatus);

export default router;
