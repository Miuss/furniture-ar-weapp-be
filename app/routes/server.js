import express from 'express'
import { userAuth } from '../middlewares/auth'
import ServerController from '../controllers/ServerController'

const router = express.Router();

/**
 * 获取服务器列表
 * @swagger
 * /api/v1/server/list:
 *   get:
 *     tags:
 *       - Server
 *     summary: 获取服务器列表
 *     description: 获取服务器列表
 *     parameters:
 *      - name: serverStatus
 *        in: query
 *        description: 服务器状态（online,offline）
 *        required: false
 *        type: string
 *      - name: serverType
 *        in: query
 *        description: 服务器类型（java,pe）
 *        required: false
 *        type: string
 *      - name: serverTagId
 *        in: query
 *        description: 服务器标签id
 *        required: false
 *        type: string
 *      - name: pageIndex
 *        in: query
 *        required: false
 *        type: string
 *      - name: pageSize
 *        in: query
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/list').get(ServerController.getServerList);

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
router.route('/add').post(userAuth, ServerController.addServer);

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
 *      - name: type
 *        in: query
 *        description: 服务器类型 （java、pe）
 *        required: false
 *        type: string
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
router.route('/status').get(userAuth, ServerController.getServerStatus);

/**
 * 获取服务器信息
 * @swagger
 * /api/v1/server/info:
 *   get:
 *     tags:
 *       - Server
 *     summary: 获取服务器信息
 *     description: 获取服务器信息
 *     parameters:
 *      - name: id
 *        in: query
 *        description: 服务器Id
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/info').get(ServerController.getServerInfo);

/**
 * 获取服务器列表
 * @swagger
 * /api/v1/server/getUserPublishServerList:
 *   get:
 *     tags:
 *       - Server
 *     summary: 获取用户发布的服务器列表
 *     description: 获取用户发布的服务器列表
 *     parameters:
 *      - name: userId
 *        in: query
 *        description: 用户id
 *        required: false
 *        type: string
 *      - name: pageIndex
 *        in: query
 *        required: false
 *        type: string
 *      - name: pageSize
 *        in: query
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/getUserPublishServerList').get(ServerController.getUserServerListByPage);

/**
 * 获取服务器列表
 * @swagger
 * /api/v1/server/getRandomServerList:
 *   get:
 *     tags:
 *       - Server
 *     summary: 随机获取服务器列表成功
 *     description: 随机获取服务器列表成功
 *     parameters:
 *      - name: pageSize
 *        in: query
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/getRandomServerList').get(ServerController.getRandomServerList);

export default router;
