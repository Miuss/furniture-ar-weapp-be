import express from 'express'
import { protect } from '../middlewares/auth'
import { getUserById } from '../controllers/User'
import { login, register } from '../controllers/Auth'


const router = express.Router();

// 用户路由
router.route('/auth/login').post(login);
router.route('/auth/register').post(register);
router.route('/user/:id').get(protect, getUserById);


export default router;
