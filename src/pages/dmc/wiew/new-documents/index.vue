/* eslint-disable no-undef */
<template>
  <div class="newDocuments">
    <!-- 表单填写 -->
    <h2>新建文档</h2>
    <el-form ref="foms" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="文档名  " prop="name" class="documentName">
        <el-input v-model.trim="form.name" style="width:300px" ></el-input>
      </el-form-item>
      <el-form-item label="文档说明 " class="texta" prop="explain">
        <el-input
          type="textarea"
          v-model.trim="form.explain"
          placeholder="最多输入500个字"
          maxlength="501"
          style="width:800px"
        ></el-input>
      </el-form-item>
      <el-form-item label="照片附件  " class="texta">
        <template slot-scope="scope">
          <el-upload
            class="upload-demo"
            drag
            multiple
            action="http://120.24.111.130:8020/dmc/Document/documentAdd"
            accept="image/png, image/gif, image/jpg, image/jpeg"
            :file-list="fileList"
            list-type="picture"
            :show-file-list="true"
            :on-success="(response,file,fileList)=>{return success(response,file,fileList, scope.$index)}"
            :on-error="error"
            :on-change="change"
            :on-progress="progress"
            :on-preview="handlePreview"
            :on-remove="remove"
            :before-upload="beforeAvatarUpload"
            :class="{disabled:isMax}"
            :http-request="handleHttpRequest"
            :auto-upload="false"
            :headers="headers"
            :limit="99"
            :data="rultData"
            ref="upload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <el-button type="primary">点选择图片</el-button>
            </div>
            <span class="textO">或将照片拖到这里，单次最多任选99张</span>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </template>
      </el-form-item>

      <!-- 图片上传编辑 -->
      <el-form-item prop="aplain">
        <div class="wrapDemo">
          <div class="demoImage" v-for="(item,index) of fileList" :key="index">
            <div class="block">
              <span class="demonstration"></span>
              <el-image style="width: 100px; height: 100px" :src="item.url" :fit="fits"></el-image>

              <!-- 通过按钮进行预览图片 -->
              <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="imgList" />
            </div>
            <div class="demEditor">
              <h4>{{item.name}}</h4>
              <p>{{arrInput[index]}}</p>

              <div class="btnWrap">
                <el-button
                  type="danger"
                  icon="el-icon-zoom-in"
                  @click="handleShow(item,index)"
                  circle
                ></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="handleDelete(index)" circle></el-button>
              </div>
              <el-button type="primary" @click="handleEdit(item,index)">编辑说明</el-button>
            </div>
            <div class="editorText" v-show="itemIndex == index">
              <el-input
                type="textarea"
                v-model.trim="arrInput[index]"
                placeholder="最多输入30个字"
                style="width:181px"
                :id="'text'+index"
                @input="checkSize"
                maxlength="28"
              ></el-input>
              <div class="btnOne">
                <el-button plain @click="handleHide(index)">取消</el-button>
                <el-button type="primary" @click="itemIndex = -1" :disabled="disabledEidte">确定</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>

      <!-- 图片进度条 -->
      <el-form-item>
        <div class="wrapImge">
          <div class="ImageSa" v-for="item of fileList" :key="item.id">
            <div class="block">
              <span class="demonstration"></span>
              <div class="jindu">
                <div class="jinduTwo">
                  <el-progress :text-inside="true" :stroke-width="14" :percentage="progressNum"></el-progress>
                </div>
              </div>
              <el-image style="width: 100px; height: 100px" :src="item.url" :fit="fits"></el-image>
            </div>
            <div class="demEditor">
              <h4>{{item.name}}</h4>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="btnR">
          <el-button plain @click="$router.go(-1)">取消</el-button>
          <el-button type="primary" @click="uploadPic('foms')" :disabled="disabled">确认</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { documentAdd, documentCheckTitle } from '@/api/documents'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer' // 引入预览图片
export default {
  inject: ['reload'],
  data() {
    const validatePass = (rule, value, callback) => {
      const data = {
        title: value
      }

      /* 文档名重复的接口 */
      documentCheckTitle(data).then(res => {
        const fetch = res.data
        // 赋值状态
        if (fetch.code === 419) {
          callback(new Error('文档标题不能重复'))
          this.disabled = true
        } else if (value == '') {
          callback(new Error('文档标题不能为空'))
          this.disabled = true
        } else if (fetch.code === 3) {
          this.disabled = true
        } else {
          this.disabled = false
        }
        callback()
      })
    }

    return {
      imgList: [],
      fileList: [],
      rultData: {},
      fits: 'fill',
      isMax: true,
      files: [],
      arrInput: [], // 编辑说明
      showViewer: false,
      form: {
        name: '',
        explain: '',
        aplain: '',
        img_path: [],
        img_explain: []
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      param: new FormData(), // 提交图片的数据
      rules: {
        // 校验表单
        name: [
          { required: true, validator: validatePass, trigger: 'change' },
          { required: true, message: '文档标题不能为空', trigger: 'blur' }
        ],
        explain: [{ max: 500, message: '最大500个字符', trigger: 'blur' }]
      },
      itemIndex: -1,
      progressNum: 1,

      time: null, // 定时器
      disabled: false,
      disabledEidte: false
    }
  },
  components: {
    ElImageViewer
  },

  updated() {
    // this.startProgress()
  },

  methods: {
    checkSize(val) {
      if (val.length > 27) {
        this.$message({
          message: '编辑说明不能超过30个字',
          type: 'warning'
        })
        this.disabledEidte = true
      } else {
        this.disabledEidte = false
      }
    },

    handleHide(index) {
      this.arrInput[index] = ''
      this.itemIndex = -1
      this.disabledEidte = false
    },

    handleEdit(item, index) {
      if (this.disabledEidte == false) {
        this.itemIndex = index
      } else {
        return false
      }
    },

    // 上传文件之前的钩子
    beforeAvatarUpload(file) {
      // console.log("before");
      if (
        !(
          file.type === 'image/png' ||
          file.type === 'image/gif' ||
          file.type === 'image/jpg' ||
          file.type === 'image/jpeg'
        )
      ) {
        this.$notify.warning({
          title: '警告',
          message:
            '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      const size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    handlePreview() {},

    // 隐藏放大图
    closeViewer() {
      this.showViewer = false
    },

    // 点击按钮显示放大图
    handleShow(item, index) {
      console.log(item, index)
      const tempImgList = [item.url]
      const temp = []
      for (let i = 0; i < index; i++) {
        temp.push(tempImgList.pop())
      }
      this.imgList = tempImgList.concat(temp)

      this.showViewer = true
    },

    // 删除图片
    handleDelete(index) {
      // console.log("indexx", index);
      this.fileList.splice(index, 1)
    },

    handleHttpRequest(file) {
      // console.log("file1111", file.file.type, "img_path", file);
      this.files.push(file.file) // 问题图片的格式,不能改变,否则后台接收不到数据
      console.log(file, 'this')

      const isJPG = file.file.type === 'image/jpeg'
      const isPNG = file.file.type === 'image/png'
      // const isLt2M = file.file.size / 1024 / 1024 < 0.5;
      if (!isPNG && !isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
        return false
      } else if (
        isPNG ||
        isJPG
      ) {
        // 把数据添加给后台
        this.param.append('img_path[]', file.file) // 图片

        return isPNG || isJPG
      }
      /*  else if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 200kb!");
        return false;
      } */

      // console.log("param", this.param);
    },

    success(res, file, fileList) {
      // console.log("成功", file);
      // console.log("index", fileList);
      this.fileList = fileList
      this.form.img_explain.push(this.aplain)
    },
    progress() {},
    change(file, fileList) {
      // console.log("file", file, "fileList", fileList);
      // 创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL
      this.imageUrl = windowURL.createObjectURL(file.raw)

      this.fileList = fileList
    },
    remove(file, fileList) {
      // console.log("remove");
      if (fileList.length < 3) {
        this.isMax = false
      }
    },

    // 上传失败的时候会出现Bug，故在上传失败的时候也进行一下判断
    error(file, fileList) {
      this.$message.error('上传失败')
      if (fileList.length >= 3) {
        this.isMax = true
      } else {
        this.isMax = false
      }
    },

    // 提交数据给后台
    uploadPic(formName) {
      this.arrInput.forEach(items => {
        this.param.append('img_explain[]', [items])
      }) // 编辑文本数组

      // this.param.append("img_path[]", file.file); //图片
      this.param.append('title', this.form.name) // 标题
      this.param.append('explain', this.form.explain) // 文本
      this.param.append('remark', this.form.aplain) // 编辑文本
      this.$refs.upload.submit()
      this.$refs[formName].validate(val => {
        if (val) {
          documentAdd(this.param, percentage => {
            this.progressNum = percentage
          }).then(res => {
            if (res.status === 200) {
              this.time = setInterval(() => {
                this.fileList = [] // 清空操作
                this.arrInput = []
                this.form.name = ''
                this.form.explain = ''
                this.progressNum = 0

                // 返回列表页
                this.$router.push('/my-documents')
              }, 500)
            }
          })
        } else {
          // 如果标题为空,回到顶部
          document.querySelector('.main').scrollTop = 0
        }
      })
    }

  },
  beforeDestroy() {
    clearInterval(this.time)
  }

}
</script>

<style scoped>
.documentName >>> .el-form-item__error {
  top: 9px;
  left: 310px;
}

.texta >>> .el-upload-list--picture .el-upload-list__item {
  display: none;
}

.disabled .el-upload--picture-card {
  display: block;
}

.newDocuments {
  margin-left: 10px;
}
.texta >>> .el-textarea__inner {
  padding: 5px;
  height: 150px;
}
.el-upload__text >>> .el-button {
  padding: 5px 5px;
  font-size: 14px;
}
.btnWrap {
  position: absolute;
  left: 20px;
  right: 0;
  top: 30px;
  width: 90px;
}
.btnWrap >>> .el-button--danger {
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
}

.el-upload__text >>> .el-button span {
  font-size: 13px;
}

.textO {
  font-weight: 600;
  font-size: 13px;
  color: #909399;
  position: relative;
  bottom: 8px;
}
.el-upload-dragger .el-upload__text {
  margin-top: -10px;
}

.wrapDemo,
.wrapImge {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.demoImage,
.ImageSa {
  display: flex;
  font-size: 12px;
  width: 286px;
  margin-right: 30px;
  position: relative;
}
.demEditor {
  margin-left: 10px;
}
.demEditor > .iconDelete {
  color: #000;
}

.demEditor >>> .el-button {
  padding: 4px 4px;
}
.demEditor >>> .el-button span {
  font-size: 12px;
}
.wrapDemo >>> .el-image-viewer__btn {
  color: white;
}

p,
h4 {
  margin: 0;
  line-height: 20px;
  margin-top: 2px;
}
.demEditor > p {
  font-size: 12px;
  word-wrap: break-word;
  word-break: normal;
  width: 178px;
}
.editorText {
  position: absolute;
  right: 0px;
  top: 28px;
  background: white;
  height: 72px;
}
.editorText >>> .el-textarea__inner {
  padding: 5px;
  height: 40px;
  font-size: 12px;
}

.btnOne {
  height: 20px;
  position: absolute;
  top: 35px;
}
.btnOne >>> .el-button {
  padding: 4px 4px;
  width: 60px;
  height: 26px;
}
.btnOne >>> .el-button span {
  font-size: 12px;
}

.jindu {
  position: absolute;
  right: 49px;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 51;
  background: rgba(0, 0, 0, 0.2);
  height: 100px;
}
.jindu .jinduTwo {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.jindu >>> .el-progress__text {
  color: #f2f6fc;
}

.wrapImge > .ImageSa {
  width: 150px;
  margin-right: 45px;
}

.btnR {
  padding: 50px 50px 50px 0;
  /* text-align: center; */
}
.btnR >>> .el-button {
  width: 150px;
}
</style>
