import { login } from '@/api/user'
// import md5 from 'md5'
import { TOKEN } from '@/constant/index'
import { setItem, getItem } from '@/utils/storeage'
const state = () => ({
  token: getItem(TOKEN) || ''
})
const actions = {
  LOGINASYNC({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then((res) => {
        console.log(res)
        commit('SET_TOKEN', res.token)
        resolve(res)
      }).catch((err) => reject(err))
    })
  }
}
const mutations = {
  // 设置token
  SET_TOKEN(state, token) {
    setItem(TOKEN, token)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
