import { createRouter, createWebHashHistory } from 'vue-router'

const index = import('@/views/index/index.vue')
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', components: { default: index } },
    { path: '/index', component: index },
    {
      path: '/admin', component: index, children: [
        { path: '/index', component: index }
      ]
    },
  ]
})
export default router
