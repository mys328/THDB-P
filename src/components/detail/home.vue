<template>
  <div class="right-x-box">
    <v-usch></v-usch>
    <div class="u-mr-box">
      <v-items></v-items>
      <v-rhot></v-rhot>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .right-x-box{
    padding: 0;
  }
  .u-mr-box{padding: 0 0 20px;}
  .u-mr-box:after{
    content: '';
    clear: both;
    display: block;
    visibility: hidden;
    font-size: 0;
    height: 2px;
    width: 100%;
  }
</style>
