<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col>
        <el-card shadow="hover" class="mgb20">
          <div class="user-info">
            <img src="@/assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{data.user_email}}</div>
            </div>
          </div>
          <div class="userWrap">
            <div class="userleft">
              <div class="user-info-list">
                姓名:
                <span>{{data.user_name}}</span>
              </div>
              <div class="user-info-list">
                邮箱:
                <span>{{data.user_email}}</span>
              </div>
              <div class="user-info-list">
                部门:
                <span
                  v-for="(item,index) of data.organizations"
                  :key="index"
                  style="display: inline-block;"
                >{{item}}</span>
              </div>
            </div>
            <div class="userRight">
              <div class="user-info-list">
                英文姓名:
                <span>{{data.en_name}}</span>
              </div>
              <div class="user-info-list">
                电话:
                <span>{{data.user_phone_number}}</span>
              </div>
              <div class="user-info-list">
                角色:
                <span
                  v-for="(item,index) of data.userGroups"
                  :key="index"
                  style="display: inline-block;"
                >{{item.permission_group_name}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserById } from '@/api/workbench/user-list'
export default {
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    fetchData() {
      getUserById(this.user.user.user_id).then(res => {
        const fetch = res.data
        this.data = fetch.data
      })
    }
  }
}
</script>

<style  scoped>
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
  flex: 0.4;
}
.userRight {
  flex: 0.4;
}
</style >
