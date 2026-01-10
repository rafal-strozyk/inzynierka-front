<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import catchAxiosError from '@/helpers/catch-axios-error.ts'

onMounted(async () => {
  const response = await catchAxiosError(window.API.get('/docs'))
})
</script>

<style scoped></style>
