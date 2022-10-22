import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/password/forgot',
      name: 'passwordForgot',
      component: () => import('../views/auth/password/Forgot.vue'),
    },
    {
      path: '/album/:albumId',
      name: 'album',
      component: () => import('../views/album/Show.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: () => import('../views/subscription/Index.vue'),
    },
  ],
})

export default router
