<template>
  <div id="unDistribution">
    <div>
      <div class="search-bar">
        <el-form :model="search" ref="search" class="search-bar" inline>
          <el-form-item prop="keywords">
            <el-input
                class="key-words"
                placeholder="请输入帐号"
                v-model="search.keywords"
                clearable>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="searchKey('search')">搜索</el-button>
          <el-button type="primary" plain class="btn" @click="cancelSunmit('search')">重置</el-button>
          <div class="sala">
            平台：
            <el-form-item prop="platform">
              <el-select v-model="search.platform" @change="searchKey" clearable placeholder="请选择" class="select">
                <el-option
                    v-for="item in platformList"
                    :label="item"
                    :key="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="status">
            币种：
            <el-form-item prop="currency">
              <el-select v-model="search.currency" @change="searchKey" clearable placeholder="请选择" class="select">
                <el-option
                    v-for="item in currencyList"
                    :label="item.label"
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
                prop="shop_name"
                label="店铺名">
            </el-table-column>
            <el-table-column
                align="center"
                prop="abbr"
                label="缩写">
            </el-table-column>
            <el-table-column
                align="center"
                prop="platform"
                label="平台">
            </el-table-column>
            <el-table-column
                align="center"
                prop="currency"
                label="币种">
            </el-table-column>
            <el-table-column
                align="center"
                prop="time_zone"
                label="时区">
            </el-table-column>
            <el-table-column
                align="center"
                prop="pay_type"
                label="收款方式">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getShopList,
  getPlatformCurrencyList
} from '@/api/mmc'

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      search: {
        keywords: null,
        platform: null,
        currency: null
      },
      platformList: [],
      currencyList: [],
      tableData: [{
        shop_name: '',
        abbr: '', // 缩写
        platform: '',
        currency: '',
        time_zone: '',
        pay_type: ''
      }]
    }
  },
  watch: {},
  created() {
    this.dataInit()
  },
  methods: {
    dataInit() {
      Promise.all([this.newGetShopList(), this.newGetPlatformCurrencyList(), this.newGetPlatformCurrencyList('platform')]).then((res) => {
        this.tableData = res[0]
        this.platformList = res[2]
        this.currencyList = res[1]
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    newGetShopList(flag) {
      const data = {
        keywords: this.search.keywords,
        platform: this.search.platform,
        currency: this.search.currency
      }
      if (flag) {
        getShopList(data).then(res => {
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
        getShopList(data).then(res => {
          const data = res.data.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    newGetPlatformCurrencyList(type) {
      const data = {
        type: null
      }
      if (type) data.type = type
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
      this.newGetShopList(1)
    },
    cancelSunmit(formName) {
      this.$refs[formName].resetFields()
      this.dataInit()
    },
    goDateil(rowData) {
      this.$router.push({
        path: '/mmc/skuDetails',
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
