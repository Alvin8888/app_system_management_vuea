<template>
  <div id="mmc-content">
    <div v-if="$route.path === '/mmc/myOrder'">
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
      <div>
        <calendar
          :selectDom="['2020-04-05', '2020-09-30']"
          :first-day-of-week="firstDay"
          :selectedDate="['2020-04-05', '2020-09-30']">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template
              slot="dateCell"
              slot-scope="{date, data}">
            <div @click="goOrder(data.day)" class="calender-box" :style="getColor(data.day)">
              <p :class="handlerStatus(data.day)">
                {{data.day.split('-')[2]}}
              </p>
              <div v-if="handleCheckedCitiesChange(data.day)">
                <span><span>{{handleCheckedCitiesChange(data.day)}}</span></span>
              </div>
              <div v-if="!handleCheckedCitiesChange(data.day) && showHis(data.day)">
                <span><span>未打单</span></span>
              </div>
            </div>
          </template>
        </calendar>
      </div>
      <!-- 手动校正 -->
      <Uploader :open="drawer" :request="uploadInventory" :call-back="true"></Uploader>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import time from '@/common/time'
import calendar from '@/components/calendar/src/main'
import Uploader from '@/pages/mmc/components/Uploader'

import {
  uploadInventory,
  printList,
  refreshInventory
} from '@/api/mmc'

export default {
  name: 'Index',
  components: {
    calendar,
    Uploader
  },
  data() {
    return {
      sku_list: [], // 获取的打单列表。
      firstDay: 7,
      dateStates: 'commpulet', // commpulet已打单，upOrder未打单，wait待分仓，letGo已分仓
      update: true,
      data: [],
      now: time.getNow(),
      drawer: false,
      sfpSteta: false,
      warehouse: ['ZTO', 'ATL', 'Hanover', 'TWU', '3PL', 'HW'],
      obj: {},
      uploadInventory
    }
  },
  watch: {
    '$route': {
      handler(route) {
        if (route.name === 'myOrder') this.dataInit()
      },
      deep: true
    }
  },
  computed: {
  },
  created() {
    if (this.$route.path === '/mmc/myOrder') this.dataInit()
  },
  mounted() {
  },
  beforeRouteUpdate(to, from, next) {
    // if(to.path === '/mmc/myOrder') this.showMyOrder()
    next()
  },
  methods: {
    handleCheckedCitiesChange(key) {
      if (this.obj[key]) {
        return this.obj[key].text
      }
    },
    dataInit() {
      console.log('myOrder')
      window.localStorage.setItem('batch_id_list', null)
      printList().then(res => {
        this.data = res.data.data
        console.time()
        let newObj = {}
        let arr = []
        let obj1 = {}
        this.data.map(item => {
          if (arr.indexOf(item.created_at.split(' ')[0]) === -1) {
            arr.push(item.created_at.split(' ')[0])
          }
        })
        arr.map((item, index) => {
          newObj[item] = []
          this.data.map(item2 => {
            if (item === item2.created_at.split(' ')[0]) {
              newObj[item].push(item2)
            }
          })
          let flag2
          let flag3
          let flag4 = newObj[item].every(item3 => {
            return item3.print_status == 4
          })
          if (flag4) {
            obj1[item] = {
              text: '已打单',
              color: {
                borderColor: '#409EFF'
              },
              class: 'commpulet'
            }
          } else {
            flag3 = newObj[item].every(item3 => {
              return item3.print_status == 3
            })
            if (flag3) {
              obj1[item] = {
                text: '已分仓',
                color: {
                  borderColor: '#00BB3D'
                },
                class: 'distribution'
              }
            } else {
              flag2 = newObj[item].some(item3 => {
                return item3.print_status == 2
              })
              if (flag2) {
                obj1[item] = {
                  text: '待分仓',
                  color: {
                    borderColor: '#FABB3D'
                  },
                  class: 'myList'
                }
              } else {
                obj1[item] = {
                  text: '未打单',
                  color: {
                    borderColor: '#999'
                  },
                  class: 'upOrder'
                }
              }
            }
          }
        })
        this.obj = obj1
        console.timeEnd()
        window.localStorage.setItem('calendarDate', +this.data[0].created_at.split(' ')[0].split('-')[1])
      })
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
    getColor(day) {
      if (this.obj[day]) return this.obj[day].color
      return {
        borderColor: '#999'
      }
    },
    handlerStatus(day) {
      if (this.obj[day]) return this.obj[day].class
      return 'upOrder'
    },
    showHis(day) {
      let flag
      if (this.data.length > 0) {
        flag = (+this.data[0].created_at.split(' ')[0].split('-').join('') <= +day.split('-').join('')) && (+day.split('-').join('') <= time.getNow())
      }
      return flag
    },
    goOrder(date) {
      if (JSON.parse(window.localStorage.getItem('myOrderList'))) window.localStorage.setItem('myOrderList', null)
      const listArr = []
      const data = this.data
      for (let i = 0; i < data.length; i++) {
        const myDate = data[i].created_at.split(' ')[0]
        if (myDate == date) {
          listArr.push(data[i])
        }
      }
      window.localStorage.setItem('myOrderList', JSON.stringify(listArr))

      const newDate = date.split('-')
      const total = newDate[0] + newDate[1] + newDate[2]
      const now = time.getYear() + time.getMonth() + time.getDay()
      if (total > now) return false
      this.$router.push({
        path: '/mmc/myList',
        query: {
          date
        }
      })
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
    callBack() {
      this.sfpSteta = true
    }
  }
}
</script>

<style scoped lang="less">

  #mmc-content {
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

    /deep/ .el-calendar__header {
      justify-content: start;
    }

    /deep/ .el-calendar-day {
      padding: 0;
    }

    /deep/ .el-calendar-table__row {
      height: 100px;
    }

    /deep/ .el-calendar-table .el-calendar-day {
      height: 100px;
      box-sizing: border-box;
    }

    /deep/ .el-calendar-table {
      thead {
        th {
          font-weight: bold;
        }
      }
    }

    .calender-box {
      height: 100%;
      box-sizing: border-box;
      p {
        width: 100%;
        color: #fff;
        font-size: 30px;
        margin: 0;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
      }
      div{
        position: absolute;
        top: 40px;
        left: 4px;
      }
      .commpulet {
        background-color: #339900;
      }

      .upOrder {
        background-color: #999;
      }

      .myList {
        background-color: #FABB3D;
      }

      .distribution {
        background-color: #409EFF;
      }
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
  /deep/ .el-calendar-table .el-calendar-day{
    position: relative;
  }
  /deep/ .el-calendar-table .el-calendar-day:hover{
    background-color: transparent;
    .calender-box {
      border: 4px solid #999;
    }
  }
  /deep/ .el-calendar-table td.is-today{
    background-color: #f2f8fe;
  }
</style>
