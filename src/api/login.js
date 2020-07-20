import request from '@/utlis/request'

const baseURL = 'http://120.24.111.130:8001'

// 登录
const login = (user_email, user_password) => {
  const data = request({
    method: 'post',
    url: baseURL + '/user/User/login',
    data: {
      user_email,
      user_password
    }
  })

  return data
}

// 获取用户token
const userInfo = () => {
  const status = request({
    method: 'get',
    url: baseURL + `/user/user/getUserInfoByToken`
  })
  return status
}

// 登出
const userLogout = () => {
  const out = request({
    method: 'get',
    url: baseURL + '/user/user/loginOut'
  })
  return out
}

// 通过用户token和appName查询该用户在该应用拥有的权限
const getAppPermissionByToken = params => {
  const out = request({
    method: 'get',
    url: baseURL + '/User/user/getAppPermissionByToken',
    params
  })
  return out
}

export { login, userInfo, userLogout, getAppPermissionByToken }
