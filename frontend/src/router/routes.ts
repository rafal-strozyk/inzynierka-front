import type { RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    meta: {
      protected: true,
    },
    redirect: { name: "Dashboard" },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/DashboardView.vue"),
      },
      {
        path: "properties",
        name: "Properties",
        component: () => import("@/views/PropertiesView.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/ClearLayout.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/ErrorView.vue"),
      },
    ],
  },
] satisfies RouteRecordRaw[];

export default routes;
