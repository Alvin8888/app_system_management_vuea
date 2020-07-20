/* eslint-disable no-unused-vars */

import {

} from '@/api/supplier'

import {

/* 详情浏览器储存*/

} from '@/utlis/storage/scm'
import de from 'element-ui/src/locale/lang/de'

const mmc = {
  namespaced: true,
  state: {
    list: window.localStorage.getItem('batch_id_list'),
    keyPath: [], // 菜单打开默认值
    mueneUrls: '' // 保存菜单的高亮以及跳转的地址

  },
  mutations: {

    // 保存菜单打开或者关闭状态
    DEFAULT_OPENEDS(state, keyPath) {
      state.keyPath = keyPath
    },
    // 保存菜单的高亮以及跳转的地址
    MUENE_URL(state, mueneUrls) {
      state.mueneUrls = mueneUrls
    },
    SET_BATCH_ID_LIST(state, list) {
      state.list = list
    }

  },
  getters: {
    getBatchList(state) {
      if (state.list) {
        return state.list
      }
    }
  },
  actions: {

  }
}

export default mmc
