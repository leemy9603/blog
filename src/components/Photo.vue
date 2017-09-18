<template>
<div>
     <div class="fileBox">
        <div class="creFile" @click="creFile"></div>
        <h5 style='text-align:center;height:30px;line-height:30px;'>创建相册</h5>
        <!--遮罩-->
        <div id="shadeBox" class="shadeBox" style="display:none;" @click="close"></div>
        <!--相册描述-->
            <div class="desBox" id="desBox" style="display:none;">
                <div class="closeIcon" @click="close"></div>
                 <h6>相册名称：<input class="pcate_name" v-model="pcate_name"/></h6>
                 <h6>相册描述：</h6>
                  <textarea style="display:block;min-width:250px;min-height:140px;margin-left:20px;max-width:270px;max-height:160px;" v-model="describe"></textarea>
                  <p style="text-align:center; padding-top:10px;"><input type="button" @click="cancel" value="取消">&nbsp;&nbsp;<input type="button" value="提交" @click="addPcate"></p>
            </div>
        </div>
        <div class="photoBox" v-for="(pcate,index) in pcateItem">
          <div class="photoList" @click="photoShow(pcate.id)"></div>
          <p style="text-align:center;height:30px;line-height:30px;">{{pcate.pcate_name}}</p>
          <input style="position:absolute;top:0;right:0;display:block; width:40px;height:25px;background-color:#cccccc;" type="button" value="删除" @click="delPcate(pcate.id,index,pcate.pcate_name)">
        </div>
    </div>
</template>
<script>
import {mapMutations, mapState,mapActions} from 'vuex'
  export default {
    name: "Photo", 
   data () {
  return {
    msg:'hell',
    img:null,
    describe: null,//新建照片文件的描述
    pcate_name:null,//新建文件的名字
  }
  },
  methods:{
      ...mapMutations([
      'setImages','setPcateItem','delImages','delPcateItem','addPcateItem','setRouterid'
      ]),
    cancel () {
      this.describe = '';
      this.pcate_name = '';
      this.close();
    },
    delPcate (id,index,pcate) {
       this.delPcateItem(index);
      this.$http.post('/blog/photocate/rempcate', {'id':id},{}).then(response =>{
        alert('成功删除该文件！');
        });
      var pcate = pcate;//获得删除的分类名称
      var _this = this;//保存对当前对象的引用
      this.images.forEach(function(val,i){
        if(val.photo_cate === pcate){
          _this.$http.post('/blog/photo/remphoto', {'pid':val.pid},{}).then(response =>{
          alert('删除成功');
          _this.delImages(i);//将共享数据images中属于该分类的图片一起删除
      });
        }
      }) 
    },
    addPcate () {
      var describe = this.describe;//图片分类的描述
      var pcate_name = this.pcate_name;//图片分类的题目
      var len = this.pcateItem.length;//全部图片分类的长度
      //将图片分类push进pcateItem,数据共享，也方便存取
      this.addPcateItem({'pcate_name':pcate_name,'num':0,'pdescribe':describe,'uid':this.routerid,'pid':len});
      //请求数据库插入图片分类
      this.$http.post('/blog/photocate/addpcate', {'pcate_name':pcate_name,'num':0,'pdescribe':describe,'uid':this.routerid},{}).then(response =>{
        alert('成功插入数据库！');
        }); 
        this.describe = '';//图片分类描述清空
        this.pcate_name = ''; //图片分类题目清空
        this.close();       
    },
    sender (){   
        //请求数据库返回所有图片信息
      this.$http.post('/blog/photo/selphoto', {},{}).then(response =>{
            this.setImages(response.body);
          }); 

      //请求数据库返回所有图片分类信息
      this.$http.post('/blog/photocate/selpcate', {'uid':this.routerid},{}).then(response =>{
        this.setPcateItem(response.body);//共享相册分类
        this.pcateItem = response.body;
        });            
  },
  creFile () {
      this.shadeBox.style.display = 'block';//遮罩显示
      this.desBox.style.display = 'block';//图片描述框显示
      },
  close (){
      this.shadeBox.style.display = 'none';//遮罩隐藏
      this.desBox.style.display = 'none';//图片描述框隐藏
      },
    photoShow (pcateId) {//pcateId代表图片的分类
     this.$router.push({name: "photoList", params: {id:this.routerid, tag: pcateId}});//进入该路由指定的页面
    }
  },  
  computed: {
  ...mapState([
        'pcateItem','images','routerid'
      ]),
    shadeBox () {
      return document.getElementById('shadeBox');
    },
    desBox () {
      return document.getElementById('desBox');
    }
  },
  mounted () {
    this.sender();
    var hash = window.location.hash.split('/');
    this.setRouterid(parseInt(hash[2]));
  }
  }
</script>
<style scoped>
.creFile{
 width:150px;
 height:150px;
 box-sizing:border-box;
 border:1px solid #cccccc;
 float:left;
 background:url('../assets/images/icon1.png') left top; 
 background-size:100%;
}
.fileBox,.photoBox{
  float:left;
  width:150px;
  height:auto;
}
.photoBox{
  margin-left:20px;
  position:relative;
}
.shadeBox{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  z-index:99;
  background:rgba(0,0,0,0.5);
}
.pcate_name{
  display: inline-block;
  width:60%;
  height:35px;
}
.photoList{
  width:150px;
  height:150px;
  background:url('../assets/images/photo_bg.jpg') left top; 
  background-size:100%;
}
.shadeBox h6{
  padding-bottom:20px;
}
.desBox{
  width:350px;
  height:350px;
  z-index:99;
  padding:20px;
  box-sizing:border-box;
  border:1px solid yellow;
  background-color:white;
  margin:auto;
  position:absolute;
  top: 0; 
  left: 0; 
  bottom: 0; 
  right: 0; 
}
.closeIcon{
  width:50px;
  height:50px;
  position:absolute;
  top:-25px;
  right:-25px;
  background:url('../assets/images/round_close.png') left top;
  background-size:100%;
}
</style>
