import variables from '@/styles/variables.scss'// 注意引入scss文件时，要写全文件后辍
// 相当于vuex的计算属性，将所有模块的state进行集合，方便页面调用
const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  menuList: state => state.user.sidebarMenu,
  cssVar: state => variables,
  sidebarOpened: state => state.app.sidebarOpened
}

export default getters
