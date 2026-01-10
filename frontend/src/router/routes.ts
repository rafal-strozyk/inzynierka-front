import type { RouteRecordRaw } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    redirect: (_) => {
      return { path: '/login', name: 'Login' }
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/ClearLayout.vue'),
    children: [
      {
        path: '',
        name: 'NotFound',
        component: () => import('@/views/ErrorView.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
      },
    ],
  },
] satisfies RouteRecordRaw[]

export default routes
