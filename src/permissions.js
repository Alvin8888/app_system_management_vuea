import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
  // 获取token
  // const token = localStorage.getItem('fx_user_info_token')
  const token = store.state.user.token
  // 进行判断是否有token,有则任你去,无则回到登录页面/login
  if (!token) {
    // 判断你是否在login页面,不在返回,在任你去
    if (to.path !== '/login') {
      next({ path: '/login' })
    } else {
      // 是在登录页面则输入
      next()
    }
  } else {
    // 如果本地获取到token,则查看是否在之前登录过/login页面
    if (to.path === '/login') {
      // 本地有token同事登录过,则任你去目标
      next()
    } else {
      // 如果没有登录过/login页面,那么查看本地是否有user页面,没有则获取本地token进行补全
      // const user = localStorage.getItem('fx_user_info_login')
      const user = store.state.user.user
      if (user) {
        // 有则任你去想要的目标
        next()
      } else {
        // 没有就回去当前本地种的token进去补全user信息
        store.dispatch('UserInfo').then(res => {
          if (res.code) {
            next()
          } else {
            next({ path: '/login' })
          }
        })
      }
    }
  }
})
