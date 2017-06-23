<template>
  <Form ref="formCustom" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
    <Form-item label="用户名:" :label-size="14" prop="tel">
      <Input type="text" size="large" v-model="DATA.tel" placeholder="输入用户名" :maxlength="maxlength" number></Input>
    </Form-item>
    <Form-item label="密码:" prop="passwd">
      <Input type="password" size="large" v-model="DATA.passwd" placeholder="输入密码"></Input>
    </Form-item>
    <Form-item label="验证码:" prop="code">
      <Input type="text" size="large" v-model="DATA.code" placeholder="输入验证码">
        <span slot="append">
          
        </span>
      </Input>
    </Form-item>
    <Form-item>
      <Button type="primary" size="large" long class="blu-btn" @click="handleSubmit('formCustom')">登 录</Button>
    </Form-item>
  </Form>
</template>

<script>
  export default {
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
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (value.length < 6) {
            callback(new Error('密码不能少于6位'))
          } else {
            if (this.DATA.passwdCheck !== '') {
              this.$refs.formCustom.validateField('passwdCheck')
            }
            callback()
          }
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('验证码不能为空'))
        }
        if (value.length < 6) {
          return callback(new Error('验证码必需6位字符'))
        }
        callback()
      }
      return {
        maxlength: 11,
        loadingC: false,
        disabledC: false,
        comTim: 60,
        btnTxt: '发送验证码', // '发送验证码', '发送中…', '60秒后重发', '重发验证码'
        loadingS: false,
        DATA: {
          passwd: '',
          tel: '',
          code: '',
          passwdCheck: ''
        },
        ruleCustom: {
          tel: [{validator: validateTel, trigger: 'blur'}],
          passwd: [{validator: validatePass, trigger: 'blur'}],
          code: [{validator: validateCode, trigger: 'blur'}]
        }
      }
    },
    methods: {
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
      },
      comDow () {
        if (this.comTim > 0 && this.comTim !== 0) {
          setTimeout(() => {
            this.comTim--
            this.btnTxt = `${this.comTim}秒后重发`
            this.comDow()
          }, 1000)
        } else {
          this.btnTxt = '重发验证码'
          this.comTim = 60
          this.disabledC = false
        }
      },
      callCode () {
        if (this.DATA.code.length === 6) {
          this.loadingC = true
          this.btnTxt = '发送中…' // '60秒后重发', '重发验证码'
          setTimeout(() => {
            this.disabledC = true
            this.loadingC = false
            this.$Message.success('发送成功!')
            this.btnTxt = '60秒后重发'
            this.comDow()
          }, 3000)
        }
      }

    }
  }
</script>

<style lang="less" scoped>
.fo-pwd-box{padding:20px 40px 0 0;}
.blu-btn{height: 44px; font-size: 16px;}
</style>
