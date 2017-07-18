<template>
  <div class="left-i-box">
    <div class="hot-title">最新报告</div>

    <div class="left-xx">
      <div class="xx-lft">
        <img src="http://usr.im/280x158" />
        <ul>
          <li class="s">个人的</li>
          <li class="r">已购买</li>
        </ul>
      </div>
      <div class="xx-rit">
        <h3>dfgdfdfdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfg</h3>
        <p>的沙发上巅峰</p>
        <div class="ems">
          <span>卡车</span>
        </div>
        <div class="time">
          <span>2015年</span>
        </div>
      </div>
    </div>
    <div style="text-align:center;">
      <Page total="100"></Page>
    </div>
  </div>
</template>

<script>
  import XHR from '@/api'
  export default {
    data () {
      return {
        HOT: []
      }
    },
    created () {
    },
    methods: {
      getLabel () {
        XHR.Labels().then((res) => {
          if (res.data.status === 0) {
            this.LAB = res.data.data
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .left-i-box{
    float: left;
    margin-left: 20px;
  }
  .left-xx{height: 218px; width: 740px; border-bottom: 1px solid #DFE3EB; overflow: hidden; padding-bottom: 19px; margin-bottom: 20px;}
  .xx-lft{float: left;
    img{display: block; width: 280px; height: 158px;}
    ul{ height: 40px; width: 280px; border:1px solid #DFE3EB; border-top: 0; li{float: left;}}
    .s{width: 200px; height: 40px; line-height: 40px; float: left; overflow: hidden; word-break:inherit; text-overflow:ellipsis; font-size: 14px;padding-left: 10px;}
    .r{width: 78px; height: 40px; line-height: 40px; text-align: right; padding-right: 10px; }
  }
  .xx-rit{width: 460px; height: 218px; padding-left: 20px; float: right;
    h3{font-size: 18px; color: #333; overflow: hidden;word-break:inherit; text-overflow:ellipsis; display: block; height: 30px; line-height: 30px;}
    p{font-size: 14px; color: #666; line-height:25px; height: 120px; overflow: hidden; }
    .ems span{display: inline-block; background-color: #2FBB8C; border-radius: 2px; color: #fff; font-size: 12px; margin:10px 4px 0 0; padding: 0 4px;}
    .time{height: 30px; line-height: 30px; font-size: 12px; color: #999;}
  }
</style>
