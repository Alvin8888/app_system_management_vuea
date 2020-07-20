<template>
  <div class="libraryList">
    <!-- 新增 -->
    <!-- 菜单 f82e8233-ced9-4a30-ac1c-6f638a359486-->

    <!-- 条件搜索 -->
    <el-form :inline="true" ref="form" :model="searchMap" style="margin-top:20px;margin-left:10px">
      <el-form-item prop="name">
        <el-input v-model.trim="searchMap.name" @keyup.13.native="onFetchData" placeholder="请输入搜索内容"></el-input>
        <el-button type="primary" @click="onFetchData">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>

      <el-form-item label="仓库类型:" prop="warehouse_type">
        <el-select v-model="searchMap.warehouse_type" placeholder="全部" style="width:100px">
          <el-option key="0" label="虚拟仓" value="0"></el-option>
          <el-option key="1" label="发货仓" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="地区:" prop="country_name">
        <el-select v-model="searchMap.country_name" placeholder="全部" style="width:100px">
          <el-option  :label="item" :value="item" v-for="(item,index) of optionsCountrys" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据分析:" prop="status_bar">
        <el-select v-model="searchMap.status_bar" placeholder="全部" style="width:100px">
          <el-option key="1" label="用于数据分析" value="1"></el-option>
          <el-option key="2" label="不用于数据分析" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 列表  -->
    <!-- 拿到数据做假的分页 tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize) -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      stripe
      :max-height="tableHeight"
      ref="table"
    >
      <el-table-column label="仓库名称" width="200">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.warehouse_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="仓库类型" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.warehouse_type === '0' ? '虚拟仓库' : '发货仓' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="代号" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.warehouse_code }}</div>
        </template>
      </el-table-column>
      <el-table-column label="地区" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.country_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="邮编" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.warehouse_id }}</div>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.warehouse_address }}</div>
        </template>
      </el-table-column>

      <el-table-column label="是否参与数据分析" width="150">
        <template>
          <span>是</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 6, 10, 20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
import { getWarehouseList, getAreaList } from '@/api/supplier'

export default {
  data() {
    return {
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 20, // 每页显示条数 10条
      limit: 20,
      searchMap: {
        name: '',
        warehouse_type: '', // 仓库类型 0:虚拟仓库 1:发货仓(默认为空)
        country_name: '', // 國家
        province_name: '', // 地区/省
        city_name: '' // 城市
      },
      // 条件查询绑定条件值
      form: {
        options: [],
        region: '',
        status_bar: ''
      },
      optionsCountrys: [

      ],
      tableData: [],
      value: [],

      dialogFormVisible: false,
      tableHeight: 140 // 列表的高度
    }
  },
  created() {
    // 获取数据
    this.fetchData()
  },

  mounted() {
    // 列表自适应浏览器的bug
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 140

      // 监听窗口大小变化
      const self = this
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 140
      }
    })
    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },

  watch: {},
  methods: {
    /* 列表颜色 */
    handleChange(value) {
      console.log(value)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    // 时时更新显示的页码条数
    handleSizeChange(val) {
      console.log('total', val)
      this.pageSize = val
    },
    // 时时更新当前的页的数据
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.submitData(val)
    },

    fetchData() {
      // 初次获取数据
      this.submitData()

      // 获取仓库地区
      getAreaList().then(res => {
        if (res.status === 200) {
          this.optionsCountrys = res.data.data.countrys
        }
      })
    },

    onFetchData() {
      // 查询筛选列表
      this.submitData()
    },

    submitData(page) {
      const params = {
        keywords: this.searchMap.name, // 仓库名模糊查询
        warehouse_type: this.searchMap.warehouse_type, // 仓库类型 0:虚拟仓库 1:发货仓(默认为空)
        country_name: this.searchMap.country_name, // 國家
        /* province_name: this.searchMap.province_name, // 地区/省
        city_name: this.searchMap.city_name // 城市 */
        page: page || this.currentPage,
        limit: this.limit
      }

      // 获取仓库列表
      getWarehouseList(params).then(res => {
        const fetch = res.data
        if (fetch.code === 200) {
          this.tableData = fetch.data
        } else {
          this.tableData = []
        }
      })
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
.libraryList >>> .el-pagination{
  text-align: center;
}
.libraryList >>> .el-form > div:nth-child(1) .el-input {
  width: 250px;
}
.libraryList >>> .el-form > div:nth-child(1) .el-input__inner {
  border-radius: 6px 0 0 6px;
}
.libraryList >>> .el-form > div:nth-child(1) .el-button + .el-button {
  margin: 0;
  border-radius: 0 6px 6px 0;
}
.libraryList >>> .el-form > div:nth-child(1) .el-button {
  margin: 0;
  border-radius: 0;
}
</style>
