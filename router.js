var express = require('express')

// 创建一个路由容器
var router = express.Router()
var md5 = require('md5')

var students = require('./students.js')
var Admin = require('./admin.js')


router.get('/login', function(req, res) {
    res.render('login.art')
})
router.get('/logout', function(req, res) {
    req.session.admin = null
    res.redirect('/login')
})
router.post('/login', function(req, res) {
    Admin.findOne({
        eMail: req.body.eMail,
        pass: md5(req.body.pass)
    }, function(err, ret) {
        if (err) {
            // return res.status(500).send('服务器内部错误！')
            return next(err)
        }

        // 如果邮箱和密码都匹配，那么ret返回的是  数据，否则 返回的为 null
        if (!ret) {
            return res.send('用户名或者密码错误');
        }
        //登录成功
        // 应该保存ssession

        req.session.admin = ret
        res.redirect('/students')
    })
})
router.get('/reg', function(req, res) {
    res.render('reg.art')
})
router.post('/reg', function(req, res) {
    // console.log(req.body)
    if (req.body.pass !== req.body.confirmPass) {
        return res.send('确认密码不一致')
    }
    req.body.pass = md5(req.body.pass)
    var admin = new Admin(req.body)
    admin.save(function(err) {
        console.log(err)
        if (err) {
            return next(err)
        }
        res.redirect('/students')
    })
})

// 把路由表挂载到 创建的路由容器中
router.get('/students', function(req, res) {
    console.log(req.session.admin)
    students.find(function(err, ret) {
        if (err) {
            return next(err)
        }
        isLog = req.session.admin ? true : false;
        console.log(req.session.admin)
        console.log(ret)
        res.render('index.art', {
            students: ret,
            isLog: isLog
        })
    })
})
router.get('/students/new', function(req, res) {
    res.render('new.art')
})

router.post('/students/new', function(req, res) {

    var stu = new students(req.body);
    stu.save(function(err) {
        if (err) {
            return next(err)
        }
        res.redirect('/students')
    })

})

router.get('/students/edit', function(req, res) {

    students.findById(req.query.id, function(err, ret) {
        if (err) {
            return next(err)
        }
        if (!ret) {
            return res.status(404).send('没有这个人员的信息')
        }
        res.render('edit.art', {
            student: ret
        })
    })
})

router.post('/students/edit', function(req, res) {
    students.findByIdAndUpdate(req.body.id, req.body, function(err, ret) {
        if (err) {
            return next(err)
        }
        console.log(ret)
        res.redirect('/students')
    })
})

router.get('/students/delete', function(req, res) {

    students.findByIdAndRemove(req.query.id, function(err, ret) {
        if (err) {
            return next(err)
        }
        // console.log(err, ret)
        // 成功
        res.redirect('/students')
    })
})


// 3.exports 到处 Router
module.exports = router


// 4. 在 app.js中加载模块，这个Router容器就可以挂载到 app里边去了。