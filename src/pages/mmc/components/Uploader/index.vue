<template>
  <el-drawer
      title="上传物流文件"
      :visible.sync="drawer"
      :direction="direction"
      :append-to-body="true"
      :wrapperClosable="true"
      :before-close="closeDrawer">
    <el-button type="primary" :disabled="isDisabled" class="btn" @click="goCompulet">处理数据</el-button>
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
      </el-upload>
    </div>
    <div class="total" v-if="dataNum.suc + dataNum.fail > 0">
      <div>共计上传：{{dataNum.total}}个文件 成功{{dataNum.suc}}个，失败{{dataNum.fail}}个</div>
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
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>
// import {
//   uploadLogistics
// } from '@/api/mmc'
export default {
  name: 'Index',
  props: ['open', 'request', 'callBack'],
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      isDisabled: true,
      fileList: [],
      dataNum: {
        suc: 0,
        fail: 0,
        total: 0
      }
    }
  },
  watch: {
    open(val) {
      this.drawer = val
    }
  },
  methods: {
    closeDrawer(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.fileList = []
          this.dataNum = {
            suc: 0,
            fail: 0,
            total: 0
          }
          this.$parent.drawer = false
          done()
        })
        .catch(() => {
        })
    },
    goCompulet() {
      this.$parent.drawer = false
      this.fileList = []
      this.dataNum = {
        suc: 0,
        fail: 0,
        total: 0
      }
    },
    upload(f) {
      const formdata = new FormData()
      formdata.append('doc', f.file)
      formdata.append('batch_id', this.$store.getters['mmc/getBatchList'])
      this.request(formdata, this.onUploadProgress, f.file.name).then((res) => {
        if (res.data.code !== 200) {
          throw new Error(res.data.message)
        }
        this.isDisabled = false
        if (this.callBack) {
          this.$parent.callBack()
        }
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
    }
  }
}
</script>

<style scoped lang="less">

  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
  .drawer{

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
