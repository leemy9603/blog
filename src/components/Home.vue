<template>
<div class="home">
  <div class="sideBox">
	   <div class="imgBox"><img v-on:load="clipPhoto" :src=photoImage style="position:absolute;"></div>
	 <!-- {{memObj.nickName}} -->
	 <p class="PFloat" style="border-bottom:1px dashed #cccccc;padding:10px 5px;"><span>昵称：</span>{{nickname}}</p>
	 <p class="PFloat" style="border-bottom:1px dashed #cccccc;padding:10px 5px;"><span>个性签名：</span>{{presign}}</p>
	 <div class="article-role">
	 	<p style="border-bottom:1px dashed #cccccc;padding:10px 5px;padding-top:20px;background-color:rgb(10, 49, 45); ">文章分类</p>
	 	<ul class="art-role" id="art-role">
	 		<li v-for="(cate,index) in cateArt">
	 		<p @click="artState(index,'art-role')"><span>{{cate.cateName}}</span><span class='art-num'>[{{cate[cate.cateName]}}]</span></p>
		 			<ul style="background-color:#666666;display:none" class="artList">	
			 			<li v-for="(a,i) in cate.artinfoItem" @click="choose(i,a.artid)">
			 				{{a.art_title}}<span class="art_time">{{a.cre_time}}</span>
			 			</li>
		 		</ul>
	 		</li>
	 	</ul>
	 </div>
	 <div class="article-date">
	 	<p  style="border-bottom:1px dashed #cccccc;padding:10px 5px;padding-top:20px;background-color:rgb(10, 49, 45);; ">文章归档</p>
	 	<ul class="art-date" id="art-date">
		 	<li v-for="(art,index) in dateArt">
		 		<p @click="artState(index,'art-date')"><span>{{art.dateName}}</span><span class='art-num'>[{{art[art.dateName]}}]</span></p>
		 		<ul style="background-color:#666666;display:none" class="artList">
		 			<li v-for="(a,i) in art.artinfoItem" @click="choose(i,a.artid)">
		 				{{a.art_title}}<span class="art_time">{{a.cre_time}}</span>
		 			</li>
		 		</ul>
		 	</li>	
	 	</ul>
	 </div>
  </div>
  <div class="contentBox" id="contentBox">
  	<div class="pageBox">
  		<router-view></router-view>
  	</div>
  </div>
  </div>
</template> 
<script>
 import {mapMutations, mapState,mapActions} from 'vuex'
 import Pagecontent from './pages/article/pageContent.vue'
export default {
    name: 'Home',
    data () {
    	return {
    		k:'pp', 
    		viewBox:null,
    		dateArt:[],//以文章发表日期进行归类,
    		artItem:[],//暂存从数据库中获得的文章信息
    		cateArt:[],//以文章的类别进行归类
    		presign:'',
    		nickname:'',
    		photoImage:''//头像
    	}
    },
    methods: {
     ...mapActions([
      'setCategory','setNickname','setArtItems','setIamges','setRouterid','setMemObj'// 映射为 this.$store.dispatch('setCategory ')
    ]),

    choose(index,artid){
    	 this.$router.push({name: "article", params: {tag: artid}});
    },
    artState (index,tag) {
    	var art_date = document.getElementById(tag);
    	var  artDateChild = art_date.children;
    	var ulChild = artDateChild[index].children[1];
    	var style = ulChild.style.display;
    	if(style === 'none'){
    		ulChild.style.display = 'block';
    		artDateChild[index].style.height = 'auto';

    	}else{
    		ulChild.style.display = 'none';
    	}
    },
    artitems () {
    	this.setCategory()
    	return this.cateItems
    },
    artClass (date,val) {
    	//cateName是类别的名字，方便访问'类别：数量'键值对
    	var name = val.cate_name;//分类名称
    	//cateName是日期的名字，方便访问'日期：数量'键值对
            var artObj = {artinfoItem:[],cateName:''};//artInforItem满足同年同月发表的文章存放在一起
                artObj.cateName = name;
                artObj[name] = 1;//文章归档的日期对应的文章数量默认为1
                artObj.artinfoItem.push({'art_title':val.art_title,'cre_time':val.cre_time.split(' ')[0],'artid':val.artid})
            return artObj;
    },
    artClassItem (val,date,cate){//将日期对象所有信息push进dateArt
            var classobj = {};
            var _this = this;//保存对当前对象的引用
            var flag = false;//判断cateArt是否已经存在分类为cate的对象,默认为不存在
            if(_this.cateArt.length >0){//判断dateArt是否存在值
            _this.cateArt.forEach(function(val2){//循环遍历dateArt中的对象，
                if(val2.cateName === cate){
                    flag=true;
                    classobj = val2;
                    }
            });
            if(flag){
                    classobj[cate] +=1;
                    classobj.artinfoItem.push({'art_title':val.art_title,'cre_time':val.cre_time.split(' ')[0],'artid':val.artid});
                }else{
                    var classObj = _this.artClass(date,val);//[文章分类],每种分类的全部信息
                    _this.cateArt.push(classObj);
                }
            }else{
            var cateObj = _this.artClass(date,val);//[文章分类],每种分类的全部信息
                    _this.cateArt.push(cateObj);
            }

    },
    artDate (date,val){
   		 var name = date;//分类名称
    	//dateName是日期的名字，方便访问'日期：数量'键值对
    		var artObj = {artinfoItem:[],dateName:''};//artInforItem满足同年同月发表的文章存放在一起
    			artObj.dateName = name;
    			artObj[name] = 1;//文章归档的日期对应的文章数量默认为1
    			artObj.artinfoItem.push({'art_title':val.art_title,'cre_time':val.cre_time.split(' ')[0],'artid':val.artid})
    		return artObj
    },
     artDateItem (val,date){//将日期对象所有信息push进dateArt
          var datobj = {};
          var _this = this;//保存对当前对象的引用
            var flag = false;//判断dateArt是否已经存在日期为date的对象,默认为不存在
            if(_this.dateArt.length >0){//判断dateArt是否存在值
            _this.dateArt.forEach(function(val2){//循环遍历dateArt中的对象，
                if(val2.dateName === date){
                    flag=true;
                    datobj = val2;
                    }
            });
            if(flag){
                    datobj[date] +=1;
                    datobj.artinfoItem.push({'art_title':val.art_title,'cre_time':val.cre_time.split(' ')[0],'artid':val.artid});
                }else{
                    var dateObj = _this.artDate(date,val);//[文章归档],每种日期的全部信息
                    _this.dateArt.push(dateObj);
                }
            }else{
            var dateObj = _this.artDate(date,val);//[文章归档],每种日期的全部信息
                    _this.dateArt.push(dateObj);
            }
    },
    artSettle (obj) {
   	 //dateArt以文章发表日期进行归类，将对象插入,dateArt =[{日期:数量,artinfoItem:[此处存放文章],name:日期}]
   	 //dateArt插入的对象以日期：数量为键值对，例如2017年3月：20,说明该类别的文章数量
   	 //dateArt.artinfoItem,将满足条件的文章的基本信息存储在artinfoItem中，方便存取
   	 //cateArt以文章的类别进行归类，将对象插入
   	 	var _this = this;//保存对当前对象的引用
        obj.forEach(function(val){
            var a = val.cre_time.split('-');
            var date = a[0]+'年'+a[1]+'月';//xxxx年xx月
            _this.artDateItem(val,date);//[文章归档]
            _this.artClassItem(val,date,val.cate_name);
        });
        this.cateItems.forEach(function(val4){
            var flag = false;//判断cateArt中是否有val4.cate_name类别的文章
            _this.cateArt.forEach(function(val5){
                if(val5.cateName === val4.name){
                    flag = true;
                    console.log(flag)
                }
            });
            if(!flag){//如果该类别的文章数量为0
                var obj = {cateName:'',artinfoItem:[]};
                obj[val4.cate_name] = 0;
                obj.cateName = val4.name;
                 //console.log(obj.cateName)
                _this.cateArt.push(obj);
            }
        });
    },
      clipPhoto (e) {//对图片进行处理
	    var e = e||window.event;
	    var img = e.target;//当前加载的图片
    	var imgw = img.naturalWidth;//图片的长度
    	var imgh = img.naturalHeight;//图片的宽度
    	var w = imgw - 150;//图片与imgBox长度相差
    	var h = imgh - 150;//图片与imgBox宽度相差
    	img.style.width = imgw + 'px';
    	img.style.height = imgh + 'px';
    	img.style.left = -w/2 + 'px';
    	img.style.top = -h/2 + 'px';
    }
    },
    computed: {
      ...mapState([
        'cateItems','pages','pagesItem','artItmes','memObj','memItems','images','routerid'
      ])
    },
    created () {
        var hash = parseInt(window.location.hash.split('/')[2]);
        if(hash){
            this.setRouterid(hash);
        }
    	var len = this.cateItems.length;
    	 if(len <= 0){
			this.$http.post('/blog/category/selectCate',{},{}).then(response =>{
				this.setCategory(response.body);
     	});
     }
     console.log(this.routerid)
     this.$http.post('/blog/article/selArtByUid',{'uid':this.routerid},{}).then(response =>{
	     	this.artItem = response.body;//将从数组取得的类别数组赋给artItem
            this.setArtItems(this.artItem);   
	     	this.artSettle(this.artItem);
	      });
    },
    watch: {
    	memObj (newObj) {
    		this.presign = newObj[0].presign;
       		this.nickname = newObj[0].nickname;
       		this.photoImage = newObj[0].url;
    	}
    },
    mounted() {
    	this.viewBox = document.getElementById('viewBox');
    	this.setRouterid(parseInt(window.location.hash.split('/')[2]));
    	this.$router.push({name: "user", params: {id: this.routerid}});//进入该路由指定的页面
    	//memObj是共享数据，当通过用户id获取该用户是数组中的一个对象
    	if(this.memObj){//如果memObj有值
    		if(this.memObj instanceof Array){
    		this.presign = this.memObj[0].presign;
    		this.nickname = this.memObj[0].nickname;
    		this.photoImage = this.memObj[0].url;
    	}else{
    		//this.presign = this.memObj.presign;
    		this.presign = this.memObj.presign;
    		this.nickname = this.memObj.nickname;
    		this.photoImage = this.memObj.url;
    	}
    	}
    	
    	//console.log(this.$router.options.routes[2].children.length);
    	//this.$router.options.routes[2].children.//push({component:Pagecontent,path:'/home/art/1'})
    	//console.log(this.$router.options.routes[2].children.length);
    } 
 }

</script>
<style>
body .home{
	 color:#2b3c06;
}
.imgBox{
  	height:150px;
  	width:150px;
  	box-sizing:border-box;
  	border:1px solid #cccccc;
  	position:relative;
    overflow:hidden;
    margin: 5px auto;
  }
.sideBox{
	width:25%;
	float:left;
}
.sideBox p{
    background:#edb88c;
}
.contentBox{
	width:74.8%;
	float:left;
}
.home:after{
	display:block;
	content:"";
	clear:both;
}
.head-photo{
	width:120px;
	height:120px;
	margin:0 auto;
	margin-top:50px;
}
.head-photo img{
	display:inline-block;
	width:100%;
	height:100%;
}
.sideBox .pFloat{
	width:100%;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	height:25px;
	font-size:10px;
	line-height:25px;
	text-indent:15px;
	border-bottom:1px dashed  #2b3c06;
}
.pageDet{
	width:99%;
	height:30px;
	min-width:300px;
	line-height:30px;
	padding-right:1%;
}
.pageDet p{
	width:12%;
	min-width:50px;
	height:30px;
	line-height:30px;
	float:right;
	min-width:135px;
	font-size:10px;
	text-align:right;
}
.pageDet p:nth-child(1){
	width:18%;
}
.pageDet p span{
	color:red;
}
.pageDet:after{
	display:block;
	content:'';
	clear:both;
}
ul{
	list-style:none;
	width:100%;
}
.contentBox ul li{
	width:82%;
	padding:15px 3%;
	padding-right:0;
	border-bottom:1px dashed  #2b3c06;
}
.art-date,.art-role{
	width:100%;
	height:auto;
	padding-bottom:10px;	
}
.art-date  li,.art-role li{
	width: 100%;
	height:30px;
	text-indent:4px;
	line-height:30px;
	border-bottom:1px dashed #2b3c06;
}
.art-num{
	float:right;
	width:30%;
	border:none;
	line-height:30px;
}
.art_time {
	display:block;
	float:right;
	width:52%;
	height:30px;
	line-height:30px;
}
.artList:hover{
	cursor:pointer;
}
.article-role,.article-date{
    color:#ffffff;
}
.article-role ul li,.article-date ul li{
    color:#2b3c06;
}
</style>
