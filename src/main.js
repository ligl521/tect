// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入图标
import  './assets/icon/iconfont.css'
//引入复制文本插件
import VueClipboard from 'vue-clipboard2'
//引入vuex
import './assets/icons/index.js'
import Vuex from 'vuex'
import store from './vuex/store'
//bus
Vue.prototype.bus = new Vue();
//路由
import router from './router'
//axios
import axios from 'axios'
Vue.prototype.$axios = axios
//负载均衡
var flagNum=Math.random()
// if(flagNum>0.5){
// 	Vue.prototype.baseUrl = 'http://192.168.0.159:8080/nsi-1.0'
// }else{
  // Vue.prototype.baseUrl = 'http://192.168.0.34:8080/nsi-1.0'
  // Vue.prototype.baseUrl = 'https://data.xinxueshuo.cn/nsi-1.0'
//}

//新的请求接口 岩哥 本地测试环境
  // axios.defaults.baseURL = 'http://192.168.0.18:8080/nsi-1.0'
  // Vue.prototype.baseUrl = 'http://192.168.0.18:8080/nsi-1.0'
// 振哥 本地测试环境
// axios.defaults.baseURL = 'http://192.168.0.44:8080/nsi-1.0'
//旧的请求接口  生产环境
   Vue.prototype.baseUrl = 'https://data.xinxueshuo.cn/nsi-1.0'

//新的请求接口  生产环境
  axios.defaults.baseURL = "https://data.xinxueshuo.cn/nsi-1.0"


Vue.config.productionTip = false
if(!localStorage["userName"]){
	router.push({path:'/login'});
}
Vue.use(Vuex)
Vue.use(VueClipboard)
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
