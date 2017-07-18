import Vue from 'vue'
import Vuex from 'vuex'
import XHR from '@/api'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: {},   // 用户信息
    isLogin: false, // 是否登录
    TP: 1,        // 注册or登录
    logBox: false,  // 弹窗-注册登录
    Fser: false,  // 弹窗-服务咨询
    Fpwd: false,  // 弹窗-修改密码
    Ftel: false,  // 弹窗-修改手机号
    Feml: false  // 弹窗-修改邮箱
  },
  mutations: {
    setUserInfo (state, v) { state.userInfo = v },
    setLogin (state, v) { state.isLogin = v },
    setTP (state, v) { state.TP = v },
    setLogBox (state, v) { state.logBox = v },
    setFS (state, v) { state.Fser = v },
    setFP (state, v) { state.Fpwd = v },
    setFT (state, v) { state.Ftel = v },
    setFE (state, v) { state.Feml = v }
  },
  actions: {
    loginOut ({commit}) {
      XHR.LoginOut().then((res) => {
        if (res.data.status === 0) {
          commit('setLogin', false)
          commit('setUserInfo', {})
        } else {
          alert(res.data.msg)
        }
      })
    }
  }
})

export default store
