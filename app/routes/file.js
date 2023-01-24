import express from 'express'
import { userAuth } from '../middlewares/auth'
import FileController from '../controllers/FileController'

const router = express.Router();

/**
 * 用户登陆
 * @swagger
 * /api/v1/file/getFileUploadToken:
 *   get:
 *     tags:
 *       - File
 *     summary: 获取文件上传Token
 *     description: 获取文件上传Token
 *     responses:
 *       200:
 *         description: success
 */
router.route('/getFileUploadToken').get(userAuth, FileController.getQiniuUploadToken);

export default router;