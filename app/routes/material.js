import express from 'express'
import MaterialController from '../controllers/MaterialController';
import { userAuth, adminAuth } from '../middlewares/auth'

const router = express.Router();

/**
 * 查询材质列表
 * @swagger
 * /api/v1/material/list:
 *   get:
 *     tags:
 *       - Material
 *     summary: 通过分页查询家具材质列表
 *     description: 通过分页查询家具材质列表
 *     responses:
 *       200:
 *         description: success
 */
router.route('/list').get(userAuth, MaterialController.queryMaterialByFurnitureId);

/**
 * 通过id查询材质信息
 * @swagger
 * /api/v1/material/info:
 *   get:
 *     tags:
 *       - Material
 *     summary: 通过分页查询材质列表
 *     description: 通过分页查询材质列表
 *     parameters:
 *      - name: id
 *        in: query
 *        description: 材质Id
 *        required: false
 *        type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/info').get(userAuth, adminAuth, MaterialController.getMaterialInfo);
/**
 * 添加材质信息
 * @swagger
 * /api/v1/material/add:
 *   post:
 *     tags:
 *       - Material
 *     summary: 添加材质信息
 *     description: 添加材质信息
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               furnitureId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/add').post(userAuth, adminAuth, MaterialController.addFurnitureMaterial);

/**
 * 更新材质信息
 * @swagger
 * /api/v1/material/update:
 *   put:
 *     tags:
 *       - Material
 *     summary: 更新材质信息
 *     description: 更新材质信息
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *     responses:
 *       200:
 *         description: success 
 */
router.route('/update').put(userAuth, adminAuth, MaterialController.updateFurnitureMaterial);


/**
 * 删除材质信息
 * @swagger
 * /api/v1/material/delete:
 *   delete:
 *     tags:
 *       - Material
 *     summary: 删除材质信息
 *     description: 删除材质信息
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       200:
 *         description: success
 */
router.route('/delete').delete(userAuth, adminAuth, MaterialController.deleteFurnitureMaterial);

export default router;
