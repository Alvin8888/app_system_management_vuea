/* mmc */
const baseURL = 'http://120.24.111.130:8024'

import request from '@/utlis/request'
// 取消上传

// 上传接口
const uploadStatement = (data, callbackl, progressName) => {
  return request({
    method: 'post',
    url: baseURL + `/mmc/UploadFile/dataProcess`,
    data,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0) // 百分比
        var percentage = parseInt(val)
        callbackl(percentage, progressName)
      }
    }
  })
}

// 上传物流数据
const uploadLogistics = (data, callbackl, progressName) => {
  return request({
    method: 'post',
    url: baseURL + `/mmc/UploadFile/uploadLogistics`,
    data,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0) // 百分比
        var percentage = parseInt(val)
        callbackl(percentage, progressName)
      }
    }
  })
}

// 手动校正
const uploadInventory = (data, callbackl, progressName) => {
  return request({
    method: 'post',
    url: baseURL + `/mmc/UploadFile/uploadInventory`,
    data,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0) // 百分比
        var percentage = parseInt(val)
        callbackl(percentage, progressName)
      }
    }
  })
}

// 订单数据处理接口（待分仓）
const insertOrder = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/insertOrder`
  })
}

// 订单是否分仓
const orderIsDepot = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/orderIsDepot`
  })
}

// 开始分仓
const assignDepot = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/assignDepot`
  })
}

// 下载分仓数据接口
const downloadDepotData = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/downloadDepotData`
  })
}

// 获取平台sku列表
const getPlatformList = (params) => { // params
  return request({
    method: 'get',
    params,
    url: baseURL + `/mmclist/PlatformSku/getPlatformList`
  })
}

// 获取详情
const getInfo = (params) => { // params
  return request({
    method: 'get',
    params,
    url: baseURL + `/mmclist/PlatformSku/getInfo`
  })
}

// 获取部门列表
const getOrganizations = () => { // params
  return request({
    method: 'get',
    url: baseURL + `/mmclist/Organization/getOrganizations`
  })
}

// 获取品类列表
const getCategoryList = () => { // params
  return request({
    method: 'get',
    url: baseURL + `/mmclist/Category/getCategoryList`
  })
}

// 获取店铺列表
const getShopList = (params) => { // params
  return request({
    method: 'get',
    params,
    url: baseURL + `/mmclist/Shops/getShopList`
  })
}

// 获取币种
const getPlatformCurrencyList = (params) => { // params
  return request({
    method: 'get',
    params,
    url: baseURL + `/mmclist/Shops/getPlatformCurrencyList`
  })
}

// 获取顾客列表
const getCustomerList = (params) => { // params
  return request({
    method: 'get',
    params,
    url: baseURL + `/mmclist/Customers/getCustomerList`
  })
}

// 获取详情
const getUserInfo = (params) => { // params
  return request({
    method: 'get',
    params,
    url: baseURL + `/mmclist/Customers/getInfo`
  })
}

// 获取消费记录
const getExpensesRecord = (params) => { // params
  return request({
    method: 'get',
    params,
    url: baseURL + `/mmclist/Customers/getExpensesRecord`
  })
}

// 打单日历表
const printList = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/printList`
  })
}

// 下载发货订单
const downloadShippingOrder = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/downloadShippingOrder`
  })
}

// 下载未处理订单
const downloadPendingOrder = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/downloadPendingOrder`,
    responseType: 'blob'
  })
}

// 订单列表
const orderList = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/orderList`
  })
}

// 订单搜索
const orderSearch = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/orderSearch`
  })
}

// 订单详情
const selectOrderInfo = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/selectOrderInfo`
  })
}

// 订单详情编辑
const orderInfoEdit = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/orderInfoEdit`
  })
}

// 已打单
const getPrintOrder = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/getPrintOrder`
  })
}

// 刷新库存数据
const refreshInventory = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/refreshInventory`
  })
}

// 已分仓接口（已分仓）
const getDepotOrder = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/getDepotOrder`
  })
}

// 已分仓接口（已分仓）
const searchFilter = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/searchFilter`
  })
}

// 订单详情搜索、新增、删除
const orderInfoSearchAddDel = (data) => { // params
  return request({
    method: 'post',
    data,
    url: baseURL + `/mmc/OrderProcess/orderInfoSearchAddDel`
  })
}
export {
  uploadLogistics,
  uploadStatement,
  uploadInventory,
  insertOrder,
  orderIsDepot,
  assignDepot,
  downloadDepotData,
  getPlatformList,
  getInfo,
  getOrganizations,
  getCategoryList,
  getShopList,
  getPlatformCurrencyList,
  getCustomerList,
  getUserInfo,
  getExpensesRecord,
  printList,
  downloadShippingOrder,
  downloadPendingOrder,
  orderList,
  orderSearch,
  selectOrderInfo,
  orderInfoEdit,
  getPrintOrder,
  refreshInventory,
  getDepotOrder,
  searchFilter,
  orderInfoSearchAddDel
}
