const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const session = require('express-session')

// 注册 session 中间件
// 只要住的了session 中间件 那么 今后只要能访问到req这个对象 必然能访问到 req.session 
app.use(session({
        secret:'这是加密的密钥',
        resave:false , 
        saveUninitialized:false,
        //如果不设置过期时间 默认 关闭浏览器即过期 无法储存有效的cookie
        cookie:{maxAge:5000}
    }))




app.use(bodyParser.urlencoded({ extended: false }))
// 设置 默认采用的模板引擎名称
app.set('view engine', 'ejs')
// 设置模板页面的存放路径 不设置默认在views目录
app.set('views', './views')
// 把mode_modules文件夹 托管为静态资源目录
app.use('/node_modules', express.static('./node_modules'))

// // 导入router/index.js 路由模块
// const routerIndex = require('./router/index.js')
// app.use(routerIndex)
// // 导入路由相关模块
// const routerUser = require('./router/user.js')
// app.use(routerUser)

// 使用fs模块读取 router目录下所有的文件名
fs.readdir('./router',(err,files) => {
    if(err) return console.log(err.message)
    files.forEach(filename => {
        // bug 相对路径找得到 绝对路径找不到
        // console.log('./router/'+filename)
        app.use(require('./router/'+filename))
        // let filePath = path.join(__dirname,'./router/' + filename)
        // console.log(filePath)
    })
})


app.listen(80, () => {
    console.log('http://127.0.0.1')
})

