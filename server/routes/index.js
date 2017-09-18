var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//定义一个GET请求，path为根路径
//定义路由的基本方式为blog.method(path,handler);path是服务器上的路径,handler是在路由匹配时执行的函数
router.get('/',function(req,res,next){
	res.render('index',{title: 'Express'});
});
module.exports = router;
