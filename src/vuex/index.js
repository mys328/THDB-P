import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,     // 是否是牛人
    isQz: false,     // 是否是圈主
    hotList: false,     // 推荐关注
    titles: ''
  },
  mutations: {
    setTitle (state, b) { state.titles = b },
    isCkAuth (state, v) { state.isLogin = v },
    setQz (state, v) { state.isQz = v },
    setHotList (state, v) { state.hotList = v }
  },
  actions: {
    // SetAther (context, b) {
    //   context.commit('SetAther', b)
    // }
  }
})

export default store
