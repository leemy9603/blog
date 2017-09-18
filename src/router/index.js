import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Photo from '../components/Photo.vue'
import Article from '../components/Article.vue'
import Profile from '../components/Profile.vue'
import Recycle from '../components/Recycle.vue'
import Pages1 from '../components/pages/pages1.vue'
import Article1 from '../components/pages/atr1.vue'
import Pagecontent from '../components/pages/article/pageContent.vue'
import Login from "../components/login.vue"
import Zhuce from "../components/zhuce.vue"
import Photolist from "../components/photoList.vue"
import Manage from "../components/manage.vue"
Vue.use(VueRouter)
 /**const User = {
  template: `
    <div class="user">
      <router-view></router-view>
    </div>
  `
}**/
export default new VueRouter({
	routes:[
	{
	path: '/',
    component: Login,
    meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
	},
	{
	path: '/zhuce',
    component: Zhuce
	},
	{
	path: '/manage',
    component: Manage
	},
	{
	 path: '/home',
     component: Home,
     children:[
     	{
     	path: '/home/:id',
     	name:'user',
        component:Pages1
     },{
      path: '/art/:id/:tag',
      name: 'article',
      component: Pagecontent
    }]
	},
	{
	 path: '/photo/:id',
	 name: 'photo',
     component: Photo
	},
	{
	 path:'/article/:id',
	 name:"articleMain",
	 component:Article
	},
	{
      path: '/article/:id/:tag',
      name: 'artmodify',
      component: Article
    },
    {
      path: '/photo/:id/:tag',
      name: 'photoList',
      component:Photolist 
    },
	{
	 path: '/profile/:id',
	 name:"profile",
	 component:Profile
	},{
	 path:'/recycle:id',
	 component:Recycle
	}]
})

