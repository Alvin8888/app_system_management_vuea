<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
      <h1 class="login-title">StaffX 2.0</h1>
      <el-form-item label="账号" prop="user_email">
        <el-input placeholder="输入手机号/或者邮箱" v-model.trim="form.user_email" @keyup.13.native="submitForm('form')"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_password">
        <el-input  type="password" placeholder="输入密码"   @keyup.13.native="submitForm('form')" v-model.trim="form.user_password" ></el-input>
      </el-form-item>
      <span class="wan-ji" @click="handleForgotPassword">忘记密码</span>
      <el-form-item>
        <el-button type="danger" @click="submitForm('form')">登录</el-button>
        <!-- <el-button type="danger" plain disabled>危险按钮</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_email: '',
        user_password: '',
        code: 0
      },
      rules: {
        user_email: [{ validator: this.validatePass, trigger: 'blur' }],
        user_password: [{ validator: this.validatePassWord, trigger: 'blur' }]
      },
      errorMsg: null,
      time: null
    }
  },
  mounted() {
    // 退出刷新一次,根据退出传过来的id
    if (this.$route.params.id === '1') {
      this.$router.go(0)
    }
  },
  created() {},

  methods: {
    submitEnter() {
      console.log('ones')
    },
    // 忘记密码
    handleForgotPassword() {
      this.$notify.info({
        title: '忘记密码',
        message: '请联系管理员（飞书昵称：lenguin）重置密码'
      })
    },

    // 验证密码以
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      }
      callback()
    },
    validatePassWord(rule, value, callback) {
      if (value === '') {
        callback(new Error('密码不能为空'))
      }
      callback()
    },

    submitForm(formName) {
      // 请求前报错信息清空
      // this.errorMsg  = null

      this.$refs[formName].validate(val => {
        if (val) {
          // 请求页面成功
          this.$store.dispatch('Login', this.form).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('UserInfo').then(res => {
                if (res.code === 200) {
                  this.$router.push('/')
                }
              })
            } else {
              // this.errorMsg  = "邮箱/密码错误"
              this.$notify({
                title: '登录失败',
                message: '邮箱/密码错误',
                type: 'warning'
              })
            }
          })
        } else {
          // 请求页面失败
          console.log('请求页面失败')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.9);
  /* background-color: pink; */
  padding: 30px;
  border-radius: 20px;
  /* margin: 300px auto; */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 5px 10px 10px rgb(41, 40, 40, 0.8);
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/1.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
}
.login-title {
  text-align: center;
  color: rgb(50, 50, 50);
  font-size: 30px;
}
.el-button--danger {
  width: 270px;
  margin-top: 20px;
}
.wan-ji {
  position: absolute;
  right: 30px;
  bottom: 107px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(126, 125, 125);
  cursor: pointer;
}
.wan-ji:hover {
  color: crimson;
}
</style>
