import { login } from '@/api/user'
import md5 from 'md5'
const state = {}
const actions = {
  LOGINASYNC({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      }).then((res) => {
        console.log(res)
        resolve(res)
      }).catch((err) => reject(err))
    })
  }
}
const mutations = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
