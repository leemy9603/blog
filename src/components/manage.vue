<template>
  <div class="manageBox">
  	<h1>欢迎进入后台管理页面</h1>
  	<p style="width:100%; text-align:center; padding:20px;">关键字查询：<input v-model="keyword" type="text" style="display:inline-block;padding:5px;">&nbsp;<input type="button" value="搜索" @click="selectKeyWord" ></p>
  	<div class="memBox">
  	    <p style="background-color:#A1D6BC"><span>昵称</span><span>性别</span><span>账号</span><span>操作</span></p>
  		<p v-for="(member,index) in memItems"><span>{{member.nickname}}</span><span v-if="member.sex == 1">女</span><span v-if="member.sex == 2">男</span><span>{{member.account}}</span><span><input type="button" value="删除" @click="delMem(member.uid,index)"></span></p>
  	</div>
  </div>
</template>
<script>
 import {mapMutations, mapState,mapActions} from 'vuex'
  export default{
  	name:'manage',
  	data (){
  	return {
  	  keyword: ''//搜索关键字
  	}
  	},
  	computed: {
      ...mapState([
        'pageId','memItems'
      ])
      },
      methods:{
      ...mapMutations([
      'setMemItems','setRouterid','delMemItems'
      ]),
      selectKeyWord (){
      	var keyword = this.keyword;
      	this.$http.post('/blog/member/selectKey', {keyWord:keyword},{}).then(response =>{
	      	   this.setMemItems(response.body);
	      	  //this.setValue(this.memObj);
	      });
      },
      delMem (uid,index){//uid为用户id，index为member在数组中的下表
      console.log(index)
      		this.delMemItems(index);
      		this.$http.post('/blog/member/remMember', {'uid':uid},{}).then(response =>{
	      	  alert('成功删除');
	      	});1
      }
      },
      mounted (){
      		var flag = this.memItems;
      		if(!flag.length > 0){
      			//请求数据库返回所有数据
	      	this.$http.post('/blog/member/selectAllmem', {},{}).then(response =>{
	      	   this.setMemItems(response.body);
	      	  //this.setValue(this.memObj);
	      	});
      		}	
      }
  }
</script>
<style scoped>
.manageBox{
	width:100%;
	height:100%;
	position:fixed;
	top:0;
	left:0;
	background-color:white;
}
.manageBox h1{
	padding:20px 0;
	text-align:center;
}
.memBox{
	width:50%;
	height:auto;
	margin:0 25%;
}
.memBox p{
	width:100%;
	text-align:center;
	box-sizing:border-box;
	border:1px solid #cccccc;
}
.memBox p span{
	width:35%;
	display:block;
	padding:10px 0;
	box-sizing:border-box;
	border-right:1px solid #cccccc;
	float:left;
}
.memBox p span:nth-child(4){
	border:0;
}
.memBox p span:nth-child(2),.memBox p span:nth-child(4){
	width:15%;
}
.memBox p:after{
	content:'';
	display:block;
	clear:both;
}
.memBox p span input{
	 width:40px;
	 }
</style>