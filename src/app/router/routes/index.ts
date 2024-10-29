import type { RouteRecordRaw } from 'vue-router'

import { route as mainRoute } from './main'
import { route as hourlyRoute } from './hourly'
import { route as notFoundRoute } from './not-found'

export const routes: readonly RouteRecordRaw[] = [mainRoute, hourlyRoute, notFoundRoute] as const
