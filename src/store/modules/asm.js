/* eslint-disable no-unused-vars */

import { getOrganizations, getRoleList, getUserList } from '@/api/workbench/user-list'
import {
  getRoleLists,
  setRoleLists,
  getDepaList,
  setDepaList

} from '@/utlis/auth'

const asm = {
  namespaced: true,
  state: {
    depaData: getDepaList(), // 在sessionStorage获取部门列表数据
    roleData: getRoleLists(), // 在sessionStorage获取角色列表数据
    from: {
      value: '2',
      currentPage: 1,
      pageSize: 10
    },
    keyPath: [], // 菜单打开默认值
    mueneUrls: '' // 保存菜单的高亮以及跳转的地址
  },
  mutations: {

    DEP_DATA(state, depaData) {
      state.depaData = depaData
      setDepaList(depaData) // 储存部门列表数据在sessionStorage
    },

    ROLE_DATA(state, roleData) {
      state.roleData = roleData
      setRoleLists(roleData) // 储存角色列表数据在sessionStorage
    },
    ROLE_FROM(state, from) {
      state.from = from
    },

    // 保存菜单打开或者关闭状态
    DEFAULT_OPENEDS(state, keyPath) {
      state.keyPath = keyPath
    },
    // 保存菜单的高亮以及跳转的地址
    MUENE_URL(state, mueneUrls) {
      state.mueneUrls = mueneUrls
    }
  },

  actions: {

    // 角色管理
    RoleList({ commit }, roleData) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getRoleList(roleData.is_disabled, roleData.page, roleData.limit).then(res => {
          const resp = res.data
          if (resp.code === 200) {
            commit('ROLE_DATA', resp.data)
          }
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 部门管理
    Organizations({ commit }) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getOrganizations()
          .then(res => {
            const resp = res.data
            if (resp.code === 200) {
              commit('DEP_DATA', resp.data)
              // 成功则去
            }
            response(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 用户列表
    UserList({ commit }, from) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        const searchMap = from

        getUserList(searchMap).then(res => {
          const resp = res.data

          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    }

  }
}

export default asm
