const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

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
        console.log('./router/'+filename)
        app.use(require('./router/'+filename))
        // let filePath = path.join(__dirname,'./router/' + filename)
        // console.log(filePath)
    })
})


app.listen(80, () => {
    console.log('http://127.0.0.1')
})

