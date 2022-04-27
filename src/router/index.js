import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/indexFirst',
    hidden: false,
    children: [{
      path: '/indexFirst',
      name: 'IndexFirst',
      meta: { title: '全局监测' },
      component: () => import('@/views/indexVue/indexFirst'),
    }, {
      path: '/indexFourth',
      name: 'IndexFourth',
      meta: { title: '实时数据' },
      component: () => import('@/views/indexVue/indexFourth'),
    }, {
      path: '/indexSecond',
      name: 'IndexSecond',
      component: () => import('@/views/indexVue/indexSecond'),
      meta: { title: '预测预警' },
    }, {
      path: '/indexThird',
      name: 'IndexThird',
      meta: { title: '事件查询' },
      component: () => import('@/views/indexVue/IndexThird'),
    }, {
      path: '/indexSixth',
      meta: { title: '工单管理' },
      name: 'IndexSixth',
      component: () => import('@/views/indexVue/indexSixth'),
    }, {
      path: '/indexFifth',
      meta: { title: '历史数据' },
      name: 'IndexFifth',
      component: () => import('@/views/indexVue/indexFifth'),
    }, {
      meta: { title: '设备管理' },
      component: () => import('@/views/indexVue/indexEighti'),
      path: '/indexEighti',
      children: [{
        path: '/indexEighti/indexNine',
        name: 'indexNine',
        component: () => import('@/views/indexVue/indexNine'),
        meta: { title: '启停对比' },
      }, {
        path: '/indexEighti/indexEight',
        meta: { title: '设备列表' },
        name: 'indexEight',
        component: () => import('@/views/indexVue/indexEight'),
      }]
    }, {
      meta: { title: '更多' },
      path: '/indexSeveni', 
      component: () => import('@/views/indexVue/indexSeveni'),
      children: [
        {
          meta: { title: '能效管理' },
          path: '/indexSeveni/indexSeventh',
          name: 'IndexSeventh',
          component: () => import('@/views/indexVue/indexFirst'),
        },
        {
          path: '/indexSeveni/indexSeven',
          meta: { title: '阈值配置' },
          name: 'indexSeven',
          component: () => import('@/views/indexVue/indexSeven'),
        },
      ]
    }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
