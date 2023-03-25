import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Maps from '../components/Maps.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/maps',
    name: 'Maps',
    component: Maps
  },

  {
    path: '/about/:Pid',
    name: 'about',
   component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
