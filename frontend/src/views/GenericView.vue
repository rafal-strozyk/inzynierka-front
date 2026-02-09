<template>
  <section class="max-w-7xl mx-auto">
    <a
      href="javascript:history.back()"
      class="flex items-center gap-2 transition hover:underline hover:opacity-100 opacity-70 w-fit mb-2"
    >
      <svg
        class="size-6 inline-block"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14M5 12l4-4m-4 4 4 4"
        />
      </svg>
      Wstecz
    </a>
    <slot></slot>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
