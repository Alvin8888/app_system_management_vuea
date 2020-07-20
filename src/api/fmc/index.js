import request from '@/utlis/request'

const baseURL = 'http://120.24.111.130:8023'

// 上传statement
const uploadStatement = (data, callbackl) => {
  return request({
    method: 'post',
    url: baseURL + `/balance/upload/uploadStatement`,
    data,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0) // 百分比
        var percentage = parseInt(val)
        callbackl(percentage)
      }
    }
  })
}

// 获取批次号
const getBathCode = () => { // params
  return request({
    method: 'get',
    url: baseURL + `/balance/upload/getBathCode`
  })
}

// 获取余额对比列表
const compareList = (params) => { // params
  return request({
    method: 'get',
    url: baseURL + `/fmc/Compared/ComparedList`,
    params
  })
}

// 获取店铺
const getShops = (params) => { // params
  return request({
    method: 'get',
    url: baseURL + `/balance/upload/getShops`,
    params
  })
}

// 获取处理数据
const dataHandler = (data) => { // params
  return request({
    method: 'post',
    url: baseURL + `/balance/upload/dataHandler`,
    data
  })
}

// 获取處理进度
const getDataHandlerList = (data) => { // params
  return request({
    method: 'post',
    url: baseURL + `/balance/upload/getDataHandlerList`,
    data
  })
}
// 获取文件列表
const getFilesForBath = (bath_code) => { // params
  return request({
    method: 'post',
    url: baseURL + `/balance/upload/getFilesForBath`,
    data: {
      bath_code
    }
  })
}

// 余额对比下载表
const zipDownload = (downloadDate, test, string) => { // params
  return request({
    method: 'get',
    url: baseURL + `/fmc/Download/zipDownload`,
    params: {
      downloadDate,
      test
    },
    responseType: string

  })
}

// 修正
const ComparedModify = (comparedId) => { // params
  return request({
    method: 'get',
    url: baseURL + `/fmc/Compared/ComparedModify`,
    params: {
      comparedId
    }
  })
}

// 对比详情
const ComparedInfo = (comparedId) => { // params
  return request({
    method: 'get',
    url: baseURL + `/fmc/Compared/ComparedInfo`,
    params: {
      comparedId
    }
  })
}

// 对比列表,批量标记
const ComparedListMark = (type, ids) => { // params
  return request({
    method: 'post',
    url: baseURL + `/fmc/ReceivablePresale/ComparedListMark`,
    data: {
      type,
      ids
    }
  })
}

// 对比列表,批量标记清除
const ComparedListMarkDelete = (ids) => { // params
  return request({
    method: 'post',
    url: baseURL + `/fmc/ReceivablePresale/ComparedListMarkDelete`,
    data: {
      ids
    }
  })
}

// 单个对比详情，添加标记
const addComparedInfoMark = (params) => { // params
  return request({
    method: 'get',
    url: baseURL + `/fmc/ReceivablePresale/addComparedInfoMark`,
    params
  })
}

// 单个对比详情，添加标记
const deleteComparedInfoMark = (params) => { // params
  return request({
    method: 'get',
    url: baseURL + `/fmc/ReceivablePresale/deleteComparedInfoMark`,
    params
  })
}

// 查询单个对比详情，被标记过的sku
const findComparedInfoMarkList = (id) => { // params
  return request({
    method: 'post',
    url: baseURL + `/fmc/ReceivablePresale/findComparedInfoMarkList`,
    data: {
      id
    }
  })
}

export {
  uploadStatement,
  getBathCode,
  compareList,
  getShops,
  dataHandler,
  getDataHandlerList,
  getFilesForBath,
  zipDownload,
  ComparedModify,
  ComparedInfo,
  ComparedListMark,
  ComparedListMarkDelete,
  addComparedInfoMark,
  deleteComparedInfoMark,
  findComparedInfoMarkList
}
