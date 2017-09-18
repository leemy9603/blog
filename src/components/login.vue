<template>
	<div class="login">
		<div class="login-box">
			<p><label>账号：</label><input type="text" v-model="account"></p>
			<p><label>密码：</label><input type="password" v-model="password"></p>
			<p><button type="button" style="width:80%; height:40px;" class="btn btn-success btn-lg" @click="login">登录</button></p>
			<p><span @click="zhuce" class="zhuce">还没有注册吗？去注册</span></p>
		</div>
	</div>
</template>
<script>
 import {mapMutations, mapState,mapActions} from 'vuex'
export default {
	name:'Login',
	data () {
		return {
			account:null,
			password:null,
			memItem: [],//人员信息暂存
		}
	},
	methods: {
		 ...mapActions([
      		'setMemItems','setMemObj','setRouterid' // 映射为 this.$store.dispatch('setCategory ')
   	 	]),
   	 	userCheck (account,password) {//检测用户和密码是否正确
   	 	   var account = account;
   	 	   var password = password;
   	 	   var _this = this;//保存对当前对象的引用
   	 	   var flag = false;
   	 	   this.memItem.forEach(function(val){
   	 	   	if(val.account === account){
   	 	   		if(val.password === password){
   	 	   			flag = true;
   	 	   			_this.setMemObj(val);
   	 	   		}else{
					alert('请输入正确的密码！')
				}
   	 	   	}
   	 	   })
   	 	   if(!flag){
   	 	   		if(confirm("该账号不存在!去注册吗？")){
   	 	   			_this.$router.push('/zhuce');
   	 	   	}
   	 	   }
   	 	   return flag;
   	 	},
		login () {
			var account = this.account;
			var password = this.password;
			var flag = null;
			flag = account.length > 0 && password.length > 0;//account和password是否都有值
			if(flag){
				flag = this.userCheck(account,password);//判断该用户是否存在
				if(flag){
					this.setRouterid(this.memObj.uid);
					//获取该用户的角色代码，管理员为1，普通用户为2
					var role_code = this.memObj.role_code;
					if(role_code == 2){//普通用户则进入个人博客页面
						this.$router.push({name: "user", params: {id: this.memObj.uid}})
					}else{//管理员则进入后台管理页面
						this.$router.push("/manage")
					}
				}
			}else{
				alert('账号和密码均不允许为空！')
			}
		},
	  zhuce () {
	  	this.$router.push('/zhuce');
		}
	},
	 computed: {
      ...mapState([
        'memItems','memObj','routerid'
      ])
      },
      watch: {
	    memItem: function(newItem){
	     this.setMemItems(newItem);//如果存在类别，则将数据赋给state中的cateItems，实现数据在组件间的共享
      }
      },
	beforeCreate () {
		this.$http.post('/blog/member/selectAllmem',{},{}).then(response =>{
				this.memItem = response.body;

      });
      }
}
</script>
<style>
.zhuce{
	cursor:pointer;
}
.login{
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background-color:white;
}
.login-box{
	width:40%;
	height:40%;
	min-width:500px;
	position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	margin:auto;
	border:1px solid #cccccc;
	padding:40px 0;
	font-size:14px;
}
.login-box p{
	width:100%;
	height:40px;
	line-height:40px;
	text-align:center;
	padding:10px;
	}
.login-box p input{
	display:inline-block;
	height:35px;
	line-height:35px;
	width:60%;
	text-align:center;
	border:1px solid #cccccc;
}
</style>
