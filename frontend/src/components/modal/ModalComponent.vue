<template>
  <teleport to="body">
    <transition mode="out-in" name="modal-fade-scale" @after-leave="isSending = false">
      <div
        class="fixed z-40 inset-0 size-full transition-colors duration-300 flex justify-center items-center px-4"
        :class="modal.status ? modalStatusStyling[modal.status] : 'bg-black/50'"
        v-if="modal.show"
        @pointerdown="modalBackgroundPointerDown"
        @pointerup="modalBackgroundPointerUp"
      >
        <button
          @click.prevent="modalStore.resetModal()"
          type="button"
          class="fixed top-2 right-2 cursor-pointer"
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
        <div
          class="h-full inner @2xs:min-w-sm max-w-full py-12 lg:py-8 flex flex-col justify-center items-center"
        >
          <div
            class="w-full max-h-full bg-white rounded-lg shadow border border-gray-300 sm:max-w-xl dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8"
          >
            <transition mode="out-in" name="fade">
              <div v-if="modal.type === 'component'" class="flex flex-col max-h-full">
                <component :is="modal.component?.is" v-bind="modal.component?.props" />
              </div>

              <div
                v-else-if="modal.type === 'confirm'"
                :key="`${modal.title}${modal.body}${modal.callback?.variant}${modal.callback?.confirm}`"
              >
                <h2
                  v-show="modal.title"
                  class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                >
                  {{ modal.title }}
                </h2>
                <p v-if="modal.body" class="mb-6">{{ modal.body }}</p>
                <form
                  v-if="modal.callback"
                  @submit.prevent="
                    isSending = true;
                    modal.callback.function();
                  "
                >
                  <div class="flex flex-wrap justify-center gap-4">
                    <generic-button class="flex-1" variant="ghost" :callback="modalStore.resetModal"
                      >Zamknij</generic-button
                    >
                    <generic-button
                      :isSending
                      class="flex-1"
                      :variant="modal.callback.variant"
                      type="submit"
                    >
                      {{ modal.callback.confirm }}
                    </generic-button>
                  </div>
                </form>
                <form v-else @submit.prevent="modalStore.resetModal()">
                  <div class="flex justify-center">
                    <generic-button type="submit">Zamknij</generic-button>
                  </div>
                </form>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/modal.ts";
import GenericButton from "@/components/form/GenericButton.vue";
import type { ModalStatus } from "@/types/modal.ts";
import { ref } from "vue";

const modalStore = useModalStore();
const modal = modalStore.getModal();

const isSending = ref(false);

const closeModalFlag = ref(false);

const modalStatusStyling = {
  success: "bg-primary-600/50",
  error: "bg-danger-600/50",
} satisfies Record<ModalStatus, string>;

function modalBackgroundPointerDown(e: PointerEvent) {
  closeModalFlag.value = e.target === e.currentTarget;
}

function modalBackgroundPointerUp(e: PointerEvent) {
  const endedOnOverlay = e.target === e.currentTarget;

  if (closeModalFlag.value && endedOnOverlay) {
    modalStore.resetModal();
  }

  closeModalFlag.value = false;
}
</script>

<style scoped></style>
