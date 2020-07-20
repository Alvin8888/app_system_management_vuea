<template>
  <div class="haveCheck">
    <!-- 返回按钮 -->
    <el-row>
      <div>
        <el-button plain @click="$router.back(-1)">返回订单列表</el-button>
      </div>
      <div>
        <div v-if="detailsData.compare_result == '1' ? false :true">
          <div>标记订单为:</div>
          <div
            :class="{activeOne:isOne}"
            @click="handleOnes"
            v-if="detailsData.compare_result === 3? false:true"
          >预收订单</div>
          <div
            :class="{activeTow:isTow}"
            @click="handleTow"
            v-if="detailsData.compare_result === 2? false:true"
          >应收订单</div>
        </div>
        <el-button plain class="activeSingleOne" v-if="detailsData.compare_result === 0">订单有误</el-button>
        <el-button plain class="activeSingleTwo" v-else-if="detailsData.compare_result === 1">已核对</el-button>
        <el-button plain v-else-if="detailsData.compare_result === 2">未核对</el-button>
        <el-button plain class="activeSingleThree" v-else>查无此单</el-button>
      </div>
    </el-row>
    <div class="haveCheckWrap">
      <div class="title">
        <div class="titles">
          <span>FBA</span>
          <span>{{detailsData.erp_order_id}}</span>
          <i class="el-icon-document-copy"></i>
          <el-button type="text" @click="copyTtle">点击复制</el-button>
        </div>
        <div class="update">
          更新时间：
          <span>{{detailsData.updated_at}}</span>
        </div>
      </div>
      <div class="titleBackground">
        <div>ERP系统信息</div>
        <div>Statement信息</div>
      </div>
    </div>
    <div class="haveCheckForm">
      <!-- 基本信息 -->
      <div class="formOne">
        <div class="formOneLeft">
          <h4>基本信息</h4>
          <div v-if="detailsData.erp">
            <div>
              销售平台:
              <span>{{detailsData.erp.sale_shop_name }}</span>
            </div>
            <div>
              销售店铺:
              <span></span>
            </div>
            <div>
              Walmart Order# :
              <span></span>
            </div>
          </div>
        </div>
        <div class="formOneRight">
          <div v-if="detailsData.statement">
            <div>
              销售平台:
              <span>{{detailsData.statement[0].sale_shop_name }}</span>
            </div>
            <div>
              销售店铺:
              <span></span>
            </div>
            <div>
              Walmart Order# :
              <span></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 顾客信息 -->
      <div class="formOne chearBox">
        <div class="formOneLeft">
          <h4>顾客信息</h4>
          <div v-if="detailsData.erp">
            <div>
              邮箱:
              <span>{{detailsData.erp.customer_info.email}}</span>
            </div>
            <div>
              First Name:
              <span>{{detailsData.erp.customer_info.first_name}}</span>
            </div>
            <div>
              Last Name:
              <span>{{detailsData.erp.customer_info.last_name}}</span>
            </div>
            <div>
              ERP编号 :
              <span></span>
            </div>
            <div>
              电话 :
              <span></span>
            </div>
            <div>
              币种 :
              <span></span>
            </div>
          </div>
        </div>
        <div class="formOneRight">
          <div v-if="detailsData.statement">
            <div>
              邮箱:
              <span></span>
            </div>
            <div>
              First Name:
              <span></span>
            </div>
            <div>
              Last Name:
              <span></span>
            </div>
            <div>
              ERP编号 :
              <span></span>
            </div>
            <div>
              电话 :
              <span></span>
            </div>
            <div>
              币种 :
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 发货信息 -->
      <div class="formTwo chearBox">
        <div class="formOneLeft">
          <h4>发货信息</h4>

          <div v-if="detailsData.erp">
            <div class="trs">
              <!-- 表头 -->
              <div class="trsTitle">
                <div>库存sku</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.commodity_repertory_sku}}</div>
              </div>
              <!-- 表列,每一列 -->
              <div class="trsTitle">
                <div>数量</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.quantity}}</div>
              </div>
              <div class="trsTitle">
                <div>发货仓Location</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >US FBA_BL</div>
              </div>
              <div class="trsTitle">
                <div>物流公司</div>
                <div v-for="(item,index) of detailsData.erp.erp_order_product_list" :key="index">UPS</div>
              </div>
              <div class="trsTitle">
                <div>运单号</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.erp_order_id}}</div>
              </div>
              <div class="trsTitle">
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="Top Left 提示文字"
                    placement="top-start"
                  >
                    <el-button>总价Amount</el-button>
                  </el-tooltip>
                </div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.amount}}</div>
              </div>
              <div class="trsTitle">
                <div>订单总金额</div>
                <div v-for="(item,index) of detailsData.erp.erp_order_product_list" :key="index">999</div>
              </div>
            </div>
          </div>
        </div>
        <div class="formOneRight">
          <div v-if="detailsData.statement">
            <div class="trs">
              <!-- 表头 -->
              <div class="trsTitle">
                <div>库存sku</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.commodity_repertory_sku}}</div>
              </div>
              <!-- 表列,每一列 -->
              <div class="trsTitle">
                <div>数量</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.quantity}}</div>
              </div>
              <div class="trsTitle">
                <div>发货仓Location</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >US FBA_BL</div>
              </div>
              <div class="trsTitle">
                <div>物流公司</div>
                <div v-for="(item,index) of detailsData.erp.erp_order_product_list" :key="index">UPS</div>
              </div>
              <div class="trsTitle">
                <div>运单号</div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.erp_order_id}}</div>
              </div>
              <div class="trsTitle">
                <div>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="Top Left 提示文字"
                    placement="top-start"
                  >
                    <el-button>总价Amount</el-button>
                  </el-tooltip>
                </div>
                <div
                  v-for="(item,index) of detailsData.erp.erp_order_product_list"
                  :key="index"
                >{{item.amount}}</div>
              </div>
              <div class="trsTitle">
                <div>订单总金额</div>
                <div v-for="(item,index) of detailsData.erp.erp_order_product_list" :key="index">999</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- refund信息 已核对显示的 -->
      <div class="fromFooter chearBox" v-if="detailsData.compare_result === 1 ? true :false">
        <div class="formOneLeft">
          <h4>refund信息</h4>

          <div class="trs">
            <!-- 表头 -->
            <div class="trsTitle">
              <div>库存sku</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
            </div>
            <!-- 表列,每一列 -->
            <div class="trsTitle">
              <div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Top Left 提示文字"
                  placement="top-start"
                >
                  <el-button>总价Amount</el-button>
                </el-tooltip>
              </div>
              <div>9.99</div>
              <div>9.99</div>
              <div>9.99</div>
            </div>
            <div class="trsTitle">
              <div>订单总金额</div>
              <div>999.99</div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- refund信息 -->
      <div class="formTwo chearBox" v-else>
        <div
          class="formOneLeft"
          v-if="detailsData.erp.erp_order_product_refund_list.length == 0 ? false :true"
        >
          <h4>refund信息</h4>

          <div class="trs" v-if="detailsData.compare_result === 3  ? false :true">
            <!-- 表头 -->
            <div class="trsTitle">
              <div>库存sku</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
            </div>

            <!-- 表列,每一列 -->
            <div class="trsTitle">
              <div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Top Left 提示文字"
                  placement="top-start"
                >
                  <el-button>总价Amount</el-button>
                </el-tooltip>
              </div>
              <div>9.99</div>
              <div>9.99</div>
              <div>9.99</div>
              <div>9.99</div>
            </div>
            <div class="trsTitle">
              <div>订单总金额</div>
              <div>999.99</div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div
          class="formOneRight"
          v-if="detailsData.erp.erp_order_product_refund_list.length == 0 ? false :true"
        >
          <div
            class="trs"
            v-if="detailsData.compare_result === 2 || detailsData.erp.erp_order_product_refund_list.length == 0? false :true"
          >
            <!-- 表头 -->
            <div class="trsTitle">
              <div>平台sku</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
              <div>JK-FD-SK-HA-HU-I</div>
            </div>

            <!-- 表列,每一列 -->
            <div class="trsTitle">
              <div>库存sku</div>
              <div>2</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="trsTitle">
              <div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Top Left 提示文字"
                  placement="top-start"
                >
                  <el-button>总价Amount</el-button>
                </el-tooltip>
              </div>
              <div>9.99</div>
              <div>9.99</div>
              <div>9.99</div>
              <div>9.99</div>
            </div>
            <div class="trsTitle">
              <div>订单总金额</div>
              <div>999.99</div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 预收订单弹窗 -->
    <!--   <el-dialog
      title="选择预收sku"
      :visible.sync="centerDialogVisibleOnesz"
      @close="handleClose"
      :modal-append-to-body="false"
      width="30%"
      center
      class="dateWrap"
    >
      <div class="skusFooter">
        <div>
          <div>
            <div>平台sku</div>
            <div>价格</div>
            <div>数量</div>
          </div>
          <div>
            <div class="brs" v-for="(item,index) of inputList" :key="index">
              <div>
                <input v-model="item.sku" type="text" />
              </div>
              <div>
                <input v-model="item.numbers" type="text" />
              </div>
              <div>
                <input v-model="item.price" type="text" />
              </div>
            </div>
          </div>
        </div>
        <span @click="handleAddData">点击添加一行</span>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleNo">取 消</el-button>
        <el-button type="primary" @click="handleConfirmOnes">确 定</el-button>
      </span>
    </el-dialog>-->

    <!-- 预收订单弹窗 -->
    <el-dialog
      title="选择预收sku"
      :visible.sync="centerDialogVisibleOnesz"
      @close="handleCloseOne"
      :modal-append-to-body="false"
      width="30%"
      center
      class="dateWrap"
    >
      <div class="skuFooterAccounts">
        <div>
          <div>库存sku</div>
          <div>数量</div>
          <div>价格</div>
        </div>
        <div>
          <div v-for="(item,index) of arrC" :key="index">
            <div class="inputOne">
              <el-checkbox
                @change="handleChangeAdvance(item,index,checked)"
                v-model="checked[index]"
                :checked="item.check"
              >
                <input
                  type="text"
                  v-model="valueSku[index]"
                  :placeholder="item.commodity_repertory_sku"
                />
              </el-checkbox>
            </div>
            <div class="inputTwo">
              <input type="text" v-model="valueQuantity[index]" :placeholder="item.quantity" />
            </div>
            <div class="inputThree">
              <input type="text" v-model="valueAmount[index]" :placeholder="item.amount" />
            </div>
          </div>
        </div>
      </div>
      <div class="dlelteBtn" @click="handleFour">删除标记</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleNo">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisibleOnesz = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 应收订单弹窗 -->
    <el-dialog
      title="选择应收sku"
      :visible.sync="centerDialogVisibleTwo"
      @close="handleCloseTwo"
      :modal-append-to-body="false"
      width="30%"
      center
      class="dateWrap"
    >
      <div class="skuFooterAccounts">
        <div>
          <div>库存sku</div>
          <div>价格</div>
        </div>
        <div>
          <div v-for="(item,index) of detailsData.statement" :key="index">
            <div class="inputOne">
              <el-checkbox @change="handleChangeReceivable(item,index)" v-model="checkeds[index]">
                <input
                  type="text"
                  v-model="valueSkus[index]"
                  :placeholder="item.commodity_repertory_sku"
                />
              </el-checkbox>
            </div>
            <div class="inputTwo">
              <input type="text" v-model="valueQuantitys[index]" :placeholder="item.quantity" />
            </div>
            <div class="inputThree">
              <input type="text" v-model="valueAmounts[index]" :placeholder="item.amount" />
            </div>
          </div>
        </div>
      </div>
      <div class="dlelteBtn" @click="handleFour">删除标记</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisibleTwo=false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisibleTwo=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addComparedInfoMark,
  deleteComparedInfoMark,
  findComparedInfoMarkList,
  ComparedInfo
} from '@/api/fmc'

export default {
  data() {
    const skuArrTwo = [
      {
        name: 'JK-FD-SK-HA-HU-I1',
        key: '1'
      },
      {
        name: 'JK-FD-SK-HA-HU-I2',
        key: '2'
      },
      {
        name: 'JK-FD-SK-HA-HU-I3',
        key: '3'
      },
      {
        name: 'JK-FD-SK-HA-HU-I4',
        key: '4'
      },
      {
        name: 'JK-FD-SK-HA-HU-I5',
        key: '5'
      },
      {
        name: 'JK-FD-SK-HA-HU-I6',
        key: '6'
      },
      {
        name: 'JK-FD-SK-HA-HU-I7',
        key: '7'
      },
      {
        name: 'JK-FD-SK-HA-HU-I8',
        key: '8'
      },
      {
        name: 'JK-FD-SK-HA-HU-I9',
        key: '9'
      }
    ]

    return {
      isOne: false,
      isTow: false,
      centerDialogVisibleOnesz: false, // 预收弹窗
      centerDialogVisibleTwo: false, // 应收订单弹窗
      inputList: [
        {
          sku: '', // 平台sku
          numbers: '', // 数量
          price: '' // 价格
        }
      ], // 动态添加sku的值

      /* 预收弹窗的值 */
      checked: [], // 预收复选框的值
      valueSku: [], // input Sku值
      valueQuantity: [], // input 数量值
      valueAmount: [], // input  总价格值

      /* 应收弹窗的值 */
      checkeds: [], // 预收复选框的值
      valueSkus: [], // input Sku值
      valueQuantitys: [], // input 数量值
      valueAmounts: [], // input  总价格值

      skuArrOne: [{}],
      skuArrTwo: skuArrTwo,
      presale: [], // 返货的预收
      detailsData: {
        erp: {
          customer_info: {},
          erp_order_product_refund_list: []
        },
        statement: [{}]
      },
      tagValueArr: [], // 添加id
      Arras: [{}], // 预收标记返回值
      arrA: [],
      arrB: [],
      arrC: [{}]
    }
  },
  mounted() {
    this.fetData()
  },
  computed: {},
  updated() {},
  watch: {},
  methods: {
    handleChecked(index) {
      for (let i = 0; i < this.arrC.length; i++) {
        this.arrC[i].check = this.arrB.some(item => {
          return item.commodity_repertory_sku == this.arrC[i].commodity_repertory_sku
        })
      }

      const a = []
      const b = {}
      for (let i = 0; i < this.arrC.length; i++) {
        console.log(b[this.arrC[i].commodity_repertory_sku])
        if (!b[this.arrC[i].commodity_repertory_sku]) {
          a.push(this.arrC[i])
          b[this.arrC[i].commodity_repertory_sku] = true
        }
      }
      console.log(a)
      console.log(this.arrC)
      this.arrC = a
      this.arrC.sort()
    },

    // 预收弹窗的事件
    handleChangeAdvance(item, index, checked) {
      console.log('item', item)
      if (checked[index]) {
        const params = {
          id: this.detailsData.id,
          sku: this.valueSku[index],
          quantity: this.valueQuantity[index],
          amount: this.valueAmount[index],
          type: 'presale'
        }

        addComparedInfoMark(params).then(res => {
          if (res.status === 200) {
            console.log('res11111', res)
            // 请求回来的标记信息
            // this.MarkList();
          }
        })
      } else {
        console.log('1111', this.arrC[index])
        const params = {
          id: this.arrC[index].id,
          type: 'presale'
        }

        deleteComparedInfoMark(params).then(res => {
          console.log('res222', res)
        })
      }
    },

    // 应收弹窗的事件
    handleChangeReceivable(item, index) {
      const params = {
        id: this.detailsData.id,
        sku: item.commodity_repertory_sku,
        quantity: this.valueSku[index],
        amount: this.valueText[index],
        type: 'receivable'
      }

      addComparedInfoMark(params).then(res => {
        console.log('res', res)
      })
    },

    // 请求回来的标记信息
    MarkList() {
      findComparedInfoMarkList(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.arrA = this.skuArrOne
          this.arrB = res.data.data.presale
          this.arrC = JSON.parse(JSON.stringify(this.arrB.concat(this.arrA)))
        }
        console.log('arr', this.arrC)
        this.handleChecked()
      })
    },

    // 第一次渲染时
    fetData() {
      // 刷新时丢失数据,在次请求接口
      ComparedInfo(this.$route.query.id).then(res => {
        if (res.status === 200) {
          const fetch = res.data
          this.detailsData = fetch.data
          this.skuArrOne = fetch.data.erp.erp_order_product_list
          // 请求回来的标记信息
          this.MarkList()
        }
      })
    },

    // 添加一行数据
    handleAddData() {
      const inputs = {
        sku: '', // 平台sku
        numbers: '', // 数量
        price: '' // 价格
      }
      this.inputList.unshift(inputs)
    },

    // 弹窗取消处理的逻辑
    handleNo() {
      this.centerDialogVisibleOnesz = false
      this.isOne = false
    },

    // 弹窗关闭的做的逻辑
    handleClose() {
      this.isOne = false
    },

    // 提交预收订单弹窗
    handleConfirm() {},

    // 提交应收订单
    handleConfirmOnes() {},

    // 点击订单事件做不同操作
    handleOnes() {
      this.arrC.map(item => {
        this.valueSku.push(item.commodity_repertory_sku)
        this.valueQuantity.push(item.quantity)
        this.valueAmount.push(item.amount)
        this.checked.push(false)
      })

      this.isOne = !this.isOne
      this.centerDialogVisibleOnesz = true
    },

    handleTow() {
      this.isTow = !this.isTow
      this.centerDialogVisibleTwo = true
    },

    handleNoTwo() {
      this.isTow = false
      this.centerDialogVisibleTwo = false
    },

    handleCloseTwo() {
      this.isTow = false
    },

    handleCloseOne() {
      this.isOne = false
    },

    handleFour() {},

    // 点击复制功能
    copyTtle() {
      const url = this.detailsData.erp_order_id // 拿到需要复制的参数

      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      console.log(oInput.value)
      document.execCommand('Copy') // 执行浏览器复制命令

      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success'
      })
      // 清除内存
      oInput.remove()
    }
  }
}
</script>

<style scoped>
.haveCheck {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: white;
  overflow: auto;
}

.haveCheck >>> .el-row {
  display: flex;
}
.haveCheck >>> .el-row div:nth-child(1) {
  flex: 1;
}
.haveCheck >>> .el-row div:nth-child(2) {
  flex: 1;
}

.haveCheck >>> .el-row div:nth-child(2) .el-button:nth-last-child(1) {
  padding: 8px 12px;
}

/* 改变的样式 */
.haveCheck >>> .el-row div:nth-child(2) div {
  float: left;
  padding: 3px 0 0 0;
  font-size: 13px;
}
.haveCheck >>> .el-row div:nth-child(2) div > div {
  padding: 2px 10px 2px 10px;
  border: #5e5c5c solid 1px;
  margin: 5px 5px 0 5px;
  border-radius: 3px;
  cursor: pointer;
}
.haveCheck >>> .el-row div:nth-child(2) div > div:nth-child(1) {
  border: none;
  padding: 2px 0px 2px 0px;
}
.haveCheck >>> .el-row div:nth-child(2) div > div:nth-child(4) {
  background: rgb(207, 21, 21);
  color: white;
  border: 1px solid white !important;
}

.haveCheck >>> .el-row div:nth-child(2) {
  flex: 0.8;
  padding-left: 238px;
}
.haveCheck >>> .el-row div:nth-child(2) > button {
  background: #909399;
  color: white;
  border: #909399 solid 1px;
  width: 110px;
}
.haveCheck .haveCheckWrap {
  margin: 20px 20px 0 0;
}
.title {
  margin-left: 10px;
  padding-top: 5px;
  display: flex;
  padding: 5px;
  border: 1px solid #e4e4e4;
}
.titles span {
  font-size: 20px;
  margin-bottom: 0;
  /* background: #dcdcdc; */
  font-weight: bold;
}
.titles span:nth-child(1) {
  padding: 1px 5px 1px 5px;
  font-weight: 500;
  font-size: 16px;
  background: #ffd922;
  margin: 5px;
}
.haveCheck .haveCheckWrap >>> .el-button {
  color: blue;
  margin-left: 5px;
  padding: 0 !important;
}
.titles {
  flex: 1;
}
.update {
  font-size: 14px;
  color: #8f8f8f;
  flex: 0.3;
  line-height: 24px;
}
.titleBackground {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
}
.titleBackground div {
  background: #e4e4e4;
  padding: 20px 0 20px 60px;
  width: 44.8%;
}
.haveCheckForm {
  margin: 10px 10px 0 10px;
  height: 1500px;
}
.formOne,
.formTwo {
  font-size: 14px;
}
.formOneLeft,
.formOneRight {
  float: left;
  width: 49.5%;
  border: 1px #dcdfe6 solid;
}
.formOneLeft {
  border-left: none;
  border-bottom: none;
}
.formOneRight {
  border-right: none;
  border-left: none;
  border-bottom: none;
}

.formOneLeft h4,
.formOneRight h4 {
  margin: 0;
  font-size: 14px;
  color: #4e4d4d;
  padding: 5px 0 0 0;
}
.formOneLeft div,
.formOneRight div {
  margin: 20px 20px 20px 20px;
  color: #5e5c5c;
}
.formOneRight div:nth-child(1) {
  /* padding-top: 24px; */
  margin-top: 43px;
}

.formOneRight {
}

.formTwo .trs {
}
.formTwo .trs > div:nth-child(1) {
  background: #e4e4e4;
  padding: 0;
}
.formTwo .trs:nth-last-child(1) {
  border-bottom: 1px solid #909399;
}
.formTwo .trs .trsTitle {
  display: flex;
  margin: 0;
  box-sizing: border-box;
}
.formTwo .trs .trsTitle div {
  border: 1px solid #909399;
  margin: 0;
  border-right: none;
  border-bottom: none;
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 10px;
  line-height: 15px;
}
.formTwo .trs .trsTitle div:nth-last-child(1) {
  border-right: 1px solid #909399;
}

.chearBox {
  clear: both;
}

.formTwo .trs .trsTitle >>> .el-button {
  font-size: 12px;

  margin: 0;
  border-radius: 0;
  border: 0;
  padding: 0;
}
.formTwo .trs .trsTitle >>> .el-button > span {
  width: 100%;
  height: 100%;
  display: block;
}

/* refund信息 */

.fromFooter {
}
.fromFooter > .formOneLeft {
  border-right: 0;

  width: 100%;
}

.fromFooter > .formOneLeft > .trs {
  /* border: #8f8f8f 1px solid; */
  font-size: 12px;
}
.fromFooter > .formOneLeft > .trs > .trsTitle {
  display: flex;
  border: 1px solid #8f8f8f;
  margin: 0;
  border-bottom: none;
  border-right: 0;
}
.fromFooter > .formOneLeft > .trs > .trsTitle:nth-child(1) {
  background: #e4e4e4;
}

.fromFooter > .formOneLeft > .trs > .trsTitle:nth-last-child(1) {
  border-bottom: 1px solid #8f8f8f;
}

.fromFooter > .formOneLeft > .trs > .trsTitle div {
  border-right: 1px solid #8f8f8f;

  margin: 0;
  width: 320px;
  padding: 10px;
  text-align: center;
}

.fromFooter .trs .trsTitle >>> .el-button {
  font-size: 12px;

  margin: 0;
  border-radius: 0;
  border: 0;
  padding: 0;
}
.fromFooter .trs .trsTitle >>> .el-button > span {
  width: 100%;
  height: 100%;
  display: block;
}

/* 预售弹窗 */
.skusFooter {
  margin: 5px;
}
.skusFooter div:nth-child(1) div {
  display: flex;
  justify-content: space-around;
  padding: 2px 0 0 0;
  flex-wrap: wrap;
}
/* .skusFooter div:nth-child(1) div div:nth-child(1){
  flex: 3;
}
.skusFooter div:nth-child(1) div div:nth-child(2){
  flex: 1;

}
.skusFooter div:nth-child(1) div div:nth-child(3){
  flex: 1;

} */

.skusFooter span {
  display: block;
  margin: 10px 0 0 10px;
  color: #3a8ee6;
  cursor: pointer;
}

.skusFooter div:nth-child(2) {
}
.skusFooter div:nth-child(1) div {
  text-align: center;
}
.skusFooter div:nth-child(2) div {
}
.skusFooter div:nth-child(2) div div input {
  width: 50px;
}
.skusFooter div:nth-child(2) div div:nth-child(1) input {
  width: 120px;
}
.skusFooter .brs {
  width: 100%;
}

.haveCheck >>> .el-dialog--center .el-dialog__body {
  padding: 0 !important;
}

/* 应收弹窗 */
.skuFooterAccounts {
}
.skuFooterAccounts > div:nth-child(1) {
  display: flex;
  justify-content: space-around;
  padding: 3px;
}
.skuFooterAccounts > div:nth-child(2) {
  height: 200px;
  overflow: auto;
}
.skuFooterAccounts > div:nth-child(2) > div {
  display: flex;
  padding: 5px;
  justify-content: space-between;
}

.skuFooterAccounts .inputOne input {
  width: 150px;
}
.skuFooterAccounts .inputTwo input {
  width: 100px;
}
.skuFooterAccounts .inputThree input {
  width: 100px;
}

.dlelteBtn {
  background: rgb(207, 21, 21);
  color: white;
  /* border: 1px solid white !important; */
  width: 60px;
  text-align: center;
  border-radius: 2px;
  margin: 10px 0 0 30px;
  cursor: pointer;
  font-size: 12px;
  padding: 3px;
}

/* 点击显示背景颜色 */
.activeOne {
  background: rgb(58, 142, 230);
  color: white;
  border: 1px solid white !important;
}

.activeTow {
  background: rgb(184, 87, 179);
  color: white !important;
  border: 1px solid white !important;
}

/* 改变可对状态按钮图标 */

.activeSingleOne {
  background: red !important;
  color: white !important;
  border: 1px solid white !important;
}

.activeSingleTwo {
  background: rgb(45, 168, 29) !important;
  color: white !important;
  border: 1px solid white !important;
}

.activeSingleThree {
  background: rgb(27, 62, 179) !important;
  color: white !important;
  border: 1px solid white !important;
}
</style>
