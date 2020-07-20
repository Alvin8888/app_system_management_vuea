<template>
  <div id="unDistribution">
    <div class="nav">
      <el-button type="info" @click="goBack">返回打单记录</el-button>
      <p>{{date}}</p>
    </div>
    <Tab :type="3"></Tab>
    <div class="search-bar">
      <el-form :model="search" :rules="rules" ref="search" class="search-bar" inline>
        <el-form-item prop="keyWords">
          <el-input
              class="key-words"
              placeholder="请输入订单号/顾客姓名/邮箱"
              v-model="search.keyWords"
              clearable>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="searchKey('search')">搜索</el-button>
        <el-button type="primary" plain @click="cancelSunmit('search')">重置</el-button>
        <div class="sala">
          销售：
          <el-form-item prop="order_platform">
            <el-select v-model="search.order_platform" clearable placeholder="请选择" class="select">
              <el-option
                  v-for="item in platformList"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="sales_shops">
            <el-select v-model="search.sales_shops" clearable placeholder="请选择" class="select">
              <el-option
                  v-for="item in saleAccountList"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="Depot">
          发货仓库：
          <el-form-item prop="warehours">
            <el-select v-model="search.warehours" placeholder="请选择" class="select">
              <el-option
                  v-for="item in warehoursList"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="status">
          处理状态：
          <el-form-item prop="workStatus">
            <el-select v-model="search.workStatus" placeholder="请选择" class="select">
              <el-option
                  v-for="item in workStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="operation">
      <el-button type="success" @click="downloadDepotData">下载分仓数据</el-button>
      <el-button type="primary" @click="upLogisticsData">上传物流数据</el-button>
      <el-button type="primary" @click="downloadGoodsData">下载发货单</el-button>
      <el-button type="primary" @click="downloadOrderData">下载未处理订单</el-button>
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
              label-class-name="checkAll"
              type="selection"
              width="70">
          </el-table-column>
          <el-table-column
              align="center"
              prop="order_id"
              width="120px"
              label="订单号">
          </el-table-column>
          <el-table-column label="销售信息">
            <el-table-column
                prop="order_platform"
                label="销售平台">
            </el-table-column>
            <el-table-column
                prop="sales_shops"
                label="销售账号">
            </el-table-column>
          </el-table-column>
          <el-table-column label="顾客信息">
            <el-table-column
                prop="name"
                label="顾客姓名">
            </el-table-column>
            <el-table-column
                prop="email"
                label="顾客邮箱">
            </el-table-column>
          </el-table-column>
          <el-table-column label="订单状态">
            <el-table-column
                prop="items[0].order_status"
                width="110px"
                label="处理状态">
              <template slot-scope="scope">
                <span :class="scope.row.items[0].order_type == 1 ? 'fail' : ''">
                    {{scope.row.items[0].order_status}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
                prop="items[0].fail_reason"
                label="失败原因">
            </el-table-column>
          </el-table-column>
          <el-table-column label="订单操作">
            <el-table-column
                width="100px"
                label="操作">
              <template slot-scope="scope">
                <el-button @click="goDetails(scope.row)" type="text" size="small">查看
                </el-button>&nbsp;
              </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="remarks"
                fit
                label="备注">
            </el-table-column>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页组件 -->
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination
            @current-change="getDataInfo"
            :current-page="pageConfig.page"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="pageConfig.total"
            background
        ></el-pagination>
      </div>
    </div>
    <!--上传物流数据-->
    <Uploader :open="drawer" :request="uploadLogistics"></Uploader>
  </div>
</template>

<script>
import Tab from '@/pages/mmc/components/Tab/index'
import Uploader from '@/pages/mmc/components/Uploader'
import download from '@/utlis/download'
import {
  downloadDepotData,
  downloadShippingOrder,
  downloadPendingOrder,
  uploadLogistics,
  getPrintOrder,
  orderSearch,
  searchFilter
} from '@/api/mmc'

export default {
  name: 'Index',
  components: {
    Tab,
    Uploader
  },
  data() {
    return {
      date: null,
      pageConfig: {
        total: null,
        page: 1
      },
      search: {
        keyWords: null,
        shop: null,
        order_platform: null,
        sales_shops: null,
        workStatus: null,
        warehours: null
      },
      platformList: [],
      saleAccountList: [],
      warehoursList: [],
      workStatusList: [
        {
          label: '全部',
          value: 0
        },
        {
          label: '成功',
          value: 1
        },
        {
          label: '失败',
          value: 2
        }
      ],
      depotList: [],
      tableData: [{
        order_id: '',
        order_platform: '',
        platform_sku: '',
        name: '',
        email: '',
        items: [{
          order_type: 1,
          fail_reason: ''
        }],
        batch_id: '',
        remarks: ''
      }],
      rules: {
        deleteInfo: [
          { required: true, message: '请输入删单理由', trigger: 'blur' }
        ]
      },
      ruleForm: {
        deleteInfo: ''
      },
      flag: true,
      upStatus: true,
      drawer: false,
      uploadLogistics // 上传接口
    }
  },
  created() {

  },
  activated() {
    this.getDataInfo()
  },
  methods: {
    getDataInfo(page) {
      if (page) {
        this.pageConfig.page = page
        for (const key in this.search) {
          if (this.search[key] !== null) {
            this.searchKey()
            return false
          }
        }
      }
      this.getDate()
      const data = {
        batch_id: this.$store.getters['mmc/getBatchList']
        // page: this.pageConfig.page,
      }
      searchFilter().then(res => {
        const data = res.data.data
        this.platformList = data.platform
        this.saleAccountList = data.account
        this.warehoursList = data.warehours
      })
      getPrintOrder(data).then(res => {
        console.log(res.data.data)
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: err
        })
      })
    },
    getDate() {
      if (!this.$route.query.date) this.$router.push('/mmc/myOrder')
      const date = this.$route.query.date.split('-')
      this.date = date[0] + '年' + date[1] + '月' + date[2] + '日'
    },
    searchKey() {
      const data = {
        batch_id: this.$store.getters['mmc/getBatchList'],
        type: 3,
        search: this.search.keyWords,
        order_type: this.search.workStatus,
        order_platform: this.search.order_platform, // 销售人员
        sales_shops: this.search.sales_shops, // 销售平台
        warehours: this.search.warehours,
        page: this.pageConfig.page
      }
      orderSearch(data).then(res => {
        const newRes = res.data.data
        newRes.map(item => {
          // 处理数据
        })
        this.tableData = newRes
      })
    },
    goBack() {
      this.$router.push({
        path: '/mmc/myList',
        query: {
          date: this.$route.query.date
        }
      })
    },
    cancelSunmit(formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields()
      this.getDataInfo()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goDetails(data) {
      this.$router.push({
        path: '/mmc/orderDetails',
        query: {
          type: 3
        }
      })
    },
    downloadDepotData() {
      const data = {
        batch_id: window.localStorage.getItem('batch_id_list')
      }
      downloadDepotData(data).then(res => {
        console.log(res.data.data)
      })
    },
    upLogisticsData() {
      this.drawer = true
    },
    downloadGoodsData() {
      downloadShippingOrder().then(res => {
        console.log(res)
      })
    },
    downloadOrderData() {
      downloadPendingOrder().then(res => {
        console.log(res)
        const data = res.data
        download(data, '未处理订单')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
  #unDistribution {
    padding: 0 20px;
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

      .sala, .status, .Depot {
        margin-left: 15px;

        .select {
          width: 120px;
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

    .operation {
      padding-top: 20px;
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

    .dialog {

    }
  }
</style>
