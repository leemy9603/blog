<template> 
<div class="pageContent">
	<div class="art-header">
		<h1>{{artObj.art_title}}</h1>
		<div class="pageDet">
  					<p>{{artObj.cre_time}}</p>
  					<p><span>阅读 (</span>{{artObj.art_reads}}<span>) |</span></p>
  				</div>
	</div>
	<div class="art-content">
    <span>&nbsp;&nbsp;</span>
    <textarea readonly="readonly">{{artObj.art_content}}</textarea>
    <p @click="modifyAtr(artObj.artid)"><span>修改</span><span>|</span></p>
    <p @click="deleteAtr(artObj.artid,artObj.cate_name)"><span>删除</span><span>|</span></p>
  </div>
	<div class="footer">
		<div class='comment'>
		<p>发表评论：</p>
		<p v-if="type">你回复{{response}}</p>
		<textarea v-model="commentText"></textarea>
		<p><button @click="cancelComment">取消</button><button type="submit" v-on:click="addComment">提交</button></p>
		</div>
		<div class="comment" v-if="comItem.length > 0">
			<ul>
				<li v-for="(com,index) in comItem">
					<p class="comTitle"><span>{{com.name}}</span><span class="comTime">{{com.time}}</span></p>
					<p @click = "commentOther(com.name,index)">{{com.comment}}</p>
					<div v-if="com.reply.length>0">
						<li v-for="reply in com.reply">
							<p class="comTitle">{{reply.name}}<span>&nbsp;回复&nbsp;</span><span>{{reply.response}}</span><span class="comTime">{{reply.time}}</span></p>
							<p @click="commentOther(reply.name,index)">{{reply.comment}}</p>
						</li>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
</template>
<script>
 import {mapMutations, mapState,mapActions} from 'vuex'
 export default {
   data () {
   return {
   name:'pageContent',
   response:null,//被评论人
   commenter: "id1",
   "type":0,//type=0时，用户作为第一发表人来发表评论;type=1,用户回复他人评论
   cateItem:[],
   artid:'',//文章id
   comItem:[
   	{
   	'artid':1,
   	'id':1,
   	'comment': "非常棒",
   	'name':"榴莲次次达",//评论人
   	"time":'2016-10-01 21:02',
   	'reply':[{
   		"name":'倔强的小红军',//评论人
   		"response":"榴莲次次达",//被评论人
   		"comment":"哈哈哈",
   		"time":"2017-04-10 18:02"
   		},
   		{
   		"name": "榴莲次次达",
   		"response":"倔强的小红军",
   		"comment":"继续继续",
   		'time':"2018-09-10 16:10"
   	}],
   	},
   	{
   	"artid":1,
   	"id":2,
   	"name":"倔强的小红军",
   	"comment": "哈哈，好热闹呀",
   	"time":"2016-10-10 13:09",
   	reply:[]
   	}
   ],
   commentText: ""
   }
   },
    methods: {
     ...mapActions([
      'setArtItems','setNickname','getTime' ,'setRouterid','setArtObj'// 映射为 this.$store.dispatch('setArtartObj ')
    ]),
    getMessage () {//获取从数据库和url中的信息
      this.artid = parseInt(window.location.hash.split('/')[3]);//解析url，获取即将渲染的文章的id
      this.a();
    },
     getTime () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var time = null;
      if(month < 10){
        month = "0" + month;
      }
      if(day < 10 ){
        day = '0' + day;
      }
      if(hour < 10){
        hour = '0' + hour;
      }
      if(minute < 10){
       minute = '0' + minute;
      }
      time = year + '-' + month + '-' + day + " " +  hour + ":" + minute;
      return time;
    },
  a () {//获取即将要渲染的文章所有的信息
      var _this = this;
    		this.artItems.forEach(function(item,index){
    			if(item.artid === _this.artid ){
    			 _this.setArtObj(item);		
           console.log(_this.artObj)
    			}
    		})
    	},
    addComment () {//提交评论时触发
    	if(this.type==0){//发表评论
    	  if(this.commenter !== ''){//当前评论内容不为空
    	  	this.comItem.push({
      		'artid':1,
  		   	'id':1,//评论者的id
  		   	'comment':this.commentText,
  		   	'name':this.commenter,
  		   	"time":this.getTime(),
  		   	"response":this.response,
  		   	"reply":[]//存放与本评论者相关的评论
    	})	
    	this.commentText = '';//评论后，清空当前评论内容
    	}
    	  }else if(this.type == 1){//回复他人评论
    	  	if(this.commenter !== ''){
    	  this.comItem[this.index].reply.push({
      	  'artid':1,
  		   	'id':1,
  		   	'comment':this.commentText,
  		   	'name':this.commenter,
  		   	"response":this.response,
  		   	"time":this.getTime()
		     })
    	  	}
    	  	this.commentText = ''
    	  	this.type = 0;
    	  }
    },
    cancelComment () { //取消评论
    	this.commenter = "";
    	this.commentText = '';
    },
    deleteAtr (id,cateName) {
       var _this = this;
    //利用对话框返回的值 （true 或者 false）  
    if(confirm("你确定删除？"))  
    {  
        //如果是true ，那么就弹出一句话  
        alert("现在删除!");
        this.$http.post('/blog/article/removeArt',{'artid':id},{}).then(response =>{
         this.$router.push('/home/index');  
          alert('成功删除该文章！');
        });
        this.cateItem.forEach(function(val){
            if(val.name === cateName){
              val.num = val.num -1;
              _this.$http.post('/blog/category/updateCate',{'cate_name':val.name,'num':val.num},{}).then(response =>{
            alert('成功更改数据库！');
          });
            }
          })
    }    
    },
    modifyAtr (id) {//点击修改文章按钮，触发该函数
      this.$router.push({name: "artmodify", params: {id:this.routerid,tag: id}});
    },
    commentOther  (name,index) {
    	this.type=1;
    	this.index = index;
    	this.response = name;
    }
    }, 
  computed: {
      ...mapState([
        'pagesItem','pageId','routerid','artItems','artObj'
      ])
      },
      created () {
        this.$http.post('/blog/article/selectArt',{},{}).then(response =>{
        this.setArtItems(response.body);//将从数组取得的类别数组赋给cateItem 
        this.getMessage(this.artItem);
        });
        this.$http.post('/blog/category/selectCate',{},{}).then(response =>{
        this.cateItem = response.body;//将从数组取得的类别数组赋给cateItem
        });
      },
      watch: {
      //如果路由有变化，在执行执行该函数
        '$route': 'getMessage'
      }
 }
</script>
<style>
#maskbox{
  display:block;
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  background:rgba(0,0,0,0.5);
}
.art-header{
	height:80px;
	border-bottom:1px dashed rgb(204, 204, 204);
}
.art-content p{
  float:left;
  color:#2b3c06;
}
.art-content{
	padding:0px 10px;
  padding-bottom:40px;
	border-bottom:1px dashed #2b3c06;
	letter-space:1px;
}
.art-content textarea{
  background:#edb88c;
  color:#2b3c06;
  display:block;
  width:85%;
  height:600px;
  margin:0 auto;
}
.comment ul li{
	padding:0;
	padding-left:15px;
	padding-top:15px;
}
.comment  textarea{
  display:block;
  width:90%;
  height:120px;
  font-size:16px;
  padding: 5px;
  box-sizing:border-box;
  -webkit-box-sizingz:border-box;
  -moz-box-sizing:border-box;
  -o-box-sizing:border-box;
  text-indent:14px;
}
.comment p {
	border-bottom:none;
	height:35px;
	line-height:35px;
}
.comment p button{
  display:inline-block;
  height:30px;
  width:50px;
}
.comment{
	padding-bottom:10px;
}
.comTime{
	display:block;
	float:right;
}
.comTitle{
	height:35px;
	line-height:35px;
	background-color:#edb88c;
	text-indent:5px;
}
.art-content p{
  height:40px;
  float:right;
  margin-right:15px;
  line-height:40px;
  cursor:pointer;
  color:#2b3c06;
}
</style>