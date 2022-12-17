require("dotenv").config();
import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import logger from 'morgan'
import apiV1Router from './app/routes/auth'
import setSwagger from './app/swagger'
import setRouter from './app/routes'

const app = express();

setSwagger(app);

// 解决跨域问题
app.all("*",function(req,res,next){
  // 设置允许跨域的域名,*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin','*');
  // 允许的header类型
  res.header('Access-Control-Allow-Headers','content-type');
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods','DELETE,PUT,POST,GET,OPTIONS');

  if(req.method.toLowerCase() == 'options') {
    res.send(200); // 让options 尝试请求快速结束
  } else {
    next();
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'mcservers-cn-2022/11/19',
  resave : true,
  rolling: true,
  saveUninitialized: true, // 是否保存未初始化的会话
  cookie : {
      maxAge : 30 * 60 * 1000, // 设置 session 的有效时间，单位毫秒 这里设置半小时
  },
}));

setRouter(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
