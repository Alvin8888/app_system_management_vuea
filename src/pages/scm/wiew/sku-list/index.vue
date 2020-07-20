<template>
  <div class="skuList">
    <!-- 新增 -->
    <!-- 菜单 f82e8233-ced9-4a30-ac1c-6f638a359486-->

    <!-- 条件搜索 -->
    <el-form
      :inline="true"
      ref="form"
      :rules="rules"
      :model="searchMap"
      style="margin-top:20px;margin-left:10px"
    >
      <el-form-item prop="name">
        <el-input v-model.trim="searchMap.name" placeholder="请输入搜索内容"></el-input>
        <el-button type="primary" @click="submitForm('form')">查询</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
      <el-form-item label="品类筛选:">
        <div class="block">
          <el-cascader
            v-model="barandValue"
            :options="brandData"
            :props="optionProps"
            @change="handleChange"
          ></el-cascader>
        </div>
      </el-form-item>
      <el-form-item label="SKU种类:" prop="sku">
        <el-select v-model="searchMap.sku" placeholder="全部" style="width:100px">
          <el-option key="1" label="组装SKU" value="1"></el-option>
          <el-option key="2" label="库存SKU" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新旧:" prop="choose">
        <el-select v-model="searchMap.choose" placeholder="全部" style="width:100px">
          <el-option key="1" label="新商品" value="1"></el-option>
          <el-option key="2" label="旧商品" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 列表   -->
    <!-- 自定义分页 tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize) -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      stripe
      ref="table"
      :max-height="tableHeight"
    >
      <el-table-column label="SKU" width="300">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.commodity_repertory_sku }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SKU种类" width="180">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
          >{{ scope.row.commodity_repertory_sku_type === 1 ?'组装SKU':'库存SKU' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="名称display name" width="280">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.commodity_display_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="品类class" width="380">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">{{ scope.row.category_name }}</div>
        </template>
      </el-table-column>
      <el-table-column label="大/小货" width="100">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
          >{{ scope.row.commodity_scale_type ===1 ?'大货':"小货" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="新旧商品" width="100">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
          >{{ scope.row.commodity_new_old === 1?"新货":'旧货'}}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 6,10, 20, 50, 100, 200]"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
import { getCommodityList } from '@/api/supplier'
export default {
  data() {
    return {
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 6, // 每页显示条数 10条
      limit: 20,
      searchMap: {
        name: '',
        sku: '',
        category_id: '',
        choose: ''
      }, // 条件查询绑定条件值

      barandValue: [],
      brandData: [],
      tableData: [],
      optionProps: {
        value: 'category_id',
        label: 'category_name',
        // expandTrigger: "hover",
        checkStrictly: true,
        children: 'children'
      },
      rules: {
        /*  name: [
          { required: true, message: "请输入搜索的商品", trigger: "blur" },
          { min: 0, max: 10, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ] */
      },

      valueArr: [],
      dialogFormVisible: false,
      tableHeight: 140 // 列表的高度
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    // 列表自适应浏览器的bug
    if (this.$route.path === '/sku-list') {
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
  methods: {
    handleClick(row) {
      console.log('index', row)
      this.$store.commit('scm/VIEW_ROW', row)
      this.$router.push('/sku-details')
    },

    /* 列表颜色 */
    handleChange(value) {
      // 合并数组
      const arr = []
      const concat = arr.concat(value)

      const id = concat.pop()
      this.searchMap.category_id = id
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
      this.submitData(val)
    },

    fetchData() {
      // 获取商品列表
      this.submitData()

      // 品类列表
      this.$store.dispatch('scm/CategoryList').then(res => {
        if (res.code === 200) {
          this.brandData = res.data
        }
      })
    },

    // 查询筛选接口
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 接口获取
          this.submitData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 获取商品接口
    submitData(page) {
      const params = {
        keywords: this.searchMap.name, // 商品sku模糊查询
        category_id: this.searchMap.category_id, // 品类ID
        sku_type: this.searchMap.sku, // 1：组装SKU;2：库存SKU,默认为空
        commodity_new_old: this.searchMap.choose, // 1:新货;2:旧货,默认为空
        page: page || this.currentPage, // 页码
        limit: this.limit // 单页条数,默认20
      }

      // 获取商品数据接口
      getCommodityList(params).then(res => {
        const fetch = res.data
        if (fetch.code === 200) {
          this.tableData = fetch.data
        } else if (fetch.code === 315) {
          this.tableData = []
        }
      })
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.barandValue = []
      this.searchMap.category_id = ''
      // 重置操作
      this.submitData()
    }
  },
  filters: {}
}
</script>

<style scoped>
.skuList >>> .el-pagination{
  text-align: center;
}

.skuList >>> .el-form > div:nth-child(1) .el-input {
  width: 250px;
}
.skuList >>> .el-form > div:nth-child(1) .el-input__inner {
  border-radius: 6px 0 0 6px;
}
.skuList >>> .el-form > div:nth-child(1) .el-button + .el-button {
  margin: 0;
  border-radius: 0 6px 6px 0;
}
.skuList >>> .el-form > div:nth-child(1) .el-button {
  margin: 0;
  border-radius: 0;
}
</style>
