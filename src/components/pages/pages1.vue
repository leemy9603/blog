<template>
<div id="viewBox" class="viewBox">
  	<ul>
      <li v-for="item in artItems" @click="goPages(item.artid)">
  				<h6>{{item.art_title}}</h6>
  				<p class='textContent'>{{item.art_content}}</p>
  				<div class="pageDet">
  					<p>{{item.cre_time}}</p>
  					<p><span>阅读 (</span>{{item.art_reads}}<span>) |</span></p>
  				</div>
  		</li>
  	</ul>
 
  	</div>
</template>
<script>
import {mapMutations, mapState,mapActions} from 'vuex'
import Photo from "../photo.vue"
import Home from "../photo.vue"
  export default {
    name: "Pages1",
    data () {
    return{
    		viewBox:null,
         cur:1,//记录当前页序号 ,默认为1
         showTail:true
    	}
    },
 computed: {
      ...mapState([
        'pagesItem','pageId','artItems','routerid'
      ])
      },
      methods:{
      ...mapMutations([
      'setPageId','setArtItems','setRouterid'
      ]),
      goPages: function(id){
      //routerid是共享数据，因为在common.vue组件（头部）已经取值，所以当刷新页面时，routerid不变
        this.$router.push({name: "article", params: {id:this.routerid,tag: id}});
       	this.$store.commit('setPageId',id);
      },
      //minus:function(data){
              //  var $this = this;
              //  data--;
               // $this.cur = data;
                //$this.$set("showTail", true);
               // if(data == 1){
                 //   $this.$set("showPre", false);

                //}else{
                  //  $this.$set("showPre", true);
                //}

                //$this.$am.ajax({
                  //  url:window.$ApiConf.api_order_detail_list,
                    //type:'GET',
                    //data:{start: 1 + $this.limit * (data-1) },
                    //success:function(data){
                      //  console.log(data);
                        //$this.$set("records", data.record.records);
                        //$this.$set("start", data.record.query.start);
                        //$this.$set("total", data.record.query.total);
                        //$this.$set("limit", data.record.query.limit);
                    //}
                //})
                //return data;
            //},
            //plus: function(data){
              //  var $this = this;
                //data++;
                //$this.cur = data;
                //$this.$set("showPre", true);
                //if (data == $this.pageNo)
                //{
                  //  $this.$set("showTail", false);
                //}else
                //{
                  //  $this.$set("showTail", true);
                //}
                //$this.$am.ajax({
                  //  url:/* 这里写上你自己请求数据的路径 */,
                    //type:'GET',
                    //data:{start: 1 + $this.limit * (data-1) },
                    //success:function(data){
                      //  console.log(data);
                        //$this.$set("records", data.record.records);
                        //$this.$set("start", data.record.query.start);
                        //$this.$set("total", data.record.query.total);
                        //$this.$set("limit", data.record.query.limit);
                    //}
                //})
                //return data;
            //},
            //classRenderer:function(index){//当点击页面索引，点击页面获得选中效果 
              //  var $this = this;
                //var cur = $this.cur;
                //if(index != cur){
                  //  return 'crt';
                //}
                //return '';
            //},
            //btnClick:function(data){//实现了点击页面索引，跳转到相应页面 
              //  var $this = this;
                //if(data == 1){
                  //  $this.$set("showPre", false);

                //}else{
                  //  $this.$set("showPre", true);
                //}
                //if (data == $this.pageNo)
                //{
                  //  $this.$set("showTail", false);
                //}else
                //{
                  //  $this.$set("showTail", true);
                //}
                //if (data != $this.cur)
                //{
                  //  $this.cur = data;
                    //$this.$am.ajax({
                      //  url:window.$ApiConf.api_order_detail_list,
                        //type:'GET',
                        //data:{start: 1 + $this.limit * (data-1) },
                        //success:function(data){
                          //  $this.$set("records", data.record.records);
                            //$this.$set("start", data.record.query.start);
                           // $this.$set("total", data.record.query.total);
                            //$this.$set("limit", data.record.query.limit);
                        //}
                    //})
                //}**/
            }
           // computed: {
            //indexs: function(){
              //  var $this = this;
                //var ar = [];
                //if ($this.cur > 3)
                //{
                  //  ar.push($this.cur - 3);
                    //ar.push($this.cur - 2);
                    //ar.push($this.cur - 1);

                //}else
                //{
                  //  for (var i = 1; i < $this.cur; i++)
                    //{
                      //  ar.push(i);
                    //}
                //}
                //if ($this.cur != $this.pageNo)
                //{
                  //  ar.push($this.cur);
                //}

                //if ( $this.cur < ( $this.pageNo - 3 ) )
                //{
                  //  ar.push($this.cur + 1);
                    //ar.push($this.cur + 2);
                    //ar.push($this.cur + 3);
                    //if ( $this.cur < ( $this.pageNo - 4 ) )
                    //{
                      //  $this.$set("showMoreTail", true);
                    //}
                //}else
                //{
                  //  $this.$set("showMoreTail", false);
                    //for (var i = ($this.cur + 1); i < $this.pageNo; i++)
                    //{
                      //  ar.push(i);
                    //}
                //}
                //return ar;
            //}**/
        //}
  }
</script>
<style>
.viewBox ul li{
cursor:pointer;
}
.textContent{
	height:40px;
	line-height:40px;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
</style>