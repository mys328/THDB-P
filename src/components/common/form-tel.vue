<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style="text-align:center;">更改手机号</p>
    <Form ref="formTels" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
      <Form-item label="新手机号:" :label-size="14" prop="phone">
        <Input type="text" size="large" v-model="DATA.phone" placeholder="输入新手机号" :maxlength="maxlength" number></Input>
      </Form-item>
      <Form-item label="账号密码:" prop="password">
        <Input type="password" size="large" v-model="DATA.password" placeholder="输入账号的密码"></Input>
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
        <Button type="primary" size="large" :loading="loadingG" long class="blu-btn" @click="handleSubmit('formTels')">提 交</Button>
      </Form-item>
    </Form>
  </Modal>
</template>

<script>
  import XHR from '@/api'
  export default {
    computed: {
      Ftel () { return this.$store.state.Ftel }
    },
    data () {
      const validateTel = (rule, value, callback, options) => {
        if (value === '') {
          return callback(new Error('请输入手机号'))
        }
        if (!Number.isInteger(value)) {
          return callback(new Error('请输入数字值'))
        }
        if (!/^1[3|4|5|7|8]\d{9}$/.test(value)) {
          return callback(new Error('手机号格式错误'))
        }
        XHR.OnlyPhone({phone: value}).then((res) => {
          if (res.data.status !== 0) {
            return callback(new Error(res.data.msg))
          } else {
            callback()
          }
        })
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (value.length < 6) {
            callback(new Error('密码不能少于6位'))
          } else {
            callback()
          }
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('验证码不能为空'))
        }
        if (value.length < 4) {
          return callback(new Error('验证码必需4位字符'))
        }
        callback()
      }
      return {
        isShow: false,
        maxlength: 11,
        loadingG: false,
        loadingC: false,
        disabledC: false,
        comTim: 60,
        btnTxt: '发送验证码', // '发送验证码', '发送中…', '60秒后重发', '重发验证码'
        loadingS: false,
        DATA: {
          password: '',
          phone: '',
          code: ''
        },
        ruleCustom: {
          phone: [{validator: validateTel, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          code: [{validator: validateCode, trigger: 'blur'}]
        }
      }
    },
    watch: {
      isShow: 'Hide',
      Ftel: 'Show'
    },
    methods: {
      Show () {
        if (this.Ftel) {
          this.isShow = true
        }
      },
      Hide () {
        if (!this.isShow && this.Ftel) {
          this.$store.commit('setFT', false)
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loadingC = true
            XHR.UpdataTel(this.DATA).then((res) => {
              if (res.data.status === 0) {
                this.loadingC = false
                this.isShow = false
                this.$Notice.success({
                  title: res.data.msg,
                  desc: ''
                })
                this.handleReset('formTels')
              } else {
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
        if (/^1[3|4|5|7|8]\d{9}$/.test(this.DATA.phone)) {
          this.loadingC = true
          this.btnTxt = '发送中…' // '60秒后重发', '重发验证码'
          XHR.SendPC({phone: this.DATA.phone})
          .then((res) => {
            if (res.data.status === 0) {
              this.disabledC = true
              this.loadingC = false
              this.$Message.success('发送成功!')
              this.btnTxt = '60秒后重发'
              this.comDow()
            } else {
              this.loadingC = false
              this.$Message.success(res.data.msg)
            }
          })
        } else {
          this.$Message.warning('请输入正确手机号')
        }
      }

    }
  }
</script>

<style lang="less" scoped>
.fo-pwd-box{padding:20px 40px 0 0;}
.blu-btn{height: 44px; font-size: 16px;}
</style>
