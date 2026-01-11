import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const websiteTitle = import.meta.env.VITE_BASE_TITLE;

router.beforeEach((to, from, next) => {
  // TODO remove
  return next();

  const loggedIn = sessionStorage.getItem("loggedIn");

  if (!loggedIn && to.name !== "Login") {
    document.title = "Login";
    return { name: "Login" };
  }
  if (loggedIn && to.name === "Login") {
    document.title = "Dashboard";
    return { name: "Dashboard" };
  }
  document.title = `${websiteTitle}${to.name ? ` - ${String(to.name)}` : ""}`;
});

export default router;
