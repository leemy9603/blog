# blog

> A Vue.js project

## Build Setup

``` bash
# blog has been npm install,so you don't need to npm installl 

# Import the SQL file， mysql start
cd server 
import blog.js to mysql 

# server with run node at localhost: 3000，Agent mapping is implemented across domains 
cd blog
cd server 
node blog.js

# serve with hot reload at localhost:8080
npm run dev


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader)

使用vue+vueX++express+mysql完成个人博客


项目描述：
  1)Mysql创建member(人员表)，role（角色表)，comment(评论表),photo(图片表)，photocate(图片分类表)，article(文章表)，category(文章分类表)

  2)Express实现对数据库的增删查改操作,将对各个对象（如member）实现对数据库的增删查改逻辑且监听前端的请求分别封装在不同文件下，并在node.js中的路由功能注册各对象的路由接口
  
  3)Vue利用MVVM 数据绑定和一个可组合的组件系统，在vue2中父子组件通信需要用到prop属性，如果子组件需要通信需要通过$emit(发射事件)，$on(监听事件),当子组件多了之后，很难管理。所以我利用VueX（状态管理模式）,实现数据在不同组件间的共享和管理
  

目录 
  |-- bower_components(客户端所需框架)
    |-- bootstrap
    |-- jquery
 |-- build (webpack配置文件) 
 |-- config(项目初始化的配置)
 |-- mysql (存放博客的mysql数据文件)
    |-- blog.sql (mysql文件)
 |--node_modules (npm加载的项目依赖的模块)
 |-- server (利用express处理数据库的增删查改逻辑)
  |-- db.js  （连接数据库的配置）
  |-- blog.js （注册路由接口）
  |-- router (处理增删查改逻辑)
    |-- article.js（文章增删查改逻辑）
    |-- categroy.js （文章分类增删查改逻辑）
    |-- index.js（入门文件）
    |-- photo.js （照片增删查改）
    |-- photoCate.js (照片分类增删查改)
    |-- user.js （用户增删查改）
 |-- src (静态文件)
  |-- assets (静态文件)
    |-- img(图片)
  |--components（组件）
  |-- router (前端路由跳转逻辑)
  |-- Blog.vue (项目的入口文件)
  |-- main.js (项目的核心文件)
|-- index.html (项目默认打开文件)

  
