/*
 * @Descripttion: msg
 * @version: 1.0
 * @Author: 宗
 * @Date: 2022-02-08 15:32:38
 * @LastEditors: 宗
 * @LastEditTime: 2022-02-18 11:27:14
 */
import { createRouter, createWebHashHistory } from 'vue-router'
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
    redirect: '/profile', // 重定向到指定页面，不能一进来是空的页面，个人中心
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user',
          name: '用户中心',
          handerSearchLabel: ['用户中心'],
          affix: true
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
    path: '/:catchAll(.*)', // 一定要放在最下面,vue3对404配置进行了修改,必须要使用正则匹配
    name: '404',
    component: () => import('@/views/error-page/404'),
    meta: {
      title: '404'
    }
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  // routes: [...privateRoutes, ...commonRouters]
  routes: commonRouters
})
export default router
