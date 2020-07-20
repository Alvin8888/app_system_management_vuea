<template>
  <div class="navMenu">
    <div class="navItem" :class="{active:indexOne == -2}" @click="handleWorkStatic">
      <div class="texts" @click="$router.push('/workbench')">工作台</div>
    </div>
    <div
      class="navItem"
      :class="{active:indexOne == index}"
      @click="(e)=>handeleaAsm(e,item,index)"
      v-for="(item,index) of users.apps"
      :key="item.app_guid"
      ref="maps"
    >
      <div class="texts">{{item.app_show_name}}</div>
    </div>
  </div>
</template>

<script>
import { getAppPermissionByToken } from '@/api/login'
import { mapState } from 'vuex'
export default {
  name: 'KeepAlive',
  inject: ['reload'],
  data() {
    return {
      activeIndex: '1',
      appList: [],
      users: {},
      indexOne: null
    }
  },
  components: {},

  created() {
    this.fetchData()
    this.reload()
  },
  computed: {
    ...mapState(['user', 'asm', 'dmc', 'scm', 'fmc', 'mmc'])
  },

  methods: {
    // 静态工作台事件
    handleWorkStatic() {
      this.indexOne = -2
    },

    // 点击每个tab跳转的菜单
    handeleaAsm(e, item, index) {
      this.init(item, index)
    },

    // 初始值
    init(item, index) {
      this.$store.commit('PER_INDEX', index)
      this.indexOne = this.user.perIndex
      this.reload()
      switch (item.app_guid) {
        case 'A9BA21DD-96C6-8B84-7537-9F535310DA3E':
          this.$store.commit('ASM_URL', '/asm')
          this.asm.mueneUrls === ''
            ? this.$router.push('/asm')
            : this.$router.push(this.asm.mueneUrls)
          break
        case '3C647AFB-A14F-31EB-3DBF-E114E5AD1392':
          this.$store.commit('SCM_URL', '/scm')
          this.scm.mueneUrls === ''
            ? this.$router.push('/scm')
            : this.$router.push(this.scm.mueneUrls)
          break
        case '9212F71F-4075-4496-7851-0B309DBF18FC':
          this.$store.commit('DMC_URL', '/dmc')
          this.dmc.mueneUrls === ''
            ? this.$router.push('/dmc')
            : this.$router.push(this.dmc.mueneUrls)
          break
        case '67f16815-6205-4feb-a7d2-8edcc2a1fdd2':
          this.$store.commit('FMC_URL', '/fmc')
          this.fmc.mueneUrls === ''
            ? this.$router.push('/fmc')
            : this.$router.push(this.fmc.mueneUrls)
          break
        case 'bc46a6c4-bbd9-45fb-a5ea-12fdaa8181e5':
          this.$store.commit('MMC_URL', '/mmc')
          this.mmc.mueneUrls === ''
            ? this.$router.push('/mmc')
            : this.$router.push(this.mmc.mueneUrls)
          break
      }
      const params = {
        token: this.user.token,
        app_name: item.app_name
      }
      getAppPermissionByToken(params).then(res => {
        const fetch = res.data
        console.log(this.$route.path)
        if (fetch.code === 200) {
          // 所有数据
          this.$store.commit('PER_DATA', fetch.data.appMenus)
          switch (this.$route.path) {
            case '/asm':
              this.$store.commit('ASM_DATA', fetch.data.appMenus)
              break
            case '/scm':
              this.$store.commit('SCM_DATA', fetch.data.appMenus)
              break
            case '/dmc':
              this.$store.commit('DMC_DATA', fetch.data.appMenus)
              break
            case '/fmc':
              this.$store.commit('FMC_DATA', fetch.data.appMenus)
              break
            case '/mmc':
              this.$store.commit('MMC_DATA', fetch.data.appMenus)
              break
          }
        }
      })
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    fetchData() {
      this.appList = this.user.data
      this.users = this.user.user

      // 初始化渲染
      this.indexOne = this.user.perIndex
    }
  },
  updated() {}
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
.active {
  color: rgb(255, 208, 75) !important;
  /* background: chocolate !important; */
}

.navMenu {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.navItem {
  color: #e6e6e6;
  background: #242f42;
  font-size: 15px !important;
  cursor: pointer;
  width: 100px;
  text-align: center;
  padding: 0 10px 0 10px;

  /* max-width: 60px; */
}
.navItem:hover {
  background: rgb(32, 33, 34);
}
.active::after {
  content: "";
  display: block;
  background: rgb(255, 208, 75);
  height: 3px;
  width: 100%;
  position: relative;
  bottom: 2px;
  padding: 0 10px 0 10px;
  position: relative;
  right: 10px;
}

.el-menu {
  list-style: none;
  display: block;
  float: left;
  margin: 0;
  padding-left: 0;
  color: #e6e6e6;
  background: #242f42;
}
.texts {
  /* padding: 0 10px 0 10px; */
}
.el-menu--horizontal > .el-menu-item {
  height: 70px;
  line-height: 70px;
}
.el-menu-item {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.el-menu-item.is-active {
  background-color: rgb(42, 44, 46) !important;
}
</style>
