<template>
  <section class="w-sm max-w-full py-8">
    <div class="flex flex-col items-center justify-center mx-auto lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow border border-gray-300 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Zresetuj hasło
          </h1>
          <transition mode="out-in" name="fade">
            <form v-if="!formSent" @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
              <input-component
                id="email"
                type="email"
                autocomplete="email"
                label="Adres e-mail"
                placeholder="Wprowadź adres e-mail"
                required
                :errors="'email' in errors ? errors.email : undefined"
                v-model="form.email"
              />
              <errors-component :errors="'message' in errors ? errors.message : undefined" />
              <button-submit :is-sending="isSending"> Wyślij email </button-submit>
            </form>
            <div v-else>
              <p class="mb-4">
                Na podanego maila został wysłany link resetujący hasło, jeśli jest on powiązany
                z&nbsp;kontem.
              </p>
              <router-link
                :to="{ name: 'Login' }"
                class="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 flex justify-center text-center dark:focus:ring-primary-800 py-2.5 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Powrót do logowania
              </router-link>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import InputComponent from "@/components/form/InputComponent.vue";
import { ref } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import toFormData from "@/helpers/to-form-data.ts";
import type { FormErrorResponse, FormErrors } from "@/types/form.ts";
import ButtonSubmit from "@/components/form/ButtonSubmit.vue";
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";
import { handleFetchErrors } from "@/composables/form.ts";

const formTemplate = {
  email: "",
};

const isSending = ref(false);
const form = ref({ ...formTemplate });

const formSent = ref(false);
const errors = ref<FormErrors<typeof formTemplate>>({});

async function submitForm() {
  if (isSending.value) {
    return;
  }

  errors.value = {};
  isSending.value = true;

  const [, error] = await catchAxiosError<unknown, FormErrorResponse<typeof formTemplate>>(
    window.API.post("/forgot-password", toFormData(form.value)),
  );

  if (error) {
    errors.value = handleFetchErrors(error);

    isSending.value = false;
    return;
  }

  form.value = { ...formTemplate };
  isSending.value = false;
  formSent.value = true;
}
</script>

<style scoped></style>
