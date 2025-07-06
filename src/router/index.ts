import { createRouter, createWebHistory } from 'vue-router'
import AccountList from '@/views/AccountList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AccountList
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
