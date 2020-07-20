/* eslint-disable no-unused-vars */

import { documentList, documentSelectInfo } from '@/api/documents'

import {

  getDocumentSelectZero,
  setDocumentSelectZero,
  getDocumentSelectOne,
  setDocumentSelectOne,
  getUserData,
  setUserData,
  getMyEdit,
  setMyEdit,
  getDmcOne,
  setDmcOne,
  getDmcTow,
  setDmcTow

} from '@/utlis/storage/dmc'

const dmc = {
  namespaced: true,
  state: {

    querys: [],
    key: '',
    userData: getUserData(), // 获取我的文档查询 在浏览器中
    viewData: getMyEdit(), // 获取我的文档编辑 在浏览器中
    keyPath: [], // 菜单打开默认值
    mueneUrls: ''
  },
  mutations: {
    DMC_KEY(state, key) {
      state.key = key
    },

    DMC_QUERYS(state, querys) {
      state.querys = querys
    },

    USER_DATA(state, userData) { // 查询文档的值
      state.userData = userData
      setUserData(userData) // 设置我的文档查询 储存在浏览器中
    },

    VIEW_DATA(state, viewData) { // 查看传值
      state.viewData = viewData

      setMyEdit(viewData) // 设置我的文档编辑 储存在浏览器中
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

    // 查询接口
    QuerysDocuments({ commit }) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        documentSelectInfo().then(res => {
          const resp = res.data
          if (resp.code == 200) {
            commit('DMC_QUERYS', resp.data)
          }
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    }

  }
}

export default dmc
