import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'home'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/',
  component: () => import('@/pages/main')
}
