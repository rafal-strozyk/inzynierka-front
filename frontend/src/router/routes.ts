import type { RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
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
    path: "/:pathMatch(.*)*",
    component: () => import("@/layouts/ClearLayout.vue"),
    children: [
      {
        path: "",
        name: "NotFound",
        component: () => import("@/views/ErrorView.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
      },
    ],
  },
] satisfies RouteRecordRaw[];

export default routes;
