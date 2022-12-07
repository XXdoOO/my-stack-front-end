import { createRouter, createWebHashHistory } from 'vue-router'

const index = import('@/views/index/index.vue')
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: index },
    { path: '/index', redirect: '/' },
    {
      path: '/admin', component: index, children: [
        { path: '/index', component: index }
      ]
    },
  ]
})
export default router
