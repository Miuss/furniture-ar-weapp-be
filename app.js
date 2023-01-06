require("dotenv").config();
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import logger from 'morgan'
import schedule from 'node-schedule'
import serverDayReportJob from './app/schedules/serverDayReport'

import setSwagger from './app/swagger'
import setRouter from './app/routes'

const app = express();

// const RedisStore = require('connect-redis')(session);
// // 创建Redis连接配置
// const redisClient = redis.createClient({
//   host: '103.219.30.40', 
//   port: 22954,
//   options: {
//     password: 'Miu@051900'
//   }
// });

// 大数据报表定时任务
const dataJob = schedule.scheduleJob('0 15 0 * * *', () => serverDayReportJob());

setSwagger(app);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  // store: new RedisStore({ client: redisClient }),
  secret: 'mcservers-cn-miuss051900',
  name: 'mcservers-cn',
  resave: false,
  saveUninitialized: true, // 是否保存未初始化的会话
  cookie: {
    maxAge: 30 * 60 * 1000, // 设置 session 的有效时间，单位毫秒 这里设置半小时
  },
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true); //划重点
  res.header("Access-Control-Allow-Origin", req.headers.origin); 
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});

setRouter(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (res.statusCode == null) {
    next(createError(404));
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ code: -1, msg: err.message });
});

module.exports = app;
