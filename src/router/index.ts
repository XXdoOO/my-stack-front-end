import { createRouter, createWebHistory } from 'vue-router'
import LoginRegister from '@/components/login'

const index = () => import('@/views/index/index.vue')
const home = () => import('@/views/index/home/index.vue')
const details = () => import('@/views/index/details/index.vue')
const edit = () => import('@/views/index/edit/index.vue')
const search = () => import('@/views/index/search/index.vue')
const my = () => import('@/views/index/my/index.vue')
const user = () => import('@/views/index/user/index.vue')

const admin = () => import('@/views/admin/index.vue')
const adminHome = () => import('@/views/admin/home/index.vue')

import adminBlog from '@/views/admin/blog/index.vue'
import adminUser from '@/views/admin/user/index.vue'
// const adminBlog = () => import('@/views/admin/blog/index.vue')
// const adminUser = () => import('@/views/admin/user/index.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/index', redirect: '/' },
    {
      path: '/', component: index, children: [
        { path: '', component: home },
        { path: '/blog/:blogId', component: details },
        { path: '/edit', component: edit, meta: { authorized: 1 } },
        { path: '/edit/:blogId', component: edit, meta: { authorized: 1 } },
        { path: '/search/:keywords', component: search, meta: { authorized: 0 } },
        { path: '/my', component: my, meta: { authorized: 1 } },
        { path: '/my/pass', component: my, meta: { authorized: 1 } },
        { path: '/my/noPass', component: my, meta: { authorized: 1 } },
        { path: '/my/auditing', component: my, meta: { authorized: 1 } },
        { path: '/my/up', component: my, meta: { authorized: 1 } },
        { path: '/my/down', component: my, meta: { authorized: 1 } },
        { path: '/my/star', component: my, meta: { authorized: 1 } },
        { path: '/my/history', component: my, meta: { authorized: 1 } },
        { path: '/user/:userId', component: user, meta: { authorized: 0 } },
      ]
    },
    {
      path: '/admin', component: admin, meta: { authorized: 2 }, children: [
        { path: '', component: adminHome },
        { path: 'blog', component: adminBlog },
        { path: 'user', component: adminUser },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.authorized == 1) {
    const userInfo = sessionStorage.getItem("userInfo")

    if (userInfo && userInfo != 'undefined') {
      next()
    } else {
      LoginRegister()
    }
  } else if (to.meta.authorized == 2) {
    const userInfo = sessionStorage.getItem("userInfo")

    if (userInfo && userInfo != 'undefined' && JSON.parse(userInfo).admin) {
      next()
    } else {
      LoginRegister()
    }
  } else {
    next()
  }

})
export default router
