<template>
  <Modal v-model="SHOW" width="440">
    <p slot="header" style="text-align:center;">填写个人信息，方便我们与您联系</p>
    
    <div slot="footer" class="ser-box-ft"><div></div></div>
  </Modal>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
.ser-box,.textarea-box{width: 90%;height: 50px; padding-top: 10px;
  .tet{width: 90px; line-height: 34px; text-align: right; font-size: 14px;}
}
.textarea-box{height: auto;}
.ser-box:last-child{padding-top: 20px;height: auto; .blu-btn{height: 44px; font-size: 16px;}}
.ser-box-ft{ width: 440px;
    height: 30px;
    position: absolute;
    bottom: 0;
    background: #fff;
    left: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;}
</style>
