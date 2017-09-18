<template>
	<h2>jjkkkkk</h2>
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
    		cateArt:[],//以文章的类别进行归类
    		presign:'',
    		nickname:'',
    		cateNum:{}//该用户每种分类的文章数量
    	}
    },
    methods: {
     ...mapActions([
      'setCategory','setNickname','setArtItems','setIamges','setRouterid','setMemObj','setArtItem','delArtItem'// 映射为 this.$store.dispatch('setCategory ')
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
    artClass (date,val) {//cateArt以文章的类别进行归类
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
    		var flag = false;//判断dateArt是否已经存在日期为date的对象,默认为不存在
    		if(_this.cateArt.length >0){//判断dateArt是否存在值
    		_this.cateArt.forEach(function(val2){//循环遍历dateArt中的对象，
    			if(val2.cateName === cate){
    				flag=true;
    				classobj = val2;
    				}
    		});
    		if(flag){
    				classobj[cate] +=1;
    				classobj.artinfoItem.push({'art_title':val.art_title,'cre_time':date,'artid':val.artid});
    			}else{
    				var classObj = _this.artDate(date,val);//[文章分类],每种分类的全部信息
    				_this.cateArt.push(classObj);
    			}
    		}else{
    		var cateObj = _this.artClass(date,val);//[文章分类],每种分类的全部信息
    				_this.cateArt.push(cateObj);
    		}
    		var cateObj =  _this.artClass(date,val);//[文章分类],每种分类的全部信息
    		_this.cateArt.push(cateObj);
    },
    artDate (date,val){//返回{日期:数量,artinfoItem:[此处存放文章],name:日期}，存放每种日期对象所有信息
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
    		_this.artClassItem(val,date,val.cate);
    	});
    	this.cateItems.forEach(function(val4){
    		var flag = false;//判断cateArt中是否有val4.cate_name类别的文章
    		_this.cateArt.forEach(function(val5){
    			if(val5.cate_name === val4.name){
    				console.log(flag)
    				flag = true;
    			}
    		});
    		if(!flag){//如果该类别的文章数量为0
    			var obj = {cateName:'',artinfoItem:[]};
    			obj[val4.cate_name] = 0;
    			obj.cateName = val4.name;
    			//console.log(obj.cateName)
    			_this.cateArt.push(obj);
    		}
    	})
    }
    },
    computed: {
      ...mapState([
        'cateItems','pages','pagesItem','artItmes','memObj','memItems','images','routerid','artItem'
      ])
    },
    created () {
    	var len = this.cateItems.length;
    	 if(len <= 0){
			this.$http.post('/blog/category/selectCate',{},{}).then(response =>{
				this.setCategory(response.body);
     	});
     }
     this.$http.post('/blog/article/selArtByUid',{'uid':this.routerid},{}).then(response =>{
	     	this.setArtItem(response.body);//将从数组取得的类别数组赋给cateItem
	     	this.artSettle(this.artItem);
	      });
    },
    watch: {
    	memObj (newObj) {
    		this.presign = newObj[0].presign;
       		this.nickname = newObj[0].nickname;
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
    	}else{
    		//this.presign = this.memObj.presign;
    		this.nickname = this.memObj.nickname;
    	}
    	}
    	
    	//console.log(this.$router.options.routes[2].children.length);
    	//this.$router.options.routes[2].children.//push({component:Pagecontent,path:'/home/art/1'})
    	//console.log(this.$router.options.routes[2].children.length);
    } 
 }

</script>




