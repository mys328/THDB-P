<template>
  <div class="left-i-box">
    <div class="hot-title">最新报告</div>

    <div class="left-xx" v-for="(em, index) in DATA.data" :key="index">
      <div class="xx-lft" @click="jump({path:'/imsg',query:{id:em.bp_id}})">
        <img :src="em.bp_img" />
        <ul>
          <li class="s">{{em.bp_author}}</li>
          <li class="r">{{em.bp_money}}</li>
        </ul>
      </div>
      <div class="xx-rit">
        <h3 @click="jump({path:'/imsg',query:{id:em.bp_id}})">{{em.bp_title}}</h3>
        <p>{{em.bp_content}}</p>
        <div class="ems">
          <span v-for="(sm, inx) in em.label_name" :key="inx">{{sm}}</span>
        </div>
        <div class="time">
          <span>{{em.create_time}}</span>
          <span>阅读({{em.volume_num}})</span>
          <span>下载({{em.download_num}})</span>
        </div>
      </div>
    </div>

    <div v-if="!DATA.data" class="null-data">
      <img :src="bgs" />
      <p>没有找到相关信息，看看别的吧！</p>
    </div>

    <div v-if="DATA.data" style="text-align:center;">
      <Page :total="DATA.total" :page-size="psize" :current="pages" @on-change="gotoPage"></Page>
    </div>
  </div>
</template>

<script>
  import bgs from '@/common/null.png'
  import XHR from '@/api'
  export default {
    data () {
      return {
        psize: 5,
        bgs: bgs,
        HOT: []
      }
    },
    created () {
    },
    computed: {
      DATA () { return this.$store.state.SearchDB },
      pages () { return this.$store.state.SearchJSON.p }
    },
    methods: {
      getLabel () {
        XHR.Labels().then((res) => {
          if (res.data.status === 0) {
            this.LAB = res.data.data
          }
        })
      },
      gotoPage (page) {
        let json = this.$store.state.SearchJSON
        json.p = page
        this.$store.commit('setSHjson', json)
        this.$store.dispatch('searchGo', json)
      }
    }
  }
</script>

<style lang="less" scoped>
  .left-i-box{
    float: left;
    margin-left: 20px;
  }
  .left-xx{height: 218px; width: 740px; border-bottom: 1px solid #DFE3EB; overflow: hidden; padding-bottom: 19px; margin-bottom: 20px;}
  .xx-lft{float: left;
    img{display: block; width: 280px; height: 158px;}
    ul{ height: 40px; width: 280px; border:1px solid #DFE3EB; border-top: 0; li{float: left;}}
    .s{width: 200px; height: 40px; line-height: 40px; float: left; overflow: hidden; word-break:inherit; text-overflow:ellipsis; font-size: 14px;padding-left: 10px;}
    .r{width: 78px; height: 40px; line-height: 40px; text-align: right; padding-right: 10px; }
  }
  .xx-rit{width: 460px; height: 218px; padding-left: 20px; float: right;
    h3{font-size: 18px; color: #333; overflow: hidden;word-break:inherit; text-overflow:ellipsis; display: block; height: 30px; line-height: 30px;}
    h3:hover{color: #3A8DFF;}
    p{font-size: 14px; color: #666; line-height:25px; height: 120px; overflow: hidden; }
    .ems span{display: inline-block; background-color: #2FBB8C; border-radius: 2px; color: #fff; font-size: 12px; margin:10px 4px 0 0; padding: 0 4px;}
    .time{height: 30px; line-height: 30px; font-size: 12px; color: #999;
      span{padding:0 10px;}
    }
    .time span:first-child{ padding-left: 0; border-right:1px solid #999;}
    .time span:last-child{ border-left:1px solid #999;}
  }
  .null-data{text-align: center; img{margin-top: 100px;} p{font-size: 14px; color: #999;}}
</style>
