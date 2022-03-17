import { login, getUserInfo } from '@/api/login'
import { TOKEN, USERNAME } from '@/constant/index'
import { setItem, getItem, removeAllItem } from '@/utils/storeage'
import router, { commonRouters, resetRouter } from '@/router'
import { setTime } from '@/utils/auth'
import { recursionRouter, filterRoute } from '@/utils/recursion-router'
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
    commit('SET_USER_INFO', res)
    // 调用方法进行路由匹配
    const routes = recursionRouter(menus, privateRoutes)
    // 将匹配的路由进行存储，用来退出用户时清除
    commit('ADD_ALL_ROUTERS_LIST', routes)
    const children = commonRouters.find(v => v.path === '/').children
    // children.push(...routes) // 可以用这种直接添加到/的子组件方法，但是在退出切换用户时，会处理起来很麻烦,建议不使用
    // 过滤不需要显示在菜单中的路由，例如新增，详情，编辑等页面
    const filterShowRouters = filterRoute(JSON.parse(JSON.stringify([...children, ...routes])))
    // 生成菜单
    commit('SET_SIDEBAR_MENU', filterShowRouters)
    // 初始化路由
    routes.forEach(item => {
      router.addRoute(item)
    })
    return res
  },
  // 退出
  logout({ commit }) {
    resetRouter()
    removeAllItem()
    // 退出时清除add的路由，vue3提供了removeRoute，vue2是没有的，只能通过router.matcher=router.matcher来重置或者页面刷新
    /**
     * 有如下几种方法方案来重置路由
     * 1：退出时 调用原生api window.location.reload() 会出现退到登陆页时，刷新一次页面，体验不太好
     * 2：登录时 调用window.location.reload('/')，跳转到首页，这样自然一些，只是页面刷新了
     * 3：使用v3方法 removeRoute(路由名称||symbol)
     */
    commit('CLEAR_ALL_STATE') // 一定要清除token，否则会一直请求，一直走这个退出
    router.replace({ path: '/login' })
  }
}
const mutations = {
  // 动态添加的路由
  ADD_ALL_ROUTERS_LIST(state, route) {
    state.addRoutresList = route
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
