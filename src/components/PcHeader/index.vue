/* eslint-disable vue/return-in-computed-property */
<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse">
      <div class="collapse-btn" @click="collapseChage">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
      </div>
      <div class="logo">StaffX 2.0</div>
    </div>

    <div class="line">
      <header-nav />
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{data.user_email}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="a">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 修改密码表单 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            style="width:340px"
            label-position="right"
          >
            <el-form-item prop="old_password">
              <el-input
                type="password"
                v-model="ruleForm.old_password"
                placeholder="请输入当前密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                placeholder="设置6至20位登录密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="confirm_password">
              <el-input
                type="password"
                v-model="ruleForm.confirm_password"
                placeholder="请再次输入登录密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '@/common/bus'
import HeaderNav from './headerNav'
import { mapState } from 'vuex'
import passwrodAPI from '@/api/password.js'
import * as validatorUtil from '@/utlis/validatorTools'
export default {
  inject: ['reload'],
  data() {
    return {
      collapse: false,
      fullscreen: false,
      message: 2,
      activeIndex: '1',

      data: null,
      ruleForm: {
        old_password: '',
        password: '',
        confirm_password: ''
      },
      rules: {},
      dialogFormVisible: false
    }
  },
  created() {
    this.data = this.user.user
    this.fetchData()
  },
  components: {
    HeaderNav
  },
  computed: {
    ...mapState(['user', 'asm']),

    username() {
      const username = localStorage.getItem('ms_username')
      return username || this.name
    }
  },
  beforeUpdate() {
    this.rules = {
      old_password: [
        { required: true, message: '请输入当前密码,不能为空', trigger: 'blur' }
        /*  { validator: valiOlddatePass, trigger: "blur" } */
      ],
      password: [
        {
          required: true,
          message: '修改密码,不能为空',
          trigger: 'blur'
        },
        {
          required: true,
          validator: validatorUtil.ValidateNuber(
            '密码',
            this.ruleForm.password
          ),
          trigger: 'blur'
        }
      ],
      confirm_password: [
        {
          required: true,
          validator: validatorUtil.ValidateRepeat(
            '密码',
            this.ruleForm.password
          ),
          trigger: 'blur'
        }
      ]
    }
  },

  methods: {
    fetchData() {},

    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },

    // 用户名下拉菜单选择事件
    handleCommand(command) {
      switch (command) {
        case 'a':
          // 修改密码
          this.handleModifyPassword()
          break
        case 'b':
          // 退出系统
          this.handleLogout()
          break
      }

      /* if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      } */
    },

    // 提交修改密码表单
    submitForm(nameForm) {
      this.$refs[nameForm].validate(val => {
        if (val) {
          console.log('验证成功')
          passwrodAPI
            .updatePassword(this.ruleForm.password, this.ruleForm.old_password)
            .then(res => {
              const resp = res.data
              this.$message({
                message: resp.message,
                type: resp.flag ? 'success' : 'warning'
              })
              if (resp.code === 200) {
                this.handleLogout()
              }
            })
        } else {
          return false
        }
      })
    },

    /* 修改密码 */
    handleModifyPassword() {
      this.dialogFormVisible = !this.dialogFormVisible

      // 是异步的,之后执行
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields()
      })
    },

    /* 退出系统 */
    handleLogout() {
      this.$store.dispatch('UserLogout').then(res => {
        if (res.code === 200) {
          this.$router.push({ name: 'login', params: { id: '1' }})
        } else {
          this.$message({
            message: '退出不成功',
            type: 'waring'
          })
        }
      })
    },

    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    // 全屏事件
    handleFullScreen() {
      const element = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}

.collapse {
  width: 100%;
}

.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  position: absolute;
  right: 10px;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  /* height: 30px; */
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: 19px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}

.line {
  position: absolute;
  left: 300px;
}

.header >>> .el-button {
  padding: 10px 105px;
}
</style>
