/**
 * 1-用接口返回的路由跟前端定义好的全部路由进行匹配
 * 2-过滤没有icon的路由，不显示在菜单
 */

/**
 * @param {Array} userRouter 后台返回的路由权限json
 * @param {Array} allRouter 前端配置好的路由权限数据
 * @return {Array} realRoutes 过滤之后的符合条件的路由
 */

const recursionRouter = (userRouter = [], allRouter = []) => {
  const realRoutes = []
  // 先forEach全部路由，再循环user路由
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      // 用接口返回的路由名称去匹配我们定义的title
      if (item.name === v.meta.title) {
        // 再去判断，如果包含children，进行递归
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children)
        }
        // 将处理好的当前这条数据push到一个新的数组
        realRoutes.push(v)
      }
    })
  })
  return realRoutes
}

// 再递归过滤没有icon的路由，不显示在菜单，其他这两个方法可以再进一步封装，不过这样分成两个容易维护些
const filterRoute = (routes) => {
  const showRoutes = []
  routes.forEach((item, index) => {
    if (item.meta.icon) {
      if (item.children && item.children.length > 0) {
        item.children = filterRoute(item.children)
      }
      showRoutes.push(item)
    }
  })
  return showRoutes
}
export {
  recursionRouter,
  filterRoute
}
