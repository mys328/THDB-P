<template>
  <div class="seach-box">
    <Input placeholder="请输入..." style="width:280px;" v-model="sch" size="large">
      <div slot="append" @click="goSearch">
        <Icon type="ios-search-strong" size="20"></Icon>
      </div>
    </Input>
    <div class="hot-msg">
      <span>搜索热词：</span>
      <span v-for="(em, index) in LAB"
      :key="index"
      :class="{'red': index == 0}"
      @click="hotSearch(em.keyword)">{{em.keyword}}</span>
    </div>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    props: {
      hots: String
    },
    data () {
      return {
        sch: '',
        LAB: []
      }
    },
    created () {
      this.getLabel()
    },
    watch: {
      hots: 'setInput'
    },
    methods: {
      setInput () {
        if (this.hots !== '') {
          this.sch = this.hots
        }
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
          json.p = 1
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
        json.p = 1
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
  .seach-box{
    height: 40px;
    margin-bottom: 15px;
    .hot-msg{
      height: 37px;
      line-height: 37px; font-size: 16px; padding-left: 20px;
      span{margin-right: 20px;}
    }
    .red{color: red;}
  }
  .seach-box > div{float: left;}
</style>
