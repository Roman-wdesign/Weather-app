import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'PageNotFound'

export const route: RouteRecordRaw = {
  name: routeName,
  path: '/:pathMatch(.*)*',
  component: () => import('@/pages/not-found')
}
