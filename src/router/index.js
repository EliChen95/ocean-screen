import Vue from 'vue'
import VueRouter from 'vue-router'
import OceanScreen from '../views/ocean-screen/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: OceanScreen
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
