<template>
	<div>
		<div class="photo" v-for="(img,index) in imgItem">
			<input type="button" value="删除" @click="delPhoto(img.pid,index)" style="dispaly:block;position:absolute;top:0;right:0;width:40px;height:30px;z-index:99;">
			<div class="imgBox"><img v-on:load="clipPhoto" :src=img.photo_content style="position:absolute;" @click="showPhoto(img.photo_content)"></div>
			<p>{{img.photo_title}}</p>
		</div>
		<div class="creBox" >
			<div class="addPhoto"></div>
			<p>上传照片</p>
			<input type="file" @change="addPhoto" multiple style="display:block;position:absolute;top:0;left:0;width:150px;height:150px;opacity:0;">
		</div>
		<!--遮罩-->
		<div class="shadeBox" id="shadeBox" style="display:none;" @click="close"></div>
		<div class="bigPhoto" id="bigPhoto" style="display:none;" @click="close"><img :src=photoSrc @click="close"></div>
		<p v-if="imgItem.length === 0" style="margin:20px; float:left;">当前文件夹为空,你可以进行上传文件操作！</p>
	</div>
</template>
<script>
 import {mapMutations, mapState,mapActions} from 'vuex'
export default {
    name: 'Photolist',
    data () {
     return {
     	imgFile: null,//代表当前的图片文件
     	num:'',//该分类下有几张图片,
     	imgItem:[],//同种分类且属于同一个用户的图片集合
     	photoSrc:'',//放大的图片的src
      pcateId:''//图片类别id
    	}
    },
    methods: {
     ...mapMutations([
      'setImages','setPcateItem','delImages','delPcateItem','addPcateItem','addImages','setRouterid'
      ]),
     getImageItem (imgFile,images) {
     	var _this = this;//保存对当前对象的引用
     	images.forEach(function(val){
     		//将与imgFile分类名称相同的图片对象push进imgItem中
     		if(val.photo_cate === imgFile.pcate_name  && val.uid === _this.routerid){
     			_this.imgItem.push(val);
     		}
     	})
     },
     getImgfile (obj,pid) {//获取当前的图片文件，参数obj代表全部的图片分类，
     //将图片分类在数据库中的id=pid那条数据读取出来
     	var _this = this;
     	obj.forEach(function(val){
     		if(val.id === pid){
     			_this.imgFile = val;
     		}
     	})
     },
     addPhoto (e) {//将图片信息插入数据库
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
	        //将添加的图片push进images中
	         _this.addImages({photo_title:_this.imgFile.pcate_name,'uid':this.routerid,'cre_time':_this.getTime(),'photo_cate':_this.imgFile.pcate_name,'photo_content':e.target.result});
	         //将添加的图片push进imgItem
	         _this.imgItem.push({photo_title:_this.imgFile.pcate_name,'uid':this.routerid,'cre_time':_this.getTime(),'photo_cate':_this.imgFile.pcate_name,'photo_content':e.target.result});
	         //请求数据库插入图片
	         _this.$http.post('/blog/photo/addphoto', {photo_title:_this.imgFile.pcate_name,'uid':_this.routerid,'cre_time':_this.getTime(),'photo_cate':_this.imgFile.pcate_name,'photo_content':e.target.result},{}).then(response =>{
	         _this.img = e.target.result;
	      });
        }  
       }else{
       		alert('第' +(i+1) +'张图片太大,，无法上传！');
       }
      }
    },
    getTime (){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var time = year + '-' + month + '-' + day;
      return time;
    },
    delPhoto (pid,index) {
    	this.delImages(index);
    	this.imgItem.splice(index,1);
    	var _this = this;//保存对当前对象的引用
    	this.$http.post('/blog/photo/remphoto', {'pid':pid},{}).then(response =>{
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
    },
    showPhoto (src){
    	this.photoSrc = src;
    	this.bigPhoto.style.display = 'block';
    	this.shadeBox.style.display = 'block';
    },
    close () {
    	this.shadeBox.style.display = 'none';
    	this.bigPhoto.style.display = 'none';
    }
    },
   computed: {
  ...mapState([
        'pcateItem','images','routerid'
      ]),
     shadeBox () {
    	return document.getElementById('shadeBox');
    },
    bigPhoto () {
    	return document.getElementById('bigPhoto');
    }
    },
    mounted () {
     var hash = window.location.hash.split('/');
    	this.setRouterid(parseInt(hash[2])); //url中用户的id
      this.pcateId = parseInt(hash[3]);//url中图片分类的id
    	if(!this.pcateItem.length > 0){//
    		 this.$http.post('/blog/photocate/selpcate', {'uid':this.routerid},{}).then(response =>{
          this.setPcateItem(response.body);
	      	}); 
	      
          this.$http.post('/blog/photo/selphoto', {},{}).then(response =>{
            this.setImages(response.body);
	        this.getImgfile(this.pcateItem,this.pcateId);
	        this.getImageItem(this.imgFile,this.images);
	        });
    	}else{
    		this.getImgfile(this.pcateItem,this.pcateId);
    		this.getImageItem(this.imgFile,this.images);
    	}
    }
  }
  </script>
  <style>
  .creBox{
  	width:150px;
  	height:auto;
  	float:left;
  	margin-left:20px;
  	position:relative;
  }
  .addPhoto{
    width:150px;
    height:150px;
    box-sizing:border-box;
    border:1px solid #cccccc;
    background:url('../assets/images/icon1.png') left top; 
 	background-size:100%;
  }
  .creBox p{
   height:30px;
   line-height:30px;
   line-height:30px;
   text-align:center;
  }
  .photo{
  	float:left;
  	width:150px;
  	height:auto;
  	margin-left:20px;
  	position:relative;
  }
  .photo p{
  	height:30px;
  	line-height:30px;
  	text-align:center;
  }
  .imgBox{
  	height:150px;
  	width:150px;
  	box-sizing:border-box;
  	border:1px solid #cccccc;
  	position:relative;
    overflow:hidden;
  }
  .shadeBox{
  	position:fixed;
  	width:100%;
  	height:100%;
  	z-index:100;
  }
  .bigPhoto{
  width:450px;
  height:450px;
  background:rgb(0,0,0);
  z-index:100;
  margin:auto;
  position:absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0; 
  }
  .bigPhoto img{
  display:block;
  margin:auto;
  position:absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0;
  }
  </style>