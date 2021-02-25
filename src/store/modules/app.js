import { setToken } from '@/utils/auth'

const state = {
  userName: '',
  token:''
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_TOKEN(state, tn) {
    state.token = tn
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  // 设置token
  setToken({ commit }, tn) {
    setToken(tn)
    commit('SET_TOKEN', tn)
  },
  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      //commit('SET_TOKEN', '')
      resolve()
    })
  }
}
export default {
  state,
  mutations,
  actions
}
