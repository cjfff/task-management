const nodemailer = require("nodemailer");
const { promisify } = require('util')

const account = {
  user: process.env.EMAIL_ACCOUNT,
  pass: process.env.EMAIL_PASSWORD
};

let transporter = nodemailer.createTransport({
  service: "qq",
  port: 465,
  auth: {
    user: account.user,
    pass: account.pass
  }
});

transporter.sendMail = promisify(transporter.sendMail)

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendEmail = ({ email, message}) => transporter.sendMail({
  from: account.user,
  to: email,
  subject: "TaskManagement 邮箱验证提示", // 邮件主题
  html: message // 内容
});

module.exports = {
  sendEmail
};

