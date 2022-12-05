import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('@/views/index/index.vue') },
    {
      path: '/admin', component: () => import('@/views/admin/home/index.vue'), children: [
        { path: '/index', component: () => import('@/views/admin/home/index.vue') }
      ]
    },
  ]
})
export default router
