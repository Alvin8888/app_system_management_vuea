import request from '@/utlis/request'

const baseURL = 'http://120.24.111.130:8001'

// 用户详情查询id
const getUserById = user_id => {
  const baId = request({
    method: 'get',
    url: baseURL + `/user/user/getUserById`,
    params: {
      user_id
    }
  })
  return baId
}

// 获取权限组包含选中状态
const getPermissionUserList = user_id => {
  const list = request({
    method: 'get',
    url: baseURL + '/user/permissionGroup/getPermissionUserList',
    params: {
      user_id
    }
  })

  return list
}

// 修改用戶角色
const editUserGroup = (user_id, permission_group_ids) => {
  const list = request({
    method: 'post',
    url: baseURL + '/user/userGroup/editUserGroup',
    data: {
      user_id,
      permission_group_ids
    }
  })

  return list
}

// 用户列表
const getUserList = (searchMap) => {
  const list = request({
    method: 'get',
    url: baseURL + '/user/user/getUserList',
    params: searchMap
  })
  return list
}

// 部门列表
const getOrganizations = () => {
  const list = request({
    method: 'get',
    url: baseURL + '/user/organization/getOrganizations'
  })
  return list
}

// 角色列表
const getRoleList = (is_disabled, page, limit) => {
  const list = request({
    method: 'get',
    url: baseURL + '/user/permissionGroup/getPermissionList',
    params: {
      is_disabled,
      page,
      limit
    }
  })
  return list
}

// 角色列表
const getPermissionRe = (keywords, permission_id) => {
  const list = request({
    method: 'get',
    url: baseURL + '/user/permissionGroup/getPermissionRe',
    params: {
      keywords,
      permission_id
    }
  })

  return list
}

// 角色配置
const permissionGroupSetting = data => {
  const list = request({
    method: 'post',
    url: baseURL + '/user/permissionGroup/permissionGroupSetting',
    data
  })

  return list
}

// 验证角色唯一性
const checkPermissionGroupName = params => {
  const list = request({
    method: 'get',
    url: baseURL + '/user/permissionGroup/checkPermissionGroupName',
    params
  })

  return list
}

// 添加权限组
const addPermissionGroup = data => {
  const list = request({
    method: 'post',
    url: baseURL + '/user/permissionGroup/addPermissionGroup',
    data
  })

  return list
}

// 修改权限组/user/user/getUserGroupByUser
const editPermissionGroup = data => {
  const list = request({
    method: 'post',
    url: baseURL + '/user/permissionGroup/editPermissionGroup',
    data
  })

  return list
}

// 修改权限组
const editUser = data => {
  const list = request({
    method: 'post',
    url: baseURL + '/user/user/editUser',
    data
  })

  return list
}

export {
  getUserList,
  getRoleList,
  getOrganizations,
  getUserById,
  getPermissionRe,
  permissionGroupSetting,
  checkPermissionGroupName,
  addPermissionGroup,
  editPermissionGroup,
  getPermissionUserList,
  editUser,
  editUserGroup
}
