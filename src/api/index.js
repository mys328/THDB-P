import axios from 'axios'
import qs from 'qs'
import {HTTP_DEV, HTTP, DEBUG} from './config'
const HTTPS = DEBUG ? HTTP_DEV : HTTP
axios.defaults.withCredentials = true
const config = {
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}
class XHR {
// 登录
  Login (json) {
    return axios.post(`${HTTPS}login/login`, qs.stringify(json), config)
  }
  // 退出登录
  LoginOut () {
    return axios.get(`${HTTPS}login/login-out`)
  }
  // 注册
  Regs (json) {
    return axios.post(`${HTTPS}login/register`, qs.stringify(json), config)
  }
  // 修改密码
  UpdataPw (json) {
    return axios.post(`${HTTPS}user/update-password`, qs.stringify(json), config)
  }
  // 发送手机验证码
  SendPC (json) {
    return axios.post(`${HTTPS}login/send-phone-code`, qs.stringify(json), config)
  }
  // 注册－验证手机验证码
  VerCode (json) {
    return axios.post(`${HTTPS}login/verify-code`, qs.stringify(json), config)
  }
  // 验证用户名唯一性
  OnlyUser (json) {
    return axios.post(`${HTTPS}login/only-user`, qs.stringify(json), config)
  }
  // 更改手机号
  UpdataTel (json) {
    return axios.post(`${HTTPS}user/update-phone`, qs.stringify(json), config)
  }
  // 更改邮箱
  UpdataEmail (json) {
    return axios.post(`${HTTPS}user/update-email`, qs.stringify(json), config)
  }
  // 首页新增服务咨询
  AddSer (json) {
    return axios.post(`${HTTPS}login/add-service`, qs.stringify(json), config)
  }
  // 验证手机号唯一性
  OnlyPhone (json) {
    return axios.post(`${HTTPS}login/only-phone`, qs.stringify(json), config)
  }
  // 验证邮箱唯一性
  OnlyEmail (json) {
    return axios.post(`${HTTPS}login/only-email`, qs.stringify(json), config)
  }
  // 返回登陆验证码
  VerFcode () {
    return axios.get(`${HTTPS}login/captcha?v=null&refresh=true`)
  }
  // 返回服务配置
  Servi () {
    return axios.get(`${HTTPS}login/service`)
  }
  // 发送手机验证码
  // 发送手机验证码

  isErr (res, self) {
    setTimeout(() => {
    }, 400)
  }
}

// 实例化后再导出
export default new XHR()
