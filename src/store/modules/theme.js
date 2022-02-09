import { SELECT_COLOR, DEFAULT_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storeage'
import variables from '@/styles/variables.scss'

const state = () => ({
  variables: variables,
  isCurrentColor: getItem(SELECT_COLOR) || DEFAULT_COLOR // 选中颜色或者默认颜色
})
const mutations = {
  SET_CURRENT_COLOR(state, newColor) {
    state.isCurrentColor = newColor
    // 存储缓存中
    setItem(SELECT_COLOR, newColor)
    // 主动改变menuBg的值，让getters侦听到值的变化，响应页面
    state.variables.menuBg = newColor
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
