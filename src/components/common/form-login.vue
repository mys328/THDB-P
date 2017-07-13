<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style=""></p>
    <div class="fl-box flex-wrap row-flex">
      <div class="page" :class="{'active':table===1}" @click="table = 1">登录</div>
      <div class="page" :class="{'active':table===2}" @click="table = 2">注册</div>
    </div>
    <v-vreg v-show="table===2" @SHOW="chengHed"></v-vreg>
    <v-vlog v-show="table===1" @SHOW="chengHed"></v-vlog>
  </Modal>
</template>

<script>
  export default {
    props: {
      SHOW: Boolean,
      T: Number
    },
    data () {
      return {
        isShow: false,
        table: 1
      }
    },
    watch: {
      isShow: 'Hide',
      SHOW: 'Show',
      T: 'TP'
    },
    methods: {
      chengHed () {
        this.isShow = false
      },
      Show () {
        if (this.SHOW) {
          this.isShow = true
        }
      },
      TP () {
        this.table = this.T
      },
      Hide () {
        if (!this.isShow && this.SHOW) {
          this.$emit('isHide')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.fl-box{height: 50px; position: absolute; width: 440px; z-index: 66; top: 0; left: 0; background:#fff; border-top-left-radius: 6px; border-top-right-radius: 6px;}
.fl-box div{text-align: center; line-height: 50px; font-size: 18px; cursor: pointer;}
.fl-box .active{border-bottom: 3px solid #3A8DFF; color: #3A8DFF;}
</style>
