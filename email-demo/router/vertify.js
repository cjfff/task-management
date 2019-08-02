const Router = require('koa-router')
const emailService = require('../utils/email')

const router = new Router({
  prefix: '/api/v1/vertify'
})


router.post('/', async (ctx) => {
  const { email } = ctx.request.body

  let message = 'success'
  try {
    await emailService.sendEmail({
      message: `${Date.now()} hello world`,
      email
    })
  } catch (error) {
    console.log(error);
    message = '发送失败'
  }

  ctx.body = {
    code: 0,
    message
  }

})


module.exports = router
