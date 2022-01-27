import { SELECT_COLOR, DEFAULT_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storeage'
const state = () => ({
  isCurrentColor: getItem(SELECT_COLOR) || DEFAULT_COLOR // 选中颜色或者默认颜色
})
const mutations = {
  SET_CURRENT_COLOR(state, newColor) {
    state.isCurrentColor = newColor
    // 存储缓存中
    setItem(SELECT_COLOR, newColor)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
