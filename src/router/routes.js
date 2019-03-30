import demo from './modules/demo'

import layoutHeaderAside from '@/layout/header-aside'

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页 必须 name:index
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: () => import('@/pages/index')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(from.fullPath))
          },
          render: h => h()
        }
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
          beforeRouteEnter (to, from, next) {
            next(vm => vm.$router.replace(JSON.parse(from.params.route)))
          },
          render: h => h()
        }
      },
      // {
      //   path: '/page-demo',
      //   name: 'page-demo',
      //   component: () => import('@/pages/page-demo'),
      //   meta: {
      //     auth: true,
      //     title: '新建示例'
      //   }
      // },
      // 创建文章
      {
        path: '/article',
        name: 'article',
        component: () => import('@/pages/article'),
        meta: {
          auth: true,
          title: '创建文章'
        }
      },
      // 创建分类
      {
        path: '/category',
        name: 'category',
        component: () => import('@/pages/category'),
        meta: {
          auth: true,
          title: '创建分类'
        }
      },
      // 创建标签
      {
        path: '/tag',
        name: 'tag',
        component: () => import('@/pages/tag'),
        meta: {
          auth: true,
          title: '创建标签'
        }
      },
    ]
  },
  demo
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
