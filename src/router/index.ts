import { createRouter, createWebHistory } from 'vue-router'
import TodayView from '../shared/views/TodayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodayView
    },
   
  ]
})

export default router
