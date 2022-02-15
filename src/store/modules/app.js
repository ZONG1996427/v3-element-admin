import { LANG } from '@/constant'
import { getItem, setItem } from '@/utils/storeage'
const state = () => ({
  sidebarOpened: true,
  language: getItem(LANG) || 'zh'// 从缓存中取当前语言类型
})
const mutations = {
  TRIGGER_SIDEBAR_OPENED(state) {
    state.sidebarOpened = !state.sidebarOpened
  },
  // 设置国际化
  SET_LANGUAGE(state, lang) {
    // 存储local，防止页面刷新失效
    setItem(LANG, lang) // 设置当前语言类型
    state.language = lang
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
