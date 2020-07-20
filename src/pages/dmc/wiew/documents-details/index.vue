<template>
  <div class="documents-details">
    <!-- 文档下载 -->
    <div class="pupDocments" >
      <el-button type="primary" @click="handleDownload">下载文档</el-button>
      <el-button type="primary" @click="handleEidte" v-if="userData.user_name == user.user.user_email">编辑文档</el-button>
    </div>

    <h2>{{view.title}}验厂报告</h2>
    <div class="detailsSj">
      <p>
        最后更新时间:
        <span>{{userData.add_time}}</span>
      </p>
      <p>
        上传人:
        <span>{{userData.user_name}}</span>
      </p>
      <p>
        照片数:
        <span>{{userData.img_sum}}</span>
      </p>
    </div>
    <div class="textOne">
      <p>
        文件说明:
        <span>{{userData.explain}}</span>
      </p>
    </div>

    <!-- 图片展示 -->
    <div class="documentImge">
      <span>照片附件</span>

      <div class="warpImge">
        <div class="imgeOne" v-for="(item,index) of userData.items" :key="index">
          <el-image
            style="width: 100px; height: 100px"
            :src="baseUrl +`${item.img_path}@400w_400h_75Q_r`"
            :fit="fits"
            :preview-src-list="srcImgeShow"
            @click.native="handleImges(item,index)"
          >
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
          <div class="imgeText">
            <div class="textTop">
              <h5 class="imgeName">{{item.img_name}}</h5>
              <i class="el-icon-download" @click="handleSingleImges(item,index)"></i>
            </div>
            <p class="textName">{{item.img_explain}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { documentSelectInfo, documentDownload } from '@/api/documents'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      fits: 'fill',
      srcList: [], // 后台获取过来的图片数据
      srcImgeShow: [], // 展示的图片数据
      baseUrl: 'http://120.24.111.130:8020/uploads/', // 访问地址
      userData: {}, // 用户数据
      view: {}
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['dmc', 'user'])
  },
  methods: {

    /* 根据点击每一张图片显示 */
    handleImges(item, index) {
      const arrImge = []
      this.srcList.map(item => {
        arrImge.unshift(item)
      })
      arrImge.unshift(this.baseUrl + item.img_path)
      this.srcImgeShow = arrImge
      this.srcImgeShow = [...new Set(this.srcImgeShow)] // new Set去重
    },

    // 编辑图片
    handleEidte() {
      // 点击编辑把数据提交到vuex当中
      this.$store.commit('dmc/USER_DATA', this.userData)
      this.$router.push('/editor-documents')
    },

    // 下载
    handleDownload() {
      // 获取下载接口
      documentDownload(this.view.id).then(res => {
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
          } catch (err) { // 解析成对象失败，说明是正常的文件流
            const blob = new Blob([data], { type: 'application/zip' })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a') // 创建a标签
            // link.style.display = 'none'
            link.href = url
            // document.body.appendChild(link)
            // link.download = res.data; // 重命名文件
            link.click()
            URL.revokeObjectURL(url) // 释放内存 */
          }
        }
        fileReader.readAsText(data)
      }).catch(err => {
        console.log(err)
      })
    },

    // 下载单独的图片
    handleSingleImges(items) {
      const img = this.baseUrl + items.img_path

      // 拿到单独的图片,下载到浏览器中
      const image = new Image()
      // 解决跨域 canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous')
      image.onload = function() {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        // 得到图片的base64编码数据
        const url = canvas.toDataURL('image/png')
        // 生成一个 a 标签
        const a = document.createElement('a')
        // 创建一个点击事件
        const event = new MouseEvent('click')
        // 将 a 的 download 属性设置为我们想要下载的图片的名称，若 name 不存在则使用'图片'作为默认名称
        a.download = items.img_name || '图片'
        // 将生成的 URL 设置为 a.href 属性
        a.href = url
        // 触发 a 的点击事件
        a.dispatchEvent(event)
        // return a;
      }

      // 把图片地址赋值给imge
      image.src = img
    },

    fetchData() {
      // 拿去父组件传过来的值
      this.view = this.dmc.viewData

      // 查询文档详情接口
      documentSelectInfo(this.view.id).then(res => {
        const fetch = res.data
        if (fetch.code === 200) {
          this.userData = fetch.data
          // 循环得到数据,往srcList里面添
          fetch.data.items.forEach((a, index) => {
            const url = this.baseUrl + a.img_path
            this.srcList.push(url)
            this.handleImges(a, index)
          })
        }
        console.log('fetch', fetch)
      })
    }
  }
}
</script>

<style scoped>
.pupDocments {
  position: absolute;
  right: 100px;
}

.documents-details {
  margin-left: 10px;
  margin: 8px;
}
.textOne {
}
.detailsSj {
  display: flex;
}
.detailsSj > p {
  flex: 0.5;
}

.documentImge {
  margin-top: 50px;
}
.documentImge > span {
  font-size: 14px;
}
.warpImge {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.imgeOne {
  background: rgba(255, 255, 255, 0);
  margin-top: 30px;
  margin-right: 6px;
  flex-direction: wrap;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.imgeText {
  padding: 10px;
}
.el-image {
  width: 230px !important;
  height: 150px !important;
}
.textTop {
  display: flex;
  justify-content: space-between;
}
.textTop > i {
  vertical-align: middle;
  display: table-cell;
  margin-top: 2px;
  font-size: 18px;
}
.imgeName {
  margin: 0;
}
.textBottom {
}
.textName {
  font-size: 13px;
}

.imgeOne >>>  .el-image-viewer__close {
  color: white;
}
</style>
