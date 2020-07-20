<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col>
        <el-card shadow="hover" class="mgb20" style="height:650px">
          <div class="user-info">
            <img src="@/assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">
                <el-input placeholder="编辑内容" v-model.trim="forms.inpTitleName"></el-input>
              </div>
              <!-- <div>超级会员</div> -->
            </div>
          </div>
          <div class="wrap-wat">
            <div class="userWrap">
              <div class="userleft">
                <div class="user-info-list">
                  姓名:
                  <el-input placeholder="编辑内容" v-model.trim="forms.inpTitleName"></el-input>
                </div>
                <div class="user-info-list">
                  英文名:
                  <span>
                    <!-- <el-input placeholder="请输入内容" v-model="forms.inpYin"></el-input> -->
                  </span>
                </div>
              </div>
              <div class="userRight">
                <div class="user-info-list">
                  邮箱:
                  <span>
                    <el-input placeholder="编辑内容" v-model.trim="forms.inpEailm"></el-input>
                  </span>
                </div>
                <div class="user-info-list">
                  电话:
                  <span>
                    <el-input placeholder="编辑内容" v-model.trim="forms.inpPhone"></el-input>
                  </span>
                </div>
              </div>
            </div>
            <div class="tag-group">
              <span class="tag-group__title">部门:</span>
              <el-tag
                v-for="item in data.organizations"
                :key="item.label"
                :type="item.type"
                effect="plain"
              >{{ item.organization_name }}</el-tag>
            </div>
            <div class="yh">
              <span>角色:</span>
              <el-checkbox-group v-model="checkedCities">
                <el-checkbox
                  v-for="(city) in cities"
                  :label="city"
                  :key="city.permission_group_ids"
                  :checked="city.is_checked === '1'? true : false"
                  @change="(isCheck)=>handelInputClick(isCheck,city)"
                >{{city.permission_group_name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="isStatus">
              用户状态:
              <el-switch
                v-model="status"
                active-value="0"
                inactive-value="1"
                active-text="启用"
                inactive-text="禁用"
              ></el-switch>
            </div>
            <el-row>
              <el-button type="primary" @click="handleReset">重置密码</el-button>
            </el-row>
          </div>
          <div class="btnFooter">
            <el-row>
              <el-button>取消</el-button>
              <el-button type="primary" @click="handleSubmitForm">确认</el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import passwrodAPI from '@/api/password.js'
import {
  getPermissionUserList,
  editUser,
  editUserGroup,
  getUserById
} from '@/api/workbench/user-list.js'
export default {
  data() {
    return {
      data: {},
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checkboxGroup1: [],
      checkboxGroup2: [],
      checkedCities: [],
      cities: [],
      items: [{ type: '', label: '标签一' }],
      status: '0',
      forms: {
        inpTitleName: '',
        inpName: '',
        inpYin: '',
        inpEailm: '',
        inpPhone: '',
        user_id: ''
      },
      permission_group_ids: []
    }
  },
  created() {
    this.fetchData()
  },

  computed: {
    ...mapState(['asm'])
  },
  methods: {
    handleReset() {
      passwrodAPI.oldPassword(this.$route.query.user_email).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            title: '成功',
            message: '重置密码成功',
            type: 'success'
          })
        }
      })
    },

    fetchData() {
      this.status = this.$route.query.disabled
      // 获取用户详情
      getUserById(this.$route.query.user_id).then(res => {
        const fetch = res.data

        if (fetch.code === 200) {
          this.forms = {
            inpTitleName: fetch.data.user_name,
            inpName: fetch.data.user_name,
            inpYin: fetch.data.en_name,
            inpEailm: fetch.data.user_email,
            inpPhone: fetch.data.user_phone_number,
            user_id: fetch.data.user_id
          }
        }
      })

      // 获取权限组包含选中状态
      getPermissionUserList(this.$route.query.user_id).then(res => {
        const fetch = res.data
        if (fetch.code === 200) {
          this.cities = fetch.data
          fetch.data.forEach(item => {
            if (item.is_checked === '1') {
              this.permission_group_ids.push(item.permission_group_id)
            }
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    // 提交修改用户信息表单
    handleSubmitForm() {
      /*  data = data
      user= data[user] */

      const data = {
        data: {
          user_phone_number: this.forms.inpPhone, // 电话
          user_email: this.forms.inpEailm, // 邮箱
          user_name: this.forms.inpTitleName, // 用户名
          // user_password: "", //用户名密码
          user_id: this.forms.user_id,
          is_disabled: this.status // 是否禁用,1.禁用
        }
      }

      // 编辑用户接口提交
      editUser(data).then(res => {
        if (res.status === 200) {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success'
          })
          this.$router.go(-1)
        } else {
          this.$notify({
            title: '警告',
            message: '提交失败',
            type: 'warning'
          })
        }
      })

      // 提交角色列表id控制用户权限
      editUserGroup(this.$route.query.user_id, this.permission_group_ids)
    },

    // 状态提交和删除
    handelInputClick(isCheck, city) {
      console.log('city', isCheck, city)
      if (isCheck) {
        this.permission_group_ids.push(city.permission_group_id)
      } else {
        this.permission_group_ids.findIndex((value, index) => {
          if (city.permission_group_id === value) {
            this.permission_group_ids.splice(index, 1)
          }
        })
      }
    }
  }
}
</script>

<style  scoped>
.isStatus {
  padding: 40px 0 40px 0;
}

.home >>> .el-input__inner {
  border: none;
  padding: 0;
}

.home >>> .el-input {
  width: 60%;
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid rgb(233, 227, 227);
  margin-bottom: 20px;
}
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 16px;
  color: rgb(136, 135, 135);
  line-height: 35px;
}

.user-info-list span {
  margin-left: 20px;
}

.mgb20 {
  margin-bottom: 40px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

.userWrap {
  display: flex;
}
.userleft {
  flex: 1;
}
.userRight {
  flex: 1;
}
.el-form-item >>> .el-form-item__content {
  margin: 20px !important;
}
.el-checkbox-group {
  width: 200px;
  margin-left: 20px;
}
.yh {
  display: flex;
  margin-top: 50px;
}
.yh >>> .el-checkbox-group[data-v-59e88c74] {
  width: 400px;
}

.yh >>> .el-checkbox {
  width: 100px;
}

.mgb20 {
  height: 100% !important;
}

.el-checkbox {
  padding-bottom: 10px;
}
.el-tag {
  margin-left: 20px;
}
.tag-group {
  margin-top: 50px;
}
.wrap-wat {
  margin-left: 20px;
}
.el-button--primary {
  width: 130px;
}
.el-row {
  margin-top: 20px;
}
.btnFooter {
  display: flex;
  justify-content: center;
}
.el-button {
  width: 130px;
  border-color: #409eff;
}
</style >
