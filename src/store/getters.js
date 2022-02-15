// import variables from '@/styles/variables.scss'// 注意引入scss文件时，要写全文件后辍，
// 后期会把这个引入到theme中，完成换肤功能
// 相当于vuex的计算属性，将所有模块的state进行集合，方便页面调用
import { SELECT_COLOR } from '@/constant'
import { getItem } from '@/utils/storeage'
import { generateColors } from '@/utils/theme'

const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  menuList: state => state.user.sidebarMenu,
  cssVar: state => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(SELECT_COLOR))
    }
  },
  sidebarOpened: state => state.app.sidebarOpened,
  language: state => state.app.language,
  isCurrentColor: state => state.theme.isCurrentColor,
  tagViewList: state => state.tagView.tagViewList,
  currentRoute: state => state.tagView.currentRoute
}

export default getters
