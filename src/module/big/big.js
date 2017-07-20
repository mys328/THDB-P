import Vue from 'vue'
import iView from 'iview'
import App from './App'
import mixins from '@/mixins'

import '@/common/css/reset.css'
import '@/common/css/iconfont.css'
import '@/common/common.css'
import '@/common/css/common.less'
Vue.use(iView)
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
