<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <modal-component />
</template>

<script setup lang="ts">
import ModalComponent from "@/components/modal/ModalComponent.vue";
</script>

<style scoped></style>
