<template>
	<div>
	  	<div class="editor">
	  	  <p class="title">请填写题目：<input type="text" v-model="title"></p>
	  	  <textarea v-model="content"></textarea>
	  	</div>
	<div class="cate">
		<p><span>创建分类</span> <input type="text" v-model="cateName"><input type="button" @click="addCate" value="确定"></p>
		<h5>分类选择：{{selected}}</h5>
	  	<select v-model="selected">
	  	  <option v-for="option in cateItem" v-bind:value="option.name">
	  	  	{{option.name}}
	  	  </option>
	  	  </select>
	  	 <p><input type="button" value="取消" @click="cancelArt">&nbsp;
	  	 <input type="button" value="修改" @click="modifyArt" v-if="this.artid">
	  	 <input type="button" value="提交" @click="addArt" v-else>
	  	 </p>
	</div>
	</div>
</template>
<script>
 import {mapMutations, mapState,mapActions} from 'vuex'
	export default {
     name: 'Article',
     data () {
     	return {
     		title: null,
     		content: null,
     		article: [],
     		selected:null,
        artid:'',//将被修改的art的id
     		cate:null,
     		artItem:[],//存储从数据库获取的所有文章
     		art:{},//将要修改的artice对象
        routerArt: '',//url中文章的id
     		cateName:null,
     		cateItem: [] // 暂时存储获得分类数组
     	}
     },
      methods: {
     ...mapActions([
      'setCategory','setNickname','setRouterid' // 映射为 this.$store.dispatch('setCategory')
    ]),
    getTime () {
    	var date = new Date();
    	var year = date.getFullYear();
    	var month= date.getMonth()+1;
    	var day = date.getDate();
    	var hour = date.getHours();
    	var min = date.getMinutes();
    	var second = date.getSeconds();
    	if(hour < 10){
    		hour = "0" + hour;
    	}
    	if(month < 10){month = "0" + month}
    	if(min<10){min = '0' +min}
    	if(second){second ="0" + second}
    	var time = year + '-' + month + '-' + day  + " "+ hour + ':' + min;
   
    	return time;
    },
    addCate () {
     var name = this.cateName;
     var len = this.cateItem.length;//cateItem数组的长度
     var flag = true;//判断要插入的类别是否已经存在,true表示不存在
     //将要插入的额类别，在数据库中是否存在，若index==-1，则不存在，可以插入，否则不能插入
     this.cateItem.forEach(function(val){
     	if(val.name ===  name){
     		flag = false;
     	}
     });
     if(flag){
      var id = parseInt(this.cateItem[len-1].id)+1;//获取最后一个数组id并加1
       this.cateItem.push({'id': id,'name':name});
     	this.$http.post('/blog/category/addCate',{'name':name},{}).then(response =>{
      });
      this.name = '';
     }else{
     	alert('该类别已经存在！');
     	this.name="";
     }
    },
    modifyArt () {
    	var artid = this.artid;
    	var content = this.content;
    	var title = this.title;
   		 this.$http.post('/blog/article/updateArt',{'artid':artid,'art_content':content,'art_title':title},{}).then(response =>{
	  	alert('成功更改数据库！');
	 });
    },
    addArt () {
    	var title = this.title;
    	var content = this.content;
    	var flag = title.length > 0 && content.length > 0;
    	if(flag){
    		if(this.selected){
    			this.$http.post('/blog/article/addArt',{'art_title':title,'art_reads':0,'cre_time':this.getTime(),'art_content':content,'uid':this.routerid,'cate_name':this.selected},{}).then(response =>{
	  				alert('成功插入数据库！');
	     	 	});
    			alert('提交成功!');
    			var _this = this;
    			this.cateItem.forEach(function(val){
    				if(val.name === _this.selected){
    					val.num +=1;
    					_this.$http.post('/blog/category/updateCate',{'cate_name':val.name,'num':val.num},{}).then(response =>{
	  				alert('成功更改数据库！');
	     	 	});
    				}
    			})
    			this.title = '';
    			this.content = '';
    			this.selected = '';
    		}else{
    			alert('请选择文章的类别!')
    		}
    	
    	}else{
    		alert('请查看你的题目或者内容是否填写!');
    	}
    },
    cancelArt () {
    	this.title = '';
    	this.content = '';
    },
    changeRouter (){//当点击导航中的文章按钮，页面在aticle.vue组件，但路由改变时
      var hashItem = window.location.hash.split('/');
      if(hashItem.length < 4){
         this.content  = '';//让页面中的art的内容清空
        this.title = '';//让页面中的art的题目清空
        this.$http.post('/blog/category/selectCate',{},{}).then(response =>{
         this.cateItem = response.body;//将从数组取得的类别数组赋给cateItem
        });
      }
    }
    },
     computed: {
      ...mapState([
        'cateItems','routerid'
      ])
      },
      watch: {
      '$route': 'changeRouter',//当路由变化时，执行该函数
	    cateItem: function(newItem){
	     this.setCategory(newItem);//如果存在类别，则将数据赋给state中的cateItems，实现数据在组件间的共享
      }
      },
      mounted () {
      	this.getTime();
        var hashItem = window.location.hash.split('/');
      	this.setRouterid(parseInt(hashItem[2]));
      	var _this = this;
      	if(hashItem.length > 3){
          this.artid = parseInt(hashItem[3]);
      	this.$http.post('/blog/article/selectArt',{},{}).then(response =>{
	     	this.artItem = response.body;//将从数组取得的类别数组赋给cateItem
	     	 this.artItem.forEach(function(val){
	      if(val.artid === parseInt(hashItem[3])){
	      	_this.art = val;
	      	_this.content = val.art_content;
	      	_this.title = val.art_title;
	      	}
	      })
	      });
      }else{
      this.$http.post('/blog/category/selectCate',{},{}).then(response =>{
	     	this.cateItem = response.body;//将从数组取得的类别数组赋给cateItem
	      });
      } 
      }
       }
</script>
<style>
body{
	color:black;
}
.title{
	height:40px;
	line-height:40px;
	text-align:center;
	margin:10px auto;
}
.editor textarea{
	height:600px;
	width:600px;
	display:block;
	margin:10px auto;
}
.cate{
	width:50%;
	margin:5px auto;
}
.cate h5{
	float:left;
}
.cate select{
	margin:0 10px;
	display:inline-block;
}
</style>
