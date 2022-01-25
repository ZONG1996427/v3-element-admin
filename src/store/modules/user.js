import { login, getUserInfo } from '@/api/user'
// import md5 from 'md5'
import { TOKEN, USERNAME } from '@/constant/index'
import { setItem, getItem, removeAllItem } from '@/utils/storeage'
import router, { commonRouters } from '@/router'
import { setTime } from '@/utils/auth'
import { recursionRouter } from '@/utils/recursion-router'
import { privateRoutes } from '@/router/dynamic-router'
const state = () => ({
  token: getItem(TOKEN) || '',
  userInfo: {},
  sidebarMenu: [], // 导航菜单list
  addRoutresList: [] // 动态添加的路由，用在退出用户时进行匹配，然后清除
})
const actions = {
  // 登录请求
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then((res) => {
        commit('SET_TOKEN', res.token)
        // 登陆时设置登录时间
        setTime()
        resolve()
        router.push('/')
      }).catch((err) => reject(err))
    })
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    // 获取用户账号
    const params = {
      username: getItem(USERNAME) || 'admin'
    }
    const res = await getUserInfo(params)
    const { permission: { menus } } = res
    // 获取res
    commit('SET_USER_INFO', res)
    // 调用方法进行路由匹配
    const routes = recursionRouter(menus, privateRoutes)
    // 将匹配的路由进行存储，用来退出用户时清除
    commit('ADD_ALL_ROUTERS_LIST', routes)
    // console.log(routes)
    // 设置默认路由，调用默认路由函数,找到我们需要添加路由的父组件，也就是layout，给他的children添加
    const MainContainer = commonRouters.find(v => v.path === '/')
    // console.log(MainContainer) // 返回根组件
    const children = MainContainer.children
    children.push(...routes)
    // console.log(children)
    // 生成菜单
    commit('SET_SIDEBAR_MENU', children)
    // 初始化路由
    // let initialRoutes = router.options.routes
    routes.forEach(item => {
      router.addRoute(item)
    })
    return res
  },
  // 退出
  logout({ commit }) {
    removeAllItem()
    // 退出时清除add的路由，vue3提供了removeRoute，vue2是没有的，vue2只能通过原生方法location.reload()来刷新页面重置
    // router.removeRoute
    // commit('CLEAR_ALL_ROUTERS')//暂时无效，后期再看看咋回事，还是先用reload() =,=
    commit('CLEAR_ALL_STATE')
    router.replace({ path: '/login' })
    window.location.reload()
  }
}
const mutations = {
  SET_INIT_ROUTERS(state, route) {
    state.initRoutersList = route
  },
  // 动态添加的路由
  ADD_ALL_ROUTERS_LIST(state, route) {
    console.log(route)
    state.addRoutresList = route
    console.log(state)
  },
  // 退出时清除当前用户路由
  CLEAR_ALL_ROUTERS(state) {
    state.addRoutresList.forEach(item => {
      router.removeRoute(item.name)
    })
  },
  // 设置siderbar菜单
  SET_SIDEBAR_MENU(state, routes) {
    state.sidebarMenu = routes
  },
  // 设置token
  SET_TOKEN(state, token) {
    state.token = token
    setItem(TOKEN, token)
  },
  // 存储用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除所有state数据
  CLEAR_ALL_STATE(state) {
    state.token = ''
    state.userInfo = {}
    state.addRoutresList = []
    state.sidebarMenu = []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
