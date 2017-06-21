import Vue from 'vue'
import iView from 'iview'
import App from './App'
import components from '@/components/home'

import '@/common/css/reset.css'
import '@/common/css/iconfont.css'
import '@/common/common.css'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`v${name}`, components[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
