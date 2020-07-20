<template>
  <div id="unDistribution">
    <div v-if="$route.path === '/mmc/userList'">
      <div class="search-bar">
        <el-form :model="search" ref="search" class="search-bar" inline>
          <el-form-item prop="keyWords">
            <el-input
                class="key-words"
                placeholder="可按邮箱和姓名查找"
                v-model="search.keyWords"
                clearable>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="searchKey('search')">搜索</el-button>
          <el-button type="primary" plain class="btn" @click="cancelSunmit('search')">重置</el-button>
          <div class="sala">
            币种：
            <el-form-item prop="currency">
              <el-select @change="searchKey" v-model="search.currency" clearable placeholder="请选择" class="select">
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
                prop="erp_code"
                label="编码">
            </el-table-column>
            <el-table-column
                align="center"
                prop="first_name"
                label="名">
            </el-table-column>
            <el-table-column
                align="center"
                prop="last_name"
                label="姓">
            </el-table-column>
            <el-table-column
                align="center"
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                align="center"
                prop="currency"
                label="币种">
            </el-table-column>
            <el-table-column
                align="center"
                prop="address"
                label="默认地址">
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
        <!-- 分页组件 -->
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination
              @current-change="newGetCustomerList"
              :current-page="pageConfig.page"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="pageConfig.total"
              background
          ></el-pagination>
        </div>
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
  getCustomerList,
  getPlatformCurrencyList
} from '@/api/mmc'

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      search: {
        keyWords: null,
        currency: null
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
    if (to.path === '/mmc/userList') {
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
    if (this.$route.path === '/mmc/userList') this.dataInit()
  },
  activated() {

  },
  methods: {
    dataInit() {
      Promise.all([this.newGetCustomerList(), this.newGetPlatformCurrencyList()]).then((res) => {
        this.tableData = res[0]
        this.currencyList = res[1]
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    newGetCustomerList(page) {
      const data = {
        keywords: this.search.keyWords,
        currency: this.search.currency,
        page: this.pageConfig.page,
        limit: this.pageConfig.limit
      }
      if (page) {
        this.pageConfig.page = page
        data.page = page
        getCustomerList(data).then(res => {
          const data = res.data.data
          this.tableData = data
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
        return false
      }
      return new Promise((resolve, reject) => {
        getCustomerList(data).then(res => {
          const data = res.data.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    newGetPlatformCurrencyList() {
      const data = {
        type: null
      }
      return new Promise((resolve, reject) => {
        getPlatformCurrencyList(data).then(res => {
          const data = res.data.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    searchKey() {
      this.newGetCustomerList(1)
    },
    cancelSunmit(formName) {
      this.$refs[formName].resetFields()
      this.dataInit()
    },
    goDateil(rowData) {
      this.$router.push({
        path: '/mmc/userDetails',
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

      .sala, .status {
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
