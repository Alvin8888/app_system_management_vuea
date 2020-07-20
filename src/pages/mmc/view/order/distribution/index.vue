<template>
  <div id="unDistribution">
    <div class="nav">
      <el-button type="info" @click="goBack">返回打单记录</el-button>
      <p>{{date}}</p>
    </div>
    <Tab :type="2"></Tab>
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
            <el-select v-model="search.order_platform" @change="searchKey" clearable placeholder="请选择" class="select">
              <el-option
                  v-for="item in platformList"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="sales_shops">
            <el-select v-model="search.sales_shops" @change="searchKey" clearable placeholder="请选择" class="select">
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
            <el-select v-model="search.warehours" @change="searchKey" clearable placeholder="请选择" class="select">
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
      <el-button type="danger" @click="unDistribution()">不分仓</el-button>
      <el-button type="info" @click="goUpOeder">上传原始订单</el-button>
      <el-button type="success" @click="confirmDistribution">分仓</el-button>
      <el-button type="success" @click="downData">下载分仓数据</el-button>
      <el-button type="primary" @click="upData">上传物流数据</el-button>
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
                <el-button @click="goDetails(scope.row)" type="text" size="small">{{btnStatus ? '查看' : '编辑'}}
                </el-button>&nbsp;
                <el-button @click="unDistribution(scope.row.id, 1)" type="text" size="small" v-if="scope.row.items[0].depot_type == 0">不分仓</el-button>
                <el-button @click="unDistribution(scope.row.id, 0)" type="text" size="small" v-if="scope.row.items[0].depot_type == 1">分仓</el-button>
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
    <div class="dialog">
      <el-dialog
          append-to-body
          title="确认删除？"
          :visible.sync="dialogVisible"
          width="20%"
          center
          :before-close="handleClose">
        <p style="margin: 0;text-align: center">删除后，此订单不参与分仓。</p>
        <div style="margin-top: 40px">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="15px">
            <el-form-item label=" " prop="deleteInfo">
              <el-input
                  show-word-limit
                  class="deleteInput"
                  placeholder="输入删单理由（20字）"
                  maxlength="20"
                  v-model="ruleForm.deleteInfo"
                  clearable>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSunmit('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!--上传物流数据-->
    <Uploader :open="drawer" :request="uploadLogistics" :callBack="true"></Uploader>
  </div>
</template>

<script>
import Tab from '@/pages/mmc/components/Tab/index'
import Uploader from '@/pages/mmc/components/Uploader'
import {
  getDepotOrder,
  searchFilter,
  downloadDepotData,
  orderIsDepot,
  orderSearch,
  uploadLogistics,
  assignDepot
} from '@/api/mmc'

export default {
  name: 'Index',
  components: {
    Tab,
    Uploader
  },
  data() {
    return {
      id: null,
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
          value: null
        },
        {
          label: '成功',
          value: 0
        },
        {
          label: '失败',
          value: 1
        }
      ],
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
      dialogVisible: false,
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
      btnStatus: false,
      drawer: false,
      uploadLogistics
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
      let data = {
        batch_id: this.$store.getters['mmc/getBatchList']
        // page: this.pageConfig.page,
      }
      if (this.$route.query.batch_id) {
        data.batch_id = this.$route.query.batch_id
      } else {
        data.batch_id = window.localStorage.getItem('batch_id_list')
      }
      this.tableData = []
      getDepotOrder(data).then((res) => {
        const newRes = res.data.data.data
        newRes.map(item => {
          if (item.items[0].order_type == 0) {
            item.items[0].order_status = '处理成功'
          } else {
            item.items[0].order_status = '处理失败'
          }
        })
        this.tableData = newRes
        this.pageConfig.total = +res.data.data.total
        searchFilter().then(res => {
          const data = res.data.data
          this.platformList = data.platform
          this.saleAccountList = data.account
          this.warehoursList = data.warehours
        })
      }).catch((err) => {
        this.$message({
          type: 'info',
          message: err
        })
      })
    },
    searchKey() {
      const data = {
        batch_id: this.$store.getters['mmc/getBatchList'],
        type: 2,
        search: this.search.keyWords,
        order_type: this.search.workStatus,
        order_platform: this.search.order_platform, // 销售人员
        sales_shops: this.search.sales_shops, // 销售平台
        warehours: this.search.warehours,
        page: this.pageConfig.page
      }
      orderSearch(data).then(res => {
        const newRes = res.data.data.data
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
    getDate() {
      if (!this.$route.query.date) this.$router.push('/mmc/myOrder')
      const date = this.$route.query.date.split('-')
      this.date = date[0] + '年' + date[1] + '月' + date[2] + '日'
    },
    goBack() {
      this.$router.push({
        path: '/mmc/myList',
        query: {
          date: this.$route.query.date
        }
      })
    },
    goUpOeder() {
      this.$router.push({
        path: '/mmc/upOrder',
        query: {
          date: this.$route.query.date
        }
      })
    },
    goDetails(data) {
      this.$router.push({
        path: '/mmc/orderDetails',
        query: {
          id: data.id,
          type: 2
        }
      })
    },
    unDistribution(id, type) {
      this.id = id
      // 获取选中信息
      console.log(this.$refs.multipleTable.store.states.selection)
      if (type === 0) {
        const data = {
          id,
          depot_type: 0
        }
        orderIsDepot(data).then((res) => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '成功!'
          })
          this.getDataInfo()
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
      } else {
        this.dialogVisible = true
      }
    },
    orderIdHandler() {
      // 获取选中信息
      const orderData = this.$refs.multipleTable.store.states.selection
      let order_id = null
      let flag = true
      orderData.map((item, index) => {
        if (index == 0) {
          order_id = item.id
        } else if (order_id.indexOf(item.order_id) < 0) {
          order_id += ',' + item.id
        }
        if (flag) {
          item.items[0].order_type == 1 ? flag = false : flag = true
        }
      })

      return {
        order_id,
        flag
      }
    },
    confirmDistribution() {
      this.$confirm('请保证所有订单均为处理成功状态！', '确认开始分仓', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 扩展接口需要判断订单是否全成功
        const data = {
          batch_id: this.$store.getters['mmc/getBatchList']
        }
        assignDepot(data).then((res) => {
          if (res.data.code !== 200) {
            this.$message({
              type: 'info',
              message: res.data.message
            })
            return false
          }
          this.$message({
            type: 'success',
            message: '分仓成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分仓'
        })
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.$refs.ruleForm.resetFields()
          done()
        })
        .catch(() => {
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
          const data = {
            depot_type: 1
          }
          if (this.id) {
            data.id = this.id
          } else {
            const res = this.orderIdHandler()
            const order_id = res.order_id
            if (!order_id) {
              this.$message({
                type: 'error',
                message: '请选择不分仓数据'
              })
              return false
            }
            data.id = order_id
            data.remarks = this.ruleForm.deleteInfo
          }
          orderIsDepot(data).then((res) => {
            this.dialogVisible = false
            this.id = null
            this.$message({
              type: 'success',
              message: '已删除订单!'
            })
            this.cancelSunmit('ruleForm')
            this.getDataInfo()
          }).catch(err => {
            this.$message({
              type: 'warning',
              message: err
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    downData() {
      const depotData = this.$refs.multipleTable.store.states.selection
      let flag = true
      depotData.map(item => {
        item.items.map(type => {
          if (type.items == 1) {
            this.$message({
              type: 'error',
              message: '请先分仓。'
            })
            flag = false
          }
        })
      })
      if (!flag) return false

      const data = { batch_id: window.localStorage.getItem('batch_id_list') }

      this.upStatus = true
      downloadDepotData(data).then(res => {
        debugger
      }).catch(() => {

      })
    },
    upData() {
      if (!this.upStatus) {
        this.$message({
          type: 'error',
          message: '请先分仓。'
        })
        return false
      }

      this.$confirm('一旦上传数据，将不能再修改原始数据！', '确认上传！', {
        confirmButtonText: '确认上传',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.btnStatus = true
        this.drawer = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上传。'
        })
      })
    },
    callBack() {
      this.drawer = false
      this.$router.push({
        path: '/mmc/complete',
        query: {
          date: this.$route.query.date
        }
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
  .drawer{

  }
  .btn{
    position: absolute;
    right: 10px;
  }
  .upLoader{
    text-align: center;

    padding-top: 50px;
  }
  .progress {
    margin-top: 20px;

    .progressInfo {
      .tips {
        width: 90%;
        display: flex;
        justify-content: space-between;

        span {
          font-size: 14px;
          color: #666;
        }
      }

      .progress-box {
        display: flex;
        align-items: center;

        div {
          width: 100%;
        }
      }
    }
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  /deep/ .el-drawer__header {
    span {
      outline: none;
    }
  }

  /deep/ .el-drawer__body {
    padding: 0 10px;
    color: #666;

    > span {
      font-size: 20px;
      font-weight: normal;
      color: #666;
    }
  }

  /deep/ .el-drawer.rtl:focus {
    outline: none;
  }
</style>
