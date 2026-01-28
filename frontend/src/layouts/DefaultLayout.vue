<template>
  <div class="min-h-dvh px-4 pt-4">
    <side-nav-component />
    <main class="md:ml-64 max-md:pt-2">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <modal-component />
  </div>
</template>

<script setup lang="ts">
import SideNavComponent from "@/components/SideNavComponent.vue";
import ModalComponent from "@/components/modal/ModalComponent.vue";
</script>

<style lang="scss" scoped></style>
