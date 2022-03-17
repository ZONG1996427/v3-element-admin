const state = () => ({
  isFixedHeader: false
})
const mutations = {
  SET_HEADERS_FIX(state, val) {
    state.isFixedHeader = val
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
