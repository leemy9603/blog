var express = require('express');
var path = require('path');
//var favicon = require('server-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var blog = express();
//路由信息,存放在./routes目录下
var routes = require('./routes/index');//主页接口
var member = require('./routes/user');//用户接口
var cate = require('./routes/categroy.js');//分类接口
var art = require('./routes/article.js');//文章接口
var photo = require('./routes/photo.js');//图片接口
var photoCate = require('./routes/photoCate.js');//相册分类接口
blog.use(bodyParser.json());
blog.use(bodyParser.urlencoded({extended:false}));
//blog.use(express.static(path.join(_dirname,'src')));
blog.use('/blog/',routes);//在blog在注册routes接口
blog.use('/blog/member',member);//在blog中注册member接口
blog.use('/blog/category',cate);//在Blog中注册cate接口
blog.use('/blog/article',art);//在blog中注册article接口
blog.use('/blog/photo',photo);//在blog中注册photo接口
blog.use('/blog/photocate',photoCate);//在blog中注册photocate接口
blog.listen(3000);
console.log('success listen at port 3000....');

