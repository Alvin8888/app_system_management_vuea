import request from '@/utlis/request'

const baseURL = 'http://120.24.111.130:8020'

// 获取我的文档 和 文档库
const documentSelect = data => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentSelect`,
    data
  })
  return listPage
}

// 添加编辑图片提交给台
const documentAdd = (data, callbackl) => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentAdd`,
    data,
    onUploadProgress: (progressEvent) => {
      if (progressEvent.lengthComputable) {
        const val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0) // 百分比
        var percentage = parseInt(val)
        callbackl(percentage)
      }
    }
  })
  return listPage
}

// 查询文档详情
const documentSelectInfo = (doc_id) => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentSelectInfo`,
    data: {
      doc_id
    }
  })
  return listPage
}

// 数据筛选接口
const documentFilter = (type) => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentFilter`,
    data: {
      type
    }
  })
  return listPage
}

// 数据搜索接口
const documentSearch = data => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentSearch`,
    data
  })
  return listPage
}

// 下载查看接口
const documentDownload = (doc_id) => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentDownload`,
    data: {
      doc_id
    },
    responseType: 'blob'
  })
  return listPage
}

// 编辑修改接口
const documentEdit = data => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentEdit`,
    data
  })
  return listPage
}

// 图片数据删除接口
const documentsImgDel = data => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentImgDel`,
    data
  })
  return listPage
}

// 文档数据删除接口
const documentDel = data => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentDel`,
    data
  })
  return listPage
}

// 文档标题检测重复接口
const documentCheckTitle = data => {
  const listPage = request({
    method: 'post',
    url: baseURL + `/dmc/Document/documentCheckTitle`,
    data
  })
  return listPage
}

export {
  documentSelect,
  documentAdd,
  documentSelectInfo,
  documentFilter,
  documentSearch,
  documentDownload,
  documentEdit,
  documentsImgDel,
  documentDel,
  documentCheckTitle

}
