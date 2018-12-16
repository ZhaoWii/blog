 // 路由模块
const express = require('express')
const router = express.Router()
const ctrl = require('../controller/index.js')

 // 用户请求的 项目首页
 router.get('/', ctrl.indexHandler)


module.exports = router
