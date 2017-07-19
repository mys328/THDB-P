<template>
  <div id="app">
    <div class="inx-box-top">
      <div class="inx-top flex-wrap row-flex">
        <div class="inx-top-l flex-wrap row-flex page">
          <div>卡车之家大数据</div>
          <div>首页</div>
          <Poptip placement="bottom" trigger="hover">
            <div>服务</div>
            <div slot="content" class="fw-box">
              <div @click="$store.commit('setFS', true)">市场调研</div>
              <div>用户深度挖掘</div>
              <div>用户行为分析</div>
              <div>舆情监测</div>
              <div>市场预测</div>
              <div>决策支持</div>
            </div>
          </Poptip>
        </div>
        <div class="inx-top-r flex-wrap row-flex midCenter page">

          <Poptip v-if="isLogin" placement="bottom" trigger="hover">
            <div class="logo-box flex-wrap row-flex midCenter">
              <img :src="userInfo.user_img" class="im-logo" />
              <div class="fso icon-dow">我是用户Y</div>
              <i></i>
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
          <div v-if="isLogin">使用说明</div>
          <div>咨询详情</div>
          <div v-if="!isLogin" @click="LG(2)">注册</div>
          <div v-if="!isLogin" class="log-btn" @click="LG(1)">登录</div>
        </div>
      </div>
    </div>

    <v-banner v-if="!isSearch"></v-banner>

    <div class="inx-so">
      <div class="inx-input"> <!-- inx-in-active -->
        <i class="inx-icon fso icon-so" @click="goSearch"></i>
        <input type="text" placeholder="搜索..." v-model="sch" class="inputs">
      </div>
      <div class="hot-txt">
        <span>搜索热词：</span>
        <span v-for="(em, index) in LAB"
        :key="index"
        :class="{'red': index == 0}"
        @click="hotSearch(em.keyword)">{{em.keyword}}</span>
      </div>
    </div>
    <div v-if="isSearch" class="u-mr-box">
      <v-items></v-items>
      <v-rhot @inputData="inputs"></v-rhot>
    </div>
    <v-auto v-if="!isSearch"></v-auto>

    <div class="inx-ft-box">Copyright ©2009~2017 www.360che.com All Rights Reserved. 卡车之家 版权所有 社会信用代码：911101056787733227</div>

    <div class="flt-qq">
      <Poptip placement="left" trigger="hover">
        <div class="rt-blue"><i class="fso icon-phone"></i>联系我们</div>
        <div slot="content" class="lf-qq">
          <div><img src="./images/qq.png" />404828990</div>
          <div class="txt">立即咨询，给您最专业的指导</div>
          <span></span>
        </div>
      </Poptip>
    </div>

    <v-fser></v-fser>
    <v-fpwd></v-fpwd>
    <v-ftel></v-ftel>
    <v-feml></v-feml>
    <v-flog></v-flog>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    name: 'app',
    data () {
      return {
        sch: '',
        isSearch: false,
        userInfo: {},
        LAB: []
      }
    },
    computed: {
      // userInfo () { return this.$store.state.userInfo },
      isLogin () { return this.$store.state.isLogin }
    },
    created () {
      this.getLabel()
      if (this.getCookie('userId') !== '') {
        this.$store.commit('setLogin', true)
        this.userInfo = JSON.parse(localStorage.getItem('USERINFO'))
      }
    },
    watch: {
      isLogin: 'readMsg'
    },
    mounted () {
    },
    methods: {
      readMsg () {
        if (this.isLogin) {
          this.userInfo = JSON.parse(localStorage.getItem('USERINFO'))
        }
      },
      LG (v) {
        this.$store.commit('setLogBox', true)
        this.$store.commit('setTP', v)
      },
      getLabel () {
        XHR.keyWord().then((res) => {
          if (res.data.status === 0) {
            this.LAB = res.data.data
          }
        })
      },
      goSearch () {
        if (this.sch.replace(/^\s*$/g, '') !== '') {
          let json = {}
          json.name = this.sch
          this.isSearch = true
          this.$store.commit('setSHjson', json)
          this.$store.dispatch('searchGo', json)
        } else {
          this.$Message.warning('请输入搜索内容！')
        }
      },
      hotSearch (name) {
        let json = {}
        json.name = name
        this.sch = name
        this.isSearch = true
        this.$store.commit('setSHjson', json)
        this.$store.dispatch('searchGo', json)
      },
      inputs (txt) {
        this.sch = txt
        this.isSearch = true
      }
    }
  }
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: auto;
    background-color: #F5F6FA;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .inx-box-top{width: 100%; height: 60px;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10); background-color: #fff;}
  .inx-top{width: 1300px; height: 60px; margin: 0 auto;}
  .inx-top-l > div{min-width: 40px; height: 60px; font-size: 16px; color: #3A8DFF; line-height: 60px;margin-right: 40px;cursor: pointer;}
  .inx-top-l > div:first-child{font-size: 20px; color: #00479D; }
  .inx-top-l > div:nth-child(2){box-sizing: border-box;border-bottom: 4px solid #3A8DFF; }
  .inx-top-r{ -webkit-justify-content:flex-end;justify-content:flex-end;}
  .inx-top-r > div{min-width: 30px; height: 60px; font-size: 12px; color: #666; line-height: 60px;margin-left: 20px; cursor: pointer;}
  .inx-top-r .log-btn{ width: 80px; height: 40px; border-radius: 20px; background-color: #3A8DFF; color: #fff; text-align: center; line-height: 40px; font-size: 14px;}
  .fw-box,.user-box{position: absolute; width: 120px; height: auto; top: 8px; left: 0;background-color: #fff;}
  .fw-box div{height: 40px; color: #666; font-size: 14px; line-height: 40px; cursor: pointer;text-align: center;}
  .fw-box div:hover{background: #3A8DFF; color: #fff; }
  
  .im-logo{width: 40px; height: 40px; background: url(https://i.kcimg.cn/data/avatar/noavatar_big.gif-50x50.jpg);border: 1px solid #f5f5f5; border-radius: 50%;background-size: cover; margin-right: 10px;}
  .logo-box{ height: 60px; div:after{font-size:12px; padding-left: 10px;color: #999;}i{border-right: 1px solid #999;display: block;height: 12px;width: 2px; margin-left: 20px;}}
  .user-tit{width: 228px;}
  .user-box{width: 260px; text-align: left; padding:13px 20px 20px;
    .gre-bt{ color: #2FBB8C; border-color: #2FBB8C; width: 100px; display: block; height: 30px;}
    .red-bt{color: #FF335D; border-color: #FF335D;width: 100px;display: block;height: 30px;}
    .us-ft-box{-webkit-justify-content:space-between;justify-content:space-between; margin-top: 10px;}
  }
  .user-box > div{height: 28px; line-height: 28px; a{padding-left: 10px;}}
  .user-box > h3{height: 28px; line-height: 28px; font-size: 14px; color: #333;}
  .user-box .line{ border-top: 1px solid #ccc; margin-top: 5px; height: 34px; line-height: 34px;padding-top: 3px;}

/*----搜索---*/
  .inx-so{  height: 150px; min-width: 1300px; width: 100%; padding-top: 30px;}
  .inx-input{
    width: 800px; height: 50px; border-radius: 30px;box-shadow: 0 2px 8px 0 rgba(27,35,80,0.05); display: block; margin: 0 auto 20px;
    background-color: #fff; position: relative; border:1px solid #fff;
    .inx-icon{height: 48px; line-height: 48px; position: absolute; top: 0; right: 6px;display: block; width: 50px;}
    .inx-icon:before{font-size: 23px; color: #3A8DFF;}
    .inputs{ border:0; width: 740px; height: 48px; padding: 4px 7px; outline: 0; text-align: center; font-size: 18px;color: #333; line-height: 48px;    background-color: transparent;}
  }
  .inx-in-active{border-color: #57a3f3;}
  
  .hot-txt{
    text-align: center;
    cursor: pointer;
    font-size: 16px; color: #2A2A2A; span{margin-right: 20px;}
    .red{color: red; }
  }
/*----底部版权---*/
  .inx-ft-box{width: 100%; height: 40px; background-color: #333; color: #fff; line-height: 40px; text-align: center;}
/*----浮动联系我们---*/
  .flt-qq{min-width: 60px; height: 60px; position: fixed; right: 0;  bottom: 260px;
    .rt-blue{width: 60px; height: 60px;background-image: linear-gradient(-269deg, #3A8DFF 0%, #6CC1FF 100%); color: #fff;text-align: center;
      i{display: block; font-size: 20px; padding-top: 5px;}
    }
    .lf-qq{ width: 196px; height: 46px;background-color: #fff;
      text-align: center;
      img{width: 20px; height: auto; margin-right: 6px; position: relative; top: 4px;}
      .txt{color: #666;}
      div:first-child{font-size: 16px; color: #333;}
      span{width: 4px; height: 62px; background-color: #3A8DFF; display: block; position: absolute;left: 5px; top: 0;}
    }
  }
/*--搜索结果---*/
.u-mr-box{padding: 0 0 20px; width:1300px; margin:0 auto; }
.u-mr-box:after{
  content: '';
  clear: both;
  display: block;
  visibility: hidden;
  font-size: 0;
  height: 2px;
  width: 100%;
}
.left-i-box{width: 980px;}
</style>
