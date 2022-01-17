import { createRouter, createWebHashHistory } from 'vue-router'

const commonRouters = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: commonRouters
})

export default router
