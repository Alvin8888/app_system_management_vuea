<template>
  <div class="tags" v-show="$route.meta.title == '首页'? false :true ">
    <ul>
      <li
        class="tags-li"
        v-for="(item, index) in tagsList"
        :class="{ active: isActive(item.path) }"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{
          item.title
        }}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from '@/common/bus.js'
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  data() {
    return {
      tagsList: [],
      isLenght: false
    }
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath
    },
    // 关闭单个标签
    closeTags(index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = []
      this.$router.push('/')
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter((item) => {
        return item.path === this.$route.fullPath
      })
      this.tagsList = curItem
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some((item) => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (this.tagsList.length >= 10) {
          this.tagsList.shift()
        }

        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath
          // name: route.matched[1].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList)
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    },
    handlePtah(route) {
      const path = route.path

      // 判断根据点击tabs的地址做相对的菜单选项
      if (
        path === '/reset' ||
        path === '/user-list' ||
        path === '/role-list' ||
        path === '/department-list' ||
        path === '/department-list'
      ) {
        this.$store.commit('asm/MUENE_URL', path)
      } else if (path === '/my-documents' || path === '/documents-library') {
        this.$store.commit('dmc/MUENE_URL', path)
      } else if (
        path === '/brand-list' ||
        path === '/attribute-list' ||
        path === '/sku-list' ||
        path === '/library-list'
      ) {
        this.$store.commit('scm/MUENE_URL', path)
      } else if (path === '/accounting') {
        this.$store.commit('fmc/MUENE_URL', path)
      } else if (path.indexOf('/mmc') > -1) {
        this.$store.commit('mmc/MUENE_URL', path)
      } else if (path === this.user.asmUrl) {
        this.$store.commit('PER_INDEX', 0)
      } else if (path === this.user.scmUrl) {
        this.$store.commit('PER_INDEX', 1)
      } else if (path === this.user.dmcUrl) {
        this.$store.commit('PER_INDEX', 2)
      } else if (path === this.user.fmcUrl) {
        this.$store.commit('PER_INDEX', 3)
      } else if (path === this.user.mmcUrl) {
        this.$store.commit('PER_INDEX', 4)
      }

      // 查看asmData数组中的地址,根据过滤进行相等,相等则跳转到应用菜单
      this.user.asmData.filter((data) => {
        if (data.menuUrl === path) {
          this.$store.commit('PER_INDEX', 0)
        }
      })

      // 查看scmData数组中的地址,根据过滤进行相等,相等则跳转到应用菜单
      this.user.scmData.filter((data) => {
        if (data.menuUrl === path) {
          this.$store.commit('PER_INDEX', 1)
        }
      })

      // 查看dmcData数组中的地址,根据过滤进行相等,相等则跳转到应用菜单
      this.user.dmcData.filter((data) => {
        if (data.menuUrl === path) {
          this.$store.commit('PER_INDEX', 2)
        }
      })
      // 查看dmcData数组中的地址,根据过滤进行相等,相等则跳转到应用菜单
      this.user.fmcData.filter((data) => {
        if (data.menuUrl === path) {
          this.$store.commit('PER_INDEX', 3)
        }
      })
      // 查看mmcData数组中的地址,根据过滤进行相等,相等则跳转到应用菜单
      this.user.mmcData.filter((data) => {
        if (path.indexOf('/mmc') > -1) {
          this.$store.commit('PER_INDEX', 4)
        }
      })

      // 根据点击tabs做相等的应用高亮
    }
  },
  computed: {
    ...mapState(['asm', 'dmc', 'scm', 'fmc', 'mmc', 'user']),
    showTags() {
      return this.tagsList.length > 0
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(newValue, oldValue) {
      this.setTags(newValue)
      this.handlePtah(newValue)
    }
  },
  created() {
    this.setTags(this.$route)
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i]
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path)
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path)
          } else {
            this.$router.push('/')
          }
          this.tagsList.splice(i, 1)
          break
        }
      }
    })
  }
}
</script>

<style scoped>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
  padding-left: 230px;
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: rgb(85, 156, 223);
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #4b7adf;
}

.tags-li.active {
  color: #fff;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
  text-decoration: none;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
