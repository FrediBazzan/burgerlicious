import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "Pedidos" */ '../views/Orders.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
