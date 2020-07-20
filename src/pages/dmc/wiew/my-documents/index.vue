<template>
  <div class="myDocments">
    <!-- 日期 -->
    <el-form :inline="true" ref="form" :model="searchMap" style="margin-top:20px;margin-left:10px">
      <el-form-item label="查看选项 : ">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最后更新时间 : ">
        <div class="block">
          <el-date-picker
            v-model="searchMap.dateValue"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
            @blur="handelBlur"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handeleNew">新建</el-button>
      </el-form-item>
    </el-form>
    <!-- 时间轴 -->
    <!--     <div class="zou">
      <el-row>
        <el-button type="primary" plain>时间轴</el-button>
        <el-button type="primary">清单</el-button>
      </el-row>
    </div>-->
    <!-- 我的文档列表 -->
    <div class="btnDelete">
      <el-table
        :data="dmcs"
        style="width: 100%"
        :max-height="tableHeight"
        ref="table"
      >
        <el-table-column prop="add_time" label="最后更新时间" width="180"></el-table-column>
        <el-table-column prop="title" label="文档名" width="280"></el-table-column>
        <el-table-column prop="explain" label="备注" width="280"></el-table-column>
        <el-table-column prop="img_sum" label="附件数" width="380"></el-table-column>
        <el-table-column prop="type" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEidte(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleDeleteDocument(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  documentFilter,
  documentSearch,
  documentDel,
  documentSelect
} from '@/api/documents'

export default {
  inject: ['reload'],
  data() {
    return {
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 20, // 每页显示条数 10条
      limit: 16,
      value: '',
      dmcs: [],
      options: [
        {
          value: '0',
          label: '不看空文档'
        },
        {
          value: '1',
          label: '只看空文档'
        }
      ],
      value1: '',
      value2: '',
      searchMap: {
        dateValue: '',
        searchInput: ''
      },
      tableHeight: 140 // 列表的高度
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    value(newName) {
      this.updatedData(newName)
    }
  },
  computed: {
    ...mapState(['dmc'])
  },
  mounted() {
    // 列表自适应浏览器的bug
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs['table'].$el.offsetTop - 140

      // 监听窗口大小变化
      const self = this
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs['table'].$el.offsetTop - 140
      }
    })
    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  destroyed() {
    /* 移除 window.onresize*/
    window.onresize = ''
  },
  methods: {
    // vuex中拉取数据
    fetchData() {
      // 查询文档数据 根据 1
      const data = {
        is_me: 1,
        page: 1
      }

      documentSelect(data).then(res => {
        if (res.data.code === 200) {
          const fetch = res.data.data
          this.dmcs = fetch.data
        }
      })
    },

    // 筛选更新数据
    updatedData(newName) {
      // 我的文档筛选
      documentFilter(newName).then(res => {
        const fetch = res.data
        if (fetch.code === 200) {
          const data = fetch.data
          this.dmcs = data.data
        }
      })
    },

    // 通过日期搜索
    handelBlur() {
      this.searchData(2)
    },

    // 根据type搜索  接口
    searchData(type) {
      const data = {
        type: type,
        data: '',
        user_id: '',
        time: this.searchMap.dateValue
      }

      documentSearch(data).then(res => {
        const fetch = res.data

        if (fetch.code === 200) {
          this.dmcs = fetch.data.data
          this.total = fetch.data.data.length
        }
      })
    },

    // 删除文档
    handleDeleteDocument(row, index) {
      console.log('row', row, index)

      this.$confirm(`此操作将永久删除 ( ${row.title} ) , 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击删除文档
          const data = {
            doc_id: row.id
          }

          // 删除接口
          documentDel(data).then(res => {
            if (res.status === 200) {
              /* 强制刷新 */
              // this.reload();
              this.$router.go(0)

              this.$notify({
                title: '成功',
                message: `删除成功 ( ${row.title} )`,
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          this.$notify({
            title: '警告',
            message: '这是一条警告的提示消息',
            type: 'warning'
          })
        })
    },

    // 新建
    handeleNew() {
      this.$router.push('/new-documents')
    },

    // 编辑
    handleEidte(row) {
      this.$store.commit('dmc/USER_DATA', row)
      this.$router.push('/editor-documents')
    },

    // 查看
    handleClick(row) {
      console.log('row', row)
      this.$store.commit('dmc/VIEW_DATA', row)
      this.$router.push('/documents-details')
    },

    // 时时更新显示的页码条数
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val
    },
    // 时时更新当前的页的数据
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val
      // 查询文档数据 根据 1
      const data = {
        is_me: 1,
        page: val
      }
      documentSelect(data).then(res => {
        if (res.data.code === 200) {
          const fetch = res.data.data
          this.dmcs = fetch.data
        }
      })
    }
  }
}
</script>

<style scoped>
.myDocments {
}
.zou {
  margin-left: 10px;
}
.btnDelete >>> .el-button--text:nth-child(3) span {
  color: #f56c6c;
}
.myDocments >>> .el-pagination{
  text-align: center;
}
</style>
