const state = () => ({
  sidebarOpened: true
})
const mutations = {
  triggerSidebarOpened(state) {
    state.sidebarOpened = !state.sidebarOpened
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
