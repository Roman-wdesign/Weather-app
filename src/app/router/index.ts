import { createRouter, createWebHistory } from 'vue-router'
import { NowWeatherView } from '@/pages/main'
import { HourlyWeather } from '@/pages/hourly'
import { PageNotFound } from '@/pages/not-found'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NowWeatherView
    },
    {
      path: '/geolocation',
      name: 'geolocation',
      component: HourlyWeather
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})

export default router