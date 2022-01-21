import { createRouter, createWebHashHistory } from 'vue-router'

const commonRouters = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/layout/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: commonRouters
})

export default router
