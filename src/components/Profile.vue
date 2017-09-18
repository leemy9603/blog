<template>
	<div>
		<div class="leftBox">
			<div class='photoContent'>
				<div class="photoBox" id="photoBox"><img v-on:load="photoBox" :src=url></div>
				<input type="file" @change="changePhoto" style="display:block;width:150px;height:150px;position:absolute;top:0;left:0;opacity:0;">
				<p>个人头像</p>
			</div>
		</div>
		<div class="rightBox">
		<div class="messageBox" id="messageBox">
			<h2>基本信息 <input type="button" id="modify"  style="display:block;width:50px;float:right;" value="修改" @click="changeMessage"></h2>
			<p><label>昵称：</label><input type="text" v-model="nickname" disabled></p>
			<p><label>生日：</label><input type="text" v-model="birthday" disabled></p>
			<p><label>个性签名：</label><input type="text" v-model="presign" disabled></p>
			<p><label>密码：</label><input type="text" v-model="password" disabled></p>
			<p><label>性别：</label><input type="text" v-model="sex" disabled></p>
		</div>
		<p style="text-align:center;"><input type="button" value="取消" @click="cancel">&nbsp;&nbsp;
		<input type="button" value="完成" id="finsh" @click="finsh"></p>
		</div>
	</div>
</template>
<script>
 import {mapMutations, mapState,mapActions} from 'vuex'
	export default {
    	name: 'Profile',
    	data (){
    		return {
    			nickname:'',//个人昵称
    			birthday:'请按照xxxx-xx-xx格式填写你的',//生日 
    			presign:'',//个性签名
    			password:'',//密码
    			url:null,//头像
    			sex:null,//性别
    			memObj:null,//用户信息
    			account:null,
    			role_code:null,
    			memItem:[]
    		}
    	},
    	methods: {
    	...mapMutations([
     		 'setRouterid','setMemObj'
     		 ]),
    		cancel (){//点击取消按钮
    			var finsh = document.getElementById('finsh');
    			var modify = document.getElementById('modify');
    			modify.disabled = false;//修改按钮解除禁用
    			finsh.disabled = false;//完成按钮解除禁用
    			this.setValue(this.memObj);
    			this.mesDisable(true);
    		},
    		finsh (e){//完成修改，请求数据库更新
    			var modify = document.getElementById('modify');
    			var e = e||window.event;
    			//e.target.disabled = true; 
    			modify.disabled = false;//修改按钮解除禁用
    			var flag = true;//判断是否按照正确的格式修改
    			var flag1 = this.passwordCheck(this.password);
    			var flag2 = this.nickCheck(this.nickname);
    			flag = flag1 && flag2;
    			if(flag){
    			//验证性别
    			if(this.sex == 1 || this.sex == '女'){
    				this.sex = 1;
    			}else if(this.sex == 2 || this.sex == '男'){
    				 this.sex = 2;
    			}else{
    				alert('请填入正确的性别');
    			 		flag = false;
    			}
    			 //验证生日
    			var reg = /^\d{4}-\d{2}-\d{2}/g;//匹配格式xxxx-xx-xx
				if(!reg.test(this.birthday)){
				this.birthday = '';
				alert('请按照正确生日的格式填写！');
	          	this.mesDisable(false);	
				 flag = false;
				}	 
	      }
	      if(flag){
				this.$http.post('/blog/member/updateMember', {'uid':this.routerid,'password':this.password,'nickname':this.nickname,'sex':this.sex,'presign':this.presign,'url':this.url,'account':this.account,'role_code':this.role_code,'birthday':this.birthday},{}).then(response =>{
	          	alert('更新数据库成功');
	          	});
	          	this.mesDisable(true);	
	          	e.target.disabled = true; 
	          	}
    		},
    		setValue (obj){//将获取的对象个属性的值赋给data中的值
    			this.nickname = obj.nickname;
    			if(!this.url){
    				this.url = obj.url;
    			}	
    			this.presign = obj.presign;
    			this.birthday = obj.birthday;
    			this.sex = obj.sex;
    			this.password = obj.password;
    			this.account = obj.account;
			    this.role_code = obj.role_code;
    		},
    		mesDisable (status) {//修改type='tetx'的input状态是否可以修改
    			var messageBox = document.getElementById('messageBox');
    			var pItem = messageBox.getElementsByTagName('p');
    			var len = pItem.length;
    			for(var i=0;i<len;i++){
    				pItem[i].children[1].disabled = status;
    			}

    		},
    	 passwordCheck (password) {//密码验证
			var password = password;
			var reg = /^\w{6,10}$/g;//匹配长度为6-10位的有数字或字符或下划线组成的字符串
			var flag = false;//判断密码格式格式否正确
			if(reg.test(password)){
				flag = true;
			}else{
				alert('密码必须为6-10位由数字或字母或下划线组成的！');
				this.password = '';
			}
			return flag;
		},
		nickCheck (nickname) {//昵称验证
			var nickname = nickname;
			var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+/g;//昵称由中文或字母或数字或下划线组成
			var flag = true;//判断昵称格式格式否正确
			var _this = this;
			this.memItem.forEach(function(val){
				if(val.uid !== _this.memObj.uid){
				if(val.nickname === nickname){
					flag = false;
					alert('该昵称已经存在！');
					_this.nickname = '';
				}
				}
			});
			if(flag){
				if(reg.test(nickname)){
					flag = true;
				}
			}else{
				alert('昵称由中文或数字或字母或下划线组成的！');
				this.nickname = '';
				flag = false;
			}
			return flag;
			},
    		photoBox (e) {//处理图片,当img加载时对图片进行处理
    		    var e = e || window.event;//被加载的图片
    			var img = e.target;
    			var imgw = img.naturalWidth;//获取加载图片的宽度
    			var imgh = img.naturalHeight;
    			var w = imgw - 150;//图片与imgBox长度相差
    			var h = imgh - 150;//图片与imgBox宽度相差
    			img.style.left = -w/2 + 'px';
    			img.style.top = -h/2 + 'px';
    		},
    		changePhoto (e) {
    			var e = event||window.event;
			    var files = e.target.files;
			    var _this = this;//保存对当前对象的图片
			    var leng = files.length;//上传图片的数量	    
		      for(var i = 0;i<leng;i++){
		       var render = new window.FileReader();
		         render.readAsDataURL(files[i]);
		         var size = files[i].size;//上传图片的大小
			    if(size < 100000){//当siez小于100000才允许上传
			     render.onload = function(e){
			     var url = e.target.result;
			     _this.url = url;
			     _this.$http.post('/blog/member/updateMember', {'uid':_this.routerid,'password':_this.password,'nickname':_this.nickname,'sex':_this.sex,'presign':_this.presign,'url':url,'account':_this.account,'role_code':_this.role_code},{}).then(response =>{
	          	alert('更新数据库成功');
	          	_this.setMemObj({'uid':_this.routerid,'password':_this.password,'nickname':_this.nickname,'sex':_this.sex,'presign':_this.presign,'url':url,'account':_this.account,'role_code':_this.role_code});
	      });
			     }
			    }
			    else{
       				alert('图片太大,，无法上传！');
      			 }
    		}
    		},
    		changeMessage (e) {//点击修改按钮触发
    			var e = e || window.event;
    			var finsh = document.getElementById('finsh');
    			this.mesDisable(false);
    			e.target.disabled = true;//修改按钮被禁用
    			finsh.disabled = false;//完成按钮解除禁用
    		}
    	}, 
    	computed: {
 		 ...mapState([
       	 'routerid','memObj'
      	])
      },
    	mounted () {
    		console.log(this.routerid)
    		//根据用户id请求数据库返回该用户信息
    		this.$http.post('/blog/member/selMemById', {'uid':this.routerid},{}).then(response =>{
	      	  this.memObj = response.body[0];
	      	  //this.memItem = response.body;
	      	  this.setValue(this.memObj);
	      	}); 
	      	//请求数据库返回所有数据
	      	this.$http.post('/blog/member/selectAllmem', {},{}).then(response =>{
	      	  this.memItem = response.body;
	      	  //this.setValue(this.memObj);
	      	});
	      	}
    	}
</script>
<style scoped>
.leftBox{
	float:left;
	width:30%;
	border-right:1px solid #cccccc;
	min-width:200px;
	box-sizing:border-box;
	height:100%;
}
.photoContent{
	position:relative;
	margin:30px auto;
	height:180px;
	width:150px;
}
.photoContent:after{
	display:block;
	content:'';
	clear:both;
}
.photoContent p{
	heigth:30px;
	line-height:30px;
	text-align:center;
}
.photoBox{
	width:150px;
	height:150px;
	border:1px solid #cccccc;
	overflow:hidden;
	position:relative;
}
.photoBox img{
	display:block;
	position:absolute;
}
.messageBox{
	padding:10px;
	float:left;
}
.messageBox p{
	height:30px;
	line-height:30px;
}
.messageBox label{
	display:block;
	float:left;
	width:100px;
	text-align:right;
}
.messageBox input{
	display:block;
	float:right;
	height:25px;
	line-height:25px;
	width:50%;
	min-width:350px;
	text-indent:10px;
}
.messageBox:after{
	display:block;
	content:'';
	clear:both;
}
.messageBox h2{
	border-bottom:1px solid #cccccc;
	margin-bottom:10px;
	height:40px;
	line-height:40px;
}
.messageBox h2 input{
	display:block;
	float:right;
	width:30px;
}
.rightBox{
	width:70%;
	float:left;
}
p:before{
	display:block;
	content:'';
	clear:both;
}
</style>