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
        meta: {
          roles: ["admin", "owner"],
        },
      },
      {
        path: "property/add",
        name: "AddProperty",
        component: () => import("@/views/PropertyFormView.vue"),
        props: {
          mode: "add",
        },
        meta: {
          roles: ["admin", "owner"],
        },
      },
      {
        path: "property/:propertyId",
        name: "Property",
        component: () => import("@/views/PropertyView.vue"),
        meta: {
          roles: ["admin", "owner"],
        },
      },
      {
        path: "property/:propertyId/edit",
        name: "EditProperty",
        component: () => import("@/views/PropertyFormView.vue"),
        props: {
          mode: "edit",
        },
        meta: {
          roles: ["admin", "owner"],
        },
      },
      {
        path: "my-data",
        name: "MyData",
        component: () => import("@/views/MyDataView.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () => import("@/views/UsersView.vue"),
        meta: {
          roles: ["admin"],
        },
      },
      {
        path: "tenants",
        name: "Tenants",
        component: () => import("@/views/TenantsView.vue"),
        meta: {
          roles: ["owner"],
        },
      },
      {
        path: "user/:userId",
        name: "User",
        component: () => import("@/views/UserView.vue"),
        meta: {
          roles: ["admin"],
        },
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
        path: "forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/ForgotPasswordView.vue"),
      },
      {
        path: "reset-password",
        name: "ResetPassword",
        component: () => import("@/views/ResetPasswordView.vue"),
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
