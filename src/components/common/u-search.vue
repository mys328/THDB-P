<template>
  <div class="seach-box">
    <Input placeholder="请输入..." style="width:280px;" size="large">
      <Icon slot="append" type="ios-search-strong" size="20"></Icon>
    </Input>
    <div class="hot-msg">
      <span>搜索热词：</span>
      <span v-for="(em, index) in LAB" :key="index" :class="{'red': index == 0}">{{em.keyword}}</span>
    </div>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    data () {
      return {
        sch: '',
        LAB: []
      }
    },
    created () {
      this.getLabel()
    },
    methods: {
      getLabel () {
        XHR.keyWord().then((res) => {
          if (res.data.status === 0) {
            this.LAB = res.data.data
          }
        })
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
