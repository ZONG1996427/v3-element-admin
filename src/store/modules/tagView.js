/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-02-11 14:09:20
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-21 14:22:39
 */
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
  },
  // 删除全部,不删除个人中心，此业务根据个人需要改就行
  DELETE_ALL_TAG(state) {
    state.tagViewList.splice(1, state.tagViewList.length - 1)
    setItem(TAG_VIEW, state.tagViewList)
  },
  // 关闭其他，只保留当前跟不可删除页面
  DELETE_OTHER_TAG(state, item) {
    state.tagViewList = state.tagViewList.filter(x => {
      return x.meta.affix || x.path === item.path
    })
    setItem(TAG_VIEW, state.tagViewList)
  },
  CLEAR_TAG_DATA(state) {
    state.tagViewList = []
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
