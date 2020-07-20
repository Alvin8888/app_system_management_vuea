<template>
  <div id="userInfo">
    <div class="name-box">
      <div>
        {{userInfo.name}}
      </div>
      <div class="toRecord" @click="drawer = true">
        点击查看消费记录
      </div>
    </div>
    <div class="email">
      *Email:<span>{{userInfo.email}}</span>
    </div>
    <div class="email">
      ERP用户编码:<span>{{userInfo.erp_code}}</span>
    </div>
    <div class="currency">
      币种:<span>{{userInfo.currency}}</span>
    </div>
    <div class="address">
      地址:
      <div class="tabelData">
        <template>
          <el-table
              ref="multipleTable"
              :data="address_list"
              border
              stripe
              style="width: 100%">
            <el-table-column
                align="center"
                prop="nation"
                label="国家Country">
            </el-table-column>
            <el-table-column
                align="center"
                prop="consignee_name"
                label="代收人姓名Attention">
            </el-table-column>
            <el-table-column
                align="center"
                prop="consignee_name"
                label="收件人姓名Addressee">
            </el-table-column>
            <el-table-column
                align="center"
                prop="phone"
                label="电话Phone">
            </el-table-column>
            <el-table-column
                align="center"
                prop="address"
                label="地址1Address 1">
            </el-table-column>
            <el-table-column
                align="center"
                prop="address"
                label="地址2Address 2">
            </el-table-column>
            <el-table-column
                align="center"
                prop="city"
                label="城市City">
            </el-table-column>
            <el-table-column
                align="center"
                prop="state"
                label="州State">
            </el-table-column>
            <el-table-column
                align="center"
                prop="zip"
                label="邮编Zip">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <!-- 抽屉 -->
    <div class="drawer">
      <el-drawer
          title="消费记录"
          :visible.sync="drawer"
          :direction="direction"
          :append-to-body="true"
          :wrapperClosable="true"
          :before-close="handleClose">
        <div class="tabelData">
          <template>
            <el-table
                ref="multipleTable"
                :data="oederList"
                border
                stripe
                style="width: 100%">
              <el-table-column
                  label="订单号"
                  align="center">
                <template slot-scope="scope">
                  <el-button @click="goDateil(scope.row.order_id)" type="text">{{scope.row.order_id}}</el-button>
                </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="order_platform"
                  label="平台">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="sales_shops"
                  label="店铺">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="order_amount"
                  label="订单金额">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="order_date"
                  label="下单时间">
              </el-table-column>
            </el-table>
          </template>
        </div>

      </el-drawer>
    </div>

  </div>
</template>

<script>
import { getUserInfo, getExpensesRecord } from '@/api/mmc'

export default {
  name: 'Index',
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        erp_code: '',
        currency: ''
      },
      address_list: [],
      oederList: [
        {
          order_id: '1232111'
        }
      ],
      drawer: false,
      direction: 'rtl'

    }
  },
  created() {
    this.dataInit()
  },
  methods: {
    dataInit() {
      const data = {
        id: this.$route.query.id
      }
      getUserInfo(data).then(res => {
        this.userInfo = res.data.data
        this.address_list = this.userInfo.address_list
        const email = {
          email: this.userInfo.email
        }
        getExpensesRecord(email).then(res => {
          this.oederList = res.data.data
        })
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    handleClose() {
      this.drawer = false
    },
    goDateil(id) {
      this.drawer = false
      this.$router.push({
        path: '/mmc/orderDetails',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  #userInfo {
    padding: 30px;
    padding-right: 80px;

    .name-box {
      display: flex;
      justify-content: space-between;

      div {
        color: #666;
        font-size: 32px;
      }

      .toRecord {
        font-size: 14px;
        color: #4b7adf;
        text-decoration: underline;
        cursor: pointer;
        align-self: flex-end;
      }
    }

    .email, .currency, .address {
      margin: 30px 0;

      span {
        padding-left: 20px;
      }

      .tabelData {
        margin-top: 20px;
      }
    }
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
