import { LANG } from '@/constant'
import { getItem, setItem } from '@/utils/storeage'
const state = () => ({
  sidebarOpened: true,
  language: getItem(LANG) || 'zh'
})
const mutations = {
  triggerSidebarOpened(state) {
    state.sidebarOpened = !state.sidebarOpened
  },
  // 设置国际化
  setLanguage(state, lang) {
    // 存储local，防止页面刷新失效
    setItem(LANG, lang)
    state.language = lang
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
