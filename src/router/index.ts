import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`
  next()
})

export default router
