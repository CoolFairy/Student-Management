var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
mongoose.connect('mongodb://localhost/test')



/**
 * app.js  入口模块
 *
 * 职责：
 * 1.用于启动服务
 * 2.做一些服务相关的配置
 *     2.1 模板引擎
 *     2.2 body-parser 用于解析表单post请求体
 *     2.3 提供静态资源服务
 * 3. 挂载路由
 * 4. 监听端口，启动服务
 */




var router = require('./router.js')


var app = express()

app.use(bodyParser.urlencoded({ extended: false }))


app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.engine('art', require('express-art-template'))

app.use(session({
    secret: 'curd',
    resave: false,
    cookie: {
        expires: new Date(Date.now() + 3600000)
    }
}))


/*app.use(function(req, res, next) {
    if (!req.session.admin && req.path !== '/login') {
        res.redirect('/login')
    }
    next()
})*/



// 把路由容器挂载到 app 服务中
app.use(router)

// 404
app.use(function(req, res) {
    res.render('404.art')
})


// err-handling
app.use(function(err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})




app.listen(9090, function() {
    console.log('http://localhost:9090')
})