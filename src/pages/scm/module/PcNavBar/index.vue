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
          <el-submenu index="1" v-if="scmOneArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>品类管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of scmOneArr"
                :key="index"
                 @click="handleMuensOne(item,index)"
              >{{item.menuName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2" v-if="scmTowArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>属性管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of scmTowArr"
                :key="index"
                 @click="handleMuensOne(item,index)"
              >{{item.menuName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="scmThreeArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>库存sku管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of scmThreeArr"
                :key="index"
                 @click="handleMuensOne(item,index)"
              >{{item.menuName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4" v-if="scmFourArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>仓库管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of scmFourArr"
                :key="index"
                 @click="handleMuensOne(item,index)"
              >{{item.menuName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      scmOne: [],
      scmTow: [],
      scmThree: [],
      scmFour: [],
      default_openeds_array: [],
      urlIndex: ''
      // scmFive: []
    }
  },

  methods: {
    handleMuensOne(item, index) {
      console.log(item.menuUrl)
      this.urlIndex = item.menuUrl
      this.$store.commit('scm/MUENE_URL', item.menuUrl)
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },

    fetchData() {
      const appMenus = this.user.scmData
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          case 'ee1e5165-bd8a-483a-b26c-35df6ce585a5':
            this.scmOne.push(item)
            break
          case 'e81beef8-ce66-4a70-aebe-7332fea3df70':
            this.scmTow.push(item)
            break
          case '23c8a3e9-77f6-486f-bab3-499beadcafc3':
            this.scmThree.push(item)
            break
          case 'c724a55b-4707-424e-b8b6-08d301a83ce3':
            this.scmFour.push(item)
            break
        }
      })

      this.urlIndex = this.scm.mueneUrls
    }
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['user', 'scm']),
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
  },

  watch: {
    'user.scmData'(appMenus) {
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          case 'ee1e5165-bd8a-483a-b26c-35df6ce585a5':
            this.scmOne.push(item)
            break
          case 'e81beef8-ce66-4a70-aebe-7332fea3df70':
            this.scmTow.push(item)
            break
          case '23c8a3e9-77f6-486f-bab3-499beadcafc3':
            this.scmThree.push(item)
            break
          case 'c724a55b-4707-424e-b8b6-08d301a83ce3':
            this.scmFour.push(item)
            break
        }
      })
    }
  }
}
</script>

<style scoped>
*{
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

