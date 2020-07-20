import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 解决双击link报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 应用模块引入
import asm from './asm'
import scm from './scm'
import dmc from './dmc'
import fmc from './fmc'
import mmc from './mmc'
import workbench from './workbench'

// 工作台引入模块
const Login = () =>
  import ('@/wiew/login')
const Layout = () =>
  import ('@/components')

// 配置路由
export default new Router({
  mode: 'hash',
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    routerGuid: 'edb35037-bea2-45f3-bebf-5c7f49e5322d',
    apiGuidList: [
      '58f92dd4-6d15-4b46-9ace-0ee565857de2',
      'be05069a-cbb5-4d44-a5eb-db6c3c640e8e'
    ],
    meta: {
      title: '登录',
      keepAlive: true
    }
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    // redirect: '/asm',
    meta: {
      title: '首页',
      keepAlive: true
    },

    // 三大应用
    children: [
      ...asm,
      ...scm,
      ...dmc,
      ...fmc,
      ...mmc,
      ...workbench
    ]
  }

  ]
})
