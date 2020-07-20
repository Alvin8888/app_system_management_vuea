<template>
  <div class="v-pw">
    <h2>修改密码</h2>
    <!-- 修改密码表单 -->

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:400px"
    > <span class="spans">如忘记密码,请联系管理员进行重置</span>
      <el-form-item  prop="old_password" class="inputOne">
        <el-input   type="password" v-model.trim="ruleForm.old_password" placeholder="请输入当前密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input type="password" v-model.trim="ruleForm.password" placeholder="设置6至20位登录密码" maxlength="21" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item   prop="confirm_password">
        <el-input type="password" v-model.trim="ruleForm.confirm_password" @keyup.13.native="submitForm('ruleForm')" placeholder="请再次输入登录密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import passwrodAPI from '@/api/password'
import * as validatorUtil from '@/utlis/validatorTools'
export default {
  data() {
    return {
      ruleForm: {
        old_password: '',
        password: '',
        confirm_password: ''
      },
      rules: {
        old_password: [
          { required: true, message: '初始密码,不能为空', trigger: 'blur' }
        /*  { validator: valiOlddatePass, trigger: "blur" } */
        ],
        password: [
          {
            required: true,
            message: '修改密码,不能为空',
            trigger: 'blur'
          }
        ],
        confirm_password: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' }

        ]
      }
    }
  },

  beforeUpdate() {
    this.rules = {
      old_password: [
        { message: '请输入当前密码,不能为空', trigger: 'blur' }
        /*  { validator: valiOlddatePass, trigger: "blur" } */
      ],
      password: [
        {
          message: '修改密码,不能为空',
          trigger: 'blur'
        },
        { validator: validatorUtil.ValidateNuber('密码', this.ruleForm.password), trigger: 'blur' }
      ],
      confirm_password: [
        { validator: validatorUtil.ValidateRepeat('密码', this.ruleForm.password), trigger: 'blur' }

      ]
    }
  },
  methods: {
    // 提交修改密码表单
    submitForm(nameForm) {
      this.$refs[nameForm].validate(val => {
        if (val) {
          passwrodAPI
            .updatePassword(
              this.ruleForm.password,
              this.ruleForm.old_password
            )
            .then(res => {
              const resp = res.data
              this.$message({
                message: resp.message,
                type: resp.flag ? 'success' : 'warning'
              })
              if (resp.code == 200) {
                this.handleLogout()
              }
            })
        }
      })
    },
    /* 退出系统 */
    handleLogout() {
      this.$store.dispatch('UserLogout').then(res => {
        if (res.code) {
          this.$router.push('/login')
        } else {
          this.$message({
            message: '退出不成功',
            type: 'waring'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.v-pw {
  margin-top: 100px;
}
.demo-ruleForm {
  margin: 0 auto;
}
h2 {
  text-align: center;
}
.demo-ruleForm >>> .spans{

    position: relative;
    left: 415px;
    top: 30px;
    font-size: 13px;
    color: #909399;
}
.v-pw >>> .el-button{
  padding: 10px 137px;
}
</style>
