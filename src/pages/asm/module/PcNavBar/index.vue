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
          :collapse-transition="true"
          :default-openeds="default_openeds_array"
          menu-trigger="hover"
          :default-active="$route.path"
        >
          <el-submenu index="1" v-if="asmOneArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of asmOneArr"
                :key="index"
                @click="handleMuensOne(item,index)"
              >{{item.menuName}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2" v-if="asmTowArr.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of asmTowArr"
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
      asmOne: [],
      asmTow: [],
      default_openeds_array: [],
      urlIndex: ''
    }
  },

  methods: {

    handleMuensOne(item, index) {
      this.urlIndex = item.menuUrl
      this.$store.commit('asm/MUENE_URL', item.menuUrl)
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    fetchData() {
      /* 提交到vuex中 */
      const appMenus = this.user.asmData

      appMenus.forEach(item => {
        switch (item.menuGuid) {
          case 'b77effb4-8ad6-41a6-828e-431ef14b12be':
            this.asmOne.push(item)
            break
          case '2156829a-5ceb-433c-8c54-ebc6023d0d42':
            this.asmOne.push(item)
            break
          case 'c3319b7c-de40-4ff5-99ac-8be2a787ca05':
            this.asmTow.push(item)
            break
          case '72a541ef-10f0-43a2-b8f4-316624e69728':
            this.asmTow.push(item)
            break
          case '0fabd898-e157-42f3-95b5-a94aab315216':
            this.asmTow.push(item)
            break
        }
      })

      this.urlIndex = this.asm.mueneUrls
    }
  },
  created() {
    this.fetchData()
  },
  updated() {},
  computed: {
    ...mapState(['user', 'asm']),

    // 把数组去重处理
    asmOneArr() {
      const res = new Map()
      return this.asmOne.filter(
        arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1)
      )
    },
    asmTowArr() {
      const res = new Map()
      return this.asmTow.filter(
        arr => !res.has(arr.menuGuid) && res.set(arr.menuGuid, 1)
      )
    }
  },
  watch: {
    'user.asmData'(appMenus) {
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          case 'b77effb4-8ad6-41a6-828e-431ef14b12be':
            this.asmOne.push(item)
            break
          case '2156829a-5ceb-433c-8c54-ebc6023d0d42':
            this.asmOne.push(item)
            break
          case 'c3319b7c-de40-4ff5-99ac-8be2a787ca05':
            this.asmTow.push(item)
            break
          case '72a541ef-10f0-43a2-b8f4-316624e69728':
            this.asmTow.push(item)
            break
          case '0fabd898-e157-42f3-95b5-a94aab315216':
            this.asmTow.push(item)
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

