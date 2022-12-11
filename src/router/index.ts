import { createRouter, createWebHashHistory } from 'vue-router'

const index = import('@/views/index/index.vue')
const home = import('@/views/index/home/index.vue')
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/index', redirect: '/' },
    {
      path: '/', component: index, children: [
        { path: '', component: home }
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
