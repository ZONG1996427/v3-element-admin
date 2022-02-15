// 权限文件
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // nprogress插件

// 设置白名单
const whileList = ['/login']
// 定义前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 1-有token，不允许访问login，去主页面或者随意访问
  if (store.getters.token) {
    // 用户已登录
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断是否存在用户信息,如果不存在,则调接口获取,就是为了页面刷新立刻获取
      if (!Object.keys(store.getters.userInfo).length) {
        await store.dispatch('user/getUserInfo')
        next({
          path: to.path
        })
      } else {
        next()
      }
    }
  } else {
    // 2-没有token的情况下，可以进入白名单
    if (whileList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})
