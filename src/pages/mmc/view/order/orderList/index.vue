<template>
  <div id="unDistribution">
    <div v-if="$route.path === '/mmc/orderList'">
      <div class="search-bar">
        <el-form :model="search" ref="search" class="search-bar" inline>
          <el-form-item prop="keyWords">
            <el-input
                class="key-words"
                placeholder="请输入订单号/顾客姓名/邮箱"
                v-model="search.keyWords"
                clearable>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="searchKey('search')">搜索</el-button>
          <el-button type="primary" plain class="btn" @click="cancelSunmit('search')">重置</el-button>
          <div class="datePick">
            <span class="demonstration">选择处理时段：</span>
            <el-date-picker
                v-model="search.seachDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="sala">
            订单类型：
            <el-form-item prop="department">
              <el-select v-model="search.currency" clearable placeholder="请选择" class="select">
                <el-option
                    v-for="item in currencyList"
                    :label="item"
                    :key="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="operation">
        <el-button type="primary" class="btn">上传FBA数据</el-button>
        <el-button class="btn">下载erp数据</el-button>
      </div>
      <div class="dataTabel">
        <template>
          <el-table
              ref="multipleTable"
              :data="tableData"
              border
              stripe
              style="width: 100%">
            <el-table-column
                align="center"
                prop="platform_sku"
                label="处理时间">
            </el-table-column>
            <el-table-column
                align="center"
                prop="platform_display_name"
                label="订单类型">
            </el-table-column>
            <el-table-column
                align="center"
                prop="is_pre_sale"
                label="处理人">
            </el-table-column>
            <el-table-column
                align="center"
                prop="email"
                label="订单号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="销售平台">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="销售账号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="下单时间">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="顾客姓名">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="顾客邮箱">
            </el-table-column>
            <el-table-column
                width="100px"
                label="操作">
              <template slot-scope="scope">
                <el-button @click="goDateil(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import {
  orderList, orderSearch
} from '@/api/mmc'

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      search: {
        keyWords: null,
        currency: null,
        seachDate: []
      },
      currencyList: [],
      tableData: [{
        erp_code: '',
        first_name: '',
        last_name: '',
        email: '',
        currency: '',
        address: ''
      }],
      pageConfig: {
        page: 1,
        limit: 10,
        total: null
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/mmc/orderList') {
      this.dataInit()
      next()
    } else {
      next()
    }
  },
  watch: {
    childCategory_id(val) {
      this.search.category_id = val
    }
  },
  created() {
    if (this.$route.path === '/mmc/orderList') this.dataInit()
  },
  activated() {

  },
  methods: {
    dataInit() {
      orderList().then(res => {
        console.log(res)
        debugger
      })
    },
    searchKey() {
      const data = {
        type: 4,
        search: this.search.keyWords,
        page: this.pageConfig.page,
        date: this.search.seachDate
      }
      orderSearch(data).then(res => {
        const newRes = res.data.data
        newRes.map(item => {
          if (item.items[0].order_type == 0) {
            item.items[0].order_status = '处理成功'
          } else {
            item.items[0].order_status = '处理失败'
          }
        })
        this.tableData = newRes
      })
    },
    cancelSunmit(formName) {
      this.$refs[formName].resetFields()
    },
    goDateil(rowData) {
      console.log(rowData)
      this.$router.push({
        path: '/mmc/orderDetails',
        query: {
          id: rowData.id
        }
      })
    },
    getDataInfo() {

    }
  }
}
</script>

<style scoped lang="less">
  #unDistribution {
    padding: 0 20px;
    padding-right: 0;
    color: #666;

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;

      p {
        font-weight: bold;
        font-size: 20px;
        margin-right: 50px;
      }
    }

    .search-bar {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .key-words {
        min-width: 260px;
      }

      .sala, .status,.datePick {
        margin-left: 15px;

        .select {
          min-width: 120px;
          margin-left: 10px;
        }
      }

      /deep/ .key-words > .el-input__inner {
        border-radius: 4px 0 0 4px;
      }

      /deep/ .el-button--primary {
        border-radius: 0;
      }

      /deep/ .el-button--primary.is-plain {
        border-radius: 0 4px 4px 0;
        margin-left: 0;
      }

      /deep/ .el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {
        background-color: #b3d8ff;
      }

      /deep/ .el-form-item {
        margin: 0;
        vertical-align: middle;
      }
    }

    .dataTabel {
      margin-top: 20px;

      .el-table /deep/ .checkAll .cell:before {
        content: "全选";
        position: absolute;
        right: 11px;
      }

      .fail {
        color: red;
      }

      .btnText {
        font-size: 12px;
      }
    }
    .operation {
      padding-top: 20px;
    }
  }

  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
</style>
