import express from 'express'
import { userAuth } from '../middlewares/auth'
import { addServerTag, searchServerTagbyName } from '../controllers/ServerTag'

const router = express.Router();

/**
 * 添加服务器标签
 * @swagger
 * /api/v1/serverTag/add:
 *   post:
 *     tags:
 *       - ServerTag
 *     summary: 用户创建服务器标签
 *     description: 用户提交MC服务器数据标签
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
 router.route('/add').post(userAuth, addServerTag);

 /**
  * 搜索服务器标签（名称模糊搜索）
  * @swagger
  * /api/v1/serverTag/search:
  *   get:
  *     tags:
  *       - ServerTag
  *     summary: 搜索服务器标签（名称模糊搜索）
  *     description: 搜索服务器标签（名称模糊搜索）
  *     parameters:
  *      - name: name
  *        in: query
  *        description: 标签名称
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
  router.route('/search').get(userAuth, searchServerTagbyName);

 export default router;