<template>
  <div id="app">
    <div class="inx-top flex-wrap row-flex">
      <div class="flex-wrap row-flex page">
        <div>卡车之家大数据</div>
        <div>首页</div>
        <div>服务</div>
      </div>
      <div class="flex-wrap row-flex page">
        <div>咨询详情</div>
        <div>注册</div>
        <div>登录</div>
      </div>
    </div>
    <img src="http://usr.im/1300x540">
    <hello></hello>
  </div>
</template>

<script>
  import Hello from '@/components/Hello/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: auto;
    background-color: #fff;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .inx-top{width: 1300px; height: 60px; margin: 0 auto;}
</style>
