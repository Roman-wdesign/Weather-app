import { createRouter, createWebHistory } from 'vue-router'
import NowWeather from '@/shared/views/NowWeatherView.vue'
import HourlyWeather from '@/shared/views/HourlyWeather.vue'
import PageNotFound from '@/shared/views/PageNotFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NowWeather
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