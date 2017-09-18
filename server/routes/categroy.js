var express = require('express');
var user = require('../db.js');
var client = user.connect();
var mysql = require('mysql');
var router = express.Router();

var select = {
	selectCate: function(client,callback){
		var sql =  'SELECT * FROM category';
		client.query(sql,function(err,res,fields){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		});
	}
}
var add = {
	addCate: function(client,cate,callback){
		var sql = 'insert into category(name,num) value("'+cate.name+'",0)';
		client.query(sql,cate,function(err,res){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		})
	}
}
var update = {
	updateCate: function(client,cate,callback){
		var sql = 'UPDATE category SET num = "'+ cate.num +'" WHERE name = "'+ cate.cate_name +'"';
		client.query(sql,cate,function(err,res,result){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
				console.log(cate.num)
			}

		})
	}
}
var jsonWrite = function(res,ret){
	console.log("ret" +  ret)
	if(typeof ret=== 'undefined'){
		res.json({code:'1',msg:'操作失败'});
	}else{
		res.json(ret);
	}
}

router.post('/addCate',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	add.addCate(client,params,res);
});

router.post('/selectCate',function(req,res){
	console.log(req)
	var params = req.body;
	console.log(params);
	select.selectCate(client,res);
});

router.post('/updateCate',function(req,res){
	console.log(req)
	var params = req.body;
	console.log(params);
	update.updateCate(client,params,res);
});

module.exports = router;