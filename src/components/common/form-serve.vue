<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style="text-align:center;">填写个人信息，方便我们与您联系</p>
    <Form ref="formServe" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
      <Form-item label="姓名:" :label-size="14" prop="username">
        <Input type="text" size="large" v-model="DATA.username" placeholder="请输入姓名" :maxlength="maxlength" number></Input>
      </Form-item>
      <Form-item label="手机号:" prop="phone">
        <Input type="text" size="large" v-model="DATA.phone" placeholder="请输入手机号"></Input>
      </Form-item>
      <Form-item label="公司名称:" prop="company">
        <Input type="text" size="large" v-model="DATA.company" placeholder="请输入公司名称"></Input>
      </Form-item>
      <Form-item label="职位名称:" prop="position">
        <Input type="text" size="large" v-model="DATA.position" placeholder="请输入职位名称"></Input>
      </Form-item>
      <Form-item label="咨询服务:" prop="service">
        <Input type="text" size="large" v-model="DATA.service" placeholder="请选择咨询服务"></Input>
      </Form-item>
      <Form-item label="咨询详情" prop="content">
        <Input v-model="DATA.content" type="textarea" :rows="3" placeholder="请输入咨询详情(100字以内)"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" size="large" long class="blu-btn" @click="handleSubmit('formServe')">提 交</Button>
      </Form-item>
    </Form>
  </Modal>
</template>

<script>
  export default {
    props: {
      SHOW: Boolean
    },
    data () {
      const validateTel = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入手机号'))
        }
        if (!Number.isInteger(value)) {
          return callback(new Error('请输入数字值'))
        }
        if (!/^1[3|4|5|7|8]\d{9}$/.test(value)) {
          return callback(new Error('手机号格式错误'))
        } else {
          return callback()
        }
      }
      return {
        isShow: false,
        maxlength: 11,
        DATA: {
          username: '',
          phone: '',
          company: '',
          position: '',
          service: '',
          content: ''
        },
        ruleCustom: {
          username: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
          phone: [{required: true, validator: validateTel, trigger: 'blur'}],
          company: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
          position: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
          service: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
          content: [
            {type: 'string', max: 5, message: '详情不能多于100字', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      isShow: 'Hide',
      SHOW: 'Show'
    },
    methods: {
      Show () {
        if (this.SHOW) {
          this.isShow = true
        }
      },
      Hide () {
        if (!this.isShow && this.SHOW) {
          this.$emit('isHide')
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.fo-pwd-box{padding:20px 40px 0 0;}
.blu-btn{height: 44px; font-size: 16px;}
</style>
