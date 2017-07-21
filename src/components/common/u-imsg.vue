<template>
  <div class="left-i-box">
    <h3>{{DATA.bp_title}}</h3>
    <div class="ems">
      <span v-for="(sm, inx) in DATA.label_name" :key="inx">{{sm}}</span>
    </div>
    <div class="time">
      <span>{{DATA.create_time}}</span>
      <span>阅读({{DATA.volume_num}})</span>
      <span>下载({{DATA.download_num}})</span>
    </div>
    <img :src="urls" class="us-img"/>
    <div class="foots-box">
      <Page :current="1" :total="IMG.length" :page-size="psize" @on-change="gotoPage" simple></Page>
      <div class="ft-rt-box">
        <em>¥{{DATA.bp_money}}</em>
        <span class="lock" @click="goBig">
          <Icon type="arrow-resize" size="16"></Icon>大屏预览</span>
        <span class="download"><i class="fso icon-downlo"></i>下载</span>
      </div>
    </div>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    data () {
      return {
        psize: 1,
        DATA: {},
        IMG: [],
        urls: ''
      }
    },
    created () {
      this.getMsg()
    },
    computed: {
    },
    watch: {
    },
    methods: {
      getMsg () {
        let json = {id: this.$route.query.id}
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
      },
      gotoPage (page) {
        let pgs = page - 1
        this.urls = this.IMG[pgs]
      },
      goBig () {
        window.open(`big.html?id=${this.$route.query.id}`)
      }
    }
  }
</script>

<style lang="less" scoped>
  .left-i-box{
    float: left;
    margin-left: 20px;

    h3{font-size: 18px; color: #333; overflow: hidden;word-break:inherit; text-overflow:ellipsis; display: block; height: 30px; line-height: 30px; margin-top: 15px;}
    h3:hover{color: #3A8DFF;}
    p{font-size: 14px; color: #666; line-height:25px; height: 120px; overflow: hidden; }
    .ems span{display: inline-block; background-color: #2FBB8C; border-radius: 2px; color: #fff; font-size: 12px; margin:6px 4px 5px 0; padding: 0 4px;}
    .time{height: 30px; line-height: 30px; font-size: 12px; color: #999;
      span{padding:0 10px;}
    }
    .time span:first-child{ padding-left: 0; border-right:1px solid #999;}
    .time span:last-child{ border-left:1px solid #999;}
    .us-img{display: block; width: 100%; height: auto; padding: 0; margin: 10px 0 0;}
  }
  .foots-box{width: 100%; height: 50px; background: #F5F6FA;border: 1px solid #DFE3EB; border-top: 0;}
  .ft-rt-box{float: right; height: 50px;
    em{font-size: 20px; font-style: normal; color: #E41B3C; line-height: 50px; padding-right: 10px;}
    span{display: inline-block; text-align: center; margin-right: 10px; position: relative; top: -3px;}
    .lock{width: 80px; height: 30px; border: 1px solid #3A8DFF; border-radius: 2px; font-size: 12px;color: #3A8DFF; line-height: 26px; 
      i{padding-right: 5px; position: relative; top: 2px;}}
      .download{width: 80px; height: 30px; background: #3A8DFF;border-radius: 2px; color: #fff; font-size: 12px; line-height: 28px;
        i{font-size: 10px; padding-right: 5px;}
      }
  }
  .foots-box .ivu-page{ margin-top: 12px; }
</style>
