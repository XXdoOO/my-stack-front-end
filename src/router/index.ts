import { createRouter, createWebHistory } from 'vue-router'

const index = import('@/views/index/index.vue')
const home = import('@/views/index/home/index.vue')
const details = import('@/views/index/details/index.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/index', redirect: '/' },
    {
      path: '/', component: index, children: [
        { path: '', component: home },
        { path: '/blog/:blogId', component: details },
      ]
    },
    {
      path: '/admin', component: index, children: [
        { path: '/index', component: index }
      ]
    },
  ]
})
export default router
