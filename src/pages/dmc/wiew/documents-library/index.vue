<template>
  <div class="myDocments">
    <!-- 日期 -->
    <el-form :inline="true" ref="form" :model="searchMap" style="margin-top:20px;margin-left:10px">
      <el-form-item label="最后更新时间 : " ref="one">
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

      <!-- 搜索 -->
      <el-form-item prop="name">
        <div class="search">
          <el-input
            placeholder="按文件名或上传人名搜索"
            v-model.trim="searchMap.searchInput"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSeach"></el-button>
          </el-input>
        </div>
      </el-form-item>
    </el-form>

    <!-- 我的文档列表 -->
    <!-- 分页 -->
    <el-table :data="dmcs" style="width: 100%" :max-height="tableHeight" ref="table">
      <el-table-column prop="add_time" label="最后更新时间" width="180"></el-table-column>
      <el-table-column prop="title" label="文档名" width="180"></el-table-column>
      <el-table-column prop="user_name" label="发布人" width="280"></el-table-column>
      <el-table-column prop="explain" label="备注" width="280"></el-table-column>
      <el-table-column prop="img_sum" label="附件数" width="180"></el-table-column>
      <el-table-column prop="type" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDownloads(scope.row)" type="text" size="small">下载</el-button>
          <el-button @click="handleView(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="16"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  documentSearch,
  documentDownload,
  documentSelect
} from '@/api/documents'
export default {
  data() {
    return {
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 20, // 每页显示条数 10条
      value: '2',
      type: 0, // 请求接口状态
      dmcs: [],
      searchMap: {
        dateValue: '',
        searchInput: ''
      },
      tableHeight: 140
    }
  },
  created() {
    this.fetchData()
  },

  mounted() {
    // 列表自适应浏览器的bug
    this.$nextTick(function() {
      if (this.$refs['table'].$el) {
        this.tableHeight =
          window.innerHeight - this.$refs['table'].$el.offsetTop - 140
        // 监听窗口大小变化
        const self = this
        window.onresize = function() {
          self.tableHeight =
            window.innerHeight - self.$refs['table'].$el.offsetTop - 140
        }
      }
    })
    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  destroyed() {
    /* 移除 window.onresize*/
    window.onresize = ''
  },
  computed: {
    ...mapState(['dmc'])
  },
  methods: {
    // 查看数据
    handleView(row) {
      this.$store.commit('dmc/VIEW_DATA', row)
      this.$router.push('/documents-details')
    },

    // 请求数据
    fetchData() {
      // 查询文档数据 根据 1
      const data = {
        is_me: 0,
        page: '1'
      }

      documentSelect(data).then(res => {
        if (res.data.code === 200) {
          const fetch = res.data.data
          this.dmcs = fetch.data
        }
      })
    },

    // 通过id搜索用户
    handleSeach() {
      const type = (this.type = 0)
      this.searchData(type)
    },

    // 通过日期搜索
    handelBlur() {
      const type = (this.type = 1)
      this.searchData(type)
    },

    // 根据type搜索钱  接口
    searchData(type) {
      const data = {
        type: type,
        data: this.searchMap.searchInput,
        user_id: '',
        time: this.searchMap.dateValue
      }

      documentSearch(data).then(res => {
        const fetch = res.data
        console.log('fetch', fetch)
        if (fetch.code === 200) {
          this.dmcs = fetch.data.data
        }
      })
    },

    handleDownloads(row) {
      // 获取下载接口
      documentDownload(row.id).then(res => {
        const data = res.data
        const that = this

        // 获取到的是Blob数据流，我们需要将其转化成json格式才行
        const fileReader = new FileReader()
        fileReader.onload = function() {
          /* 异常进入的try */
          try {
            const jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
            if (jsonData.code === 3) {
              that.$message({
                message: jsonData.message,
                type: 'warning'
              })
            }
          } catch (err) { // 解析成对象失败，说明是正常的文件流
            const blob = new Blob([data], { type: 'application/zip' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a') // 创建a标签
            // link.style.display = 'none'
            link.href = url
            // document.body.appendChild(link)
            // link.download = res.data; // 重命名文件
            link.click()
            URL.revokeObjectURL(url) // 释放内存 */
          }
        }
        fileReader.readAsText(data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 时时更新显示的页码条数
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
    },
    // 时时更新当前的页的数据
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val

      const data = {
        is_me: 0,
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
.search >>> .el-button {
}
.myDocments >>> .el-pagination{
  text-align: center;
}
</style>
