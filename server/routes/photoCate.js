var express = require('express');
var user = require('../db.js');
var client = user.connect();
var mysql = require('mysql');
var router = express.Router();

var select = {
	selPcate: function(client,pcate,callback){
		var sql =  'SELECT * FROM photocate WHERE uid = "'+pcate.uid+'"';
		client.query(sql,pcate,function(err,res,fields){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		});
	}
}

var remove = {
	remPcate: function(client,pcate,callback){
		var sql = 'DELETE FROM photocate WHERE id ="'+pcate.id+'"';
		client.query(sql,pcate,function(err,res){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		})
	}
}

var add = {
	addPcate: function(client,pcate,callback){
		var sql = 'insert into photocate(pcate_name,num,pdescribe,uid) values ("'+pcate.pcate_name+'",'+pcate.num+',"'+pcate.pdescribe+'","'+pcate.uid+'")';
		client.query(sql,pcate,function(err,res){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}

		})
	}
}
var update = {
	updatePcate: function(client,pcate,callback){
		var sql = 'UPDATE photocate SET num = "' + pcate.num +'" WHERE id = "'+ pcate.id +'"';
		client.query(sql,pcate,function(err,res){
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

router.post('/addpcate',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	add.addPcate(client,params,res);
});
router.post('/selpcate',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	select.selPcate(client,params,res);
});

router.post('/rempcate',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	remove.remPcate(client,params,res);
});

router.post('/updatepcate',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	update.updatePcate(client,params,res);
});
module.exports = router;