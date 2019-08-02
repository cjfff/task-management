const nodemailer = require("nodemailer");

// const account = {
//   user: process.env.EMAIL_ACCOUNT,
//   pass: process.env.EMAIL_PASSWORD
// };

const account = {
  user: "xxx",
  pass: "xxxi"
};

let transporter = nodemailer.createTransport({
  service: "qq",
  port: 465,
  auth: {
    user: account.user,
    pass: account.pass

    //  method: "x-login" // force custom method instead of choosing automatically from available methods
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

function sendEmail(message) {
  transporter.sendMail({
    from: "865553742@qq.com",
    to: "770931917@qq.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
  });
}

module.exports = {
  sendEmail
};

