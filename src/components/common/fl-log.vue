<template>
  <Form ref="formCustom" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box" id="formCustom">
    <Form-item label="用户名:" :label-size="14" prop="username">
      <Input type="text" size="large" v-model="DATA.username" placeholder="输入用户名" :maxlength="maxlength"></Input>
    </Form-item>
    <Form-item label="密码:" prop="password">
      <Input type="password" size="large" v-model="DATA.password" placeholder="输入密码">
        <Checkbox slot="append" v-model="fing" style="margin:0 4px;">记住密码</Checkbox>
      </Input>
    </Form-item>
    <Form-item label="验证码:" prop="domain">
      <Row>
        <Col span="16">
          <Input type="text" size="large" v-model="DATA.domain" placeholder="输入验证码"></Input>
        </Col>
        <Col span="8" style="height:36px;">
          <img :src="img" alt="验证码" class="y-img" @click="getImg"/>
        </Col>
      </Row>
    </Form-item>
    <Form-item style="margin-bottom:10px;">
      <Button type="primary" size="large" :loading="loadingC" long class="blu-btn" @click="handleSubmit('formCustom')">登 录</Button>
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
        if (!/^[A-Za-z0-9_\u4e00-\u9fa5]{3,16}$/.test(value)) {
          return callback(new Error('用户名不规范'))
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
          password: [{validator: validatePass, trigger: 'blur'}],
          domain: [{validator: validateCode, trigger: 'blur'}]
        }
      }
    },
    created () {
      this.getImg()
    },
    methods: {
      getImg () {
        XHR.VerFcode().then((res) => {
          this.img = res.data.url
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loadingC = true
            XHR.Login(this.DATA).then((res) => {
              if (res.data.status === 0) {
                this.loadingC = false
                // this.$store.commit('setUserInfo', res.data.data)
                let txt = JSON.stringify(res.data.data)
                localStorage.setItem('USERINFO', txt)
                this.$store.commit('setLogBox', false)
                this.$store.commit('setLogin', true)
                this.$Notice.success({
                  title: res.data.msg,
                  desc: ''
                })
              } else {
                this.loadingC = false
                this.$Notice.error({
                  title: res.data.msg,
                  desc: ''
                })
              }
            })
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
