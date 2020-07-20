const DOC_SELECTZERO = 'doc_select_zero' // 文档数据查询 0
const DOC_SELECT_ONE = 'doc_select_one' // 文档数据查询 1
const USER_DATA = 'user_data' // 我的文档查询
const MY_EDIT = 'my_edit' // 我的文档列表编辑
const DMC_ONE = 'dmc_one' // 我的文档数据
const DMC_TOW = 'my_edit' // 我的库数据

// 我的文档数据
const getDmcOne = () => {
  return JSON.parse(sessionStorage.getItem(DMC_ONE))
}

const setDmcOne = role => {
  return sessionStorage.setItem(DMC_ONE, JSON.stringify(role))
}
// 我的库数据
const getDmcTow = () => {
  return JSON.parse(sessionStorage.getItem(DMC_TOW))
}

const setDmcTow = role => {
  return sessionStorage.setItem(DMC_TOW, JSON.stringify(role))
}

// 获取浏览器文档数据查询接口 0
const getDocumentSelectZero = () => {
  return JSON.parse(sessionStorage.getItem(DOC_SELECTZERO))
}
// 添加浏览器文档数据查询接口 0
const setDocumentSelectZero = role => {
  return sessionStorage.setItem(DOC_SELECTZERO, JSON.stringify(role))
}

// 获取浏览器文档数据查询接口 1
const getDocumentSelectOne = () => {
  return JSON.parse(sessionStorage.getItem(DOC_SELECT_ONE))
}
// 添加浏览器文档数据查询接口 1
const setDocumentSelectOne = role => {
  return sessionStorage.setItem(DOC_SELECT_ONE, JSON.stringify(role))
}

// 获取我的文档列表查看
const getUserData = () => {
  return JSON.parse(sessionStorage.getItem(USER_DATA))
}
// 添加我的文档列表查看
const setUserData = data => {
  return sessionStorage.setItem(USER_DATA, JSON.stringify(data))
}

// 获取我的文档列表编辑
const getMyEdit = () => {
  return JSON.parse(sessionStorage.getItem(MY_EDIT))
}
// 设置我的文档列表编辑
const setMyEdit = data => {
  return sessionStorage.setItem(MY_EDIT, JSON.stringify(data))
}

export {

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

}
