<template>
  <div class="ico-x-box">
    <div class="ico-tp-box flex-wrap row-flex">
      <div class="page">
        <i class="fso icon-ai"></i>
        <p>市场洞察</p>
      </div>
      <div class="page">
        <i class="fso icon-xx"></i>
        <p>竞争分析</p>
      </div>
      <div class="page">
        <i class="fso icon-pp"></i>
        <p>用户挖掘</p>
      </div>
      <div class="page">
        <i class="fso icon-mi"></i>
        <p>舆情监测</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  .ico-x-box{ width: 100%; height: 170px; background-color: #fff;}
  .ico-tp-box{ width: 1300px; margin:0 auto; height: 170px; padding: 40px 0;text-align: center;
    div{ border-left: 1px solid #DFE3EB;}
    i{font-size: 42px; }
    p{margin-top: 10px;}
    div:first-child{border:0;}
  }
</style>
