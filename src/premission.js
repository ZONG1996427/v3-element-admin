// 权限文件
import router from '@/router'
import store from '@/store'
// 设置白名单
const whileList = ['/login']
// 定义前置守卫
router.beforeEach((to, from, next) => {
  console.log(store.getters.token)
  // 1-有token，不允许访问login，去主页面或者随意访问
  if (store.getters.token) {
    // 用户已登录
    if (to.path === '/login') {
      next('/')
    } else {
      // 正常访问
      next()
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
