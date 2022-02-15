import { TAG_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storeage'
const state = () => ({
  tagViewList: getItem(TAG_VIEW) || [], // tag缓存标签
  currentRoute: ''// 选中的路由
})
const mutations = {
  // 添加标签
  ADD_TAG_VIEW_LIST(state, tag) {
    // 记录当前点击的路由
    state.currentRoute = tag.fullPath
    // 判断重复
    const route = state.tagViewList.find(x => {
      return x.path === tag.path
    })
    // 不存在则代表不重复，添加进去
    if (!route) {
      state.tagViewList.push(tag)
      // 本地储存
      setItem(TAG_VIEW, state.tagViewList)
    }
  },
  // 删除标签
  DELETE_TAG_VIEW(state, index) {
    state.tagViewList.splice(index, 1)
    setItem(TAG_VIEW, state.tagViewList)
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
