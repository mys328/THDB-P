<template>
  <div>
   <div class="ico-x-box">
    <div class="hot-title" style="height:38px; line-height:38px;">订单信息</div>
    <p>支付金额：<em style="color:#E41B3C;">¥{{OrderMsg.price}}</em></p>
    <p>订单编号：{{OrderMsg.order_sn}}</p>
    <p>购买服务：{{OrderMsg.title}}</p>
   </div>

   <div class="bank-box">
    <div class="hot-title" style="height:38px; line-height:38px;">选择支付方式</div>
    <div class="bankMsg">
      <p>公司名称：北京卡车之家信息技术股份有限公司</p>
      <p>账号：110 906 1669 10902</p>
      <p>开户行：招商银行北京分行海淀支行</p>
      <p class="red">汇款后请联系客服：xxxxxxxx  提供抵押和订单号</p>
    </div>
    <ul>
      <li>
        <img :src="zsIco" />
        <p>银行汇款(汇款人承担手续费)</p>
      </li>
      <li :class="{'active': bank == 0}" @click="selBank(0)">
        <img :src="zfbIco" />
        <p>支付宝网银支付</p>
      </li>
      <li :class="{'active': bank == 1}" @click="selBank(1)">
        <img :src="wxIco" />
        <p>微信支付</p>
      </li>
    </ul>
    <Button type="info" size="large" class="bugBtn" long @click="toBuy">下一步</Button>
   </div>
  </div>
</template>

<script>
  import wxIco from './img/wx.gif'
  import zfbIco from './img/zfb.gif'
  import zsIco from './img/zs.gif'
  export default {
    data () {
      return {
        wxIco: wxIco,
        zfbIco: zfbIco,
        zsIco: zsIco,
        bank: 0
      }
    },
    computed: {
      OrderMsg () { return this.$store.state.Order }
    },
    methods: {
      toBuy () {
      },
      selBank (num) {
        this.bank = num
      }
    }
  }
</script>

<style lang="less" scoped>
  .ico-x-box{ width: 100%; height: 180px; background-color: #fff; margin-bottom: 20px; padding: 10px 20px 0;
    p{height: 35px; font-size: 14px;}
  }
  .bank-box{min-height: 600px; background-color: #fff; padding: 10px 20px 0;
    .bankMsg{background: #FFF7F9;border: 1px solid #FFDAE2; font-size: 14px; line-height: 30px; padding: 10px;}
    ul{width: 100%;min-width:1060px; height: 102px; overflow: hidden; margin-top: 20px;}
    li{width: 326px; height: 100px; float: left; margin-right: 20px;border: 1px solid #DFE3EB; text-align: center; padding-top: 16px;
      img{ width: 170px; height: auto;}
      p{font-size: 14px; color: #666; line-height: 28px;}
    }
    .red{color: #E41B3C;}
    .active{border-color: #3A8DFF;  position: relative;
      p{color:#3A8DFF;}}
    .active:before{ content: '\5bf9'; font-family: 'iconfont'; color: #fff; position: absolute;bottom:0px; right:4px;z-index: 58;}
    .active:after{content:''; height:0; width:0; display:block; border:40px transparent solid; border-top-width:0; border-right-width:0; border-bottom-color:#3A8DFF; position:absolute; bottom:0px; right:0px;z-index: 55;}
}
.bugBtn{ margin-top: 20px; width: 326px;}
</style>
