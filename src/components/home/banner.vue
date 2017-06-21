<template>
  <div class="inx-ad-box"><!-- autoplay -->
    <Carousel v-model="focus" :autoplay-speed="autoplaySpeed">
      <Carousel-item>
        <div class="demo-carousel">
          <img src="http://usr.im/1300x540">
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">
          <img src="http://usr.im/1300x540">
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">
          <img src="http://usr.im/1300x540">
        </div>
      </Carousel-item>
      <Carousel-item>
        <div class="demo-carousel">
          <img src="http://usr.im/1300x540">
        </div>
      </Carousel-item>
    </Carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      focus: 0, // 索引图
      autoplaySpeed: 2500  // 间隔时间
    }
  }
}
</script>

<style lang="less" scoped>
  .inx-ad-box{width: 100%; background-color: #09203D; height: 540px;}
</style>
