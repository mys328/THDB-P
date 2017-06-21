<template>
  <div id="app">
    <div class="inx-box-top">
      <div class="inx-top flex-wrap row-flex">
        <div class="inx-top-l flex-wrap row-flex page">
          <div>卡车之家大数据</div>
          <div>首页</div>
          <Poptip placement="bottom" trigger="hover">
            <div>服务</div>
            <div slot="content" class="fw-box">
              <div @click="logBox2 = true">市场调研</div>
              <div>用户深度挖掘</div>
              <div>用户行为分析</div>
              <div>舆情监测</div>
              <div>市场预测</div>
              <div>决策支持</div>
            </div>
          </Poptip>
        </div>
        <div class="inx-top-r flex-wrap row-flex midCenter page">
          <div>咨询详情</div>
          <div>注册</div>
          <div class="log-btn" @click="logBox = true">登录</div>
        </div>
      </div>
    </div>

    <v-banner></v-banner>

    <div class="inx-so">
      <div class="inx-input"> <!-- inx-in-active -->
        <i class="inx-icon fso icon-so"></i>
        <input type="text" placeholder="搜索..." v-model="sch" class="inputs">
      </div>
      <div class="hot-txt">
        <span>搜索热词：</span>
        <span class="red">卡车</span>
        <span>整车</span>
        <span>配件</span>
        <span>发动机</span>
        <span>销售</span>
      </div>
    </div>

    <v-auto></v-auto>

    <div class="inx-ft-box">Copyright ©2009~2017 www.360che.com All Rights Reserved. 卡车之家 版权所有 社会信用代码：911101056787733227</div>

    <div class="flt-qq">
      <div class="rt-blue">
        <i></i>
        联系我们
      </div>
      <div class="lf-qq">
        <div class="txt">
          <i></i>
          404828990
        </div>
        <p>立即咨询，给您最专业的指导</p>
      </div>
    </div>

    <Modal v-model="logBox" width="500">
   <!--    <p slot="header"></p> -->
      <p style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此任务删除后，下游 10 个任务将无法执行。</p>
        <p>是否继续删除？</p>
      </div>
      <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
      <p slot="footer"></p>
    </Modal>

    <Modal v-model="logBox2" width="500">
      <p slot="header" style="text-align:center;">填写个人信息，方便我们与您联系</p>
      <div style="text-align:center">
        <p>此任务删除后，下游 10 个任务将无法执行。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="del">删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        focus: 0, // 索引图
        autoplaySpeed: 2500,  // 间隔时间
        logBox: false,  // 弹窗
        logBox2: false,  // 弹窗
        modal_loading: false,
        sch: ''
      }
    },
    methods: {
      del () {
        this.modal_loading = true
        setTimeout(() => {
          this.modal_loading = false
          this.logBox = false
          this.$Message.success('删除成功')
        }, 2000)
      }
    }
  }
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: auto;
    background-color: #F5F6FA;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .inx-box-top{width: 100%; height: 60px;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10); background-color: #fff;}
  .inx-top{width: 1300px; height: 60px; margin: 0 auto;}
  .inx-top-l > div{min-width: 40px; height: 60px; font-size: 16px; color: #3A8DFF; line-height: 60px;margin-right: 40px;cursor: pointer;}
  .inx-top-l > div:first-child{font-size: 20px; color: #00479D; }
  .inx-top-l > div:nth-child(2){box-sizing: border-box;border-bottom: 4px solid #3A8DFF; }
  .inx-top-r{ -webkit-justify-content:flex-end;justify-content:flex-end;}
  .inx-top-r > div{min-width: 30px; height: 60px; font-size: 12px; color: #666; line-height: 60px;margin-left: 20px;}
  .inx-top-r .log-btn{ width: 80px; height: 40px; border-radius: 20px; background-color: #3A8DFF; color: #fff; text-align: center; line-height: 40px; font-size: 14px;}
  .fw-box div{height: 40px; color: #666; line-height: 40px; cursor: pointer;}
  .fw-box div:hover{background: #3A8DFF; color: #fff; }


  .inx-so{  height: 150px; min-width: 1300px; width: 100%; padding-top: 30px;}
  .inx-input{
    width: 800px; height: 50px; border-radius: 30px;box-shadow: 0 2px 8px 0 rgba(27,35,80,0.05); display: block; margin: 0 auto 20px;
    background-color: #fff; position: relative; border:1px solid #fff;
    .inx-icon{height: 48px; line-height: 48px; position: absolute; top: 0; right: 6px;display: block; width: 50px;}
    .inx-icon:before{font-size: 23px; color: #3A8DFF;}
    .inputs{ border:0; width: 740px; height: 48px; padding: 4px 7px; outline: 0; text-align: center; font-size: 18px;color: #333; line-height: 48px;}
  }
  .inx-in-active{border-color: #57a3f3;}
  
  .hot-txt{
    font-size: 16px; color: #2A2A2A; span{margin-right: 20px;}
    .red{color: red; }
  }

  .inx-ft-box{width: 100%; height: 40px; background-color: #333; color: #fff; line-height: 40px; text-align: center;}

  .flt-qq{width: 60px; height: 60px; position: fixed; right: 0;  bottom: 260px;
    .rt-blue{width: 60px; height: 60px;background-image: linear-gradient(-269deg, #3A8DFF 0%, #6CC1FF 100%); color: #fff;}
    .lf-qq{ display: none;}
  }


</style>
