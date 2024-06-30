// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/students', component: Students },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
