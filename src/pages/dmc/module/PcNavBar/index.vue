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
          <el-submenu index="1" v-if="dmcOneArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的文档</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of dmcOneArr"
                :key="index"
                @click="handleMuensOne(item,index)"
              >{{item.menuName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2" v-if="dmcTowArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文档库</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of dmcTowArr"
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
  inject: ['reload'],
  data() {
    return {
      dmcOne: [],
      dmcTow: [],
      default_openeds_array: [],
      urlIndex: ''
    }
  },
  watch: {
    'user.dmcData'(appMenus) {
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          case '82bfc590-7705-4a51-9c44-6a1c1d811328':
            this.dmcOne.push(item)
            break
          case '76986055-c1d3-4757-8219-b4ef190c81e0':
            this.dmcTow.push(item)
            break
        }
      })
    }
  },

  methods: {
    handleMuensOne(item, index) {
      this.urlIndex = item.menuUrl
      this.$store.commit('dmc/MUENE_URL', item.menuUrl)
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    fetchData() {
      const appMenus = this.user.dmcData
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          case '82bfc590-7705-4a51-9c44-6a1c1d811328':
            this.dmcOne.push(item)
            break
          case '76986055-c1d3-4757-8219-b4ef190c81e0':
            this.dmcTow.push(item)
            break
        }
      })

      this.urlIndex = this.dmc.mueneUrls
    }
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['user', 'dmc']),
    dmcOneArr() {
      const res = new Map()
      return this.dmcOne.filter(
        arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1)
      )
    },
    dmcTowArr() {
      const res = new Map()
      return this.dmcTow.filter(
        arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1)
      )
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

