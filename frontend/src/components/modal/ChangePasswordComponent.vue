<template>
  <h1
    class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
  >
    Ustaw nowe hasło
  </h1>
  <transition mode="out-in" name="fade">
    <form v-if="!formSent" @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
      <input-component
        id="current_password"
        type="password"
        autocomplete="current-password"
        label="Stare hasło"
        placeholder="••••••••"
        required
        :errors="errors.current_password"
        v-model="form.current_password"
      />
      <input-component
        id="password"
        type="password"
        autocomplete="new-password"
        label="Nowe hasło"
        placeholder="••••••••"
        required
        :errors="errors.password"
        v-model="form.password"
      />
      <input-component
        id="password_confirmation"
        type="password"
        autocomplete="new-password"
        label="Potwierdź nowe hasło"
        placeholder="••••••••"
        required
        :errors="errors.password_confirmation"
        v-model="form.password_confirmation"
      />
      <errors-component :errors="errors.message" />
      <button-submit :is-sending="isSending"> Potwierdź </button-submit>
    </form>
    <div v-else>
      <p class="mb-4">Hasło zostało poprawnie zmienione.</p>
      <button
        @click.prevent="modalStore.resetModal()"
        type="button"
        class="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 flex justify-center text-center dark:focus:ring-primary-800 py-2.5 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700"
      >
        Zamknij
      </button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import InputComponent from "@/components/form/InputComponent.vue";
import { ref } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import toFormData from "@/helpers/to-form-data.ts";
import type { FormErrors } from "@/types/form.ts";
import ButtonSubmit from "@/components/form/ButtonSubmit.vue";
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal.ts";

const formTemplate = {
  current_password: "",
  password: "",
  password_confirmation: "",
};

const modalStore = useModalStore();

const isSending = ref(false);
const form = ref({ ...formTemplate });

const formSent = ref(false);
const errors = ref<FormErrors<typeof formTemplate & { message: null }>>({});

async function submitForm() {
  if (isSending.value) {
    return;
  }

  errors.value = {};
  isSending.value = true;

  const [, error] = await catchAxiosError(
    window.API.post("/me/change-password", toFormData(form.value)),
  );

  if (error) {
    errors.value = error.response?.data || { message: "Unhandled error!" };

    isSending.value = false;
    return;
  }

  form.value = { ...formTemplate };
  isSending.value = false;
  formSent.value = true;
}
</script>

<style scoped></style>
