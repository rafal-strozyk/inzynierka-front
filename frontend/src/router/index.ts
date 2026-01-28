import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import type { UserData } from "@/types/user.ts";
import { useUserStore } from "@/stores/user.ts";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const websiteTitle = import.meta.env.VITE_BASE_TITLE;

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const user = userStore.getUser(); // existing user in store

  document.title = `${websiteTitle}${to.name ? ` - ${String(to.name)}` : ""}`;

  const isProtected = to.meta.protected;
  const isRouteLogin = to.name === "Login";
  const needsUserFetch = (isProtected || to.meta.roles) && !user.value;

  // conditionally fetch /me if necessary
  const [response] = needsUserFetch
    ? await catchAxiosError<{ user: UserData }>(window.API.get("/me"))
    : [undefined, undefined];

  if (response) {
    userStore.setUser(response.data.user);
  }

  const currentUser = user.value || response?.data?.user;
  const isAuthenticated = !!currentUser;

  // redirect to login if route is protected and not authenticated
  if (isProtected && !isAuthenticated) {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    return { name: "Login" };
  }

  // redirect to dashboard if already authenticated and visiting login page
  if (isRouteLogin && isAuthenticated) {
    return { name: "Dashboard" };
  }

  // role-based access
  if (isAuthenticated && to.meta.roles) {
    const userRole = currentUser?.role;

    // admin can go everywhere
    if (userRole !== "admin") {
      const allowedRoles = to.meta.roles as string[];
      if (!userRole || !allowedRoles.includes(userRole)) {
        return { name: "NotFound" };
      }
    }
  }

  return true;
});

export default router;
