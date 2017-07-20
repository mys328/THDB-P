<template>
  <div class="layout" id="app">
    <div>
      <div class="t-box">
        <p>{{DATA.bp_title}}
          <span v-for="(sm, inx) in DATA.label_name" :key="inx">{{sm}}</span>
        </p>
        <div class="time">
          <span>{{DATA.create_time}}</span>
          <span>阅读({{DATA.volume_num}})</span>
          <span>下载({{DATA.download_num}})</span>
        </div>
      </div>

      <div class="br-box">
        <span class="lock">关闭</span>
        <span class="download"><i class="fso icon-downlo"></i>下载</span>
      </div>
      <div style="clear:both;"></div>
    </div>
    <div class="solid-box-t">
      <div class="solid-box">
        <img src=""/>
      </div>
    </div>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    name: 'app',
    data () {
      return {
        DATA: {},
        IMG: [],
        urls: ''
      }
    },
    created () {
      this.getMsg()
    },
    watch: {
    },
    mounted () {
    },
    methods: {
      GetQueryString (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let r = window.location.search.substr(1).match(reg)
        if (r !== null) {
          return unescape(r[2])
        } else {
          return null
        }
      },
      getMsg () {
        let json = {id: this.GetQueryString('id')}
        XHR.ShowInfo(json)
        .then((res) => {
          if (res.data.status === 0) {
            this.DATA = res.data.data
          }
        })
        XHR.PdfPng(json)
        .then((res) => {
          if (res.data.status === 0) {
            this.IMG = res.data.data
            this.urls = this.IMG[0]
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
  }
  .layout{
    min-width: 1300px;
    width: 100%;
    min-height: 100%;
    background: #222;
    color: #fff;
  }
 .t-box{
  padding: 20px; float: left;
    p{font-size: 18px;  overflow: hidden;word-break:inherit; text-overflow:ellipsis; display: block; height: 30px; line-height: 30px;}
    p span{display: inline-block; background-color: #2FBB8C; border-radius: 2px; color: #fff; font-size: 12px; margin:6px 4px 5px 0; padding: 0 4px; height: 20px; line-height: 20px;position: relative;top: -4px;}
    .time{height: 30px; line-height: 30px; font-size: 12px;
      color: #999;
      span{padding:0 10px;}
    }
    .time span:first-child{ padding-left: 0; border-right:1px solid #999;}
    .time span:last-child{ border-left:1px solid #999;}
 }
 .br-box{float: right; padding:40px 20px 0;
  span{display: inline-block; text-align: center; margin-right: 10px;}
  .lock{width: 80px; height: 30px; border: 1px solid #3A8DFF; border-radius: 2px; font-size: 12px;color: #3A8DFF; line-height: 26px; 
  i{padding-right: 5px; position: relative; top: 2px;}}
  .download{width: 80px; height: 30px; background: #3A8DFF;border-radius: 2px; color: #fff; font-size: 12px; line-height: 28px;
    i{font-size: 10px; padding-right: 5px;}
  }
 }
 .solid-box-t{min-width:1300px; width: 100%; height: 130px; margin: 10px auto; background-color: #333;}
</style>
