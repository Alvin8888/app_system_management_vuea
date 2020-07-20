const USER_KEY = 'user_info_login'
const TOKEN_KEY = 'user_info_token'
const LOGIN_DATA_KEY = 'login_data_key'
const PER_DATA_KEY = 'per_data_key' // 权限数据保存到本地
const PRE_ASM_DATA = 'pre_asm_data' // 权限数据dmc保存到本地
const PRE_SCM_DATA = 'pre_scm_data' // 权限数据asm保存到本地
const PRE_DMC_DATA = 'pre_dmc_data' // 权限数据scm保存到本地
const PRE_FMC_DATA = 'pre_fmc_data' // 权限数据fcm保存到本地
const PRE_MMC_DATA = 'pre_mmc_data' // 权限数据fcm保存到本地

const PER_INDEX = 'per_index' // 默认值
const APP_MUENONE_KEY = 'app_muenone_key' // 账号管理中的值
const APP_MUENTOW_kEY = 'app_muentow_key' // 用户管理中的值

const USER_LISET = 'user_list' // 角色列表
const DEPA_LISET = 'depa_list' // 部门列表

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}
const setToken = token => {
  return localStorage.setItem(TOKEN_KEY, token)
}

const getLogin = () => {
  return JSON.parse(localStorage.getItem(LOGIN_DATA_KEY))
}
const setLogin = data => {
  return localStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(data))
}

const getPerData = () => {
  return JSON.parse(localStorage.getItem(PER_DATA_KEY))
}

const setPerData = data => {
  return localStorage.setItem(PER_DATA_KEY, JSON.stringify(data))
}

// 权限数据asm保存到本地
const getAsmData = () => {
  return JSON.parse(localStorage.getItem(PRE_ASM_DATA))
}
const setAsmData = data => {
  return localStorage.setItem(PRE_ASM_DATA, JSON.stringify(data))
}
// 权限数据scm保存到本地
const getScmData = () => {
  return JSON.parse(localStorage.getItem(PRE_SCM_DATA))
}
const setScmData = data => {
  return localStorage.setItem(PRE_SCM_DATA, JSON.stringify(data))
}
// 权限数据dmc保存到本地
const getDcmData = () => {
  return JSON.parse(localStorage.getItem(PRE_DMC_DATA))
}
const setDcmData = data => {
  return localStorage.setItem(PRE_DMC_DATA, JSON.stringify(data))
}
// 权限数据fmc保存到本地
const getFmcData = () => {
  return JSON.parse(localStorage.getItem(PRE_FMC_DATA))
}
const setFmcData = data => {
  return localStorage.setItem(PRE_FMC_DATA, JSON.stringify(data))
}
// 权限数据mmc保存到本地
const getMmcData = () => {
  return JSON.parse(localStorage.getItem(PRE_MMC_DATA))
}
const setMmcData = data => {
  return localStorage.setItem(PRE_MMC_DATA, JSON.stringify(data))
}

const getPerIndex = () => {
  return JSON.parse(localStorage.getItem(PER_INDEX))
}
const setPerIndex = data => {
  return localStorage.setItem(PER_INDEX, JSON.stringify(data))
}

const getAppMuenNoe = () => {
  return JSON.parse(localStorage.getItem(APP_MUENONE_KEY))
}
const setAppMuenNoe = data => {
  return localStorage.setItem(APP_MUENONE_KEY, JSON.stringify(data))
}

const getAppMuenTow = () => {
  return JSON.parse(localStorage.getItem(APP_MUENTOW_kEY))
}
const setAppMuenTow = data => {
  return localStorage.setItem(APP_MUENTOW_kEY, JSON.stringify(data))
}

const getUser = () => {
  return JSON.parse(localStorage.getItem(USER_KEY))
}
const setUser = user => {
  return localStorage.setItem(USER_KEY, JSON.stringify(user))
}

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// 角色列表在浏览器
const getRoleLists = () => {
  return JSON.parse(sessionStorage.getItem(USER_LISET))
}
// 添加角色列表在浏览器中
const setRoleLists = role => {
  return sessionStorage.setItem(USER_LISET, JSON.stringify(role))
}

// 角色列表在浏览器
const getDepaList = () => {
  return JSON.parse(sessionStorage.getItem(DEPA_LISET))
}
// 角色列表在浏览器中
const setDepaList = depa => {
  return sessionStorage.setItem(DEPA_LISET, JSON.stringify(depa))
}

export {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  getLogin,
  setLogin,
  getPerData,
  setPerData,
  getAsmData,
  setAsmData,
  getScmData,
  setScmData,
  getDcmData,
  setDcmData,
  getFmcData,
  setFmcData,
  getMmcData,
  setMmcData,

  getPerIndex,
  setPerIndex,
  getAppMuenNoe,
  setAppMuenNoe,
  getAppMuenTow,
  setAppMuenTow,

  getRoleLists,
  setRoleLists,
  getDepaList,
  setDepaList

}
