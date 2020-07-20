<template>
  <div class="skuDetails">
    <el-tabs
      :tab-position="tabPosition"
      style="height: 200px;margin-top:10px"
      @tab-click="handleClickRolling"
      class="muenWarp"
    >
      <el-tab-pane label="基本信息"></el-tab-pane>
      <el-tab-pane label="供应商信息"></el-tab-pane>
      <el-tab-pane label="物流信息"></el-tab-pane>
      <el-tab-pane label="包装信息"></el-tab-pane>
      <el-tab-pane label="销售信息"></el-tab-pane>
    </el-tabs>
    <div class="fiex">
      <h2 class="titles">
        {{viewRow.commodity_repertory_sku}}
        <i class="el-icon-document-copy"></i>
        <el-button type="text" @click="copyTtle">点击复制</el-button>
      </h2>
      <h2>{{goods.commodity_display_name}}</h2>
    </div>
    <div class="detailsOnes" ref="content">
      <div class="Ones0" ref="Ones0">
        <div class="line">
          <span>基本信息</span>
          <div></div>
        </div>
        <div class="oneText">
          <div>
            商品名称:
            <span>{{goods.commodity_display_name}}</span>
          </div>
          <div>
            英文名:
            <span>{{goods.commodity_english_name}}</span>
          </div>
          <div>
            类型:
            <span>
              {{goods.commodity_repertory_sku_type=== 1 ?'组装SKU':'库存SKU'}}
              <el-button type="text" @click="dialogTableVisible = true">查看图库</el-button>
            </span>
          </div>
          <div>
            品类:
            <span>{{goods.category_name}}</span>
          </div>

          <div>
            barcode:
            <span>{{goods.commodity_barcode}}</span>
          </div>
          <div>
            UPC Code:
            <span>{{goods.commodity_upc_code}}</span>
          </div>
          <div>
            大/小货:
            <span>{{goods.commodity_scale_type ===1 ?'大货':"小货"}}</span>
          </div>
          <div>
            新/旧货:
            <span>{{goods.commodity_new_old === 1?"新货":'旧货'}}</span>
          </div>
          <div>
            产品描述:
            <span>{{goods.commodity_description}}</span>
          </div>
          <div>
            证书:
            <span>
              <el-button
                type="text"
                @click="dialogFormVisible = true"
                v-if="isCertificate.code ===  200"
              >点击查看</el-button>
              <el-button type="text" @click="dialogFormVisible = false" v-else>没有相应的证书图片</el-button>
            </span>
          </div>
          <div>
            产品列表图库:
            <span>
              <el-button
                type="text"
                @click="dialogNableVisible = true"
                v-if="isImgs.code ===  200"
              >点击查看</el-button>
              <el-button type="text" @click="dialogNableVisible = false" v-else>没有相应的列表图库</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="Ones1" ref="Ones1">
        <div class="line">
          <span>供应商信息</span>
          <div></div>
        </div>

        <div v-if="information.data">
          <div class="table">
            <div class="table-column-group">
              <div class="table-column"></div>
              <div class="table-column"></div>
              <div class="table-column"></div>
              <div class="table-column"></div>
            </div>
            <div class="table-header-group">
              <ul class="table-row">
                <li class="table-cell">供应商名称</li>
                <li class="table-cell">地址</li>
                <li class="table-cell">联系电话</li>
                <li class="table-cell">邮箱</li>
              </ul>
            </div>
            <div class="table-row-group">
              <ul class="table-row">
                <li class="table-cell">杭州玩具厂</li>
                <li class="table-cell">浙江省杭州市萧山区天工路22号</li>
                <li class="table-cell">028-25487874</li>
                <li class="table-cell"></li>
              </ul>
              <ul class="table-row">
                <li class="table-cell">杭州玩具厂</li>
                <li class="table-cell">四川省成都市武侯区人民路22号</li>
                <li class="table-cell">028-25487874</li>
                <li class="table-cell"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="TwoText" v-else>
          <h4 class="towTexts">没有相应供货商</h4>
        </div>
      </div>
      <div class="Ones2" ref="Ones2">
        <div class="line">
          <span>物流信息</span>
          <div></div>
        </div>
        <div class="wraps">
          <div>
            大小:
            <span></span>
          </div>
          <div>
            卸货识别码:
            <span>{{logistic.hts_code}}</span>
          </div>
          <div>
            关税税率（％）关税税率:
            <span>{{logistic.rates_of_duty}}</span>
          </div>
          <div>
            FNSKU:
            <span>{{logistic.commodity_repertory_sku}}</span>
          </div>
          <div>
            艾欧·阿辛:
            <span></span>
          </div>
        </div>
      </div>
      <div class="Ones3" ref="Ones3">
        <div class="line">
          <span>包装信息</span>
          <div></div>
        </div>
        <div class="tablea">
          <div class="table-column-groupa">
            <div class="table-columna"></div>
            <div class="table-columna"></div>
            <div class="table-columna"></div>
            <div class="table-columna"></div>
          </div>
          <div class="table-header-groupa">
            <ul class="table-rowa">
              <li class="table-cella">
                包裹重量
                <br />包装重量
              </li>
              <li class="table-cella">
                {{wrap.package_weight}}
                <br />
                {{wrap.package_v}}
              </li>
              <li class="table-cella">联系电话</li>
              <li class="table-cella">{{wrap.commodity_id}}</li>
            </ul>
          </div>
          <div class="table-row-groupa">
            <ul class="table-rowa">
              <li class="table-cella">
                每箱PC
                <br />每箱数量
              </li>
              <li class="table-cella">{{wrap.per_carton_num}}</li>
              <li class="table-cella">
                包纸箱宽度（英寸）
                <br />外箱宽度（英寸
              </li>
              <li class="table-cella"></li>
            </ul>
            <ul class="table-rowa">
              <li class="table-cella">
                包装宽度（英寸）
                <br />包装宽度（英寸）
              </li>
              <li class="table-cella"></li>
              <li class="table-cella">
                纸箱长度（英寸）
                <br />外箱长度（英寸）
              </li>
              <li class="table-cella"></li>
            </ul>
            <ul class="table-rowa">
              <li class="table-cella">
                包装长度（英寸
                <br />包装长度（英寸
              </li>
              <li class="table-cella"></li>
              <li class="table-cella">
                纸箱高度（英寸）
                <br />外箱高度（英寸）
              </li>
              <li class="table-cella"></li>
            </ul>
            <ul class="table-rowa">
              <li class="table-cella">
                纸箱V（CI）
                <br />外箱体积（立方英寸）
              </li>
              <li class="table-cella"></li>
              <li class="table-cella"></li>
              <li class="table-cella"></li>
            </ul>
            <ul class="table-rowa">
              <li class="table-cella">
                套餐V（CI）
                <br />包装体积（立方英寸）
              </li>
              <li class="table-cella"></li>
              <li class="table-cella"></li>
              <li class="table-cella"></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="Ones4" ref="Ones4">
        <div class="line">
          <span>销售信息</span>
          <div></div>
        </div>
        <div class="wraps">
          <div>部门销售部门: {{sales.commodity_repertory_sku}}</div>
          <div>销售人员: {{sales.commodity_id}}</div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <div class="popup">
      <!-- 查看图库弹窗 -->
      <div class="popupOne">
        <el-dialog title :visible.sync="dialogTableVisible" :modal-append-to-body="false">
          <p>OS-28SW-FR-91067-R</p>
          <p>户外多功能儿童餐椅（yingwenwoyebuhuixie</p>
          <el-table :data="sku" border>
            <el-table-column property="platform_sku" label="SKU"></el-table-column>
            <el-table-column property="name" label="名称"></el-table-column>
            <el-table-column property="address" label="barcode"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <!-- 查看证书弹窗 -->
      <div class="popupTwo">
        <el-dialog title :visible.sync="dialogFormVisible" :modal-append-to-body="false">
          <div class="hepin">
            <div class="block">
              <el-carousel trigger="click" height="450px">
                <el-carousel-item v-for="(item,index) in certificate" :key="index">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="popupTwoImge">
              <h3>图片名称</h3>
              <p>图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明</p>
            </div>
          </div>
        </el-dialog>
      </div>
      <!-- 查看产品列表弹窗 -->
      <div class="popupThree">
        <el-dialog title :visible.sync="dialogNableVisible" :modal-append-to-body="false">
          <div class="hepin">
            <div class="block">
              <el-carousel trigger="click" height="450px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="popupTwoImge">
              <h3>图片名称</h3>
              <p>图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明图片说明</p>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      tabPosition: 'left',
      goods: {}, // 商品详情
      logistic: {}, // 商品物流信息
      sales: {}, // 商品销售信息
      wrap: [], // 商品包装信息
      information: [], // 供应商信息
      certificate: [], // 商品证书
      imgs: [], // 商品图片
      sku: [], // 商品平台sku
      assembly: [], // 商品组装信息

      isImgs: {},
      isCertificate: {},

      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogNableVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      viewRow: {},
      showIndex: null
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['scm'])
  },
  methods: {

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
    },

    // 获取vuex中的详情数据
    fetchData() {
      this.viewRow = this.scm.viewRow

      // 获取数据
      this.getData()
    },

    // 根据每个tab做定位的滚动事件
    handleClickRolling(e) {
      const num = e.index
      const el = document.getElementsByClassName(`Ones${num}`)[0]
      this.$nextTick(() => {
        this.$refs.content.scrollTo({ behavior: 'smooth', top: el.offsetTop })
      })
    },

    // 获取数据
    getData() {
      // 重新复制给data当值的commodity_id
      const data = {
        commodity_id: this.viewRow.commodity_id
      }

      // 获取商品详情的数据
      this.$store.dispatch('scm/CommodityById', data).then(res => {
        if (res.code === 200) {
          this.goods = res.data
        }
      })

      // 获取供应商信息
      this.$store.dispatch('scm/SupplierByCommodity', data).then(res => {
        if (res.code === 200) {
          // 供应商信息
          res.data.forEach(r => {
            this.information = r
          })
        }
      })

      // 获取商品包装信息
      this.$store.dispatch('scm/PackageByCommodity', data).then(res => {
        if (res.code === 200) {
          // 商品包装信息
          res.data.forEach(r => {
            this.wrap = r
          })
        }
      })

      // 获取商品图片
      this.$store.dispatch('scm/PictureByCommodity', data).then(res => {
        if (res.code === 200) {
          // 判断使用
          this.isImgs = res
          // 商品图片
          res.data.forEach(r => {
            this.imgs = r
          })
        }
      })

      // 获取商品平台sku
      this.$store.dispatch('scm/PlatformByCommodity', data).then(res => {
        if (res.code === 200) {
          // 商品图片
          this.sku = res.data
        }
      })

      // 获取商品物流信息
      this.$store.dispatch('scm/LogisticsByCommodity', data).then(res => {
        if (res.code === 200) {
          // 商品物流信息
          res.data.forEach(r => {
            this.logistic = r
          })
        }
      })

      // 获取商品组装信息
      this.$store.dispatch(
        'scm/RcombinationByCommodity',
        data
      ) /* .then(res => {
        if (res.code === 200) {
          console.log("22222");
        }
      }); */

      // 获取商品证书
      this.$store.dispatch('scm/CertificateByCommodity', data).then(res => {
        if (res.code === 200) {
          // 判断使用
          this.isCertificate = res
          // 商品证书
          res.data.forEach(r => {
            this.certificate = r
          })
        }
      })

      // 获取商品销售信心
      this.$store.dispatch('scm/PurchaseSaleByCommodity', data).then(res => {
        if (res.code === 200) {
          // 商品销售信心
          res.data.forEach(r => {
            this.sales = r
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.popupOne >>> .el-dialog {
  padding: 10px 100px 100px 20px;
}
.popupTwo >>> .el-dialog,
.popupThree >>> .el-dialog {
  width: 50%;
  padding: 0;
  margin: 0 auto;
  position: relative;
}
.titles >>> .el-button {
  /* font-size: 18px; */
  color: blue;
  margin-left: 5px;
}
.titles {
  font-size: 20px;
  margin-bottom: 0;
}

.popup >>> .el-dialog .el-dialog__header {
  padding: 0;
}
.popup >>> .el-carousel {
  width: 70%;
}
.popup >>> .el-dialog__body {
  padding: 0;
}

.hepin {
  /* display: flex; */
}
.block {
  /* float: left; */
}

.popupTwoImge {
  position: absolute;
  top: 0;
  left: 71%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

h2,
h3,
h4 {
  line-height: 10px;
}
.skuDetails {
}
.fiex {
  margin-left: 150px;
  padding-top: 5px;
}

.muenWarp {
  position: fixed;
}

/* 滚动设置的高度 */
.detailsOnes {
  position: absolute;

  left: 150px;
  overflow: visible;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

.detailsOnes > div:last-of-type {
  height: 900px;
}

.line {
  display: flex;
  padding-top: 20px;
}
.line > div {
  background: #909399;
  width: 1200px;
  height: 1px;
  margin: 10px 0 0 15px;
}

.line > span {
  width: 100px;
}
.oneText,
.wraps {
  margin: 10px 0 10px 40px;
  font-size: 14px;
}
.wraps > div {
  margin-top: 20px;
}
.oneText > div > span >>> .el-button span {
  text-decoration: underline;
  color: blue;
}

.oneText > div {
  margin: 20px 0 0 0;
  font-size: 15px;
  color: #303133;
}
.oneText > div > span a {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
.TwoText {
  /* padding: 20px 0 20px 0; */
}
.towTexts {
  text-align: center;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* 表格 */
.table {
  display: table;
  border-collapse: collapse;
  border: 1px solid #ccc;
  margin: 35px 0 30px 35px;
}
.table-caption {
  display: table-caption;
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.table-column-group {
  display: table-column-group;
}
.table-column {
  display: table-column;
  width: 200px;
}
.table-row-group {
  display: table-row-group;
}
.table-row {
  display: table-row;
}
.table-row-group .table-row:hover,
.table-footer-group .table-row:hover {
}
.table-cell {
  display: table-cell;
  padding: 0 5px;
  border: 1px solid #ccc;
}
.table-header-group {
  display: table-header-group;
  font-weight: bold;
}
.table-header-group ul li {
  font-size: 13px;
  color: #606266;
  padding: 5px;
}
.table-header-group .table-row li {
  text-align: center;
}

.table-row-group .table-row .table-cell {
  text-align: center;
  font-size: 13px;
  color: #606266;
  padding: 5px;
}

/* 表格 */
.tablea {
  display: table;
  border-collapse: collapse;
  border: 1px solid #ccc;
  margin: 35px 0 30px 35px;
}

.tablea .table-column-groupa > div:nth-child(1),
.tablea .table-column-groupa > div:nth-child(3) {
  background: #ccc;
}

.table-captiona {
  display: table-caption;
  margin: 0;
  padding: 0;
  font-size: 16px;
}
.table-column-groupa {
  display: table-column-group;
}
.table-columna {
  display: table-column;
  width: 200px;
}
.table-row-groupa {
  display: table-row-group;
}
.table-rowa {
  display: table-row;
}
.table-row-groupa .table-rowa:hover,
.table-footer-groupa .table-rowa:hover {
}
.table-cella {
  display: table-cell;
  padding: 0 5px;
  border: 1px solid #909399;
}
.table-header-groupa {
  display: table-header-group;
  font-weight: bold;
}
.table-header-groupa ul li {
  font-size: 13px;
  color: #303133;
  padding: 30px;
}
.table-header-groupa .table-rowa li {
  text-align: center;
}

.table-row-groupa .table-rowa .table-cella {
  text-align: center;
  font-size: 13px;
  color: #303133;
  padding: 30px 0 30px 0;
  line-height: 20px;
}
</style>
