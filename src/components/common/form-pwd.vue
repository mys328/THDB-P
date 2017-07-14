<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style="text-align:center;">更改密码</p>
    <Form ref="formCustom" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
      <Form-item label="绑定手机号:" :label-size="14" prop="tel">
        <Input type="text" size="large" v-model="DATA.tel" placeholder="输入已绑定手机号" :maxlength="maxlength" number></Input>
      </Form-item>
      <Form-item label="设置新密码:" prop="passwd">
        <Input type="password" size="large" v-model="DATA.passwd" placeholder="输入新密码"></Input>
      </Form-item>
      <Form-item label="确认密码:" prop="passwdCheck">
        <Input type="password" size="large" v-model="DATA.passwdCheck" placeholder="重复输入密码"></Input>
      </Form-item>
      <Form-item label="手机验证码:" prop="code">
        <Input type="text" size="large" v-model="DATA.code" placeholder="输入验证码">
          <span slot="append">
            <Button type="ghost" :loading="loadingC" :disabled="disabledC" @click="callCode">
              <span>{{btnTxt}}</span>
            </Button>
          </span>
        </Input>
      </Form-item>
      <Form-item>
        <Button type="primary" size="large" long class="blu-btn" @click="handleSubmit('formCustom')">提 交</Button>
      </Form-item>
    </Form>
  </Modal>
</template>

<script>
  export default {
    computed: {
      Fpwd () { return this.$store.state.Fpwd }
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
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.DATA.passwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
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
        isShow: false,
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
          passwdCheck: [{validator: validatePassCheck, trigger: 'blur'}],
          code: [{validator: validateCode, trigger: 'blur'}]
        }
      }
    },
    watch: {
      isShow: 'Hide',
      Fpwd: 'Show'
    },
    methods: {
      Show () {
        if (this.Fpwd) {
          this.isShow = true
        }
      },
      Hide () {
        if (!this.isShow && this.Fpwd) {
          this.$store.commit('setFP', false)
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
