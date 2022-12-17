import express from 'express'
import { userAuth } from '../middlewares/auth'
import { getGlobalServerTotalData } from '../controllers/ServerData'

const router = express.Router();

/**
 * 获取服务器
 * @swagger
 * /api/v1/serverData/getGlobalServerTotalData:
 *   post:
 *     tags:
 *       - serverData
 *     summary: 获取全平台的统计数据
 *     description: 获取全平台的统计数据
 *     responses:
 *       200:
 *         description: success
 */
 router.route('/getGlobalServerTotalData').post(getGlobalServerTotalData);

 export default router;