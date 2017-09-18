var express = require('express');
var user = require('../db.js');
var client = user.connect();
var mysql = require('mysql');
var router = express.Router();

var select = {
	selPhoto: function(client,callback){
		var sql =  'SELECT * FROM photo';
		client.query(sql,function(err,res,fields){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		});
	}
}

var remove = {
	remPhoto: function(client,photo,callback){
		var sql = 'DELETE FROM photo WHERE pid ="'+photo.pid+'"';
		client.query(sql,photo,function(err,res){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		})
	}
}

var add = {
	addPhoto: function(client,photo,callback){
		var sql = 'insert into photo(photo_title,cre_time,photo_cate,photo_content,uid) values ("'+photo.photo_title+'","'+photo.cre_time+'","'+photo.photo_cate+'","'+photo.photo_content+'","'+photo.uid+'")';
		client.query(sql,photo,function(err,res){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}

		})
	}
}
var update = {
	updatePhoto: function(client,photo,callback){
		var sql = 'UPDATE photo SET photo_title = "' + photo.photo_title +'" WHERE pid = "'+ photo.pid +'"';
		client.query(sql,photo,function(err,res){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
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

router.post('/addphoto',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	add.addPhoto(client,params,res);
});
router.post('/selphoto',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	select.selPhoto(client,res);
});

router.post('/remphoto',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	remove.remPhoto(client,params,res);
});

router.post('/updatephoto',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	update.updatePhoto(client,params,res);
});
module.exports = router;