const express = require('express')
const router = express.Router()

const ctrl = require('../controller/user.js')



// 注册页面
router.get('/register', ctrl.getRegisterHandler)

router.post('/register', ctrl.postRegisterHandler)
//登录
router.get('/login' , ctrl.getLoginHandler)

router.post('/login',ctrl.postLoginHandler)

router.get('/logout',ctrl.getLogoutHandler)

module.exports = router