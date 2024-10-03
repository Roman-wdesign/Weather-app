import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from '@/app/router'
import '@/index.css';

export const application = createApp(App).use(router).use(createPinia)