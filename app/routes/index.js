import auth from './auth'
import user from './user'
import userFollow from './userFollow'
import server from './server'
import serverTag from './serverTag'
import serverData from './serverData'
import serverDataDayReport from './serverDataDayReport'
import file from './file'
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
  app.use('/api/v1/userFollow', userFollow);  // User
  app.use('/api/v1/server', server);  // Server
  app.use('/api/v1/serverTag', serverTag);  // Server Tag
  app.use('/api/v1/serverData', serverData);  // Server Data
  app.use('/api/v1/serverDataDayReport', serverDataDayReport);  // Server Data Day Report
  app.use('/api/v1/file', file);  // Server Data Day Report
}