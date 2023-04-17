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
import adminComment from '@/views/admin/comment/index.vue'
import adminDict from '@/views/admin/dict/index.vue'
import { store } from '@/stores/index'
import pinia from '@/stores/pinia'
import { storeToRefs } from 'pinia'

const $store = store(pinia)
const { userInfo } = storeToRefs($store)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/index', redirect: '/' },
    {
      path: '/', component: index, children: [
        { path: '', component: home },
        { path: '/blog/:blogId', component: details },
        { path: '/edit', component: edit, meta: { authorized: 0 } },
        { path: '/edit/:blogId', component: edit, meta: { authorized: 0 } },
        { path: '/search/:keywords', component: search },
        { path: '/search/', redirect: '/' },
        { path: '/my', component: my, meta: { authorized: 0 } },
        { path: '/my/pass', component: my, meta: { authorized: 0 } },
        { path: '/my/noPass', component: my, meta: { authorized: 0 } },
        { path: '/my/auditing', component: my, meta: { authorized: 0 } },
        { path: '/my/up', component: my, meta: { authorized: 0 } },
        { path: '/my/down', component: my, meta: { authorized: 0 } },
        { path: '/my/star', component: my, meta: { authorized: 0 } },
        { path: '/my/history', component: my, meta: { authorized: 0 } },
        { path: '/user/:userId', component: user },
        { path: '/user/:userId/up', component: user },
        { path: '/user/:userId/down', component: user },
      ]
    },
    {
      path: '/admin', component: admin, meta: { authorized: 1 }, children: [
        { path: '', component: adminHome },
        { path: 'blog', component: adminBlog },
        { path: 'user', component: adminUser },
        { path: 'comment', component: adminComment },
        { path: 'dict', component: adminDict },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authorized = to.meta.authorized

  $store.setUserInfo().then(() => {
    if (authorized == 0 && !userInfo.value || authorized == 1 && !userInfo.value.admin) {
      LoginRegister()
    } else {
      next()
    }
  })
})
export default router
