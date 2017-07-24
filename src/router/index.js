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
      path: '/home',
      component: resolve => require(['@/components/detail/home.vue'], resolve)
    },
    {
      path: '/imsg',
      component: resolve => require(['@/components/detail/imsg.vue'], resolve)
    },
    {
      path: '/buy',
      component: resolve => require(['@/components/detail/buy.vue'], resolve)
    },
    {
      path: '/know',
      component: resolve => require(['@/components/detail/know.vue'], resolve)
    },
    {
      path: '/star',
      component: resolve => require(['@/components/detail/star.vue'], resolve)
    },
    {
      path: '/addstar',
      component: resolve => require(['@/components/detail/addstar.vue'], resolve)
    },
    {
      path: '/door',
      component: resolve => require(['@/components/detail/door.vue'], resolve)
    },
    {
      path: '/adoor',
      component: resolve => require(['@/components/detail/adoor.vue'], resolve)
    },
    {
      path: '/digit',
      component: resolve => require(['@/components/detail/digit.vue'], resolve)
    },
    {
      path: '/adigit',
      component: resolve => require(['@/components/detail/adigit.vue'], resolve)
    }
  ]
})
