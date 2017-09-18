<template>
<div class="zhuceBox">
	<div>
		<p><label>账号：</label><input type="text" v-model="account"><small id="accountId">*账号必须为10-12位数字</small></p>
		<p><label>密码：</label><input type="text" v-model="password"><small id = "passwordId">*密码必须为6-10位数字或下划线或字母组成</small></p>
		<p><label>昵称：</label><input type="text" v-model="nickname"><small id="nicknameId">*昵称必须为10-12位中文或数字或字母</small></p>
		<p><label>性别：</label><input type="tetx" v-model="sex"><small id="sexId">*1为女，2为男</small></p>
		<p><label>生日：</label><input type="text" v-model="birthday" placeholder="请按格式：2017-03-10填入"><small id="birthdayId">*按照格式2014-10-10填写</small></p>
		<p><input type="button" @click="zhuce" value="注册"></p>
	</div>
</div>
</template>
<script>
import {mapMutations, mapState,mapActions} from 'vuex'
export default {
	name: 'Zhuce',
	data () {
	return {
		account: null,
		password:null,
		nickname:null,
		sex:null,
		birthday:null,
		memItem: []
	}
	},
	methods: {
	 ...mapActions([
      		'setMemItems' // 映射为 this.$store.dispatch('setCategory ')
   	 	]),
		accountCheck (account) {//账号验证
			var account = account;
			var flag = true;//判断账号否可以插入
			var _this = this;//保存对当前对象的引用
			this.memItem.forEach(function(val){
				if(val.account === account){
					flag = false;
					alert('该账号已经存在！');
					_this.account = '';
				}
			});
			if(flag){
				var reg = /^\d{10,12}$/g;//匹配长度为10-12的数字字符串
				var accountId = document.getElementById('accountId');
				if(reg.test(account)){
				accountId.style.visibility = 'hidden';
				var flag= true;
				}else{
				accountId.style.visibility = 'visible';
				alert('账号全部为数字，且长度10-12！');
				this.account = '';
				flag = false;
			}
			}
			return flag;
		},
		passwordCheck (password) {//密码验证
			var password = password;
			var reg = /^\w{6,10}$/g;//匹配长度为6-10位的有数字或字符或下划线组成的字符串
			var passwordId = document.getElementById('passwordId');
			var flag = false;//判断密码格式格式否正确
			if(reg.test(password)){
				passwordId.style.visibility = 'hidden';
				flag = true;
			}else{
				passwordId.style.visibility= 'visible';
				alert('密码必须为6-10位由数字或字母或下划线组成的！');
				this.password = '';
			}
			return flag;
		},
		nickCheck (nickname) {//昵称验证
			var nickname = nickname;
			var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+/g;//昵称由中文或字母或数字或下划线组成
			var nicknameId = document.getElementById('nicknameId');
			var flag = true;//判断昵称格式格式否正确
			var _this = this;
			this.memItem.forEach(function(val){
				if(val.nickname === nickname){
					flag = false;
					alert('该昵称已经存在！');
					_this.nickname = '';
				}
			});
			if(flag){
				if(reg.test(nickname)){
				nicknameId.style.visibility = 'hidden';
				flag = true;
			}else{
				nicknameId.style.visibility= 'visible';
				alert('昵称由中文或数字或字母或下划线组成的！');
				this.nickname = '';
				flag = false;
			}
			}
			return flag;
		},
		sexCheck (sex) {
			var sex = sex;
			var flag = false;//判断性别格式格式否正确
			var sexId = document.getElementById('sexId');
			if(sex === '女' || sex === '1'){
				sex = 1;
				sexId.style.visibility = 'hidden';
				flag = true;
			}else if(sex === '男' || sex ==='2'){
				sex = 2;
				sexId.style.visibility = 'hidden';
				flag = true;
			}else{
				this.sex = '';
				sexId.style.visibility= 'visible';
				alert('请输入按照格式输入你的性别！');
			}	
			return flag;
		},
		birthdayCheck (birthday) {
			var birthday  = birthday;
			var reg = /^\d{4}-\d{2}-\d{2}/g;//匹配格式xxxx-xx-xx
			var birthdayId = document.getElementById('birthdayId'); 
			var flag = false;//判断生日格式格式否正确
			if(reg.test(birthday)){
				birthdayId.style.visibility = 'hidden';
				flag = true;
			}
			else{
				birthdayId.style.visibility = 'visible';
				this.birthday = '';
				alert('请按照正确生日的格式填写！');
			}
			return flag;
		},
		zhuce () {
			var account = this.account;
			var password = this.password;
			var nickname = this.nickname; 
			var sex = this.sex;
			var birthday = this.birthday;
			var flag1 = this.accountCheck(account);
			var flag2 = this.passwordCheck(password);
			var flag3 = this.nickCheck(nickname);
			var flag4 = this.sexCheck(sex);
			var flag5 = this.birthdayCheck(birthday );
			var flag = flag1 && flag2 && flag3 && flag4 && flag5;
			if(flag){
			this.memItem.push({'account':account,'password':password,'nickname':nickname,'sex':sex,'birthday':birthday});
			 this.$http.post('/blog/member/addMember',{'account':account,'password':password,'nickname':nickname,'sex':sex,'birthday':birthday},{}).then(response =>{
			 	console.log('成功插入！')
	    	  });
			}	
		}
	},
	computed: {
      ...mapState([
        'memItems'
      ])
     },
     created () {
    	 var len = this.memItems.length;
    	 if(len <= 0){
			this.$http.post('/blog/member/selectAllmem',{},{}).then(response =>{
				this.memItem = response.body;
     });
    }else{
    	this.memItem = this.memItems;
      }
    }
}

</script>
<style>
.zhuceBox{
	width:100%;
	height:100%;
	position:fixed;
	top:0;
	left:0;
	min-width:800px;
	background-color:white;
}
.zhuceBox div{
	width:50%;
	min-width:600px;
	height:50%;
	margin:0 auto;
	border:1px solid #cccccc;
}
.zhuceBox div p{
	width:100%;
	height:40px;
	line-height:40px;
	text-indent:15%;
	min-width:600px;
}
.zhuceBox div p input{
	display:inline-block;
	width:35%;
}
.zhuceBox div small{
	color:red;
	font-size:8px;
}
</style>