import auth from './auth'
import user from './user'
import file from './file'
import furniture from './furniture'
import material from './material'
import asyncHandler from '../middlewares/asyncHandler'

import { User } from '../models'

export default (app) => {
  // 自动获取解析身份信息
  app.use(asyncHandler(async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.replace("Bearer", "").trim()
  
        const user = await User.findOne({
          where: {
            token,
          },
        })
  
        if (user) {
          req.user = user
        }
      }
  
      next();
    } catch (err) {
      return res.status(401).json({ code: -6, msg: err.message});
    }
  }));

  app.use('/api/v1/auth', auth);  // Auth
  app.use('/api/v1/user', user);  // User
  app.use('/api/v1/furniture', furniture);  // furniture
  app.use('/api/v1/material', material);  // material
  app.use('/api/v1/file', file);  // file
}