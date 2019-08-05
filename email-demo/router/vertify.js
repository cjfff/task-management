const Router = require('koa-router')
const emailHelper = require('../utils/email')

const router = new Router({
  prefix: '/spaas/api/v1/vertify'
})


router.post('/', async (ctx) => {
  const { email } = ctx.request.body

  let message = 'success'
  try {
    await emailHelper.sendEmail({
      content: `${Date.now()} hello world`,
      email,
      title: '【Task任务系统邮箱验证】'
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

router.get('/', (ctx) => {
  ctx.body = {
    code: 0,
    message: 'success',
    data: {
      username: ''
    }
  }
})


module.exports = router
