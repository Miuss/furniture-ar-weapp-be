import express from 'express'
import { userAuth } from '../middlewares/auth'
import ServerDataDayReportController from '../controllers/ServerDataDayReportController'

const router = express.Router();

/**
 * 获取服务器
 * @swagger
 * /api/v1/serverDataDayReport/list:
 *   get:
 *     tags:
 *       - serverDataDayReport
 *     summary: 获取服务器报表数据列表
 *     description: 获取服务器报表数据列表
 *     parameters:
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
 router.route('/list').get(ServerDataDayReportController.queryServerDataDayReportByPage);

 export default router;