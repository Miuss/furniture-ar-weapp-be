import express from 'express'
import { userAuth, adminAuth } from '../middlewares/auth'
import FurnitureController from '../controllers/FurnitureController';

const router = express.Router();

/**
 * 通过分页查询家具列表
 * @swagger
 * /api/v1/furniture/list:
 *   get:
 *     tags:
 *       - Furniture
 *     summary: 通过分页查询家具列表
 *     description: 通过分页查询家具列表
 *     responses:
 *       200:
 *         description: success
 */
router.route('/list').get(FurnitureController.getFurnitureListByPage);

/**
 * 通过id查询家具信息
 * @swagger
 * /api/v1/furniture/info:
 *   get:
 *     tags:
 *       - Furniture
 *     summary: 通过分页查询家具列表
 *     description: 通过分页查询家具列表
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
router.route('/info').get(FurnitureController.getFurnitureDetail);

/**
 * 添加家具信息
 * @swagger
 * /api/v1/furniture/add:
 *   post:
 *     tags:
 *       - Furniture
 *     summary: 添加家具信息
 *     description: 添加家具信息
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              price:
 *                type: string
 *              description:
 *                type: string
 *              image:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/add').post(userAuth, adminAuth, FurnitureController.addFurniture);

/**
 * 更新家具信息
 * @swagger
 * /api/v1/furniture/update:
 *   put:
 *     tags:
 *       - Furniture
 *     summary: 更新家具信息
 *     description: 更新家具信息
 *     requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              price:
 *                type: string
 *              description:
 *                type: string
 *              image:
 *                type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/update').put(userAuth, adminAuth, FurnitureController.updateFurniture);

/**
 * 删除家具信息
 * @swagger
 * /api/v1/furniture/delete:
 *   delete:
 *     tags:
 *       - Furniture
 *     summary: 删除家具信息
 *     description: 删除家具信息
 *     parameters:
 *       - name: id
 *         in: query
 *         description: 家具Id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/delete').delete(userAuth, adminAuth, FurnitureController.removeFurniture);


export default router;
