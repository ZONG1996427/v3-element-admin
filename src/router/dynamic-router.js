import layout from '@/layout/index'
// 动态路由
const privateRoutes = [
  {
    path: '/user',
    component: layout,
    redirect: '/user/manage',
    name: 'user',
    meta: {
      title: 'user',
      icon: 'personnel',
      name: '用户管理'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage',
          name: '用户列表',
          handerSearchLabel: ['用户管理', '用户列表']
        }
      },
      {
        path: '/user/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role',
          name: '角色列表',
          handerSearchLabel: ['用户管理', '角色列表']
        }
      },
      {
        path: '/user/permission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
          name: '权限列表',
          handerSearchLabel: ['用户管理', '权限列表']
        }
      },
      {
        path: '/user/info',
        name: 'userInfo',
        component: () => import('@/views/user-info/index'),
        meta: {
          title: 'userInfo',
          name: '用户详情'
        }
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport',
          name: '导入'
        }
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    name: 'article',
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article',
      name: '文章管理'
    },
    children: [
      {
        path: '/article/ranking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking',
          name: '文章排名',
          handerSearchLabel: ['文章管理', '文章排名']
        }
      },
      {
        path: '/article/detail',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail',
          name: '文章详情'
        }
      },
      {
        path: '/article/create',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create',
          name: '创建文章',
          handerSearchLabel: ['文章管理', '创建文章']
        }
      },
      {
        path: '/article/editor',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleEditor',
          name: '编辑文章'
        }
      }
    ]
  },
  {
    path: '/superView',
    component: layout,
    name: 'superView',
    redirect: '/superView/test',
    meta: {
      title: 'superView',
      icon: 'el-icon-star-off',
      name: '超级管理'
    },
    children: [
      {
        path: '/superView/test',
        component: () => import('@/views/super-view/test'),
        name: 'test',
        meta: {
          title: 'test',
          icon: 'el-icon-s-platform',
          name: 'super测试页',
          handerSearchLabel: ['超级管理', 'super测试页']
        }
      },
      {
        path: '/superView/order',
        component: () => import('@/views/super-view/order-manage/orderList'),
        name: 'orderManage',
        redirect: '/superView/order/list',
        meta: {
          title: 'orderManage',
          icon: 'el-icon-s-order',
          name: '商品管理'
        },
        children: [
          {
            path: '/superView/order/list',
            component: () => import('@/views/super-view/order-manage/orderList'),
            name: 'orderList',
            meta: {
              title: 'orderList',
              icon: 'el-icon-s-cooperation',
              name: '商品列表',
              handerSearchLabel: ['超级管理', '商品管理', '商品列表']
            }
          }
        ]
      }
    ]
  },
  {
    path: '/test1',
    component: layout,
    redirect: '/test1/manage',
    name: 'test1',
    meta: {
      title: 'test1',
      icon: 'personnel',
      name: '测试管理1'
    },
    children: [
      {
        path: '/test1/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage',
          name: '测试列表',
          handerSearchLabel: ['测试管理1', '测试列表']
        }
      },
      {
        path: '/test1/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role',
          name: '角色列表',
          handerSearchLabel: ['测试管理1', '角色列表']
        }
      },
      {
        path: '/test1/permission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
          name: '权限列表',
          handerSearchLabel: ['测试管理1', '权限列表']
        }
      }
    ]
  },
  {
    path: '/test2',
    component: layout,
    name: 'test2',
    redirect: '/test2/ranking',
    meta: {
      title: 'test2',
      icon: 'article',
      name: '测试管理2'
    },
    children: [
      {
        path: '/test2/ranking',
        component: () => import('@/views/article-ranking/index'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking',
          name: '文章排名',
          handerSearchLabel: ['文章管理', '文章排名']
        }
      },
      {
        path: '/test2/detail',
        component: () => import('@/views/article-detail/index'),
        meta: {
          title: 'articleDetail',
          name: '文章详情'
        }
      },
      {
        path: '/test2/create',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create',
          name: '创建文章',
          handerSearchLabel: ['文章管理', '创建文章']
        }
      }
    ]
  },
  {
    path: '/test3',
    component: layout,
    redirect: '/test3/manage',
    name: 'test3',
    meta: {
      title: 'test3',
      icon: 'personnel',
      name: '测试管理3'
    },
    children: [
      {
        path: '/test3/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage',
          name: '测试列表',
          handerSearchLabel: ['测试管理1', '测试列表']
        }
      },
      {
        path: '/test3/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role',
          name: '角色列表',
          handerSearchLabel: ['测试管理1', '角色列表']
        }
      },
      {
        path: '/test3/permission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
          name: '权限列表',
          handerSearchLabel: ['测试管理1', '权限列表']
        }
      }
    ]
  },
  {
    path: '/test4',
    component: layout,
    redirect: '/test4/manage',
    name: 'test4',
    meta: {
      title: 'test4',
      icon: 'personnel',
      name: '测试管理4'
    },
    children: [
      {
        path: '/test4/manage',
        component: () => import('@/views/user-manage/index'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage',
          name: '测试列表',
          handerSearchLabel: ['测试管理1', '测试列表']
        }
      },
      {
        path: '/test4/role',
        component: () => import('@/views/role-list/index'),
        meta: {
          title: 'roleList',
          icon: 'role',
          name: '角色列表',
          handerSearchLabel: ['测试管理1', '角色列表']
        }
      },
      {
        path: '/test4/permission',
        component: () => import('@/views/permission-list/index'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
          name: '权限列表',
          handerSearchLabel: ['测试管理1', '权限列表']
        }
      }
    ]
  }
]
export {
  privateRoutes
}
