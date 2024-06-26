import { createRouter, createWebHistory } from 'vue-router'
import NowWeather from '../shared/views/NowWeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NowWeather
    },
   
  ]
})

export default router
