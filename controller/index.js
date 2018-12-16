


const indexHandler =  (req, res)=> {
    // res.send('测试用的 ok') 
    res.render('index', {
        user : req.session.user,
        islogin : req.session.islogin
    })
}

module.exports = {
    indexHandler








    
}