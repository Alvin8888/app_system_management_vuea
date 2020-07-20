/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import qs from 'qs'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import './assets/css/index.css' // 全局样式

Vue.use(ElementUi)
Vue.prototype.$qs = qs

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})

/* Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
}) */

// 登录权限管理
import './permissions'

// 去掉控制台中的注释
import 'default-passive-events'

// 如果是开发环境development,否则生产环境production
Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
