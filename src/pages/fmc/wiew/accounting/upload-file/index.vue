<template>
  <div class="upload">
    <el-row>
      <el-button type="info" @click="$router.back(-1)">返回</el-button>
    </el-row>

    <div class="uploadWrap">
      <div class="uploadFile">
        <div class="guide">
          操作指引:
          <span>将statement数据导入至此，点击处理数据即可</span>
        </div>
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          action="/balance/upload/uploadStatement"
          multiple
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="upLoadSuccess"
          :on-change="fileChange"
          :headers="headers"
          accept=".txt"
          :file-list="fileList"
          :auto-upload="true"
          :before-upload="beforeAvatarUpload"
          :http-request="handleHttpRequest"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
        <div class="fileText">
          <div class="btnText">
            <div>
              共计上传:
              <span>{{fileNumber}}</span>个文件,成功
              <span>{{fileNumbers}}</span>个,失败
              <span>0</span>个
            </div>
            <div>
              <el-button @click="handleDealData" type="primary">处理数据</el-button>
            </div>
          </div>

          <!-- 上传文件的进度条 -->
          <div v-if="fileDataList.length">
            <div class="progress" v-for="(files, index) of fileDataList" :key="files.uid">
              <div class="progressTitle">
                <div>{{ files.name }}</div>
                <div>{{percentage[index] === 100 ?"上传完成":"正在上传" }}</div>
              </div>
              <div>
                <div>
                  <el-progress :percentage="percentage[index]" :color="customColorMethod"></el-progress>
                </div>
                <div>
                  <span>取消</span>
                </div>
              </div>
              <!--  -->
              <div>
                <div>
                  <span>设置销售账号</span>
                  <el-select
                    v-model="searchMap.status_bar[index]"
                    @change="handleBars"
                    placeholder="请选择"
                    style="width:120px"
                  >
                    <el-option
                      v-for="(item, index) in optionsListArr"
                      :key="index"
                      :label="item.platform"
                      :value="item.platform"
                    ></el-option>
                  </el-select>
                </div>
                <div>
                  <el-select
                    v-model="searchMap.sets[index]"
                    @change="handleSets"
                    placeholder="请选择"
                    style="width:100px"
                  >
                    <el-option
                      v-for="(item, index) in optionsArre"
                      :key="index"
                      :label="item.abbr"
                      :value="item.abbr"
                    ></el-option>
                  </el-select>
                  <span
                    v-text="
                    searchMap.status_bar[index] !== vala[index] ||
                    searchMap.sets[index] !== valb[index]
                    ?  `请确认是否为${searchMap.status_bar[index]}-${searchMap.sets[index]}的数据` : ''
                    "
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 任务列表 -->
      <div class="uploadList">
        <div>
          <p>任务列表</p>
          <div>
            <div :class="{activeOne:isShowOne}" @click="handleClickOne">处理中</div>
            <div :class="{activeTwo:isShowTwo}" @click="handleClickTwo">已完成</div>
          </div>
          <el-table :data="tableData" class="elTables" style="width: 100%">
            <el-table-column prop="date_time" label="处理时间" width="140px"></el-table-column>
            <el-table-column prop="file_count" label="文件个数" width="80px" ></el-table-column>
            <el-table-column prop="user_email_name" label="上传人" width="100"></el-table-column>
            <el-table-column label="处理进度">
              <template slot-scope="scope">
                <el-progress
                  :percentage="+scope.row.progress"
                  :color="customColorMethods(scope.row.progress)"
                ></el-progress>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClickView(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 点击查看弹出框 -->
      <el-dialog width="40%" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
        <div class="dialogs">
          <div class="titles">
            <div>任务详情</div>
            <div>
              处理人:
              <span>{{fileListData.user_id}}</span>
            </div>
            <div>
              处理时间:
              <span>{{fileListData.date_time}}</span>
            </div>
            <div>
              进度:
              <span
                :class="{active:fileListData.progress !== '100'}"
              >{{fileListData.progress == 100 ?'已完成':'未完成'}}</span>
            </div>
          </div>
          <div class="bodys">
            <div class="column" v-for="(list,idx) of fileListArr" :key="idx">
              <div>
                文件名:
                <span>{{list.file_name}}</span>
              </div>
              <div>
                亚马逊-账号1:
                <span>{{list.shop_name}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  uploadStatement,
  getBathCode,
  dataHandler,
  getDataHandlerList,
  getFilesForBath
} from '@/api/fmc'
export default {
  inject: ['reload'],
  props: ['optionsListArr'], // 平台下拉框二
  data() {
    return {
      searchMap: {
        status_bar: [], // 平台存储值 下拉一
        sets: [] // 平台存储值 下拉二
      },
      tableData: [],
      fileList: [], // 每次添加文件的列表
      dataList: [], // 当文件状态改变的钩子,添加文件,上传成功和上传失败时都会被调用
      fileDataList: [], // 列表循环数据使用
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      percentage: [], // 进度条的参数
      contrastNum: 100, // 对比百分比值
      data: new FormData(), // 提交给后台的数据对象
      bathCode: '', // 后台获取的批次号
      time: null, // 定时器
      dialogTableVisible: false, // 点击查看弹出框
      accountData: [], // 账号平台值

      optionsArre: [], // 平台下拉框一
      vala: [], // 唯一识别数组
      valb: [], // 唯一识别数组
      searchData: [], // 提交的值
      fileListArr: [], // 查看文件列表数组
      fileListData: [], // 传值信息个数以及进度
      fileStored: [], // 存储任务列表的值
      fileB: [],
      fileD: [],
      isShowOne: false,
      isShowTwo: false,
      isAll: false,
      fileNumber: 0, // 文件个数
      fileNumbers: 0, // 上传成功个数
      interval: null
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.interfaceTwoSeconds()

    // 实时获取后台数据
    this.interval = setInterval(() => {
      this.interfaceTwoSeconds()
    }, 5000)
  },
  destroyed() {},
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
  },
  updated() {},
  beforeDestroy() {
    clearInterval(this.interval)
  },
  watch: {},
  methods: {
    customColorMethods(percentage) {
      if (+percentage < 30) {
        return '#909399'
      } else if (+percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },

    // 任务列表处理中进度
    handleClickOne() {
      this.isShowTwo = false
      this.isShowOne = !this.isShowOne

      if (this.isShowOne == true) {
        this.tableData = this.fileB
      } else {
        this.tableData = this.fileStored
      }
    },

    // 任务列表已完成进度
    handleClickTwo() {
      this.isShowOne = false
      this.isShowTwo = !this.isShowTwo

      if (this.isShowTwo == true) {
        this.tableData = this.fileD
      } else {
        this.tableData = this.fileStored
      }
    },

    // 每隔2秒调一次接口
    interfaceTwoSeconds() {
      const datas = {
        status: '1',
        page: '',
        limit: ''
      }
      getDataHandlerList(datas).then(res => {
        if (res.status === 200) {
          const fetch = res.data

          this.tableData = fetch.data
          this.fileStored = fetch.data

          this.fileD = fetch.data.filter(item => item.progress == '100')
          this.fileB = fetch.data.filter(item => item.progress !== '100')

          /* 未完成 */
          if (this.isShowOne == true) {
            this.tableData = this.fileB
          } else {
            if (this.isShowTwo == true) {
              this.tableData = this.fileD
            } else {
              this.tableData = fetch.data
            }
          }

          /* 已完成 */
          if (this.isShowTwo == true) {
            this.tableData = this.fileD
          } else {
            if (this.isShowOne == true) {
              this.tableData = this.fileB
            } else {
              this.tableData = fetch.data
            }
          }

          const is = fetch.data.every(item => item.progress == 100)
          if (is) {
            clearInterval(this.interval)
          }
        }
      })
    },

    // 处理数据
    handleDealData() {
      this.accountData.forEach((item, idx) => {
        // 拿到文件名
        this.fileList.forEach(items => {
          const data = {
            id: item.id,
            file_name: items.name,
            shop_abbr: this.searchMap.sets[idx],
            platform: this.searchMap.status_bar[idx]
          }
          this.searchData.push(data)
        })
      })

      // console.log("item", this.searchData);
      const data = {
        data: this.searchData,
        bath_code: this.bathCode
      }

      // 处理数据接口
      dataHandler(data).then(res => {
        if (res.status === 200) {
          console.log('vvvv', res)
        }
      })

      // 处理数据调一次刷新一次任务列表
      this.interfaceTwoSeconds()

      // 清空处理数据
      this.searchData = []
      this.accountData = []
      this.fileDataList = []
      this.percentage = []
      this.fileList = []
      this.fileListArr = []
      this.contrastNum = 0
      this.searchMap = {
        status_bar: [], // 平台存储值 下拉一
        sets: [] // 平台存储值 下拉二
      }
      this.vala = [] // 唯一识别数组
      this.valb = [] // 唯一识别数组
      this.fileNumber = 0 // 文件个数
      this.fileNumbers = 0 // 上传成功个数
    },

    handleBars(val) {
      // 根据val的值,显示子数组中的值
      this.optionsListArr.forEach(t => {
        if (val === t.platform) {
          this.optionsArre = t.children
        }
      })
      if (val) {
        this.searchData.platform = val
      }
    },

    handleSets(val) {
      console.log('val1', val)
      if (val) {
        this.searchData.abbr = val
      }
    },

    /* 自定义上传文件 */
    handleHttpRequest(param) {
      console.log('file', param.file, 'fileList', this.fileList)
      this.data.append('statement_files', param.file) // 上传文件
      this.data.append('bath_code', this.bathCode) // 批号

      uploadStatement(this.data, percentage => {
        // 拿到进度条的长度
        var length = this.percentage.length

        // 拿到进度条的数组,进行新的赋值
        var newPercentage = this.percentage

        // 每次拿到值都会拿到数组的最后一个值,然后把100
        newPercentage[length - 1] = percentage

        // 清空percentage 进度条值
        this.percentage = []

        // 把值添加到最后赋值给进度条
        this.percentage = newPercentage
        // this.fileNumber += 1;
      }).then(res => {
        if (res.status === 200) {
          const fetch = res.data
          // 每次请求上传文件都做提交对象
          this.accountData.push(fetch.data)

          this.searchMap.status_bar.push(fetch.data.platform)
          this.searchMap.sets.push(fetch.data.abbr)

          // 每次请求回来的值给下拉框做唯一的标识,方便确认有改变过数据没
          this.vala.push(fetch.data.platform)
          this.valb.push(fetch.data.abbr)

          // 成功时
          this.fileNumbers += 1
        }
        console.log('上传成功了', res)
      })
    },

    /* 上传文件之前的钩子 */
    beforeAvatarUpload(file) {
      // accept=".doc, .docx, .xlsx, .txt"
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'txt'
      // const extension2 = testmsg === "xlsx";
      const isLt2M = file.size / 3024 / 3024 < 10
      if (!extension) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
      }

      this.fileDataList.push(file)
      this.percentage.push(0)

      return extension || isLt2M
    },

    /* 文件上传成功时的钩子 */
    upLoadSuccess(response, file, fileList) {
      console.log('文件状态改变时的钩子', response, file, fileList)
    },

    resErrorStr() {},
    /* 是文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 */
    fileChange(file, fileList) {
      this.fileList = fileList

      console.log('文件状态改变时的钩子', file, fileList)
    },

    /* 文件列表移除文件时的钩子  */
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    /*  点击文件列表中已上传的文件时的钩子 */
    handlePreview(file) {
      console.log(file)
    },

    /* 删除文件之前的钩子 */
    beforeRemove(file, fileList) {
      console.log('删除文件时的钩子', file, fileList)
    },

    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399'
      } else if (percentage < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },

    // 点击查看列表中有多少个文件
    handleClickView(row) {
      console.log(row)
      this.dialogTableVisible = true

      // 获取处理列表
      getFilesForBath(row.bath_code).then(res => {
        if (res.status === 200) {
          const fetch = res.data
          this.fileListArr = fetch.data
          this.fileListData = row

          // 处理成功则再次去获取一次back_code
          this.fetchData()
        }
      })
    },

    // 初次获取数据
    fetchData() {
      // 获取批次号
      getBathCode().then(res => {
        if (res.status === 200) {
          const fetch = res.data
          this.bathCode = fetch.data
        }
      })
    }
  }
}
</script>

<style scoped>
.upload {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: white;
  overflow: auto;
}

/* 隐藏进度条 */
/* .uploadFile >>> .el-upload-list__item {
  display: none;
} */
.progressOne {
  font-size: 12px !important;
}
.guide {
  margin: 20px 0 10px 10px;
}
.guide span {
  font-size: 14px;
  color: #5d5d5c;
}

.upload >>> .el-button {
  padding: 8px 25px;
  margin-left: 5px;
}
.uploadFile {
  margin-left: 10px;
  margin-top: 20px;
}
.uploadFile >>> .el-upload-dragger {
  /* background: #f4f4f5; */
  width: 500px;
  height: 200px;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
.fileText {
  margin-top: 20px;
}
.fileText .btnText > div:nth-child(1) > span {
  color: red;
}
.fileText .btnText > div:nth-child(2) {
  flex: 1;
  margin-left: 290px;
}
.btnText {
  display: flex;
}
.progress {
  margin: 20px 0 20px 0;
}
.progress div:nth-child(1) {
  width: 480px;
  height: 20px;
}
.progress div:nth-child(1) > div:nth-child(1) {
  flex: 4;
}
.progress div:nth-child(1) > div:nth-child(2) {
  flex: 1;
}

.progress div:nth-child(1) >>> .el-progress {
  line-height: 1.3;
}

.progress div:nth-child(2) {
  display: flex;
}
.progress div:nth-child(2) div:nth-child(1) {
  flex: 1;
}
.progress div:nth-child(2) div:nth-child(2) {
  flex: 2;
  font-size: 13px;
  color: #3a8ee6;
  line-height: 22px;
}

.progress div:nth-child(2) div:nth-child(3) span {
  float: left;
  font-size: 13px;
  line-height: 22px;
}
.progress div:nth-child(2) div:nth-child(3) span:nth-last-child(1) {
  margin-left: 10px;
  color: red;
}
.progress div:nth-child(2) div:nth-child(3) div {
  float: left;
  margin: 0;
}
.progress div:nth-child(2) div:nth-child(3) div:nth-child(2) {
  margin-left: 5px;
}
.progress div:nth-child(2) div:nth-child(3) div:nth-child(3) {
  margin-left: 10px;
}
.progress div:nth-child(3) {
  display: flex;
  width: 100%;
}
.progress div:nth-child(3) > div {
  display: flex;
}
.progress div:nth-child(3) > div:nth-child(1) {
  display: flex;
  width: 220px;
}
.progress div:nth-child(3) > div:nth-child(2) {
  margin: 0 0 0 5px;
}
.progress div:nth-child(3) > div:nth-child(1) span:nth-child(1) {
  margin: 0 5px 0 0;
  font-size: 13px;
}
.progress div:nth-child(3) > div:nth-child(2) span:nth-child(2) {
  margin-left: 10px;
  color: red;
  font-size: 13px;
}

.progress div:nth-child(3) > div:nth-child(2) {
  display: flex;
}
.progress div:nth-child(3) >>> .el-input__inner {
  height: 20px;
}

.progress div:nth-child(3) >>> .el-input__icon {
  line-height: 20px;
}

.progress .progressTitle {
  font-size: 12px;
  color: #93969b;
  display: flex;
}

.progress .progressTitle span:nth-child(1) {
  font-size: 13px;
  flex: 1;
}
.progress .progressTitle span:nth-child(2) {
  flex: 1;
  margin-left: 150px;
}

.progress .progressTitle span:nth-child(2) {
  flex: 1;
  margin-left: 150px;
}

.progress >>> .el-progress-bar__outer {
  height: 8px !important;
}
.fileText .btnText >>> .el-button {
  padding: 8px 30px;
}

.uploadWrap {
  display: flex;
  justify-content: space-between;
}
.uploadWrap .uploadFile {
  margin-left: 10px;
  margin-top: 20px;
}

.uploadWrap .uploadList {
  height: 500px;
  /* background: #e4e4e4; */
  width: 40%;
  box-sizing: border-box;
  margin: 0 40px 0 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.uploadWrap .uploadList > div {
  padding: 10px 0 0 20px;
}
.uploadWrap .uploadList > div > p {
  margin: 10px 0 10px 0;
}
.uploadWrap .uploadList > div > div {
  font-size: 12px;
}
.uploadWrap .uploadList > div > div > div {
  box-sizing: border-box;
  padding: 1px 15px 1px 15px;
  float: left;
  text-align: center;
  line-height: 20px;
  margin-right: 5px;
  border: 1px solid #909399;
  cursor: pointer;
}

.uploadWrap .uploadList .elTables {
  height: 400px;
}
.uploadWrap .uploadList .elTables >>> .el-table__body-wrapper {
  overflow: auto;
  height: 430px;
}

.uploadList >>> .el-table td div {
  font-size: 12px !important;
}

.uploadWrap .uploadList > div > div > div:nth-last-child(1) {
}
.uploadWrap > .uploadList >>> .el-table {
  box-sizing: border-box;
  padding: 0 20px 0 0;
}
.uploadWrap > .uploadList >>> .el-table::before {
  background: none;
}

/* 点击查看弹出框样式 */
.dialogs {
  padding: 10px 0 0 0;
}

.dialogs .titles {
  display: flex;
  justify-content: space-between;
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #909399;
}

.dialogs .titles div:nth-child(1) {
  font-size: 18px;
  line-height: 20px;
  color: #666666;
  font-weight: 600;
}

.dialogs .titles div {
  font-size: 14px;
}

.dialogs .titles div:nth-last-child(1) span {
  color: #67c23a;
}

.dialogs .bodys {
  height: 250px;
  overflow: auto;
}
.dialogs .bodys .column {
  display: flex;

  padding: 10px 0 10px 10px;
}
.dialogs .bodys .column div:nth-child(1) {
  flex: 1;
}
.dialogs .bodys .column div:nth-child(2) {
  flex: 1;
}

.uploadWrap >>> .el-dialog__header {
  padding: 0;
}

.active {
  color: #5d5d5c !important;
}

.activeOne {
  background: #409eff;
  color: white;
  border: 1px solid white !important;
}
.activeTwo {
  background: red;
  color: white;
  border: 1px solid white !important;
}
</style>
