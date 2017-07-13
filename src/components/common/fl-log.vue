<template>
  <Form ref="formCustom" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box" id="formCustom">
    <Form-item label="用户名:" :label-size="14" prop="username">
      <Input type="text" size="large" v-model="DATA.username" placeholder="输入用户名" :maxlength="maxlength"></Input>
    </Form-item>
    <Form-item label="密码:" prop="passwd">
      <Input type="password" size="large" v-model="DATA.password" placeholder="输入密码">
        <Checkbox slot="append" v-model="fing" style="margin:0 4px;">记住密码</Checkbox>
      </Input>
    </Form-item>
    <Form-item label="验证码:" prop="code">
      <Row>
        <Col span="16">
          <Input type="text" size="large" v-model="DATA.domain" placeholder="输入验证码"></Input>
        </Col>
        <Col span="8" style="height:36px;">
          <img :src="img" alt="验证码" class="y-img"/>
        </Col>
      </Row>
    </Form-item>
    <Form-item style="margin-bottom:10px;">
      <Button type="primary" size="large" long class="blu-btn" @click="handleSubmit('formCustom')">登 录</Button>
    </Form-item>
    <Form-item>
      <p style="text-align:right;">忘记密码？</p>
    </Form-item>
  </Form>
</template>

<script>
  import XHR from '@/api'
  export default {
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入用户名'))
        }
        callback()
      }
      const validatePass = (rule, value, callback) => {
        if (this.DATA.password === '') {
          return callback(new Error('请输入密码'))
        } else {
          if (this.DATA.password.length < 6) {
            return callback(new Error('密码不能少于6位'))
          }
        }
        callback()
      }
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('验证码不能为空'))
        }
        callback()
      }
      return {
        maxlength: 11,
        loadingC: false,
        disabledC: false,
        fing: false,
        img: '',
        comTim: 60,
        btnTxt: '发送验证码', // '发送验证码', '发送中…', '60秒后重发', '重发验证码'
        loadingS: false,
        DATA: {
          password: '',
          username: '',
          domain: '',
          mac: ''
        },
        ruleCustom: {
          username: [{validator: validateName, trigger: 'blur'}],
          passwd: [{validator: validatePass, trigger: 'blur'}],
          code: [{validator: validateCode, trigger: 'blur'}]
        }
      }
    },
    created () {
      this.getImg()
    },
    methods: {
      getImg () {
        XHR.VerFcode().then((res) => {
          if (res.data.status === 0) {
            this.img = res.data.data
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
      }

    }
  }
</script>

<style lang="less" scoped>
.y-img{width: 100%; height: auto; max-height: 36px;}
.fo-pwd-box{padding:20px 40px 0 0;}
.blu-btn{height: 44px; font-size: 16px;}
</style>
