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

  document.title = `${websiteTitle}${to.name ? ` - ${String(to.name)}` : ""}`;
  const [response, error] = await catchAxiosError<{ user: UserData }>(window.API.get("/me"));

  if (!error) {
    userStore.setUser(response.data.user);
  }

  const isProtected = to.meta.protected;
  const isRouteLogin = to.name === "Login";
  const isAuthenticated = !error;

  if (isProtected && !isAuthenticated) {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    return { name: "Login" };
  }

  if (isRouteLogin && isAuthenticated) {
    return { name: "Dashboard" };
  }

  if (isAuthenticated && to.meta.roles) {
    const userRole = response?.data?.user.role;

    // admin can go everywhere
    if (userRole !== "admin") {
      const allowedRoles = to.meta.roles as string[];

      if (!allowedRoles.includes(userRole)) {
        return { name: "NotFound" };
      }
    }
  }

  return true;
});

export default router;
