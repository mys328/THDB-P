import Vue from 'vue'
import iView from 'iview'
import App from './App'
import mixins from '@/mixins'
import filters from '@/filters'

import '@/common/css/reset.css'
import '@/common/css/iconfont.css'
import '@/common/common.css'
import '@/common/css/common.less'
Vue.use(iView)
Vue.mixin(mixins)

// 注册全局过滤器
filters(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
