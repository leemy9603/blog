var express = require('express');
var user = require('../db.js');
var client = user.connect();
var mysql = require('mysql');
var router = express.Router();

var select = {
	selectMember: function(client,user,callback){
		var sql =  'SELECT * FROM member WHERE account= "'+user.account+'"';
		client.query(sql,user,function(err,res,fileds){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		});
	}, 
	selMemById: function(client,user,callback){
		var sql =  'SELECT * FROM member WHERE uid= "'+user.uid+'"';
		client.query(sql,user,function(err,res,fileds){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		});
	},
	selectKey: function(client,user,callback){
		var sql = 'SELECT uid,role_code,password,account,url,nickname,sex,birthday,presign FROM member WHERE nickname like "%'+user.keyWord+'%"';
		client.query(sql,user,function(err,res,fileds){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}
		});
	},
	selectAll: function(client,callback){
		var sql = "SELECT * FROM  member";
		client.query(sql,function(err,res,fileds){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}

		});
	}
}

var remove = {
	removeMember: function(client,user,callback){
		var sql = 'DELETE FROM member WHERE uid ="'+user.uid+'"';
		client.query(sql,user,function(err,res){
			if(err) throw err;
			jsonWrite(callback,res);
		})
	}
}

var add = {
	addMember: function(client,user,callback){
		var sql = 'insert into member(role_code,account,password,nickname,sex,birthday,url,presign) values ("2","'+user.account+'","'+user.password+'","'+user.nickname+'","'+user.sex+'","'+user.birthday+'","www.aa.com","这位童鞋很懒，什么都没有留下~")';
		client.query(sql,user,function(err,res){
			if (err){
				console.log(err);
			} else{
				jsonWrite(callback,res);
			}

		})

	}
}
var update = {
	updateMember: function(client,user,callback){
		var sql = 'UPDATE member SET nickname = "' + user.nickname +'", birthday ="' + user.birthday +'", password = "' + user.password +'" , url="' + user.url +'", sex = "'+ user.sex +'" , role_code="'+ user.role_code +'", account="'+ user.account +'",presign =  "'+ user.presign +'" WHERE uid = "'+ user.uid +'"';
		client.query(sql,user,function(err,res){
			console.log(sql);
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
router.post('/updateMember',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	update.updateMember(client,params,res);
});
router.post('/selectMember',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	select.selectMember(client,params,res);
});
router.post('/addMember',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	add.addMember(client,params,res);
});
router.post('/selectAllmem',function(req,res){
	console.log(req)
	select.selectAll(client,res);
});
router.get('/add',function(req,res){
	res.end("add");
});
//通过用户id访问
router.post('/selMemById',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	select.selMemById(client,params,res);
});
//通过用户昵称关键字模糊查询访问
router.post('/selectKey',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	select.selectKey(client,params,res);
});
router.post('/remMember',function(req,res){
	console.log(req)
	var params = req.body;
	console.log("here is the parmas")
	console.log(params);
	remove.removeMember(client,params,res);
});
module.exports = router;