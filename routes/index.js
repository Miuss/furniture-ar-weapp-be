var express = require('express');
var router = express.Router();
const { protect } = require('../middlewares/auth');
const { getUserById } = require('../controllers/User');
const { login } = require('../controllers/Auth');

// 用户路由
router.route('/auth/login').post(login);
router.route('/user/:id').get(protect, getUserById);


module.exports = router;
