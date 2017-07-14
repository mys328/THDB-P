<template>
  <Form ref="formCustom" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
    <Form-item label="用户名:" :label-size="14" prop="username">
      <Input type="text" size="large" v-model="DATA.username" placeholder="输入用户名" :maxlength="maxlength"></Input>
    </Form-item>
    <Form-item label="密码:" prop="password">
      <Input type="password" size="large" v-model="DATA.password" placeholder="输入密码"></Input>
    </Form-item>
    <Form-item label="确认密码:" prop="re_pass">
      <Input type="password" size="large" v-model="DATA.re_pass" placeholder="输入确认密码"></Input>
    </Form-item>
    <Form-item style="height:20px;">
    </Form-item>
    <div class="div-line">
      <span>绑定个人信息</span>
    </div>
    <Form-item label="绑定手机号:" :label-size="14" prop="phone">
      <Input type="text" size="large" v-model="DATA.phone" placeholder="输入绑定手机号" :maxlength="maxlength" number></Input>
    </Form-item>
    <Form-item label="验证码:" prop="code">
      <Input type="text" size="large" v-model="DATA.code" placeholder="输入验证码" :maxlength="maxCode">
        <span slot="append">
          <Button type="ghost" :loading="loadingC" :disabled="disabledC" @click="callCode">
            <span>{{btnTxt}}</span>
          </Button>
        </span>
      </Input>
    </Form-item>
    <Form-item label="邮箱:" :label-size="14" prop="email">
      <Input type="text" size="large" v-model="DATA.email" placeholder="输入绑定邮箱"></Input>
    </Form-item>
    <Form-item style="margin-bottom: 10px;">
      <Checkbox v-model="is_ok" style="margin:0 4px;">我已阅读</Checkbox>
      <a href="serve.html" target="_blank">《服务协议》</a>
    </Form-item>
    <Form-item>
      <Button type="primary" :loading="loadingG" size="large" long class="blu-btn" @click="handleSubmit('formCustom')" :disabled="disabledG">注 册</Button>
    </Form-item>
  </Form>
</template>

<script>
  import XHR from '@/api'
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
        }
        XHR.OnlyPhone({phone: value}).then((res) => {
          if (res.data.status !== 0) {
            return callback(new Error(res.data.msg))
          } else {
            callback()
          }
        })
      }
      const validateName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入用户名'))
        } else {
          if (!/^[A-Za-z0-9_\u4e00-\u9fa5]{3,16}$/.test(value)) {
            return callback(new Error('用户名不规范'))
          }
          XHR.OnlyUser({username: value}).then((res) => {
            if (res.data.status !== 0) {
              return callback(new Error(res.data.msg))
            } else {
              callback()
            }
          })
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入密码'))
        } else {
          if (value.length < 6) {
            return callback(new Error('密码不能少于6位'))
          } else {
            callback()
          }
        }
      }
      const validateOkPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请再次输入密码'))
        }
        if (value !== this.DATA.password) {
          return callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      const validateEml = (rule, value, callback) => {
        XHR.OnlyEmail({email: value}).then((res) => {
          if (res.data.status !== 0) {
            return callback(new Error(res.data.msg))
          } else {
            callback()
          }
        })
      }
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('验证码不能为空'))
        }
        if (value.length < 4) {
          return callback(new Error('验证码必需4位字符'))
        }
        XHR.VerCode({phone: this.DATA.phone, code: value})
        .then((res) => {
          if (res.data.status !== 0) {
            return callback(new Error(res.data.msg))
          } else {
            callback()
          }
        })
      }
      return {
        maxlength: 11,
        maxCode: 4,
        loadingG: false,
        disabledG: false,
        loadingC: false,
        disabledC: false,
        is_ok: true,
        comTim: 60,
        btnTxt: '发送验证码', // '发送验证码', '发送中…', '60秒后重发', '重发验证码'
        loadingS: false,
        DATA: {
          username: '',
          password: '',
          re_pass: '',
          phone: '',
          email: '',
          code: '',
          is_ok: 1
        },
        ruleCustom: {
          username: [{required: true, validator: validateName, trigger: 'blur'}],
          password: [{required: true, validator: validatePass, trigger: 'blur'}],
          re_pass: [{required: true, validator: validateOkPass, trigger: 'blur'}],
          phone: [{required: true, validator: validateTel, trigger: 'blur'}],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
            {validator: validateEml, trigger: 'blur'}
          ],
          code: [{required: true, validator: validateCode, trigger: 'blur'}]
        }
      }
    },
    watch: {
      is_ok: 'isGo'
    },
    methods: {
      isGo () {
        if (this.is_ok) {
          this.disabledG = false
        } else {
          this.disabledG = true
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loadingG = true
            XHR.Regs(this.DATA).then((res) => {
              if (res.data.status === 0) {
                this.loadingG = false
                this.$store.commit('setLogBox', false)
                this.$Notice.success({
                  title: res.data.msg,
                  desc: ''
                })
              } else {
                this.$Notice.error({
                  title: res.data.msg,
                  desc: ''
                })
              }
            })
            // this.$Message.success('提交成功!')
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
.div-line{ position: absolute;display: block;width: 100%;top: 262px; left: 0; padding: 0 16px;
  span{display: block; margin: 0 auto; width: 100px; height: 30px; border:1px solid #eee; text-align: center; line-height: 30px; border-radius: 20px; background-color: #fff;position: relative; z-index: 5;}
}
.div-line:after{content: ''; display: block; height: 3px; width: 100%;border-top: 1px solid #eee;position: relative; top: -14px; left: 0; z-index: 1;}
</style>
