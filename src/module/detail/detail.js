import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from '@/router'
import store from '@/vuex'
import mixins from '@/mixins'
import components from '@/components/home'

import '@/common/css/reset.css'
import '@/common/css/iconfont.css'
import '@/common/common.css'
import '@/common/css/common.less'
Vue.use(iView)
Vue.mixin(mixins)

Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`v${name}`, components[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
