const express = require('express')
const router = express.Router()
const moment = require('moment')
// 导入数据库操作模块
const conn = require('../db/index.js')

module.exports = {
    getRegisterHandler(req, res) {
        res.render('./user/register.ejs', {})
    },
    postRegisterHandler(req, res) {
        let userInfo = req.body
        // 表单验证
        //    console.log(userInfo)
        if (!userInfo.username || !userInfo.nickname || !userInfo.password) return res.status(400).send({ status: 400, msg: '请输入正确的表单信息!' })




        // 查重 判断用户名是否存在 连接数据库查询
        const blogSql = 'select count(*) as count from user_blog where username = ?'

        conn.query(blogSql, userInfo.username, (err, result) => {
            //    console.log(result)
            if (err) return res.status(500).send({ status: 500, msg: '查重失败!请重试!' })
            // result[0].count // 为0表示没有重复, 可以用
            if (result[0].count !== 0) return res.status(400).send({ status: 400, msg: '用户名重复!请重试!' })
            // 能到此处 说明可以注册
            // 添加ctime字段

            userInfo.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
            // console.log(userInfo)
            //{ username: '小宁子',
            //password: '12',nickname: '12',
            //citme: '2018-12-14 20:05:09' }

            // 执行注册的sql语句  使用MySQL模块 注意insert into xxx set
            const registerSql = 'insert into user_blog set ?'

            conn.query(registerSql, userInfo, (err, result) => {
                console.log(userInfo)
                if (err) return res.status(500).send({ status: 500, msg: '注册失败!请重试!' })

                res.send({ status: 200, msg: '注册成功!' })

            })
        })
    },
    getLoginHandler(req, res) {
        res.render('./user/login', {})
    },
    postLoginHandler(req, res) {
        // console.log(req.body)
        // 1. 直接去数据库执行查询语句  条件 username和password
        const loginSql = 'select * from user_blog where username = ? and password = ?'
        conn.query(loginSql, [req.body.username, req.body.password], (err, result) => {
            //    console.log(result)
            if (err || result.length === 0) return res.status(400).send({ status: 400, msg: '登录失败!请重试!' })
            // 登录成功
            res.send({ status: 200, msg: '登录成功!' })

        })
    }
}

