<template>
  <div class="inx-ad-box"><!-- autoplay -->
    <Carousel v-model="focus" autoplay :autoplay-speed="autoplaySpeed">
      <Carousel-item v-for="(em, inx) in DATA" :key="inx">
        <div class="demo-carousel">
          <img :src="em">
        </div>
      </Carousel-item>
    </Carousel>
  </div>
</template>

<script>
import XHR from '@/api'
export default {
  data () {
    return {
      focus: 0, // 索引图
      autoplaySpeed: 2500,  // 间隔时间
      DATA: []
    }
  },
  created () {
    XHR.getBanner().then((res) => {
      if (res.data.status === 0) {
        this.DATA = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .inx-ad-box{width: 100%; background-color: #09203D; height: 540px;text-align: center;
    img{width: 1300px; height: 540px;}
  }
</style>
