<template>
	 <div class="header">
	 	<div class="header-logo">
	 		<div class='drawCircle'>
				<canvas ref="canvas" id='can' height='100px' width='100px'></canvas>
			</div>
	 	</div>
	 	<ul  class="header-nav">
	 		<li ref="li"  @click="toHome">
	 			主页
	 		</li>
	 		<li ref="li" @click="toArticle">文章</li>
	 		<li ref="li" @click="toPhoto">相册</li>
	 		<li ref="li" @click="toProfile">个人档</li>
	 	</ul>
	 </div> 
</template>
<script>
import {mapMutations, mapState,mapActions} from 'vuex'
export default{
	name: "Common",
	methods:{
    	...mapMutations([
     		 'setRouterid','setMemObj'
     		 ]),
	  drawBackground:function (ctx,r) {
		ctx.save();
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.arc(0,0,r - 2.5, 0,2*Math.PI,false);
		ctx.stroke();
		var clockNumber = [3,4,5,6,7,8,9,10,11,12,1,2];
		ctx.font = '8px 微软雅黑';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		clockNumber.forEach(function(number,index){
		var rad = 2*Math.PI/12 * index;
		var x = Math.cos(rad) * (r - 9);
		var y = Math.sin(rad) * (r - 9);
		ctx.fillText(number,x,y);
		})
		for(var i = 0;i<60;i++){
			var rad = 2*Math.PI / 60 * i;
			var x = Math.cos(rad) * (r-18);
			var y = Math.sin(rad) * (r-18);
			ctx.beginPath();
			if(i%5 === 0){
				ctx.fillStyle = 'yellow';
				ctx.arc(x, y,1.2,0,2*Math.PI,false);
			}else{
				ctx.fillStyle = '#000000';
				ctx.arc(x, y,1.2,0,2*Math.PI,false);
			}
			ctx.fill();
		}
		ctx.restore();
		},
	drawHour: function (ctx,hour,r){
		ctx.save();//保存当前的状态
		ctx.translate(r,r);
		ctx.beginPath();
		var rad = 2 * Math.PI/12 * hour;
		ctx.rotate(rad);
		ctx.moveTo(0,5);
		ctx.lineWidth = 3.5;
		ctx.lineCap = 'round';
		ctx.lineTo(0,-r/3.5);
		ctx.stroke();
		ctx.restore();//返回之前保存过路径状态和属性
	},
	drawMin: function (ctx,r,min){
		ctx.save();//保存当前的状态
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		// ctx.fillStyle = '#f0f0f0';
		var rad = 2 * Math.PI/60 * min;
		ctx.rotate(rad);
		ctx.moveTo(0,6);
		ctx.lineWidth = 2.5;  
		ctx.lineCap = 'round';
		ctx.lineTo(0,-r + 31);
		// ctx.fill();
		ctx.stroke();
		ctx.restore();//返回之前保存过路径状态和属性
		},
	 drawSecond: function (ctx,r,second){
		ctx.save();//保存当前的状态
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.strokeStyle = '#cccccc';
		var rad = 2 * Math.PI/60 * second;
		ctx.rotate(rad);
		ctx.moveTo(0,12);
		ctx.lineWidth = 2;
		ctx.lineTo(0,15);
		ctx.lineTo(2,-r+28);
		ctx.lineTo(-2,-r+28);
		ctx.stroke();
		ctx.restore();//返回之前保存过路径状态和属性
	},
	drawDot: function (ctx,r){
		ctx.save();//保存当前的状态
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.arc(0,0,4,0,2*Math.PI,false);
		ctx.fill();
		ctx.moveTo(0,0);
		ctx.restore();
	},
	draw: function (ctx,width,height,r,fn){
		ctx.clearRect(0,0,width,height);
		var now = new Date();
		var getHour = now.getHours();
		var getMin = now.getMinutes();
		var getSecond = now.getSeconds();
		this.drawBackground(ctx,r);
		this.drawDot(ctx,r);
		this.drawHour(ctx,getHour,r);
		this.drawMin(ctx,r,getMin);
		this.drawSecond(ctx,r,getSecond);
		ctx.restore();
		var _this = this;
	},
	toHome () {
		this.$router.push({name: "user", params: {id: this.routerid}});//进入该路由指定的页面
	},
	toArticle (){
		this.$router.push({name: "articleMain", params: {id: this.routerid}});//进入该路由指定的页面
	},
	toProfile (){
		this.$router.push({name: "profile", params: {id: this.routerid}});//进入该路由指定的页面
	},
	toPhoto (){
		this.$router.push({name: "photo", params: {id: this.routerid}});//进入该路由指定的页面
	}
	},
	computed: {
 		 ...mapState([
       	 'routerid','memObj'
      	])
      },
	mounted(){
		var hash = parseInt(window.location.hash.split('/')[2]);
		if(hash){
			this.setRouterid(hash);
		}
		   //根据用户id请求数据库返回该用户信息
    		this.$http.post('/blog/member/selMemById', {'uid':this.routerid},{}).then(response =>{
	      	  this.setMemObj(response.body);
	      	  //this.setValue(this.memObj);
	      	}); 
		var can = document.getElementById('can');
		var ctx = can.getContext("2d");
		var width = ctx.canvas.width;
		var height = ctx.canvas.height;
		var r = width/2;
		this.draw(ctx,width,height,r,this.draw);
		var  _this = this;
		setInterval(function(){
			_this.draw(ctx,width,height,r,this.draw);//每隔一秒钟，重新绘制
		},1000);
		}
}
</script>
<style>
*{
	padding:0;
	margin:0;
}
body{
	width:80%;
	margin:0 auto;
	min-width:700px;
}
#can{
	margin:10px;
	}
.header{
	width: 100%;
	height: 160px;
	margin: 0 auto;
	z-index:99;
}
.header-logo{
	width:100%;
	height:120px;
	background-color:#A1D6BC;
	position:relative;
	background: url('../assets/images/bg03.jpg');
}
.header-logo img{
	width:auto;
	height:120px;
	position:absolute;
	top:0;
	right:0px;
}
ul.header-nav{
	list-style:none;
	font-size:0;
	display:block;
	width:100%;
	margin:0 auto;
 }
 .header-nav li{
	display:block;
	float:left;
	width: 25%;
	font-size: 10px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color:white;
	background-color: #0c655c;
	cursor:pointer;
 }
 a{
 	text-decoration:none;
 	color:white;
 }
 .header-nav li,a:visited{
 	color:#A1D6BC;
 }
 .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  padding-left: 10px;
  opacity: 0;
}
</style>