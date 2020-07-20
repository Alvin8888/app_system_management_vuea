<template>
  <div class="skuDetails">
    <el-tabs
        :tab-position="tabPosition"
        style="height: 200px;margin-top:10px"
        @tab-click="handleClickRolling"
        class="muenWarp"
    >
      <el-tab-pane label="基本信息"></el-tab-pane>
      <el-tab-pane label="销售信息"></el-tab-pane>
    </el-tabs>
    <div class="fiex">
      <h2 class="titles">
        {{goods.platform_sku}}
        <i class="el-icon-document-copy"></i>
        <el-button type="text" @click="copyTtle">点击复制</el-button>
      </h2>
      <h2>{{goods.platform_display_name}}</h2>
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
          <!--                    <div>-->
          <!--                        英文名:-->
          <!--                        <span>{{goods.commodity_english_name}}</span>-->
          <!--                    </div>-->
          <div style="display: flex">
            <div style="margin-right: 30px;">
              品类:<br/>
              class
            </div>
            <div style="width: 100%">
              <div v-for="(item, index) in goods.categorys" :key="index" style="width: 100%;">
                {{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Ones1" ref="Ones1">
        <div class="line" style="margin-top: 150px;">
          <span>销售信息</span>
          <div></div>
        </div>
        <div class="oneText">
          <div style="display: flex">
            <div>
              是否预售<br/>
              Pre-Sale
            </div>
            <span>
              {{goods.is_pre_sale}}
            </span>
          </div>
          <div style="display: flex">
            <div>
              销售部门 <br/>
              Department
            </div>
            <span>
              {{goods.organization_name}}
            </span>
          </div>
          <div style="display: flex">
            <div>
              销售人员<br/>
              sale person
            </div>
            <span>
              {{goods.sale_user_name}}
            </span>
          </div>
          <div style="display: flex">
            <div>
              对应库存SKU：
            </div>
            <span v-if="goods.repertory_skus[0]">
              {{goods.repertory_skus[0].commodity_repertory_sku}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/mmc'

export default {
  data() {
    return {
      tabPosition: 'left',
      goods: {
        platform_sku: '',
        platform_display_name: '',
        sale_user_name: '',
        is_pre_sale: '',
        organization_name: '',
        platform_organization_id: '',
        repertory_skus: [
          {
            commodity_repertory_sku: 0,
            commodity_quantity: 1
          }
        ]
      }
    }
  },
  created() {
  },
  activated() {
    this.dataInit()
  },
  computed: {},
  mounted() {
    // this.hanckerMina()
  },
  methods: {
    hanckerMina() {
      const el = document.querySelectorAll('.main')[0]
      el.style.overflow = 'hidden'
    },
    dataInit() {
      const data = {
        id: this.$route.query.id
      }
      getInfo(data).then(res => {
        console.log(res)
        this.goods = res.data.data
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
    // 点击复制功能
    copyTtle() {
      const url = this.goods.platform_sku // 拿到需要复制的参数
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
    handleClickRolling(e) {
      const num = e.index
      const el = document.getElementsByClassName(`Ones${num}`)[0]
      this.$nextTick(() => {
        this.$refs.content.scrollTo({ behavior: 'smooth', top: el.offsetTop })
      })
    }
  }
}
</script>
<style scoped lang="less">
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

  .oneText {
    margin: 10px 0 10px 40px;
    font-size: 14px;
  }

  .oneText > div {
    margin-top: 50px;
    font-size: 15px;
    color: #303133;

    div {
      width: 120px;
    }
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

</style>
