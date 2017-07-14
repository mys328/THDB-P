<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style=""></p>
    <div class="fl-box flex-wrap row-flex">
      <div class="page" :class="{'active':TP===1}" @click="$store.commit('setTP', 1)">登录</div>
      <div class="page" :class="{'active':TP===2}" @click="$store.commit('setTP', 2)">注册</div>
    </div>
    <v-vreg v-show="TP===2"></v-vreg>
    <v-vlog v-show="TP===1"></v-vlog>
  </Modal>
</template>

<script>
  export default {
    computed: {
      TP () { return this.$store.state.TP },
      logBox () { return this.$store.state.logBox }
    },
    data () {
      return {
        isShow: false
      }
    },
    watch: {
      isShow: 'Hide',
      logBox: 'Show'
    },
    methods: {
      Show () {
        if (this.logBox) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      },
      Hide () {
        if (!this.isShow && this.logBox) {
          this.$store.commit('setLogBox', false)
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
