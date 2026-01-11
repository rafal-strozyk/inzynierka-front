<template>
  <section
    class="flex flex-col items-center justify-center text-gray-900 dark:text-white text-center"
  >
    <h1 class="text-7xl font-bold leading-tight tracking-tight">404</h1>
    <h2 class="text-2xl font-medium text-balance mb-5 max-w-72">
      Strona nie istnieje, bądź nie masz do niej dostępu.
    </h2>
    <router-link
      class="text-lg leading-none font-medium uppercase transition-colors bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 px-6 py-4 rounded-2xl"
      :to="{ name: 'Dashboard' }"
    >
      Strona główna
    </router-link>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
