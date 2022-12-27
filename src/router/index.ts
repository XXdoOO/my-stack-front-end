import { createRouter, createWebHistory } from 'vue-router'

const index = () => import('@/views/index/index.vue')
const home = () => import('@/views/index/home/index.vue')
const details = () => import('@/views/index/details/index.vue')
const edit = () => import('@/views/index/edit/index.vue')
const search = () => import('@/views/index/search/index.vue')
const my = () => import('@/views/index/my/index.vue')
const user = () => import('@/views/index/user/index.vue')

const admin = () => import('@/views/admin/index.vue')
const adminHome = () => import('@/views/admin/home/index.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/index', redirect: '/' },
    {
      path: '/', component: index, children: [
        { path: '', component: home },
        { path: '/blog/:blogId', component: details },
        { path: '/edit', component: edit, meta: { authorized: 1 } },
        { path: '/search/:keywords', component: search, meta: { authorized: 0 } },
        { path: '/my', component: my, meta: { authorized: 1 } },
        { path: '/user/:userId', component: user, meta: { authorized: 1 } },
      ]
    },
    {
      path: '/admin', component: admin, meta: { authorized: 2 }, children: [
        { path: '/index', component: adminHome }
      ]
    },
  ]
})
export default router
