<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style="text-align:center;">更改邮箱</p>
    <Form ref="formTels" :model="DATA" :rules="ruleCustom" :label-width="100" class="fo-pwd-box">
      <Form-item label="新邮箱:" prop="mail">
        <Input size="large" v-model="DATA.mail" placeholder="输入新邮箱地址"></Input>
      </Form-item>
      <Form-item label="账号密码:" prop="passwd">
        <Input type="password" size="large" v-model="DATA.passwd" placeholder="输入账号的密码"></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" size="large" long class="blu-btn" @click="handleSubmit('formTels')">提 交</Button>
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
      return {
        isShow: false,
        loadingS: false,
        DATA: {
          passwd: '',
          mail: ''
        },
        ruleCustom: {
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          passwd: [{required: true, validator: validatePass, trigger: 'blur'}]
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
