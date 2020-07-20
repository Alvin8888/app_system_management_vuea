import {
  getToken,
  setToken,
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

  removeToken,
  getPerIndex,
  setPerIndex
} from '@/utlis/auth'

import {
  login,
  userInfo,
  userLogout
} from '@/api/login'

const user = {
  state: {
    user: getUser(),
    token: getToken(),
    data: getLogin() || [],
    perData: getPerData() || [],
    asmData: getAsmData() || [],
    scmData: getScmData() || [],
    dmcData: getDcmData() || [],
    fmcData: getFmcData() || [],
    mmcData: getMmcData() || [],
    perIndex: getPerIndex() || -1,
    asmUrl: '',
    scmUrl: '',
    dmcUrl: '',
    fmcUrl: '',
    mmcUrl: ''

    // appMuenOne: getAppMuenNoe(),
    // appMuenTow: getAppMuenTow(),
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token

      // localStore(本地存储token)
      setToken(token)
    },
    SET_USER(state, user) {
      state.user = user
      setUser(user)
    },
    SET_DATA(state, data) {
      state.data = data
      setLogin(data)
    },
    PER_DATA(state, perData) {
      state.perData = perData
      setPerData(perData)
    },
    ASM_DATA(state, asmData) {
      state.asmData = asmData
      setAsmData(asmData)
    },
    SCM_DATA(state, scmData) {
      state.scmData = scmData
      setScmData(scmData)
    },
    DMC_DATA(state, dmcData) {
      state.dmcData = dmcData
      setDcmData(dmcData)
    },
    FMC_DATA(state, fmcData) {
      state.fmcData = fmcData
      setFmcData(fmcData)
    },
    MMC_DATA(state, mmcData) {
      state.mmcData = mmcData
      setMmcData(mmcData)
    },

    PER_INDEX(state, perIndex) {
      state.perIndex = perIndex
      setPerIndex(perIndex)
    },

    ASM_URL(state, asmUrl) {
      state.asmUrl = asmUrl
    },
    SCM_URL(state, scmUrl) {
      state.scmUrl = scmUrl
    },
    DMC_URL(state, dmcUrl) {
      state.dmcUrl = dmcUrl
    },
    FMC_URL(state, fmcUrl) {
      state.fmcUrl = fmcUrl
    },
    MMC_URL(state, fmcUrl) {
      state.mmcUrl = fmcUrl
    }
  },
  actions: {
    // 登录
    Login({
      commit
    }, form) {
      return new Promise((response, reject) => {
        // 自己封装一个promise
        login(form.user_email, form.user_password)
          .then(res => {
            const resp = res.data
            if (resp.code === 200) {
              commit('SET_TOKEN', resp.data.token)
              commit('SET_DATA', resp.data.user_app_list)
            }

            // 成功则去
            response(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 获取token 登录页面
    UserInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        userInfo().then(res => {
          const resp = res.data
          commit('SET_USER', resp.data)
          resolve(resp)
        })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 退出登录
    UserLogout({ commit, state }) {
      return new Promise((response, reject) => {
        userLogout()
          .then(res => {
            const resp = res.data
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
            removeToken()
            localStorage.clear()
            sessionStorage.clear()
            state.perIndex = -1
            response(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default user
