import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserData } from "@/types/user.ts";
import type { Router } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const data = ref<UserData>();

  function getUser() {
    return data;
  }

  function setUser(user: UserData) {
    data.value = user;
  }

  function clearUser() {
    data.value = undefined;
  }

  function logoutUser(router: Router): void {
    window.API.post("/logout").finally(() => {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      clearUser();
      void router.push({ name: "Login" });
    });
  }

  return { getUser, setUser, clearUser, logoutUser };
});
