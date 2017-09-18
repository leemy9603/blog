<template>
  <div id="blog">
    <Common></Common>
    <div class="main">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Common from "./components/common.vue"
import Home from "./components/Home.vue"
import Login from "./components/login.vue"
import Photo from "./components/Photo.vue"
import Zhuce from "./components/zhuce.vue"
import Article from "./components/Article.vue"
export default {
  name: "blog",
  components: {Common}
}
</script>
<style>
.main{
	background: url('./assets/images/bg03.jpg');
}
</style>
