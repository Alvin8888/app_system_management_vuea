<template>
  <div class="haveCheck">
    <!-- 返回按钮 -->
    <el-row>
      <div>
        <el-button plain @click="$router.back(-1)">返回订单列表</el-button>
      </div>
      <div>
        <div>
          <div>标记订单为:</div>
          <div :class="{activeOne:isOne}" @click="handleOnes">预收订单</div>
          <div :class="{activeTow:isTow}" @click="handleTow">应收订单</div>
          <div @click="handleFour">删除订单</div>
        </div>
        <el-button plain>查无此单</el-button>
      </div>
    </el-row>
    <div class="haveCheckWrap">
      <div class="title">
        <div class="titles">
          <span>FBA</span>
          <span>0330#111-0011409-9611463#AmazonBL</span>
          <i class="el-icon-document-copy"></i>
          <el-button type="text" @click="copyTtle">点击复制</el-button>
        </div>
        <div class="update">
          更新时间：
          <span>2020.05.03 20:24</span>
        </div>
      </div>
      <div class="titleBackground">
        <div>ERP系统信息</div>
        <div>Statement信息</div>
      </div>
    </div>

    <div class="haveCheckForm">
      <div class="formOne">
        <div class="formOneLeft">
          <h4>基本信息</h4>

          <div>
            销售平台:
            <span>沃尔玛</span>
          </div>
          <div>
            销售店铺:
            <span>店铺</span>
          </div>
          <div>
            Walmart Order# :
            <span>16546156165465</span>
          </div>
        </div>
        <div class="formOneRight"></div>
      </div>
      <div class="formOne chearBox">
        <div class="formOneLeft">
          <h4>顾客信息</h4>
          <div>
            邮箱:
            <span>21313124131@qq.com</span>
          </div>
          <div>
            First Name:
            <span>Donald</span>
          </div>
          <div>
            Last Name:
            <span>Trump</span>
          </div>
          <div>
            ERP编号 :
            <span>15464655</span>
          </div>
          <div>
            电话 :
            <span>+86 028 8458 4575</span>
          </div>
          <div>
            币种 :
            <span>USD</span>
          </div>
        </div>
        <div class="formOneRight"></div>
      </div>

      <div class="formTwo chearBox">
        <div class="formOneLeft">
          <h4>发货信息</h4>

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
              <div>数量</div>
              <div>2</div>
              <div>1</div>
              <div>1</div>
            </div>
            <div class="trsTitle">
              <div>发货时间</div>
              <div>2020.3.30</div>
              <div>2020.3.30</div>
              <div></div>
            </div>
            <div class="trsTitle">
              <div>发货仓Location</div>
              <div>US FBA_BL</div>
              <div>ATL</div>
              <div>US FBA_BL</div>
            </div>
            <div class="trsTitle">
              <div>物流公司</div>
              <div>UPS</div>
              <div>UPS</div>
              <div>UPS</div>
            </div>
            <div class="trsTitle">
              <div>运单号</div>
              <div>983857092</div>
              <div>9838570</div>
              <div>9838570928</div>
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
            </div>
            <div class="trsTitle">
              <div>订单总金额</div>
              <div>999.99</div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="formOneRight"></div>
      </div>
      <div class="formTwo chearBox">
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
                  <el-button>退货总价</el-button>
                </el-tooltip>
              </div>
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
                  <el-button>总金额</el-button>
                </el-tooltip>
              </div>
              <div>999.99</div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div class="formOneRight"></div>
      </div>
    </div>

    <!-- 预收订单弹窗 -->
    <el-dialog
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
          <div v-for="(item,index) of skuArr" :key="index">
            <div>
              <el-checkbox v-model="checked[index]">{{item.name}}</el-checkbox>
            </div>
            <div>
              <input type="text" v-model="valueText[index]" />
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleNoTwo">取 消</el-button>
        <el-button type="primary" @click="handleConfirmOnes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const skuArr = [
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
      checked: [], // 应收sku
      valueText: [], // input值
      skuArr: skuArr
    }
  },
  methods: {
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
    handleConfirmOnes() {},

    // 点击订单事件做不同操作
    handleOnes() {
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

    handleFour() {},

    // 点击复制功能
    copyTtle() {
      const url = this.goods.commodity_repertory_sku // 拿到需要复制的参数

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

.haveCheck >>> .el-button {
  padding: 8px 35px;
  margin-left: 5px;
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

/* .activeFour{
  background: rgb(207, 21, 21);
  color:white;
  border: 1px solid white !important;
}
 */

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
  padding-top: 24px;
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
  justify-content: space-around;
  padding: 5px;
}
</style>
