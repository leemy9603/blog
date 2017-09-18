<template>
	<div class="sideBox">
	 <div class="head-photo">
	   <img src="../assets/images/head-photo.jpg">
	 </div>
	 <p><span>昵称：</span>{{nickName}}</p>
	 <p><span>个性签名：</span>{{personal}}</p>
	 <div class="article-role">
	 	<p>文章分类</p>
	 	<ul>
	 		<li v-for="item in artItems" ref="li">
	 			{{item.name}} <span class="atr-num">[{{item.num}}]</span>
	 		</li>
	 	</ul>
	 </div>
	 <div class="article-date">
	 	<p>文章归档</p>
	 	<ul class="art-date">
		 		<li v-for="atr in artDate" ref="li">
		 			  {{atr.name}} <span class="art-num">{{atr.num}}</span>
		 		</li>
	 	</ul>
	 </div>
  </div>
</template>
<script>
	export default{
	  name: 'sidebox'
	}
</script>