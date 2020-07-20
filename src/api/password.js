import request from '@/utlis/request'

const baseURL = 'http://120.24.111.130:8001'

export default {
  // 获取id,提交 旧密码

  oldPassword(user_email) {
    return request({
      method: 'get',
      url: baseURL + `/user/user/resetPassword`,
      params: {
        user_email
      }
    })
  },

  updatePassword(password, old_password) {
    return request({
      method: 'post',
      url: baseURL + '/user/user/editPassword',
      data: {
        password,
        old_password
      }
    })
  }
}
