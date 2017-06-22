<template>
  <Modal v-model="isShow" width="440">
    <p slot="header" style="text-align:center;">更改密码</p>
    <Form ref="formCustom" :model="DATA" :rules="ruleCustom" :label-width="90" :label-font="14" class="fo-pwd-box">
      <Form-item label="绑定手机号：" :label-size="14">
        <Input type="text" size="large" v-model="DATA.tel" placeholder="输入已绑定手机号"></Input>
      </Form-item>
      <Form-item label="设置新密码：" prop="passwd">
        <Input type="password" size="large" v-model="DATA.passwd" placeholder="输入新密码"></Input>
      </Form-item>
      <Form-item label="确认密码：" prop="passwdCheck">
        <Input type="password" size="large" v-model="DATA.passwdCheck" placeholder="重复输入密码"></Input>
      </Form-item>
      <Form-item label="验证码：" prop="age">
        <Input type="text" size="large" v-model="DATA.age" number></Input>
      </Form-item>
      <Form-item>
        <Button type="primary" size="large" long class="blu-btn" @click="handleSubmit('formCustom')">提交</Button>
      </Form-item>
    </Form>
    <div slot="footer" class="ser-box-ft"><div></div></div>
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
          if (this.DATA.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck')
          }
          callback()
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
      const validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'))
        }
        // 模拟异步验证效果
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      return {
        isShow: false,
        DATA: {
          passwd: '',
          tel: '',
          passwdCheck: '',
          age: ''
        },
        ruleCustom: {
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          age: [
            { validator: validateAge, trigger: 'blur' }
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
.ser-box-ft{ width: 440px;
    height: 30px;
    position: absolute;
    bottom: 0;
    background: #fff;
    left: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;}
</style>
