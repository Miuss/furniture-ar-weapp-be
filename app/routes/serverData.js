import express from 'express'
import { userAuth } from '../middlewares/auth'
import ServerDataController from '../controllers/ServerDataController'

const router = express.Router();

/**
 * 获取服务器
 * @swagger
 * /api/v1/serverData/getGlobalServerTotalData:
 *   get:
 *     tags:
 *       - serverData
 *     summary: 获取全平台的统计数据
 *     description: 获取全平台的统计数据
 *     responses:
 *       200:
 *         description: success
 */
 router.route('/getGlobalServerTotalData').get(ServerDataController.getGlobalServerTotalData);

/**
 * 获取服务器统计数据
 * @swagger
 * /api/v1/serverData/getServerStatisticsData:
 *   get:
 *     tags:
 *       - serverData
 *     summary: 获取服务器统计数据
 *     description: 获取服务器统计数据
 *     parameters:
 *      - name: serverId
 *        in: query
 *        description: 服务器Id
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
 router.route('/getServerStatisticsData').get(ServerDataController.getServerStatisticsData);


/**
 * 获取服务器统计数据
 * @swagger
 * /api/v1/serverData/getServerDayPlayerReport:
 *   get:
 *     tags:
 *       - serverData
 *     summary: 获取服务器每日玩家数据报表
 *     description: 获取服务器每日玩家数据报表
 *     parameters:
 *      - name: serverId
 *        in: query
 *        description: 服务器Id
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
 router.route('/getServerDayPlayerReport').get(ServerDataController.getServerDayOnlineReport);

 export default router;