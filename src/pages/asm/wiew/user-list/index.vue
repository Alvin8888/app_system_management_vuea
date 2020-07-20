<template>
  <div class="pagination">
    <!-- 条件搜索 -->
    <el-form :inline="true" ref="form" :model="searchMap" style="margin-top:20px;margin-left:10px">
      <el-form-item prop="keywords">
        <el-input v-model.trim="searchMap.keywords" placeholder="请输入搜索内容" @keyup.13.native="handleQuery('form')"></el-input>
        <el-button type="primary" @click="handleQuery('form')">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <el-form-item label="部门:" prop="options">
        <el-cascader
          :options="options"
          :props="optionProps"
          v-model="searchMap.options"
          @change="handleDep"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="角色:" prop="query">
        <el-select v-model="searchMap.query" placeholder="请选择">
          <el-option
            v-for="item in roltData"
            :key="item.permission_group_id"
            :label="item.permission_group_name"
            :value="item.permission_group_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="value">
        <el-select v-model="searchMap.value" placeholder="全部" style="width:100px">
          <el-option key="1" label="启用" value="2"></el-option>
          <el-option key="2" label="禁用" value="1"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="wrapper">
      <el-table :data="lista" style="width: 100%" :max-height="tableHeight" border ref="table">
        <el-table-column prop="user_name" label="姓名(英文名)" width="120"></el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            <div
              v-for="(item) of scope.row.organizations"
              :key="item.organization_id"
            >{{item.organization_name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="user_email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="user_phone_number" label="电话" width="120"></el-table-column>
        <el-table-column prop="user_phone_number" label="手机" width="120"></el-table-column>
        <el-table-column prop="permission_groups" label="角色" width="240"></el-table-column>
        <el-table-column prop="updated_at" label="上次登录时间" width="200"></el-table-column>

        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.disabled === '0' ? '启用' : '禁用' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <el-pagination

      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      lista: [],
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 16, // 每页显示条数 20条
      limit: 16,
      organization_id: '', // id
      searchMap: {
        keywords: '', // 邮箱
        query: '', // 角色
        options: '', // 部门
        value: '', // 值

        organization_id: '',
        permission_group_ids: '',
        birthday: ''
      }, // 条件查询绑定条件值
      form: {},
      optionProps: {
        checkStrictly: true,
        value: 'organization_id',
        label: 'organization_name',
        children: 'children'
      },
      options: [],
      roltData: [],
      dialogFormVisible: false,
      tableHeight: 140, // 列表的高度
      setheader: null
    }
  },
  created() {
    this.fetchData()
  },
  activated() {},

  mounted() {
    // 列表自适应浏览器的bug
    if (this.$route.path === '/user-list') {
      this.$nextTick(function() {
        this.tableHeight =
          window.innerHeight - this.$refs['table'].$el.offsetTop - 140

        // 监听窗口大小变化
        const self = this
        this.setheader = function() {
          self.tableHeight =
            window.innerHeight - self.$refs['table'].$el.offsetTop - 140
        }
        window.onresize = this.setheader
      })
    }

    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  destroyed() {
    /* 移除  window.onresize*/
    window.onresize = ''
  },
  computed: {
    ...mapState(['user', 'asm'])
  },

  methods: {

    // 时时更新显示的页码条数
    handleSizeChange(val) {
      console.log(val)
      // this.pageSize = val;
    },
    // 时时更新当前的页的数据
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.dataFunc(val)
    },

    handleDep(value) {
      const arr = []
      const concat = arr.concat(value)
      const id = concat.pop()
      this.organization_id = id
    },

    handleQuery(forms) {
      this.$refs[forms].validate(valid => {
        if (valid) {
          const from = {
            keywords: this.searchMap.keywords, // 邮箱电话模糊查询
            organization_id: this.searchMap.options, // 部门id等于查询
            permission_group_ids: this.searchMap.query, // 角色id列表
            is_disabled: this.searchMap.value // 是否禁用(1.禁用;2.启用)
            // page: this.pageSize, // 页码
            // limit: this.lista.length  //页总数
          }

          // 请求后台数据
          this.$store.dispatch('asm/UserList', from).then(res => {
            if (res.code == 200) {
              this.lista = res.data
            } else {
              this.lista = []
            }
          })
        }
      })
    },

    dataFunc(currentPage) {
      const from = {
        keywords: '', // 邮箱电话模糊查询
        organization_id: this.organization_id, // 部门id等于查询
        permission_group_ids: this.searchMap.query, // 角色id列表
        /* permission_group_ids: roleId, //角色id列表 */
        is_disabled: '', // 是否禁用(1.禁用;2.启用)
        page: currentPage, // 页码
        limit: this.limit // 页总数
      }

      // 请求后台数据
      this.$store.dispatch('asm/UserList', from).then(res => {
        if (res.code == 200) {
          this.lista = res.data

          // this.total = this.lista.length;
        }
      })
    },

    fetchData() {
      // vuex中的list中拉去数据
      this.value = this.asm.from.value

      this.dataFunc(this.currentPage)

      // 请求管理列表数据
      this.$store.dispatch('asm/Organizations').then(res => {
        this.options = res.data
      })

      // 请求角色列表数据
      this.$store
        .dispatch('asm/RoleList', {
          is_disabled: '2'
          /*  page: this.currentPage,
          limit: this.total */
        })
        .then(res => {
          if (res.code === 200) {
            this.roltData = res.data
          }
        })
    },

    // 用户编辑
    handleEdit(row) {
      console.log('row', row)
      this.$router.push({ name: 'UserDetails', query: { user_id: row.user_id, disabled: row.disabled, user_email: row.user_email }})
    },

    // 重置按钮
    resetForm(fromName) {
      this.$refs[fromName].resetFields()
      this.fetchData()
    }
  },
  filters: {}
}
</script>

<style scoped>
.wrapper {
  height: calc(100% - 40px);
}
.pagination >>> .el-pagination{
  text-align: center;
}
.pagination >>> .el-form > div:nth-child(1)  .el-input{
  width:250px
}
.pagination >>> .el-form > div:nth-child(1) .el-input__inner{
  border-radius: 6px 0 0 6px;
}
.pagination >>> .el-form > div:nth-child(1) .el-button+.el-button{
  margin: 0;
 border-radius: 0 6px 6px 0;
}
.pagination >>> .el-form  > div:nth-child(1) .el-button{
  margin: 0;
  border-radius: 0;
}

</style>
