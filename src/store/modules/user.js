import { login } from '@/api/user'
// import md5 from 'md5'
import { TOKEN } from '@/constant/index'
import { setItem, getItem } from '@/utils/storeage'
const state = () => ({
  token: getItem() || ''
})
const actions = {
  LOGINASYNC({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then((res) => {
        commit('SET_TOKEN', res.data.data.token)
        resolve(res)
      }).catch((err) => reject(err))
    })
  }
}
const mutations = {
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
