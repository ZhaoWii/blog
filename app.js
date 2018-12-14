const express = require('express')
const app = express()

// 设置 默认采用的模板引擎名称
app.set('view engine' , 'ejs')
// 设置模板页面的存放路径 不设置默认在views目录
app.set('views' , './views')

app.get('/',(req , res) =>{
    res.send('测试用的 ok')
    // res.render('index',{})
})

app.listen(80,() => {
    console.log('http://127.0.0.1:80')
})

