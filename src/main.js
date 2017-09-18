// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/bootstrap.min.css'
import Vue from 'vue'
import Blog from './Blog'
import router from './router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(VueResource);
Vue.config.productionTip = false
//共享的数据在state中，共享的方法在getter中
//state状态的改变只能通过mutation来提交后才可以完成
//mutation类似于事件注册，需要commit来触发，并且mutation必须是同步出发的
//因此可以通过Action,Action 提交的是 mutation，而不是直接变更状态。
//Action 可以包含任意异步操作。store.dispatch触发action
const store = new Vuex.Store({
	state: {
		cateItems:[],//共享从数据库中获取的文章分类信息
		memItems:[],//共享从数据库中获取的全部的人员信息
		artItems:[],//共享从数据库中获取的全部的文章信息
		artItem:[],//共享从数据库中获取某用户全部的文章信息
		images: [],//共享从数据库中获取的全部图片信息
		pcateItem: [],//共享从数据库中获取的相册分类
		routerid:'',//url
		artObj:null,//当前渲染的文章
		memObj:null,//当前登录的用户
		pages: [
    		{
    		'id':1,
    		'name': '1',
    		'content': "非常得好"
    		},
    		{
    		'id':2,
    		'name': '2',
    		'content': "开心每一天"
    		}
    	],
    	pagesItem:[
    		{
    		'id':1,
    		'title':'kkkk',
    		'content':'不论是自动自发者还是被动的人，都是习惯使然。习惯有如绳索，我们每天纺织一根绳索，最后它粗大得无法折断。习惯的绳索不是带领我们到高峰就是引领我们到低谷，这主得看好习惯或坏习惯了。坏习惯能摆布我们、左右成败，它很容易养成，但却很难伺候。好习惯很难养成，但很容易维持下去。',
    		'read':30,
    		'date':'2017-03-20 20:09',
    		'comment':20
    		},
    		{
    		'id':2,
    		'title':'kkkk',
    		'content':"不论是自动自发者还是被动的人，都是习惯使然。习惯有如绳索，我们每天纺织一根绳索，最后它粗大得无法折断。习惯的绳索不是带领我们到高峰就是引领我们到低谷，这主得看好习惯或坏习惯了。坏习惯能摆布我们、左右成败，它很容易养成，但却很难伺候。好习惯很难养成，但很容易维持下去。",
    		'read':30,
    		'date':'2017-03-20 20:09',
    		'comment':20
    		}
    	],
    	pageId: null
	},
	mutations: {
		setNickname (state,nickname){
			state.nickname = nickname
		},
		setCateItems (state,obj){
			state.cateItems = obj;
	},
	setPcateItem (state,obj){
		state.pcateItem = obj;
	},
	setPageId (state,id){
		state.pageId = id;
	},
	setMemItems (state,obj) {
		state.memItems = obj;
	},
	delMemItems (state,index){
		state.memItems.splice(index,1);
	},
	setArtItems (state,obj) {
		state.artItems = obj;
	},
	setArtItem (state,obj) {
		state.artItem = obj;
	},
	delArtItem (state,index) {
		state.artItem.splice(index,1);
	},
	setImages (state,obj){
		state.images = obj;
	},
	delImages (state,index){
		state.images.splice(index,1);
	},
	delPcateItem (state,index){
		 state.pcateItem.splice(index,1);
	},
	addPcateItem (state,obj){
		state.pcateItem.push(obj);
	},
	addImages (state,obj){
		state.images.push(obj);
	},
	setMemObj (state,obj){
		state.memObj = obj;
	},
	updateMemObj (state,obj){
		var attr = obj.attr;//被更改人员信息的属性
		var value = obj.vaule;//属性的值
		state.memObj[attr] = value;

	},
	setRouterid (state,str){
		state.routerid = parseInt(str);
	},
	setArtObj (state,obj){
		state.artObj = obj;
	}
},
	actions: {
		setNickname ({commit}){
			var nickname = 'jh';
			commit('setNickname',nickname)
		},
		setCategory ({commit},obj){
			commit('setCateItems',obj)
		},
		setPageId ({commit},id){
			commit('setPageId',id)
		},
		setMemItems ({commit},obj){
			commit('setMemItems',obj);
		},
		delMemItems ({commit},memObj){
			commit('delMemItems',index);
		},
		setArtItems ({commit},obj){
			commit('setArtItems',obj);
		},
		setArtItem ({commit},obj) {
		   commit('setArtItem',obj);
		},
		delArtItem ({commit},index) {
			commit('delArtItem',index);
		},
		setImages ({commit},obj){
		 commit('setImages',obj);
		},
		setPcateItem ({commit},obj){
		commit('setPcateItem',obj);
		},
		delImages ({commit},index){
		commit('delImages',index);
		},
		delPcateItem ({commit},index){
		var obj = commit('delPcateItem',index);
		},
		addImages ({commit},obj){
			commit('addImages',obj);
		},
		addPcateItem ({commit},obj){
			commit('addPcateItem',obj);
		},
		setMemObj ({commit},obj){
			commit('setMemObj',obj);
		},
		updateMemObj ({commit},obj){
			commit('updateMemObj',obj);
		},
		setRouterid ({commit},str){
			commit('setRouterid',str);
		},
		setArtObj ({commit},obj){
		  commit('setArtObj',obj);
	}
	}
})

 new Vue({
 	store, 
 	router, 
 	el: '#app'
 })
/* eslint-disable no-new */
new Vue({
  router,
 ...Blog,
 store
}).$mount('#blog');