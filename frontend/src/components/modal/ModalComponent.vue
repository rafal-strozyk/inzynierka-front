<template>
  <teleport to="body">
    <transition mode="out-in" name="modal-fade-scale">
      <div
        class="fixed z-40 inset-0 size-full flex justify-center items-center px-4"
        :class="[{ 'bg-black/50': modal.status === undefined }]"
        v-if="modal.show"
      >
        <button
          @click.prevent="modalStore.resetModal()"
          type="button"
          class="fixed top-4 right-4 cursor-pointer"
        >
          <svg
            class="size-10 text-white dark:drop-shadow-none drop-shadow-2xl"
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
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
        <div class="inner w-sm max-w-full ma py-8 flex flex-col items-center justify-center">
          <div
            class="w-full bg-white rounded-lg shadow border border-gray-300 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-6 space-y-4 md:space-y-6 sm:p-8"
          >
            <component :is="modal.component?.is" v-bind="modal.component?.props" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/modal.ts";

const modalStore = useModalStore();
const modal = modalStore.getModal();
</script>

<style scoped></style>
