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
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/other-hospital-info',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'other_hospital_info',
        component: () => import('@/views/other_hospital_info/index'),
        meta: { title: '其他医院信息', icon: 'table' }
      }
    ]
  }

]

export const asyncRoutes = [
  {
    path: '/account',
    name: 'user_management',
    component: Layout,
    children: [
      {
        path: 'management',
        name: 'account_management',
        component: () => import('@/views/user_management/account_management'),
        meta: { title: '医院信息管理', icon: 'table', roles: ['super_admin'] }
      }
    ]
  },
  {
    path: '/data_analyze',
    name: 'data_analyze',
    component: Layout,
    meta: { title: '数据分析', icon: 'table', roles: ['super_admin'] },
    children: [
      {
        path: '/count',
        name: 'count',
        component: () => import('@/views/data_analyze/data_count'),
        meta: { title: '数据统计', icon: 'table', roles: ['super_admin'] }
      },
      {
        path: '/compare',
        name: 'compare',
        component: () => import('@/views/data_analyze/data_compare'),
        meta: { title: '数据对比', icon: 'table', roles: ['super_admin'] }
      },
      {
        path: '/rank',
        name: 'rank',
        component: () => import('@/views/data_analyze/data_rank'),
        meta: { title: '数据排行', icon: 'table', roles: ['super_admin'] }
      }
    ]
  },
  {
    path: '/authority',
    name: 'authority',
    component: Layout,
    children: [
      {
        path: 'management',
        name: 'authority_management',
        component: () => import('@/views/user_management/authority_management'),
        meta: { title: '权限管理', icon: 'table', roles: ['super_admin', 'sub_center', 'center'] }
      }
    ]
  },
  {
    path: '/data',
    name: 'data_item_management',
    component: Layout,
    children: [
      {
        path: 'item',
        component: () => import('@/views/data_item_management/data_item_management'),
        meta: { title: '指标管理', icon: 'table', roles: ['super_admin'] }
      }
    ]
  },
  {
    path: '/center',
    name: 'center_management',
    component: Layout,
    children: [
      {
        path: 'management',
        component: () => import('@/views/center/index'),
        meta: { title: '中心管理', icon: 'table', roles: ['super_admin'] }
      }
    ]
  },
  // 跳转至指定网站
  {
    path: '/wjw',
    component: Layout,
    children: [
      {
        path: 'http://wjw.hunan.gov.cn/',
        meta: { title: '湖南省卫生健康委员会', icon: 'link' }
      }
    ]
  },
  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://xyane2.csu.edu.cn/',
        meta: { title: '湘雅麻醉与重症医学网', icon: 'link' }
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
