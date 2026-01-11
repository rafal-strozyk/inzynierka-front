import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import catchAxiosError from "@/helpers/catch-axios-error.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const websiteTitle = import.meta.env.VITE_BASE_TITLE;

router.beforeEach(async (to) => {
  document.title = `${websiteTitle}${to.name ? ` - ${String(to.name)}` : ""}`;
  const [, error] = await catchAxiosError(window.API.get("/me"));

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

  return true;
});

export default router;
