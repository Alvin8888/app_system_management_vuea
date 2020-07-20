<template>
  <div class="accounting">
    <div>
      <el-row>
        <el-button type="primary" @click="$router.push('/upload-file')">财务数据上传</el-button>
        <el-button type="success" @click="handleDownload">下载数据表</el-button>
        <el-form
          :inline="true"
          ref="form"
          :model="searchMap"
          style="margin-top:20px;margin-left:10px"
        >
          <el-form-item prop="keywords">
            <el-input v-model="searchMap.keywords" placeholder="按订单号、顾客邮箱搜索"></el-input>
            <el-button type="primary" @click="onFetchData">查询</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 条件搜索 -->
      <el-form
        :inline="true"
        ref="form"
        :model="searchMap"
        style="margin-top:20px;margin-left:10px"
      >
        <el-form-item label=" 平台 :" prop="status_bar">
          <el-select
            multiple
            collapse-tags
            v-model="searchMap.status_bar"
            @change="changeSelects"
            placeholder="请选择"
            style="width:180px"
            @visible-change="handleShowHideOne"
          >
            <el-checkbox v-model="checkeds" @change="selectAlls">全选</el-checkbox>
            <el-option
              v-for="(item, index) in  optionsListArr"
              :key="index"
              :label="item.platform"
              :value="item.platform"
              @click.native="selectClick(item,index)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="region">
          <el-select
            @change="changeSelect"
            v-model="searchMap.region"
            placeholder="请选择"
            multiple
            collapse-tags
            :disabled="isOptions"
            @visible-change="handleRegVisible"
            style="width:180px"
          >
            <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
            <el-option
              v-for="(item, index) in optionsShowArr"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 选择发货日期 :" prop="valueOne">
          <el-date-picker
            v-model="searchMap.valueOne"
            type="daterange"
            style="width:250px"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label=" 状态 :" class="statusAl" prop="status">
          <el-select
            @change="changeSelectr"
            v-model="searchMap.status"
            placeholder="请选择"
            style="width:180px"
            multiple
            collapse-tags
          >
            <el-checkbox v-model="checkedr" @change="selectAllr">全选</el-checkbox>
            <el-option
              v-for="(item, index) in optionsArrR"
              :key="index"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 摘要 :" class="statusAl" prop="radio">
          <el-select
            @change="changeSelecte"
            v-model="searchMap.radio"
            placeholder="请选择"
            style="width:190px"
            multiple
            collapse-tags
          >
            <el-checkbox v-model="checkede" @change="selectAlle">全选</el-checkbox>
            <el-option
              v-for="(item, index) in optionsArrE"
              :key="index"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 刷新 -->
      <div class="list0ne">
        <div class="tagBtn">
          <el-button @click="handleTagBtn" type="primary" :disabled="isTagDisabled">订单标记</el-button>
        </div>
        <div>
          订单列表
          <span>（ERP数据更新于2020.05.01 21:20)</span>
          <el-button @click="handleRefresh" size="mini">刷新数据</el-button>
          <!--  <span>
            怎在处理:
            <span>98%</span>
          </span>-->
        </div>
      </div>

      <!-- 表格 -->
      <!--前端自定义分页计算  tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize) -->
      <el-table
        :data="tableData"
        :header-cell-style="{background:'white',color:'#909399'}"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        class="tables"
        border
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
        :max-height="tableHeight"
        ref="table"
      >
        <el-table-column type="selection" width="40px" :reserve-selection="isTags"></el-table-column>
        <el-table-column prop="erp_order_id" label="订单号" :reserve-selection="isTags"></el-table-column>
        <el-table-column prop="sale_shop_name" label="账号" :reserve-selection="isTags"></el-table-column>
        <el-table-column prop="erp_order_id" label="rep订单号" :reserve-selection="isTags"></el-table-column>
        <el-table-column prop="statement_order_id" label="statement订单号" :reserve-selection="isTags"></el-table-column>
        <el-table-column label="核对状态" :reserve-selection="isTags">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="activeStatusOne"
              size="small"
              v-if="scope.row.compare_result == '0'"
            >订单有误</el-button>
            <el-button
              type="text"
              class="activeStatusTwo"
              size="small"
              v-if="scope.row.compare_result == '1'"
            >已核对</el-button>
            <el-button
              type="text"
              class="activeStatusThree"
              size="small"
              v-if="scope.row.compare_result == '2'"
            >未核对</el-button>
            <el-button
              type="text"
              class="activeStatusFour"
              size="small"
              v-if="scope.row.compare_result == '3'"
            >查无此单</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" class="zhaiy" label="摘要" :reserve-selection="isTags">
          <template slot-scope="scope">
            <el-button
              @click="handleClickStatue(scope.row)"
              v-for="(item,index) of scope.row.description_all_array"
              :key="index"
              type="text"
              :class="handleClassColor(item,index)"
              size="small"
            >{{item}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" :reserve-selection="isTags">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCorrection(scope.$index, scope.row)"
            >{{scope.row.isShow == true ?scope.row.modify == '0'?'修正':'未修正':scope.row.modify == '1'?'未修正':'修正'}}</el-button>
            <el-button size="mini" @click="handleDetails(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 6,10, 20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>

      <!-- 点击刷新弹窗,是否确认刷新 -->
      <el-dialog
        title="选择数据起始时间"
        :visible.sync="centerDialogVisible"
        :modal-append-to-body="false"
        width="30%"
        center
        class="dateWrap"
      >
        <div>开始刷新比对，数据较大可能需要一些时间，是否开始?</div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 点击刷新弹窗,确认刷新则开始进度条滚动 -->
      <el-dialog
        title="数据下载中"
        :visible.sync="centerDialogVisibles"
        :modal-append-to-body="false"
        width="30%"
        center
        class="dateWrap"
      >
        <el-progress :percentage="50"></el-progress>

        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="centerDialogVisibles = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 订单标记弹窗 -->
      <el-dialog
        title="标记已选订单为"
        :visible.sync="centerDialogVisibleOnesz"
        :modal-append-to-body="false"
        width="20%"
        center
        class="dateWrap"
      >
        <div>
          <el-select v-model="tags" @change="handleBars" placeholder="请选择" style="width:220px">
            <el-option label="应收订单" value="receivable"></el-option>
            <el-option label="预收订单" value="presale"></el-option>
            <el-option label="清除标记" value="清除标记"></el-option>
          </el-select>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisibleOnesz = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmOnes">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 根据日期下载弹窗 -->
      <el-dialog
        title="选择时间"
        :visible.sync="centerDialogVisibleDownload"
        :modal-append-to-body="false"
        width="20%"
        center
        class="dateWrap"
      >
        <div>
          <div>数据当前刷新时间: 2020.04.30</div>
          <div>
            <el-date-picker
              v-model="dateValue"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisibleDownload = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmDownload">下载</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 子页面的渲染 -->
    <router-view :optionsListArr="optionsListArr" />
  </div>
</template>

<script>
import {
  compareList,
  getShops,
  zipDownload,
  ComparedModify,
  ComparedInfo,
  ComparedListMark,
  ComparedListMarkDelete
} from '@/api/fmc'

export default {
  inject: ['reload'],
  data() {
    const optionse = [
      { name: '基本信息不符', key: '1' },
      { name: '收款信息不符', key: '2' },
      { name: '预收订单', key: '3' },
      { name: '应收订单', key: '4' }
    ]
    const optionsr = [
      { name: '订单有误', key: '0' },
      { name: '已核对', key: '1' },
      { name: '未核对', key: '2' },
      { name: '查无此单', key: '3' }
    ]

    return {
      total: null, // 总记录数
      currentPage: 1, // 当前第一页, 默认第一页
      pageSize: 20, // 每页显示条数 10条

      searchMap: {
        keywords: '',
        valueOne: '', // 日期
        status: '',
        region: [], // 下拉框数组以一
        status_bar: [], // 下拉框数组以二
        radio: [], // 下拉框数组以三
        optionsAll: [] // 账号选中多个添加的数组
      },
      centerDialogVisible: false, // 点击刷新弹窗
      centerDialogVisibles: false, // 进度条滚动弹窗
      centerDialogVisibleOnesz: false, // 下载数据表弹窗
      centerDialogVisibleDownload: false, // 下载弹窗窗口
      date: '', // 日期
      dateValue: '', // 下载弹窗日期
      tableData: [], // 余额列表数据

      optionsListArr: [], // 平台下拉框
      optionsListArre: [], // 提交给后台的值
      optionsArrE: optionse, // 摘要筛选
      optionsArrR: optionsr, // 状态筛选

      checked: false, // 全选和不全选 下拉一
      checkeds: false, // 全选和不全选 下拉二
      checkede: false, // 全选和不全选 下拉三
      checkedr: false, // 全选和不全选 下拉四
      tags: '', // 标记默认值
      multipleSelection: [], // 全选不全选储存的值
      optionsShowArr: [], // 展示的数组
      isOptions: false, // 限制selec禁用或不禁用
      isModify: [], // 修正或不修正
      detailsArr: {}, // 用户详情数据
      isTags: true,
      tableHeight: 140, // 列表的高度
      tagTime: '', // 标记时间
      isTagDisabled: true // 没有选择则不禁用订单标记
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    // 列表自适应浏览器的bug
    this.$nextTick(function() {
      if (this.$refs['table'].$el) {
        this.tableHeight =
          window.innerHeight - this.$refs['table'].$el.offsetTop - 140
        // 监听窗口大小变化
        const self = this
        window.onresize = function() {
          self.tableHeight =
            window.innerHeight - self.$refs['table'].$el.offsetTop - 140
        }
      }
    })
    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度 //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度
  },
  destroyed() {
    /* 移除 window.onresize*/
    window.onresize = ''
  },
  methods: {
    // 改变摘要里面的颜色
    handleClassColor(item, index) {
      if (item === '基本信息不符') {
        return 'activeTablesOne'
      } else if (item === '应收订单') {
        return 'activeTablesTwo'
      } else if (item === '预售订单') {
        return 'activeTablesThree'
      } else {
        return 'activeTablesFour '
      }
    },

    // 保持复选框选中状态
    getRowKeys(row) {
      return row.id
    },

    // 下载余额列表压缩包
    handleConfirmDownload() {
      zipDownload(this.dateValue, '1', 'blob')
        .then(res => {
          const data = res.data
          const that = this

          // 获取到的是Blob数据流，我们需要将其转化成json格式才行
          const fileReader = new FileReader()
          fileReader.onload = function() {
            /* 异常进入的try */
            try {
              const jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
              if (jsonData.code === 3) {
                that.$message({
                  message: jsonData.message,
                  type: 'warning'
                })
              }
            } catch (err) {
              // 解析成对象失败，说明是正常的文件流
              const blob = new Blob([data], { type: 'application/zip' })
              const url = window.URL.createObjectURL(blob)
              const link = document.createElement('a') // 创建a标签
              // link.style.display = 'none'
              link.href = url
              // document.body.appendChild(link)
              link.download = `${that.dateValue}` // 重命名文件
              link.click()
              URL.revokeObjectURL(url) // 释放内存 */
              that.centerDialogVisibleDownload = false
            }
          }
          fileReader.readAsText(data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 点击下载弹出
    handleDownload() {
      this.centerDialogVisibleDownload = true
    },

    // 标记确认提交事件
    handleConfirmOnes() {
      const arr = []
      this.multipleSelection.forEach(r => {
        arr.push(r.id)
      })

      if (this.tags === '清除标记') {
        ComparedListMarkDelete(arr).then(res => {
          if (res.status === 200) {
            clears()
          }
        })
      } else {
        ComparedListMark(this.tags, arr).then(res => {
          console.log(res)
          // 刷新使用
          if (res.status === 200) {
            clears()
          }
          if (res.data.code === 513) {
            this.$message({
              message:
                'rep订单号 不能标记 "预收订单"  或者  statement订单号 不能标记 "应收订单" ',
              type: 'warning'
            })
            this.isTagDisabled = true
          } else {
            this.$message({
              message: '不能标记已经标记过的订单',
              type: 'warning'
            })
            this.isTagDisabled = true
          }
        })
      }

      // 共用
      const that = this
      function clears() {
        that.multipleSelection = []
        that.getInterfaceList({ page: 1 })
        // 取消所有复选框勾选dddddddddddddd

        that.$refs.table.selection.length = 0
        that.centerDialogVisibleOnesz = false
      }
    },

    /* 标记时间 */
    handleBars(val) {
      this.tagTime = val
      console.log('val', val)
    },

    // 点击确认显示标记时间弹窗
    handleTagBtn() {
      this.centerDialogVisibleOnesz = true
    },

    /* 全选不全选事件 */
    handleSelectionChange(val) {
      if (val.length !== 0) {
        this.isTagDisabled = false
      } else {
        this.isTagDisabled = true
      }
      this.multipleSelection = val
      console.log('val', val)
    },

    /* 下拉框四  摘要*/
    selectAlle() {
      this.searchMap.radio = []

      if (this.checkede) {
        this.optionsArrE.map(item => {
          this.searchMap.radio.push(item.key)
        })
      } else {
        this.searchMap.radio = []
      }
    },
    changeSelecte(val) {
      if (val.length === this.optionsArrE.length) {
        this.checkede = true
      } else {
        this.checkede = false
      }
    },

    /* 下拉框三  状态*/
    selectAllr() {
      this.searchMap.status = []

      if (this.checkedr) {
        this.optionsArrR.map(item => {
          this.searchMap.status.push(item.key)
        })
      } else {
        this.searchMap.status = []
      }
    },
    changeSelectr(val) {
      if (val.length === this.optionsArrR.length) {
        this.checkedr = true
      } else {
        this.checkedr = false
      }
    },

    /* 下拉框二 */
    selectAll() {
      this.searchMap.region = []

      if (this.checked) {
        this.optionsShowArr.map(item => {
          this.searchMap.region.push(item)
        })
      } else {
        this.searchMap.region = []
      }
    },
    changeSelect(val) {
      if (val.length === this.optionsShowArr.length) {
        this.checked = true
      } else {
        this.checked = false
      }
    },

    // 下拉框隐藏显示的时候做的事
    handleRegVisible(is) {
      if (!is) {
        this.optionsListArre = this.searchMap.region
      }
    },

    /* 下拉框一 */
    selectAlls(val) {
      this.searchMap.status_bar = []
      if (this.checkeds) {
        this.optionsListArr.map(item => {
          this.searchMap.status_bar.push(item.platform)
        })
      } else {
        this.searchMap.status_bar = []
      }

      // 全选时,限制
      val ? (this.isOptions = true) : (this.isOptions = false)

      // 获取回来的值拿去出来,添加到提交给后台的数组中
      if (val) {
        const arr = []
        this.optionsListArr.forEach(item => {
          arr.push(...item.children)
        })

        arr.forEach(r => {
          this.optionsListArre.push(r.abbr)
          this.optionsShowArr.push(r.abbr)
        })
      } else {
        this.optionsListArre = []
        this.optionsShowArr = []
      }
    },

    changeSelects(val) {
      if (val.length === this.optionsListArr.length) {
        this.checkeds = true
      } else {
        this.checkeds = false
      }

      // 单选时,限制
      val.length >= 2 ? (this.isOptions = true) : (this.isOptions = false)
    },

    /* options点击事件 */
    selectClick(items, index) {
      // 每次点击事件时清空数组
      this.optionsListArre = []
      this.optionsShowArr = []

      const arr = []

      // 拿到change事件和数据做对等
      this.searchMap.status_bar.forEach((change, i) => {
        this.optionsListArr.forEach((item, idx) => {
          if (change === item.platform) {
            arr.push(...item.children)
          }
        })
      })

      // 数据循环出来给optionsListArre这个数组
      arr.forEach(r => {
        this.optionsListArre.push(r.abbr)
        this.optionsShowArr.push(r.abbr)
      })
    },

    // 隐藏和显示的时候清空数组
    handleShowHideOne(is) {
      if (is) {
        this.searchMap.region = []
      }
    },

    // 确认进度条
    handleConfirm() {
      this.centerDialogVisible = false
      this.centerDialogVisibles = true
    },

    // 点击刷新操作
    handleRefresh() {
      this.centerDialogVisible = true
    },

    // 修正未修正事件
    handleCorrection(index, row) {
      ComparedModify(row.id).then(res => {
        if (res.status === 200) {
          // 做修正未修正操作
          if (!row.isShow) {
            this.$set(row, 'isShow', false)
            row.isShow = !row.isShow
          } else {
            row.isShow = !row.isShow
          }
          this.getInterfaceList({ page: 1 })
        }
      })
    },

    // 查看详情
    handleDetails(index, row) {
      console.log(index, row)

      // 详情接口
      ComparedInfo(row.id).then(res => {
        if (res.status === 200) {
          const fetch = res.data
          this.detailsArr = fetch.data
          this.$router.push({
            path: '/have-check',
            query: {
              id: row.id
            }
          })
        }
      })
    },

    // 查看核对状态
    handleClickStatue() {},

    // 时时更新显示的页码条数
    handleSizeChange(val) {
      // console.log(val);
      this.pageSize = val
    },
    // 时时更新当前的页的数据
    handleCurrentChange(val) {
      // console.log(val);
      this.currentPage = val
      this.getInterfaceList({ page: val })
    },

    // 列的颜色显示
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'warning-row'
      } else if (rowIndex === 2) {
        return 'success-row'
      }
      return ''
    },

    // 点击查询接口
    onFetchData() {
      const result = []
      const mark = []

      this.searchMap.radio.forEach(val => {
        if (val == '1') return result.push('1')
        if (val == '2') return result.push('2')
        if (val == '3') return mark.push('1')
        if (val == '4') return mark.push('2')
      })

      const params = {
        keywords: this.searchMap.keywords === '' ? [] : this.searchMap.keywords, // 订单号/顾客邮箱搜索关键字
        shop_name: this.optionsListArre, // 销售店铺名称
        shipmentsDateStart: this.searchMap.valueOne[0], // 发货开始日期
        shipmentsDateEnd: this.searchMap.valueOne[1], // 发货结束日期
        compare_status: this.searchMap.status, // 对比状态 0=订单有误1=已核对2=未核对3=查无此单
        result_description: result.sort(), // 对比结果错误摘要
        mark: mark.sort() // 标记状态
      }
      // 调动接口
      this.getInterfaceList(params)
    },

    // 请求后台余额列表
    getInterfaceList(params) {
      // 对比接口
      compareList(params).then(res => {
        if (res.status === 200) {
          const fetch = res.data
          this.tableData = fetch.data
        }
      })
    },

    // 请求对比接口
    fetchData() {
      // 获取店铺
      getShops().then(res => {
        if (res.status === 200) {
          const fetch = res.data
          this.optionsListArr = fetch.data
        }
      })

      // 第一次调用查询接口 params是空
      this.getInterfaceList({ page: 1 })
    },
    // 重置按钮
    resetForm(fromName) {
      this.$refs[fromName].resetFields()
      this.searchMap.keywords = ''

      // 重置在掉一次接口
      this.getInterfaceList({ page: 1 })
    }
  }
}
</script>

<style scoped>
@import "../../../../assets/css/common.css";

.accounting {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
  background: white;
  /* overflow-y: hidden; */
}

.el-checkbox {
  padding: 5px 0 5px 15px;
}

.accounting >>> .el-form {
  margin-left: 5px !important;
}

.accounting >>> .el-row {
  padding: 10px 0 0px 0px;
  display: flex;
}
.accounting >>> .el-row .el-form {
  margin-top: 0 !important;
  margin-left: 10px !important;
}
.accounting >>> .el-row .el-form div {
  margin: 0 !important;
}

/* 重置框样式 */
.accounting >>> .el-row .el-form div .el-input {
  width: 250px;
}
.accounting >>> .el-row .el-form div .el-input__inner {
  border-radius: 6px 0 0 6px;
}

.accounting >>> .el-row .el-form div .el-button + .el-button {
  margin: 0;
  border-radius: 0 6px 6px 0;
}
.accounting >>> .el-row .el-form div .el-button{
  margin: 0;
  padding: 12px 15px;
  border-radius: 0;
}

.accounting >>> .el-button {
  padding: 10px 25px;
}
.statusAl >>> .el-input__inner {
  padding-left: 5px;
}
.list0ne {
  margin: 0px 0 0px 5px;
  display: flex;
}
.list0ne span {
  font-size: 14px;
  color: #5d5d5c;
}
.list0ne span:nth-last-child(1) {
  margin-left: 10px;
}
.accounting >>> .el-button {
  padding: 10px 10px;
  margin-left: 5px;
}

.accounting >>> .el-dialog--center .el-dialog__body {
  padding: 23px 50px 28px;
}
.dateWrap >>> .el-dialog {
  width: 20% !important ;
}

/* 关于核对状态文字的颜色 */
.activeStatusOne {
  color: #f56c6c !important;
}
.activeStatusTwo {
  color: #3c9e24 !important;
}
.activeStatusThree {
  color: #252525 !important;
}
.activeStatusFour {
  color: #3a8ee6 !important;
}

/* 关于摘要状态文字的颜色 */
.activeTablesOne {
  color: #f56c6c;
}
.activeTablesTwo {
  color: rgba(25, 158, 216, 1);
}
.activeTablesThree {
  color: rgba(255, 153, 0, 0.666666666666667);
}
.activeTablesFour {
  color: rgba(153, 0, 204, 1);
}

/* 全选头部字体 */
/*  .accounting >>> .el-table__header .el-table-column--selection .cell .el-checkbox:after {
  color: #333;
  content: "全选";
  font-size: 16px;
  margin-left: 12px;
} */

/* 订单标记按钮 */
.tagBtn {
  padding: 0px 5px 5px 0;
}
.tagBtn >>> .el-button {
  padding: 8px 15px;
}
</style>
