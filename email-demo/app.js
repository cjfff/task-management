require('dotenv/config')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

const vertify = require('./router/vertify')

const PORT = process.env.PORT || 9999


// 解析参数
app.use(bodyParser());

// 引入路由
app.use(vertify.routes(), vertify.allowedMethods());

app.listen(PORT, () => {
  console.log(`app running listening ${PORT}`)
})

