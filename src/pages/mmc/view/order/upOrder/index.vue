<template>
  <div id="upOrder">
    <div class="nav">
      <el-button type="info" class="btn" @click="goBack">返回打单记录</el-button>
      <p>{{date}}</p>
    </div>
    <!-- 当前状态 -->
    <Tab :type="0"></Tab>
    <div class="tips">
      <span>操作指引：</span>
      <p>把各大平台的订单数据导出后，直接拖入本页面，然后进行销售账号的设置。不可上传相同文件名的文件。</p>
    </div>
    <div class="upLoader">
      <el-upload
          class="upload-demo"
          drag
          :http-request="upload"
          action="#"
          :show-file-list="false"
          :before-upload="creatProgress"
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <!--                <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过500kb</div>-->
      </el-upload>
    </div>
    <div class="total" v-if="dataNum.suc + dataNum.fail > 0">
      <div>共计上传：{{dataNum.total}}个文件 成功{{dataNum.suc}}个，失败{{dataNum.fail}}个</div>
      <div>
        <el-button v-if="showGoBack" class="btn" @click="$router.go(-1)">返回我的打单</el-button>
        <el-button :type="dataHandle.type" :disabled="dataHandle.disabled" class="btn" @click="goOrder">
          {{dataHandle.name}}
        </el-button>
      </div>
    </div>
    <div v-for="(item,index) in fileList" :key="index" class="progress">
      <div class="progressInfo">
        <div class="tips">
          <span>{{item.name}}</span>
          <span>{{item.upStatus}}</span>
        </div>
        <div class="progress-box">
          <div>
            <el-progress :stroke-width="10" :percentage="item.progress" :status="item.status"></el-progress>
          </div>
          <p v-if="item.progress !== 100" @click="abort(item.file)">取消</p>
          <p v-else style="color: red" @click="removeData(index)">删除</p>

<!--          <div class="select-box" v-if="dataNum.suc > 0 || dataNum.fail > 0">-->
<!--            <p>设置销售帐号</p>-->
<!--            <el-select v-model="select" clearable placeholder="请选择" class="select">-->
<!--              <el-option-->
<!--                  v-for="item in salaList"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--            <el-select v-model="selectUser" clearable placeholder="请选择" class="select">-->
<!--              <el-option-->
<!--                  v-for="item in userList"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </div>-->
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Tab from '@/pages/mmc/components/Tab/index'
import { uploadStatement } from '@/api/mmc'

export default {
  name: 'Index',
  components: {
    Tab
  },
  data() {
    return {
      date: null,
      progress: 0,
      fileList: [],
      source: null,
      dataNum: {
        suc: 0,
        fail: 0,
        total: 0
      },
      select: null,
      selectUser: null,
      salaList: [],
      userList: [],
      dataHandle: {
        name: '处理数据',
        type: 'primary',
        disabled: false
      },
      showGoBack: false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'myOrder' && to.path.indexOf('mmc') > -1) {
      if (!from.meta.keepAlive) {
        from.meta.keepAlive = true// 进入我的订单内部开启缓存
      }
      this.dataHandle.name = '处理数据'
      this.dataHandle.type = 'primary'
      this.dataHandle.disabled = false
      this.showGoBack = true
      next()
    } else {
      from.meta.keepAlive = false
      this.$destroy()// 离开时销毁实例
      next()
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    getDate() {
      // 直接登录不带日期则返回日历页
      if (!this.$route.query.date) {
        this.$router.push('/mmc/myOrder')
        return false
      }
      const date = this.$route.query.date.split('-')
      this.date = date[0] + '年' + date[1] + '月' + date[2] + '日'
    },
    goBack() {
      this.$router.push({
        path: '/mmc/myOrder'
      })
    },
    fileListFilter(val, name, batch_id) {
      this.fileList.map(item => {
        if (item.name == name) {
          item.upStatus = val
          item.batch_id = batch_id
          if (val == '上传失败') {
            item.status = 'exception'
          }
        }
      })
    },
    cancelQuest() {
      if (typeof this.source === 'function') {
        this.source('终止请求') // 取消请求
      }
    },
    upload(f) {
      const formdata = new FormData()
      formdata.append('doc', f.file)
      uploadStatement(formdata, this.onUploadProgress, f.file.name).then((res) => {
        if (res.data.code !== 200) {
          throw new Error(res.data.message)
        }
        let batchIdList = window.localStorage.getItem('batch_id_list')
        if (batchIdList == 'null') batchIdList = ''
        if (batchIdList && batchIdList !== null) {
          batchIdList += ',' + res.data.data.batch_id
        } else {
          batchIdList = res.data.data.batch_id
        }
        window.localStorage.setItem('batch_id_list', batchIdList)
        this.$store.commit('mmc/SET_BATCH_ID_LIST', batchIdList)
        this.fileListFilter('上传完成', f.file.name)
        this.upLoadNum()
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
        this.fileListFilter('上传失败', f.file.name)
        this.upLoadNum()
      })
    },
    creatProgress(file) {
      const progress = {
        name: file.name,
        progress: 0,
        upStatus: '正在上传',
        status: null,
        file
      }
      this.fileList.map((item, index) => {
        if (item.name == file.name) {
          this.fileList.splice(index, 1)
        }
      })
      this.fileList.push(progress)
    },
    onUploadProgress(progress, name) {
      this.fileList.map(item => {
        if (item.name == name) {
          item.progress = progress
        }
      })
    },
    abort(file, fileList) {
      console.log(fileList)
      console.log(file)
      this.cancelQuest()
    },
    upLoadNum() {
      let fail = 0
      let suc = 0
      this.fileList.map(item => {
        if (item.status === 'exception') {
          fail++
        }
      })
      suc = this.fileList.length - fail
      this.dataNum.suc = suc
      this.dataNum.fail = fail
      this.dataNum.total = this.fileList.length
    },
    removeData(index) {
      console.log(this.fileList)
      const arr = this.$store.state.mmc.list.split(',')
      arr.splice(index, 1)
      arr.join(',')
      this.$store.commit('SET_BATCH_ID_LIST', arr)
      window.localStorage.setItem('batch_id_list', arr)
      this.fileList.splice(index, 1)
      this.upLoadNum()
    },
    goOrder() {
      this.dataHandle = {
        name: '处理数据中',
        disabled: true,
        type: 'info'
      }
      setTimeout(() => {
        this.$router.push({
          path: '/mmc/unDistribution',
          query: {
            date: this.$route.query.date
          }
        })
      }, 600)
    }
  }
}
</script>

<style scoped lang="less">
  #upOrder {
    padding: 0 20px;

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

    .tips {
      color: #666;
      display: flex;
      align-items: center;
      margin-top: 10px;

      span {
        font-size: 20px;
      }

      p {
        margin: 0;
      }
    }

    .upLoader {
      padding-left: 100px;
      margin-top: 40px;
    }

    .progress {
      margin-top: 20px;

      .progressInfo {
        .tips {
          width: 33%;
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
            width: 600px;
          }

          p {
            color: #409EFF;
            margin: 0 20px;
            cursor: pointer;
          }

          .select-box {
            display: flex;
            align-items: center;

            p {
              margin: 0;
              color: #666;
              margin-right: 10px;
              cursor: auto;
            }

            .select {
              width: 100px;
              margin-right: 20px;
            }

            /deep/ .el-input__inner {
              height: 30px;
            }

            /deep/ .el-input__icon {
              line-height: 30px;
            }
          }
        }
      }
    }

    .total {
      max-width: 996px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
