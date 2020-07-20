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
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>业绩核算</span>
            </template>
            <el-menu-item
                :index="item.menuUrl"
                v-for="(item,index) of fmcOneArr"
                :key="index"
                @click="handleMuensOne(item,index)"
              >{{item.menuName}}</el-menu-item>
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
      fmcOne: [],
      // dmcTow: [],

      urlIndex: '',
      default_openeds_array: []
    }
  },
  watch: {
    /* 监听vuex当中的dmcData */
    'user.fmcData'(appMenus) {
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          // 拿到菜单appMenus跟子级的appMenus 做对比进行push
          case '36d968e5-e473-4313-a329-1fe3edbf5702':
            this.fmcOne.push(item)
            break
        }
      })
    }
  },

  methods: {

    // 事件处理
    handleMuensOne(item, index) {
      this.urlIndex = item.menuUrl
      this.$store.commit('fmc/MUENE_URL', item.menuUrl)
    },

    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    fetchData() {
      const appMenus = this.user.fmcData
      appMenus.forEach(item => {
        switch (item.menuGuid) {
          // 拿到菜单appMenus跟子级的appMenus 做对比进行push
          case '36d968e5-e473-4313-a329-1fe3edbf5702':
            this.fmcOne.push(item)
            break
        }
      })

      this.urlIndex = this.fmc.mueneUrls
    }
  },

  created() {
    this.fetchData()
  },
  computed: {
    ...mapState(['user', 'fmc']),

    // 把数组去重处理
    fmcOneArr() {
      const res = new Map()
      return this.fmcOne.filter(
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

