import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'
import {
  getToken
} from './auth'
import qs from 'qs'
const resuest = axios.create({
  // baseURL: '/api',
  baseURL: '',
  timeout: 180000
  // headers:{'Content-Type': 'application/json'}
})
import router from '@/router'
// 给全局headers加上token
const token = getToken()
resuest.defaults.headers.common['max-token'] = token
resuest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 懒加载
const loading = {
  loadingInstance: null,
  open: function() {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        target: '.main',
        text: '拼命加载中....',
        body: true
      })
    }
  },
  close: function() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
      // 结束加载
    }
    this.loadingInstance = null
  }
}

// 请求拦截器
resuest.interceptors.request.use(
  config => {
    // 请求成功需要做的一些事
    if (Object.prototype.toString.call(config.data) != '[object FormData]' && config.url.indexOf('getDataHandlerList') === -1) { // 上传中不开启loading
      loading.open()
    }
    // 这里token获取需要你在登录成功后,后端会给你返回token,你需要存到localStorage中
    const token = getToken()
    if (token) {
      token && (config.headers.Authorization = token)
      config.headers['max-token'] = token // 将token放到请求头发送给服务器
    }

    if (config.method === 'get') {
      // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = function(params) {
        return qs.stringify(params, {
          arrayFormat: 'repeat'
        })
      }
    }

    return config
  },
  err => {
    // 请求异常需要返回的错误
    loading.close()
    return Promise.reject(err)
  }
)

// 响应拦截器
resuest.interceptors.response.use(
  res => {
    // 响应成功需要做的事

    loading.close()
    const resp = res.data
    if (resp.code == 3) {
      Message({
        message: resp.message || '权限不足',
        type: 'warning',
        duration: 2 * 1000
      })
      throw new Error('权限不足')
    }
    if (resp.code === 6 || resp.code === 2 || resp.code === 309) {
      Message({
        message: resp.message || '系统异常',
        type: 'warning',
        duration: 2 * 1000
      })
      router.push('/login')
      return res
    } else if (res.status !== 200 && resp.code !== 200) {
      Message({
        message: resp.message || '系统异常',
        type: 'warning',
        duration: 2 * 1000
      })
      return res
    }

    return res
  },
  err => {
    // 响应异常需要做的事
    loading.close()
    const resp = err.response.status
    console.log('response error', resp)
    if (err && err.response && err.response.status) {
      switch (resp) {
        case 200:
          Message({
            message: '请求成功',
            type: 'warning'
          })
          break
        case 401:
          Message({
            message: '未授权，请登录',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 403:
          Message({
            message: '拒绝访问',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 404:
          Message({
            message: `请求地址出错: ${err.response.config.url}`,
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 408:
          Message({
            message: '请求超时',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 500:
          Message({
            message: '请求错误,无法获取数据',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 501:
          Message({
            message: '服务未实现',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 502:
          Message({
            message: '网关错误',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 503:
          Message({
            message: '服务不可用',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 504:
          Message({
            message: '网关超时',
            type: 'error',
            duration: 5 * 1000
          })
          break
        case 505:
          Message({
            message: 'HTTP版本不受支持',
            type: 'error',
            duration: 5 * 1000
          })
          break
      }
    }

    return Promise.reject(err)
  }

)

export default resuest
