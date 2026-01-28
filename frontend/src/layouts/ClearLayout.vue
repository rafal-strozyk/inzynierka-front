<template>
  <main class="relative overflow-hidden min-h-dvh px-4 flex flex-col items-center justify-center">
    <animated-background />
    <div class="fixed right-4 top-4">
      <dark-mode-switcher />
    </div>
    <div class="relative max-w-full">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import DarkModeSwitcher from "@/components/DarkModeSwitcher.vue";
import AnimatedBackground from "@/components/AnimatedBackground.vue";
</script>

<style lang="scss" scoped></style>
