<template>
  <div class="navBar">
    <el-row>
      <el-col :span="12">
        <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true"
            :default-active="$route.path"
            :default-openeds="default_openeds_array"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>平台SKU管理</span>
            </template>
            <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of mmcOneArr"
                :key="index"
                @click="handleMuensOne(item,index)"
            >{{item.menuName}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of mmcTwoArr"
                :key="index"
                @click="handleMuensOne(item,index)"
            >{{item.menuName}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>店铺管理</span>
            </template>
            <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of mmcThreeArr"
                :key="index"
                @click="handleMuensOne(item,index)"
            >{{item.menuName}}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>顾客管理</span>
            </template>
            <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of mmcFourArr"
                :key="index"
                @click="handleMuensOne(item,index)"
            >{{item.menuName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  inject: ['reload'],
  data() {
    return {
      mmcOneArr: [],
      mmcTwoArr: [],
      mmcThreeArr: [],
      mmcFourArr: [],
      urlIndex: '',
      default_openeds_array: []
    }
  },
  watch: {
  },

  methods: {

    // 事件处理
    handleMuensOne(item, index) {
      this.urlIndex = item.menuUrl
      this.$store.commit('mmc/MUENE_URL', item.menuUrl)
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    fetchData() {
      const appMenus = this.user.mmcData
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          // 拿到菜单appMenus跟子级的appMenus 做对比进行push
          case '2b6f3ca8-e232-49ec-b3c9-af593a4f1236':
            this.mmcOneArr.push(item)
            break
          case 'f3336de3-b39d-4ec9-b5f4-4834d230c9d3':
            this.mmcTwoArr.push(item)
            break
          case 'd9a5bf10-7bae-4d27-8002-4d10550ede27':
            this.mmcTwoArr.push(item)
            break
          case '15f22cd8-3ade-44aa-8a87-9688cec5033c':
            this.mmcThreeArr.push(item)
            break
          case '2ab929ed-f8c9-4593-8bf9-b1256709b815':
            this.mmcFourArr.push(item)
            break
        }
      })
      this.urlIndex = this.mmc.mueneUrls
    }
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['user', 'mmc']),

    // 把数组去重处理
    scmOneArr() {
      const res = new Map()
      return this.scmOne.filter(arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1))
    },
    scmTowArr() {
      const res = new Map()
      return this.scmTow.filter(arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1))
    },
    scmThreeArr() {
      const res = new Map()
      return this.scmThree.filter(arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1))
    },
    scmFourArr() {
      const res = new Map()
      return this.scmFour.filter(arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1))
    }
  }
}
</script>

<style scoped>
  * {
    /* 文字限制能或者不能复制 */
    -webkit-touch-callout: none;
    /*系统默认菜单被禁用*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -khtml-user-select: none;
    /*早期浏览器*/
    -moz-user-select: none;
    /*火狐*/
    -ms-user-select: none;
    /*IE10*/
    user-select: none;
  }

  .el-menu {
    border: none;
    list-style: none;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }

  .el-submenu {
    width: 230px;
  }
</style>

