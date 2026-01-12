<template>
  <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
    Showing
    <span class="font-semibold text-gray-900 dark:text-white"
      >{{ meta?.from || 0 }}-{{ meta?.to || 0 }}</span
    >
    of
    <span class="font-semibold text-gray-900 dark:text-white">{{ meta?.total || 0 }}</span>
  </span>
</template>

<script setup lang="ts">
import { type TableMetaData } from "@/types/table.ts";

defineProps<{ meta: TableMetaData | undefined }>();
</script>

<style scoped></style>
