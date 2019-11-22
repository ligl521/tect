import Vue from 'vue'
import Router from 'vue-router'
import booksh from '@/components/sealSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'booksh',
      component: booksh
    }
  ]
})
