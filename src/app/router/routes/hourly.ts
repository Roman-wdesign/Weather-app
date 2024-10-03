import type { RouteRecordRaw } from 'vue-router'

export const routeName = 'geolocation'

export const route: RouteRecordRaw = {
    name: routeName,
    path: '/geolocation',
    component: () => import('@/pages/hourly')
}