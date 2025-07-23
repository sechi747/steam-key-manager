import type { RouteRecordRaw } from 'vue-router'
import Home from '@renderer/modules/Home/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
]
export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
})
