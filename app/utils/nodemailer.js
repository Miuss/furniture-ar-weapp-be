import nodemailer from 'nodemailer'
import handlebars from 'handlebars'
import mjml2html from 'mjml'
import fs from 'fs'

const sendEmail = async ({ email, title, template, keys = {} }) => {
  
    const transporter = nodemailer.createTransport({
      host: 'smtp.exmail.qq.com', 
      port: 465, // SMTP 端口
      auth: {
        //发送者的账户和授权码
        user: 'i@mail.mcservers.cn', //账户
        pass: 'yDzLybire7f8E6F8', //smtp授权码，到邮箱设置下获取
      },
      secureConnection: true,
    });

    const temp = handlebars.compile(fs.readFileSync(`${__dirname}/mails/${template}.mjml`, "utf8"))

    const mailOptions = {
      from: '"我的世界服务器网" <i@mail.mcservers.cn>', // 发送者昵称和地址
      to: email, // 接收者的邮箱地址
      subject: title, // 邮件主题
      html: mjml2html(temp(keys)).html
    };
    
    //发送邮件
    return new Promise((resolve, reject) => transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      console.log('邮件发送成功 ID：', info.messageId);
      resolve(info.messageId);
    }))
}

export {
  sendEmail
}