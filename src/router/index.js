import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/home'
import tect from '@/pages/home/tect'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home,
    },{
      path: '/tect',
      name: 'tect',
      component: tect,
    }
  ]
})
