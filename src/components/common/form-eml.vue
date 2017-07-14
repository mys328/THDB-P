<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style="text-align:center;">更改邮箱</p>
    <Form ref="formEmil" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
      <Form-item label="新邮箱:" prop="email">
        <Input size="large" v-model="DATA.email" placeholder="输入新邮箱地址"></Input>
      </Form-item>
      <Form-item label="账号密码:" prop="password">
        <Input type="password" size="large" v-model="DATA.password" placeholder="输入账号的密码"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" size="large" :loading="loadingC" long class="blu-btn" @click="handleSubmit('formEmil')">提 交</Button>
      </Form-item>
    </Form>
  </Modal>
</template>

<script>
  import XHR from '@/api'
  export default {
    computed: {
      Feml () { return this.$store.state.Feml }
    },
    data () {
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
      const validateEml = (rule, value, callback) => {
        XHR.OnlyEmail({email: value}).then((res) => {
          if (res.data.status !== 0) {
            return callback(new Error(res.data.msg))
          } else {
            callback()
          }
        })
      }
      return {
        isShow: false,
        loadingC: false,
        DATA: {
          password: '',
          email: ''
        },
        ruleCustom: {
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
            {validator: validateEml, trigger: 'blur'}
          ],
          password: [{required: true, validator: validatePass, trigger: 'blur'}]
        }
      }
    },
    watch: {
      isShow: 'Hide',
      Feml: 'Show'
    },
    methods: {
      Show () {
        if (this.Feml) {
          this.isShow = true
        }
      },
      Hide () {
        if (!this.isShow && this.Feml) {
          this.$store.commit('setFE', false)
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loadingC = true
            XHR.UpdataEmail(this.DATA).then((res) => {
              if (res.data.status === 0) {
                this.loadingC = false
                this.isShow = false
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
.fo-pwd-box{padding:20px 40px 0 0;}
.blu-btn{height: 44px; font-size: 16px;}
</style>
