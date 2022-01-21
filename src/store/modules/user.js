import { login, getUserInfo } from '@/api/user'
// import md5 from 'md5'
import { TOKEN } from '@/constant/index'
import { setItem, getItem, removeAllItem } from '@/utils/storeage'
import router from '@/router'
import { setTime } from '@/utils/auth'
const state = () => ({
  token: getItem(TOKEN) || '',
  userInfo: {}
})
const actions = {
  // 登录请求
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then((res) => {
        commit('SET_TOKEN', res.token)
        // 登陆时设置登录时间
        setTime()
        resolve()
        router.push('/')
      }).catch((err) => reject(err))
    })
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const res = await getUserInfo()
    commit('SET_USER_INFO', res)
    return res
  },
  // 退出
  logout({ commit }) {
    removeAllItem()
    commit('CLEAR_ALL_STATE')
    router.push('/login')
  }
}
const mutations = {
  // 设置token
  SET_TOKEN(state, token) {
    state.token = token
    setItem(TOKEN, token)
  },
  // 存储用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除所有state数据
  CLEAR_ALL_STATE(state) {
    state.token = ''
    state.userInfo = {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
