<template>
  <div class="layout"  id="app">
    <Menu mode="horizontal" theme="light" active-name="1">
      <div class="layout-logo">卡车之家大数据</div>
      <div class="layout-navs">
        <Poptip placement="bottom" trigger="hover">
          <div class="logo-box flex-wrap row-flex midCenter">
            <img :src="userInfo.user_img" class="im-logo" />
            <div class="fso icon-dow">我是用户Y</div>
          </div>
          <div slot="title" class="user-tit"></div>
          <div slot="content" class="user-box">
            <h3>账号信息</h3>
            <div>账号：{{userInfo.user_name}}</div>
            <div>权限：{{userInfo.role_name}}</div>
            <h3 class="line">关联账号</h3>
            <div>电话：{{userInfo.user_phone}}<a @click="$store.commit('setFT', true)">修改</a></div>
            <div>邮箱：{{userInfo.user_email}}<a @click="$store.commit('setFE', true)">修改</a></div>
            <div class="us-ft-box flex-wrap row-flex">
              <Button type="ghost" class="gre-bt" @click="$store.commit('setFP', true)">更改密码</Button>
              <Button type="ghost" class="red-bt" @click="$store.dispatch('loginOut')">退出登录</Button>
            </div>
          </div>
        </Poptip>
      </div>
    </Menu>
    <div class="layout-content">
      <Row>
        <i-col span="4" class="leftBox">
          <Menu active-name="1-1" width="auto" theme="light" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper" size="16"></Icon>
                爱分析・市场研究
              </template>
              <Menu-item name="1-1">最新报告</Menu-item>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="stats-bars" size="16"></Icon>
                早知道・流量统计
              </template>
              <Menu-item name="2-1">选项 1</Menu-item>
              <Menu-item name="2-2">选项 2</Menu-item>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-pulse-strong" size="16"></Icon>
                定星盘・竞争分析
              </template>
              <Menu-item name="3-1">选项 1</Menu-item>
              <Menu-item name="3-2">选项 2</Menu-item>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="arrow-graph-up-right" size="16"></Icon>
                敲门砖・网销报告
              </template>
              <Menu-item name="4-1">报告管理</Menu-item>
              <Menu-item name="4-2">新增报告</Menu-item>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="eye" size="16"></Icon>
                金手指・市场洞察
              </template>
              <Menu-item name="5-1">整体数据分析</Menu-item>
              <Menu-item name="5-2">新增报告</Menu-item>
            </Submenu>
          </Menu>
        </i-col>
        <i-col span="20" class="rbox-main">
          <router-view name="default" class="layout-content-main"></router-view>
        </i-col>
      </Row>
    </div>
    <div class="layout-copy">
      Copyright ©2009~2017 www.360che.com All Rights Reserved. 卡车之家 版权所有 社会信用代码：911101056787733227
    </div>
    <v-fpwd></v-fpwd>
    <v-ftel></v-ftel>
    <v-feml></v-feml>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    name: 'app',
    data () {
      return {
        sch: '',
        userInfo: {},
        LAB: []
      }
    },
    created () {
      this.getLabel()
      if (this.getCookie('userId') !== '') {
        this.$store.commit('setLogin', true)
        this.userInfo = JSON.parse(localStorage.getItem('USERINFO'))
      } else {
        location.href = 'index.html'
      }
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      readMsg () {
      },
      LG (v) {
        this.$store.commit('setLogBox', true)
        this.$store.commit('setTP', v)
      },
      getLabel () {
        XHR.Labels().then((res) => {
          if (res.data.status === 0) {
            this.LAB = res.data.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .layout{
    min-width: 1300px;
    width: 100%;
    min-height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-logo{
    min-width: 100px;
    width: auto;
    height: 60px;cursor: pointer;
    font-size: 22px; color: #00479D; 
    float: left;
    position: relative;
    top: 0;
    left: 20px;
  }
  .user-box{padding:0 0 15px;}

  .layout-navs{
    float: right;
    margin-right: 80px;
  }
  .leftBox{min-height: 750px; height: 100%; /*background-color: #fff;*/}
  .layout-content{
    min-height: 750px;
    margin: 15px;
    overflow: hidden;
    /*background: #fff;*/
    border-radius: 4px;
  }
  .ivu-row{min-height: 750px;}
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
</style>
