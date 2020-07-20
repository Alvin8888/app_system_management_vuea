/* eslint-disable no-unused-vars */

import {

} from '@/api/supplier'

import {

  /* 详情浏览器储存*/

  getFmcIndex,
  setFmcIndex

} from '@/utlis/storage/fmc'

const fmc = {
  namespaced: true,
  state: {

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
    }

  },
  actions: {

  }
}

export default fmc
