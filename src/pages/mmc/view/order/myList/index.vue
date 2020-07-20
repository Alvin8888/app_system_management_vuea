<template>
  <div id="myList">
    <div class="sku-list">
      <div class="data-box">
        <p>
          库存数据
          <span>（每天14:30刷新，可以针对某一仓库来进行刷新。）</span>
        </p>
        <div class="data">
          <div class="update-box">
            <div class="btn-box" v-for="(item, index) in warehouse" :key="index">
              <i>
                <span>{{item}}：</span>
                <span class="tips">更新时间：2020.04.04 21:25:23</span>
              </i>
              <span class="up-btn" @click="upData(item)">刷新</span>
            </div>
            <!--              <div class="btn-box">-->
            <!--                <i>TWU：-->
            <!--                  <span class="fail">更新失败</span>-->
            <!--                </i>-->
            <!--              </div>-->
          </div>
        </div>
      </div>
      <div class="update">
        <el-button type="primary" @click="upSfp">SFP库存扣减</el-button>
        <el-button type="primary" @click="drawer = true">手动校正库存</el-button>
      </div>
    </div>
    <div class="tips">
      <div>
        <el-button @click="goMyOrder">返回日历</el-button>
      </div>
      <div>{{date}}</div>
      <div>今日已打单{{num}}次</div>
    </div>
    <div class="record">
      <div>打单记录</div>
      <el-button type="primary" @click="goOrder">开始打单</el-button>
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
              prop="created_at"
              label="创建时间">
          </el-table-column>
          <el-table-column
              prop="order_sum"
              label="订单数">
          </el-table-column>
          <el-table-column
              prop="earlies_time"
              label="最早下单时间">
          </el-table-column>
          <el-table-column
              prop="latest_time"
              label="最晚下单时间">
          </el-table-column>
          <el-table-column
              label="打单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.print_status == 2" style="color: #FFCC00">
                待分仓
              </span>
              <span v-if="scope.row.print_status == 3" style="color: #0000FF">
                已分仓
              </span>
              <span v-if="scope.row.print_status == 4" style="color: #00CC33">
                已打单
              </span>
            </template>
          </el-table-column>
          <el-table-column
              width="100px"
              label="操作">
            <template slot-scope="scope">
              <el-button @click="goDateil(scope.row)" type="text" size="small" v-if="scope.row.print_status != 2">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      </div>
    <!-- 手动校正 -->
    <Uploader :open="drawer" :request="uploadInventory" :call-back="true"></Uploader>
  </div>
</template>

<script>
import {
  refreshInventory,
  uploadInventory
} from '@/api/mmc'
import Uploader from '@/pages/mmc/components/Uploader'

export default {
  name: 'Index',
  components: {
    Uploader
  },
  data() {
    return {
      date: '',
      num: 0,
      tableData: [],
      sfpSteta: false,
      drawer: false,
      warehouse: ['ZTO', 'ATL', 'Hanover', 'TWU', '3PL', 'HW'],
      isDisabled: true,
      uploadInventory
    }
  },
  created() {

  },
  activated() {
    this.getDate()
    this.dataInit()
    if (this.$route.path === '/mmc/myList') window.localStorage.setItem('batch_id_list', null)
  },
  methods: {
    dataInit() {
      this.tableData = JSON.parse(window.localStorage.getItem('myOrderList'))
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].print_status == 4) this.num += this.num
        continue
      }
    },
    upData(name) {
      // console.log('更新数据'+id)
      const data = {
        warehouse: [name]
      }
      refreshInventory(data).then(res => {
        debugger
      })
    },
    getDate() {
      // 直接登录不带日期则返回日历页
      if (!this.$route.query.date) {
        this.$router.push('/mmc/myOrder')
        return false
      }
      const date = this.$route.query.date.split('-')
      this.date = date[0] + '年' + date[1] + '月' + date[2] + '日'
    },
    upSfp() {
      if (!this.sfpSteta) {
        this.$message({
          type: 'error',
          message: '请先矫正库存数据！'
        })
      } else {
        this.drawer = true
      }
    },
    goMyOrder() {
      this.$router.push({
        path: '/mmc/myOrder'
      })
    },
    goDateil(data) {
      const batch_id = data.batch_id
      window.localStorage.setItem('batch_id_list', batch_id)
      this.$store.commit('mmc/SET_BATCH_ID_LIST', batch_id)
      let type = 'unDistribution'
      if (data.print_status == 3) {
        type = 'distribution'
      } else if (data.print_status == 4) {
        type = 'complete'
      }
      this.$router.push({
        path: '/mmc/' + type,
        query: {
          date: this.$route.query.date,
          batch_id
        }
      })
    },
    goOrder() {
      if (!this.sfpSteta) {
        this.$confirm('您还未上传SFP库存扣减单，可能影响打单结果，是否继续？', '未上传SFP库存扣减单', {
          confirmButtonText: '继续打单',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/mmc/upOrder',
            query: {
              date: this.$route.query.date
            }
          })
        })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        this.$router.push({
          path: '/mmc/upOrder',
          query: {
            date: this.$route.query.date
          }
        })
      }
    },
    callBack() {
      this.sfpSteta = true
    }
  }
}
</script>

<style scoped lang="less">
  #myList{
    >.tips{
      display: flex;
      align-items: center;
      padding: 20px;
      div{
        font-weight: bold;
        margin-right: 20px;
      }
    }
    .sku-list {
      border-radius: 20px;
      background-color: #eee;
      margin: 20px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;

      .data-box {
        min-width: 40%;

        p {
          font-size: 18px;
          padding: 5px 0;
          margin: 0;

          span {
            font-size: 14px;
            color: #666;
          }
        }

        .data {
          .update-box {
            min-width: 60%;
            font-size: 14px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            flex-wrap: wrap;
            .btn-box {
              width: 49%;
              min-height: 32px;
              display: flex;
              align-items: center;
              position: relative;
              margin-top: 10px;
              .up-btn {
                border: 1px solid #409EFF;
                border-radius: 5px;
                padding: 5px 10px;
                margin-left: 10px;
              }

              .up-btn:hover {
                color: #fff;
                background-color: #409EFF;
                cursor: pointer;
              }
            }

            i {
              font-style: normal;
              font-weight: bold;
              span:first-of-type {
                min-width: 80px;
                text-align: right;
                display: inline-block;
                font-weight: bold;
              }
            }

            span {
              font-weight: normal;
            }

            .tips {
              color: #666;
            }

            .fail {
              color: red;
            }
          }
        }

      }

      .update {
        min-width: 25%;
        display: flex;
        align-items: center;
      }
    }
    .record{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      padding-right: 95px;
      div{
        font-size: 20px;
        font-weight: bold;
      }
    }
    .dataTabel{
      margin: 20px;
    }
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
