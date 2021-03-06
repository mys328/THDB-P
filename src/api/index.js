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

/*
* 爱分析▪市场研究
*/

  // 热门标签
  Labels () {
    return axios.get(`${HTTPS}business-ppt/label`)
  }
  // 搜索热词
  keyWord () {
    return axios.get(`${HTTPS}business-ppt/show-keyword`)
  }
  // 最热报告
  ShowHot () {
    return axios.get(`${HTTPS}business-ppt/show-hot`)
  }
  // 搜索
  Searchs (json) {
    return axios.post(`${HTTPS}business-ppt/search`, qs.stringify(json), config)
  }
  // 报告详情页
  ShowInfo (json) {
    return axios.get(`${HTTPS}business-ppt/show-info`, {params: json})
  }
  // 生成图片-大屏预览
  PdfPng (json) {
    return axios.get(`${HTTPS}business-ppt/pdf-png`, {params: json})
  }
  // 订单
  OrderAdd (json) {
    return axios.post(`${HTTPS}order/add`, qs.stringify(json), config)
  }

/*
* 定星盘・竞争分析
*/
  // 竞争指标
  ComPete () {
    return axios.get(`${HTTPS}compete/compete`)
  }
  // 粒度参数
  ComCheck () {
    return axios.get(`${HTTPS}compete/check`)
  }
  // 报告列表
  CompList (json) {
    return axios.get(`${HTTPS}compete/index`, {params: json})
  }
 // 删除报告
  CompDel (json) {
    return axios.get(`${HTTPS}compete/delete`, {params: json})
  }
  // 查看图片
  CompImg (json) {
    return axios.get(`${HTTPS}compete/show-image`, {params: json})
  }
  // 竞争力一览
  CompFloat (json) {
    return axios.post(`${HTTPS}compete/compete-list`, qs.stringify(json), config)
  }
  // 搜索报告
  CompSear (json) {
    return axios.post(`${HTTPS}compete/search`, qs.stringify(json), config)
  }
/*
* 敲门砖・网销报告
*/
  // 搜索接口
  repSeh (json) {
    return axios.post(`${HTTPS}new-report/search`, qs.stringify(json), config)
  }

/*
* 金手指，市场洞察
*/
  // 整体市场数据分析
  marKet (json) {
    return axios.post(`${HTTPS}market/index`, qs.stringify(json), config)
  }

/*
* 公共接口
*/
  // 首页轮播图
  getBanner () {
    return axios.get(`${HTTPS}unity/banner`)
  }
  // 大类
  bigType () {
    return axios.get(`${HTTPS}unity/big-type`)
  }
  // 子类
  chiType () {
    return axios.get(`${HTTPS}unity/child-type`)
  }
  // 城市
  getCity (json) {
    return axios.get(`${HTTPS}unity/city`, {params: json})
  }
  // 省份
  getPro (json) {
    return axios.get(`${HTTPS}unity/province`, {params: json})
  }
  // 大区
  getArea () {
    return axios.get(`${HTTPS}unity/area`)
  }
  // 品牌
  getBrand (json) {
    return axios.get(`${HTTPS}unity/brand`, {params: json})
  }
  // 车系
  getSeri (json) {
    return axios.get(`${HTTPS}unity/series`, {params: json})
  }
  // 车型
  getMod (json) {
    return axios.get(`${HTTPS}unity/models`, {params: json})
  }

  isErr (res, self) {
    setTimeout(() => {
    }, 400)
  }
}

// 实例化后再导出
export default new XHR()
