<template>
  <div id="orderDetail">
    <el-button @click="$router.go(-1)" style="margin-bottom: 30px;">返回订单列表</el-button>
    <div class="order-info">
      <p>
        订单详情
      </p>
      <div class="btn-box" v-if="$route.query.type">
        {{$route.query.type == 1 ? '待分仓' : $route.query.type == 2 ? '已分仓' : '已打单'}}
      </div>
      <div class="btn-box" v-else>
        <div class="btn">
          FBA
        </div>
        <div class="btn">
          FBM
        </div>
      </div>
    </div>
    <div class="good-info">
      <div class="title">
        基础信息
      </div>
      <div class="info-box">
        <div class="order-num">
          订单号：<span>{{orderInfo.order_id}}</span>
          <i class="el-icon-document-copy"></i>
          <el-button class="btn" type="text" @click="copyTtle">点击复制</el-button>
        </div>
        <div class="comm-box">
          <span>下单时间</span>{{orderInfo.order_date}}
        </div>
        <div  class="comm-box">
          <span>下单平台</span>{{orderInfo.order_platform}}
        </div>
        <div  class="comm-box">
          <span>销售店铺</span>{{orderInfo.sales_shops}}
        </div>
      </div>
    </div>
    <div class="user-info">
      <div class="title">
        <div class="title-box">
          <span>顾客信息</span>
          <div>
            <el-alert
              v-if="$route.query.type == 1 && errStatus"
              :title="errTips"
              class="errTips"
              type="error"
              show-icon>
            </el-alert>
          </div>
        </div>
        <div class="edit-box" v-if="$route.query.type == 2 || $route.query.type == 1">
          <el-button @click="edit('userInfo')" type="text" size="small">{{editUserInfo ? '取消' : '编辑'}}</el-button>
          <el-button @click="save('userInfo')" v-if="editUserInfo" type="text" size="small">保存</el-button>
        </div>

      </div>
      <!--未打单可编辑-->
      <div class="info-box" v-if="!editUserInfo">
        <div class="comm-box name-box">
          <div style="margin-right: 50px;">
            <span>名字：</span>{{userInfo.name}}
          </div>
          <div>
            <span>姓氏：</span>{{userInfo.name}}
          </div>
        </div>
        <div  class="comm-box">
          <span><strong v-if="$route.query.type == 1">*</strong>邮箱：</span>{{userInfo.email}}
        </div>
        <div  class="comm-box">
          <span><strong v-if="$route.query.type == 1">*</strong>电话：</span>{{userInfo.phone}}
        </div>
        <div  class="comm-box">
          <span><strong v-if="$route.query.type == 1">*</strong>币种：</span>{{userInfo.currency}}
        </div>
        <div  class="comm-box" style="margin-bottom: 20px;">
          <span>收货信息</span>
        </div>
        <div class="address-box">
          <div class="address-info">
            <div>
              <span><strong v-if="$route.query.type == 1">*</strong>收件人姓名</span>{{userInfo.name}}
            </div>
            <div>
              <span>地址1</span>{{userInfo.address1}}
            </div>
            <div>
              <span>地址2</span>{{userInfo.address2}}
            </div>
            <div>
              <span>地址3</span>{{userInfo.address3}}
            </div>
          </div>
          <div class="address-info">
            <div>
              <span><strong v-if="$route.query.type == 1">*</strong>城市</span>{{userInfo.city}}
            </div>
            <div>
              <span><strong v-if="$route.query.type == 1">*</strong>州/省</span>{{userInfo.state}}
            </div>
            <div>
              <span><strong v-if="$route.query.type == 1">*</strong>国家/地区</span>{{userInfo.country}}
            </div>
            <div>
              <span><strong v-if="$route.query.type == 1">*</strong>邮编</span>{{userInfo.zip}}
            </div>
          </div>
        </div>
      </div>
      <div class="info-box" v-if="editUserInfo">
        <div class="comm-box name-box">
          <div class="flex-box" style="margin-right: 50px;">
            <span>名字：</span><el-input v-model="userInfo.name" placeholder="请输入名字"></el-input>
          </div>
          <div class="flex-box">
            <span>姓氏：</span><el-input v-model="userInfo.name" placeholder="请输入姓氏"></el-input>
          </div>
        </div>
        <div  class="comm-box">
          <span><strong v-if="$route.query.type == 1">*</strong>邮箱：</span><el-input v-model="userInfo.email" placeholder="请输入email"></el-input>
        </div>
        <div  class="comm-box">
          <span><strong v-if="$route.query.type == 1">*</strong>电话：</span><el-input v-model="userInfo.phone" placeholder="请输入电话"></el-input>
        </div>
        <div  class="comm-box">
          <span><strong v-if="$route.query.type == 1">*</strong>币种：</span><template>
          <el-select v-model="userInfo.currency" placeholder="请选择">
            <el-option
                v-for="item in currencyList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </template>
        </div>
        <div  class="comm-box" style="margin-bottom: 20px;">
          <span>收货信息</span>
        </div>
        <div class="address-box">
          <div class="address-info">
            <div class="flex-box">
              <span><strong v-if="$route.query.type == 1">*</strong>收件人姓名</span><el-input v-model="userInfo.name" placeholder="请输入名字"></el-input>
            </div>
            <div class="flex-box">
              <span>地址1</span><el-input v-model="userInfo.address1" placeholder="请输入地址1"></el-input>
            </div>
            <div class="flex-box">
              <span>地址2</span><el-input v-model="userInfo.address2" placeholder="请输入地址1"></el-input>
            </div>
            <div class="flex-box">
              <span>地址3</span><el-input v-model="userInfo.address3" placeholder="请输入地址1"></el-input>
            </div>
          </div>
          <div class="address-info">
            <div class="flex-box">
              <span><strong v-if="$route.query.type == 1">*</strong>城市</span><el-input v-model="userInfo.city" placeholder="请输入地址1"></el-input>
            </div>
            <div class="flex-box">
              <span><strong v-if="$route.query.type == 1">*</strong>州/省</span><el-input v-model="userInfo.state" placeholder="请输入地址1"></el-input>
            </div>
            <div class="flex-box">
              <span><strong v-if="$route.query.type == 1">*</strong>国家/地区</span><el-input v-model="userInfo.country" placeholder="请输入地址1"></el-input>
            </div>
            <div class="flex-box">
              <span><strong v-if="$route.query.type == 1">*</strong>邮编</span><el-input v-model="userInfo.zip" placeholder="请输入地址1"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="logistics-box">
      <div class="title">
        <span>商品及物流信息</span>
        <div class="edit-box" v-if="$route.query.type == 2 || $route.query.type == 1">
          <el-button @click="edit('logistics')" type="text" size="small">{{logistics ? '取消' : '编辑'}}</el-button>
          <el-button @click="save('logistics')" v-if="logistics" type="text" size="small">保存</el-button>
        </div>
      </div>
      <div class="info-box" v-if="$route.query.type">
        <div class="search-bar">
          <el-form :model="search" ref="search" class="search-bar" inline>
            <el-form-item prop="keyWords">
              <el-input
                  class="key-words"
                  placeholder="请输入SKU查询"
                  v-model="search.keyWords"
                  clearable>
              </el-input>
            </el-form-item>
            <el-button type="primary" class="btn" @click="searchKey('search')">搜索</el-button>
            <el-button type="primary" plain class="btn" @click="cancelSunmit('search')">重置</el-button>
          </el-form>
        </div>
        <!--已分仓可编辑-->
        <div class="data-tabel" v-if="!logistics">
          <template>
            <el-table
                ref="multipleTable"
                :data="orderData"
                border
                stripe
                style="width: 100%">
              <el-table-column
                  label="平台sku">
                <el-table-column
                    prop="platform_sku"
                    label="sku名">
                </el-table-column>
                <el-table-column
                    prop="buy_sum"
                    label="购买数量">
                </el-table-column>
              </el-table-column>
              <el-table-column
                  label="库存sku">
                <el-table-column
                    prop="commodity_repertory_sku"
                    label="sku名">
                </el-table-column>
                <el-table-column
                    prop="is_ship"
                    label="是否发货">
                  <template slot-scope="scope">
                    {{scope.row.is_ship ? '发货' : '不发货'}}
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="logistics_mode"
                  label="物流方式">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="delivery_warehouse"
                  label="发货仓库">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="waybill_no"
                  label="运单号">
              </el-table-column>
              <el-table-column
                  align="center"
                  prop="status"
                  label="状态">
                <template slot-scope="scope">
                  {{scope.row.status == 0 ? '库存不足' : scope.row.status == 1 ? '分仓成功' : '已发货'}}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="data-tabel" v-show="logistics">
          <div class="btn-box">
            <el-button type="primary" class="btn" @click="removeData('orderTabel')">删除</el-button>
            <el-button type="primary" plain class="btn" @click="addGoods()">新增</el-button>
          </div>
          <template>
            <el-table
                ref="orderTabel"
                :data="orderData"
                border
                stripe
                style="width: 100%">
              <el-table-column
                  label-class-name="checkAll"
                  type="selection"
                  width="70">
              </el-table-column>
              <el-table-column
                  label="平台sku">
                <el-table-column
                    prop="platform_sku"
                    label="sku名">
                </el-table-column>

                <el-table-column
                    prop="buy_sum"
                    label="购买数量">
                  <template slot-scope="scope">
                    <div class="num-box">
                      <el-input-number v-model="scope.row.buy_sum" :min="1" label="描述文字"></el-input-number>
                    </div>
                  </template>
                </el-table-column>

              </el-table-column>

              <el-table-column
                  label="库存sku">
                <el-table-column
                    prop="commodity_repertory_sku"
                    label="sku名">
                </el-table-column>

                <el-table-column
                    prop="is_ship"
                    label="是否发货">
                  <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.is_ship"
                        active-text="发货"
                        inactive-text="不发货">
                    </el-switch>
                  </template>
                </el-table-column>

              </el-table-column>
              <el-table-column
                  align="center"
                  prop="logistics_mode"
                  label="物流方式">
              </el-table-column>

              <el-table-column
                  align="center"
                  prop="delivery_warehouse"
                  label="发货仓库">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.delivery_warehouse" clearable placeholder="请选择">
                    <el-option
                        v-for="item in warehoursList"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                  </el-select>
                </template>

              </el-table-column>

              <el-table-column
                  align="center"
                  prop="waybill_no"
                  label="运单号">
              </el-table-column>

              <el-table-column
                  align="center"
                  prop="status"
                  label="状态">
                <template slot-scope="scope">
                  {{scope.row.status == 0 ? '库存不足' : scope.row.status == 1 ? '分仓成功' : '已发货'}}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <!--基础订单详情-->
      <div class="info-box" v-else>
        <template>
          <el-table
              ref="multipleTable"
              :data="tableData"
              border
              stripe
              style="width: 100%">
            <el-table-column
                align="center"
                prop="platform_sku"
                label="平台sku">
            </el-table-column>
            <el-table-column
                align="center"
                prop="platform_display_name"
                label="数量">
            </el-table-column>
            <el-table-column
                align="center"
                prop="is_pre_sale"
                label="库存sku">
            </el-table-column>
            <el-table-column
                align="center"
                prop="email"
                label="单价">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="金额">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="发货仓库">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="运单号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="税码TaxCode">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="税费Item Tax">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="运费Shipping Fee">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="Selling Fees">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="FBA Fees">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="Other Fees">
            </el-table-column>
            <el-table-column
                align="center"
                prop="sale_user_name"
                label="PAYPAL ID">
            </el-table-column>
          </el-table>
        </template>
      </div >
      <!--新增物流信息-->
      <div class="dialog">
        <el-dialog
            append-to-body
            title="新增商品"
            :visible.sync="dialogVisible"
            width="20%"
            center
            :before-close="handleClose">
          <div style="margin-top: 40px">
            <el-form :model="ruleForm" :rules="rule" ref="ruleForm" label-width="15px">
              <el-form-item label=" " prop="addInfo">
                <el-input
                    show-word-limit
                    class="deleteInput"
                    placeholder="请输入平台sku"
                    maxlength="20"
                    v-model="ruleForm.addInfo"
                    clearable>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPlatformCurrencyList,
  selectOrderInfo,
  orderInfoEdit,
  searchFilter,
  orderInfoSearchAddDel
} from '@/api/mmc'
export default {
  name: 'Index',
  data() {
    return {
      orderId: this.$route.query.id,
      errTips: '数据缺失',
      editUserInfo: false,
      logistics: false,
      search: {
        keyWords: null
      },
      userInfo: {
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        address3: '',
        state: '',
        city: '',
        country: '',
        zip: '',
        currency: ''
      },
      userInfoTmp: {},
      orderInfo: {
        order_id: '',
        order_date: '',
        order_platform: '',
        sales_shops: ''
      },
      currencyList: [],
      orderData: [
        {
          platform_sku: '',
          buy_sum: '',
          commodity_repertory_sku: '',
          is_ship: true,
          logistics_mode: '',
          delivery_warehouse: '',
          waybill_no: '',
          status: ''
        }
      ],
      orderDataTmp: [],
      warehoursList: [],
      tableData: [],
      errStatus: false,
      rules: ['email', 'phone', 'currency', 'name', 'city', 'zip', 'state', 'nation'],
      dialogVisible: false,
      ruleForm: {
        addInfo: ''
      },
      rule: {
        deleteInfo: [
          { required: true, message: '请输入平台sku', trigger: 'blur' }
        ]
      }
    }
  },
  activated() {
    const data = {
      type: null
    }
    getPlatformCurrencyList(data).then(res => {
      this.currencyList = res.data.data
    })
    this.detailsInit()
  },
  methods: {
    copyTtle() {
      const url = this.orderInfo.order_id // 拿到需要复制的参数
      const oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$notify({
        title: '成功',
        message: '复制成功',
        type: 'success'
      })
      // 清除内存
      oInput.remove()
    },
    detailsInit() {
      this.initDefualData()
    },
    initDefualData() {
      // 基础版数据
      const data = {
        id: this.$route.query.id
      }
      searchFilter().then(res => {
        const data = res.data.data
        this.warehoursList = data.warehours
      })
      selectOrderInfo(data).then(res => {
        const data = res.data.data[0]
        this.errStatus = this.rules.some(item2 => {
          return data[item2] === ''
        })
        console.log(this.errStatus)
        this.userInfo = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address1: data.address,
          address2: data.address_two,
          address3: data.address_three,
          state: data.state,
          city: data.city,
          country: data.nation,
          zip: data.zip,
          currency: data.currency
        }
        this.orderInfo = {
          order_id: data.order_id,
          order_date: data.order_date,
          order_platform: data.order_platform,
          sales_shops: data.sales_shops
        }
        let arr = []
        data.depot_type.map(item => {
          item.is_ship == 0 ? item.is_ship = true : item.is_ship = false
          const obj = {
            platform_sku: item.platform_sku,
            buy_sum: data.buy_sum,
            commodity_repertory_sku: item.commodity_repertory_sku,
            is_ship: item.is_ship,
            logistics_mode: item.logistics_mode,
            delivery_warehouse: item.delivery_warehouse,
            waybill_no: item.waybill_no,
            status: item.status
          }
          arr.push(obj)
        })

        this.orderData = arr
      })
    },
    searchKey() {
      const data = {
        id: this.$route.query.id,
        type: 1,
        sku: this.search.keyWords
      }
      orderInfoSearchAddDel(data).then(res => {
        this.orderData = res.data.data
      })
    },
    cancelSunmit(formName) {
      this.$refs[formName].resetFields()
      this.detailsInit()
    },
    closeDialog(formName) {
      this.$refs[formName].resetFields()
      this.dialogVisible = false
    },
    edit(type) {
      if (type == 'userInfo') {
        if (this.editUserInfo) {
          this.userInfo = this.userInfoTmp
        } else {
          this.userInfoTmp = JSON.parse(JSON.stringify(this.userInfo))
        }
        this.editUserInfo = !this.editUserInfo
      }
      if (type == 'logistics') {
        if (this.logistics) {
          this.orderData = this.orderDataTmp
        } else {
          this.orderDataTmp = JSON.parse(JSON.stringify(this.orderData))
        }
        this.logistics = !this.logistics
      }
    },
    save(type) {
      let data = {
        id: this.$route.query.id,
        type: 1
      }
      if (type == 'userInfo') {
        this.editUserInfo = false
        for (const key in this.userInfo) {
          data[key] = this.userInfo[key]
        }
      }
      if (type == 'logistics') {
        this.logistics = false
        data.type = 2
        let arr = []
        this.orderData.map(item => {
          item.is_ship ? item.is_ship = '0' : item.is_ship = '1'
          const obj = {
            platform_sku: item.platform_sku,
            buy_sum: item.buy_sum,
            commodity_repertory_sku: item.commodity_repertory_sku,
            is_ship: item.is_ship,
            logistics_mode: item.logistics_mode,
            delivery_warehouse: item.delivery_warehouse,
            waybill_no: item.waybill_no,
            status: item.status
          }
          arr.push(obj)
        })
        data.depot_type = arr
      }
      orderInfoEdit(data).then(res => {
        this.initDefualData()
      })
    },
    removeData(name) {
      console.log(this.$refs[name].store.states.selection)
    },
    addGoods() {
      this.dialogVisible = true
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {

      })
    }
  }
}
</script>

<style scoped lang="less">
  p{
    margin: 0;
  }
  #orderDetail{
    color: #666;
    font-weight: bold;
    padding: 0  20px;
    padding-top: 30px;
    .order-info{
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      padding:0 20px;
      p{
        font-size: 26px;
        color: #666;
        font-weight: bold;
      }
      .btn-box{
        display: flex;
        justify-content: space-between;
        .btn{
          width: 45px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          color: #fff;
          background-color: #666;
          margin-left: 10px;
        }
      }
      /deep/.el-button {
        padding: 0;
      }
    }
    .info-box{
      padding:10px 20px;
      padding-bottom: 50px;
      .order-num{
        color: #666;
        margin-bottom: 40px;
        span{
          color: #0000ff;
          text-decoration: underline;
          margin-right: 30px;
        }
      }
      .address-box{
        .address-info{
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          div{
            min-width: 20%;
            font-weight: normal;
            span{
              font-weight: bold;
              display: inline-block;
              min-width: 100px;
            }
          }
        }
      }
      .search-bar {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .key-words {
          min-width: 260px;
        }

        .sala, .status {
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
      .data-tabel{
        .num-box{

          /deep/.el-input-number{
            width: 100%;
          }
        }
      }
    }
    .title{
      height: 50px;
      color: #666;
      font-size: 14px;
      line-height: 50px;
      background-color: #cccccc;
      padding-left: 40px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      /deep/.el-alert__closebtn{
        top: 10px;
      }
      .title-box{
        display: flex;
        align-items: center;
        span{
          margin-right: 30px;
        }
      }
      .errTips{
        width: 180px;
        height: 30px;
      }
      .edit-box{
        margin-right: 30px;
      }
    }
    .comm-box{
      height: 40px;
      line-height: 40px;
      margin-bottom: 40px;
      display: flex;
      span{
        min-width: 60px;
        margin-right: 20px;
      }
    }
    .flex-box{
      display: flex;
      align-items: center;
      width: 100%;
      margin-right: 10px;
    }
    .btn-box{
      margin-bottom: 10px;
    }
  }
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
</style>
