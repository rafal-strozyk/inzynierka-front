<template>
  <div
    class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 shrink-0"
  >
    <form class="relative w-32 ml-auto md:mx-auto">
      <label :for="`per-page-${affix}`" class="sr-only">Select an option</label>
      <select
        :id="`per-page-${affix}`"
        class="appearance-none block w-full text-sm px-3 pr-7 py-2 focus:ring-brand focus:border-brand shadow-xs placeholder:text-body bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 marker:right-6"
        v-model="model"
      >
        <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">
          {{ pageSize }} na strone
        </option>
      </select>
      <svg
        class="absolute w-3 right-3 top-1/2 -translate-y-1/4"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="oklch(55.1% 0.027 264.364)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </form>
  </div>
</template>

<script setup lang="ts">
import { pageSizes, type PageSizesUnion } from "@/types/table.ts";
import { ref } from "vue";
import generateRandomAffix from "@/helpers/generate-random-affix.ts";

const affix = ref(generateRandomAffix());

const model = defineModel<PageSizesUnion>({
  required: true,
});
</script>

<style scoped></style>
