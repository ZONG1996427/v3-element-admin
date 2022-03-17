/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-02-08 15:32:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-17 16:03:44
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
// 将layout抽出来，多个复用
import layout from '@/layout/index'
// import { privateRoutes } from './dynamic-router'
// 公共路由,登录，404/401
export const commonRouters = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          name: '控制台',
          handerSearchLabel: ['控制台'],
          affix: true // 不允许被tagview删除的属性
        }
      }
    ]
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401'),
    meta: {
      title: '401'// 这种不需要显示在菜单栏的页面，不需要icon
    }
  },
  {
    path: '/:catchAll(.*)', // vue3对404配置进行了修改,必须要使用正则匹配
    name: '404',
    component: () => import('@/views/error-page/404'),
    meta: {
      title: '404'
    }
  }

]

// 退出用户时清除当前用户路由
export const resetRouter = () => {
  if (
    store.getters.addRoutresList &&
    store.getters.addRoutresList.length
  ) {
    const menus = store.getters.addRoutresList
    menus.forEach(menu => {
      router.removeRoute(menu.name)
    })
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: commonRouters
})
export default router
