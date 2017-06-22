<template>
  <Modal v-model="SHOW" width="440">
    <p slot="header" style="text-align:center;">填写个人信息，方便我们与您联系</p>
    <div class="ser-box flex-wrap row-flex">
      <div class="tet">姓名：</div>
      <div class="page">
        <Input v-model="DATA.username" size="large" placeholder="请输入姓名"></Input>
      </div>
    </div>
    <div class="ser-box flex-wrap row-flex">
      <div class="tet">手机号：</div>
      <div class="page">
        <Input v-model="DATA.phone" size="large" placeholder="请输入手机号"></Input>
      </div>
    </div>
    <div class="ser-box flex-wrap row-flex">
      <div class="tet">公司名称：</div>
      <div class="page">
        <Input v-model="DATA.company" size="large" placeholder="请输入公司名称"></Input>
      </div>
    </div>
    <div class="ser-box flex-wrap row-flex">
      <div class="tet">职位名称：</div>
      <div class="page">
        <Input v-model="DATA.position" size="large" placeholder="请输入职位名称"></Input>
      </div>
    </div>
    <div class="ser-box flex-wrap row-flex">
      <div class="tet">咨询服务：</div>
      <div class="page">
        <Input v-model="DATA.service" size="large" placeholder="请选择咨询服务"></Input>
      </div>
    </div>
    <div class="textarea-box flex-wrap row-flex">
      <div class="tet">咨询详情：</div>
      <div class="page">
        <Input v-model="DATA.content" type="textarea" :rows="3" placeholder="请输入咨询详情(100字以内)"></Input>
      </div>
    </div>
    <div class="ser-box flex-wrap row-flex">
      <div class="tet"> </div>
      <div class="page">
        <Button type="primary" size="large" long :loading="modal_loading" @click="del" class="blu-btn">提交</Button>
      </div>
    </div>
    <div slot="footer" class="ser-box-ft"><div></div></div>
  </Modal>
</template>

<script>
  export default {
    props: {
      SHOW: Boolean
    },
    data () {
      return {
        modal_loading: false,
        DATA: {
          username: '',
          phone: '',
          company: '',
          position: '',
          service: '',
          content: ''
        }
      }
    },
    methods: {
      del () {
        this.modal_loading = true
        setTimeout(() => {
          this.modal_loading = false
          this.$Message.success('删除成功')
        }, 2000)
      }
    }
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
