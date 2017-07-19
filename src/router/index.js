import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/components/detail/home.vue'], resolve)
    },
    {
      path: '/imsg',
      component: resolve => require(['@/components/detail/imsg.vue'], resolve)
    }
  ]
})
