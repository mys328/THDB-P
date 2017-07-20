<template>
  <div class="right-hot-msg">
    <div class="hot-title">最热报告</div>

    <div class="items" v-for="(em, index) in HOT" :key="index">
      <img :src="em.bp_img"/>
      <span>{{em.bp_title}}</span>
      <div class="btns">
        <span>阅读({{em.volume_num}})</span>
        <span>下载({{em.download_num}})</span>
      </div>
    </div>

    <div class="hot-title rhs">热门标签</div>
    <div class="span-hot">
      <span
      v-for="(em, index) in LAB"
      :key="index"
      @click="hotSearch(index)">{{em.name}}</span>
    </div>
  </div>
</template>
<script>
  import XHR from '@/api'
  export default {
    data () {
      return {
        LAB: [],
        HOT: []
      }
    },
    created () {
      this.getLabel()
      this.getHot()
    },
    methods: {
      getLabel () {
        XHR.Labels().then((res) => {
          if (res.data.status === 0) {
            this.LAB = res.data.data
          }
        })
      },
      getHot () {
        XHR.ShowHot().then((res) => {
          if (res.data.status === 0) {
            this.HOT = res.data.data
          }
        })
      },
      hotSearch (inx) {
        let json = {}
        json.id = this.LAB[inx].id
        json.p = 1
        this.$emit('inputData', this.LAB[inx].name)
        this.$store.commit('setSHjson', json)
        this.$store.dispatch('searchGo', json)
      }
    }
  }
</script>

<style lang="less" scoped>
  .right-hot-msg{
    width: 240px;
    float: right;
    min-height: 600px;
    margin-right: 20px;
  }
  .items{ border:1px solid #DFE3EB; margin-bottom: 20px;
    img{display: block;width: 100%; height:135px;}
  }
  .items > span{height: 40px; line-height: 40px; text-align: center; font-size: 14px;color: #333; display: block;}
  .btns{border-top: 1px solid #DFE3EB;}
  .btns > span{display: inline-block; height: 40px; line-height: 40px; text-align: center;width: 117px; font-size: 12px; color: #999;}
  .btns > span:first-child{border-right:1px solid #DFE3EB;}
  .rhs{margin-bottom: 2px; height: 34px; line-height: 34px;}
  .span-hot span{display: inline-block; background-color: #2FBB8C; border-radius: 2px; color: #fff; font-size: 12px; margin:10px 4px 0 0; padding: 0 4px;}
</style>
