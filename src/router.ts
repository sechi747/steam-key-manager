import type { RouteRecordRaw } from 'vue-router'
import Home from '@/modules/Home/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
]
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
