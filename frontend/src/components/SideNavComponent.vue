<template>
  <button
    @click.prevent="open = !open"
    aria-controls="drawer-navigation"
    class="p-2 -ml-2 -mt-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    <svg
      aria-hidden="true"
      class="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <svg
      aria-hidden="true"
      class="hidden w-6 h-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      ></path>
    </svg>
    <span class="sr-only">Toggle sidebar</span>
  </button>

  <aside
    class="fixed top-0 left-0 z-40 w-64 h-dvh pt-0 transition-transform bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    :class="{ '-translate-x-full': !open }"
    aria-label="Sidenav"
    id="drawer-navigation"
  >
    <div class="overflow-y-auto py-4 px-2 h-full bg-white dark:bg-gray-800">
      <ul class="space-y-2">
        <li v-for="(item, key) in navigationItems" :key>
          <router-link
            @click.prevent="open = false"
            :to="item.path"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white group"
          >
            <inline-svg :src="item.icon" />
            <span class="ml-3">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
      <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
        <li v-for="(item, key) in navigationSublist" :key>
          <router-link
            @click.prevent="open = false"
            :to="item.path"
            class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white group"
          >
            <inline-svg :src="item.icon" />
            <span class="ml-3">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="absolute bottom-2 left-0 p-4 flex gap-y-2 flex-col items-center justify-center w-full bg-white dark:bg-gray-800 z-20"
    >
      <button
        @click.prevent="logout"
        class="cursor-pointer flex items-center py-2 px-4 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
      >
        Wyloguj
      </button>
      <dark-mode-switcher />
    </div>
  </aside>
  <div
    v-show="open"
    @click.prevent="open = false"
    class="md:hidden bg-gray-900/50 dark:bg-opacity-80 fixed inset-0 z-30"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DarkModeSwitcher from "@/components/DarkModeSwitcher.vue";
import { type RouteLocationRaw, useRouter } from "vue-router";

const router = useRouter();
const open = ref(false);

type NavigationItem = {
  text: string;
  path: RouteLocationRaw;
  icon: string;
};

function logout(): void {
  window.API.post("/logout").finally(() => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    router.push({ name: "Login" });
  });
}

const navigationItems = ref<NavigationItem[]>([
  {
    icon: new URL("@/assets/img/icons/dashboard.svg", import.meta.url).href,
    path: { name: "Dashboard" },
    text: "Panel główny",
  },
  {
    icon: new URL("@/assets/img/icons/property.svg", import.meta.url).href,
    path: { name: "Properties" },
    text: "Nieruchomości",
  },
]);

const navigationSublist = ref<NavigationItem[]>([
  {
    icon: new URL("@/assets/img/icons/docs.svg", import.meta.url).href,
    path: { path: "docs" },
    text: "Dokumentacja",
  },
]);
</script>

<style scoped>
@reference "../styles/tailwind.css";

.router-link-active {
  @apply bg-gray-200 dark:bg-gray-700;
}
</style>
