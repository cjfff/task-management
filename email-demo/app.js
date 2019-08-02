require('dotenv/config')
const Koa = require('koa')
const router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()


// 解析参数
app.use(bodyParser());

