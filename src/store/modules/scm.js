/* eslint-disable no-unused-vars */

import {
  getCategoryList,
  getCommodityById,
  getSupplierByCommodity,
  getPackageByCommodity,
  getPictureByCommodity,
  getPlatformByCommodity,
  getLogisticsByCommodity,
  getRcombinationByCommodity,
  getCertificateByCommodity,
  getPurchaseSaleByCommodity
} from '@/api/supplier'

import {

  /* 详情浏览器储存*/
  getGoodsDetails,
  setGoodsDetails,
  getInformation,
  setInformation,
  getWrap,
  setWrap,
  getImgs,
  setImgs,
  getSku,
  setSku,
  getLogistic,
  setLogistic,
  getAssembly,
  setAssembly,
  getCertificate,
  setCertificate,
  getSales,
  setSales,
  getViewRow,
  setViewRow

} from '@/utlis/storage/scm'

const scm = {
  namespaced: true,
  state: {
    brand: [], // 品类列表
    viewRow: getViewRow() || {},
    keyPath: [], // 菜单打开默认值
    mueneUrls: '' // 保存菜单的高亮以及跳转的地址

  },
  mutations: {

    // 品类列表
    ACM_BRAND(state, brand) {
      state.brand = brand
    },

    // 点击查看
    VIEW_ROW(state, viewRow) {
      state.viewRow = viewRow
      setViewRow(viewRow)
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

    // 获取品类列表接口
    CategoryList({
      commit
    }) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getCategoryList().then(res => {
          const resp = res.data
          if (resp.code === 200) {
            commit('ACM_BRAND', resp.data)
          }
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品详情接口
    CommodityById({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getCommodityById(data.commodity_id).then(res => {
          const resp = res.data

          console.log('详情信息', resp.data)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取供应商信息
    SupplierByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getSupplierByCommodity(data.commodity_id).then(res => {
          const resp = res.data

          console.log('供应商信息', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品包装信息
    PackageByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getPackageByCommodity(data.commodity_id).then(res => {
          const resp = res.data

          console.log('包装信息', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品图片
    PictureByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getPictureByCommodity(data.commodity_id).then(res => {
          const resp = res.data
          console.log('商品图片', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品平台sku
    PlatformByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getPlatformByCommodity(data.commodity_id).then(res => {
          const resp = res.data
          console.log('商品平台sku', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品物流信息
    LogisticsByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getLogisticsByCommodity(data.commodity_id).then(res => {
          const resp = res.data
          console.log('商品物流信息', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品组装信息
    RcombinationByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getRcombinationByCommodity(data.commodity_id).then(res => {
          const resp = res.data
          console.log('商品组装信息', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品证书
    CertificateByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getCertificateByCommodity(data.commodity_id).then(res => {
          const resp = res.data
          console.log('商品证书', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取商品销售信息
    PurchaseSaleByCommodity({
      commit
    }, data) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        getPurchaseSaleByCommodity(data.commodity_id).then(res => {
          const resp = res.data

          console.log('商品销售信息', resp)
          response(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    }

  }
}

export default scm
