const nodemailer = require("nodemailer");
const { promisify } = require('util')

const account = {
  user: process.env.EMAIL_ACCOUNT,
  pass: process.env.EMAIL_PASSWORD
};

class EmailHelper {
  constructor() {
    // 初始化
    this.nodemailer = nodemailer.createTransport({
      service: "qq",
      port: 465,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });

    this.nodemailer.sendMail = promisify(transporter.sendMail)


    // 邮箱服务是否验证可以使用
    this.isVertify = false;
    this.vertifyEmail()
  }


  vertifyEmail() {
    this.nodemailer.verify(function (error, success) {
      if (error) {
        console.error('邮箱服务异常，将在半个小时后重新尝试连接');
        setTimeout(() => this.vertifyEmail(), 60 * 30 * 100)
      } else {
        this.isVertify = true
        console.log("邮箱服务运行正常，可以正常使用服务");
      }
    });
  }

  /**
   * 发送邮箱
   * @param {} param0 
   * email 要发送的邮箱
   * title 邮箱主题
   * content 邮箱内容，可以使用 html
   */
  sendMail({ email, title, content }) {
    if (!this.isVertify) {
      throw new Error('邮箱服务未连接')
    }
    return this.nodemailer.sendMail({
      from: account.user,
      to: email,
      subject: title, // 邮件主题
      html: content // 内容
    })
  }
}

module.exports = new EmailHelper()

