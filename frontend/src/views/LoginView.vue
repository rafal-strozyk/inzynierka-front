<template>
  <section class="min-w-sm py-8">
    <div class="flex flex-col items-center justify-center mx-auto lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow border border-gray-300 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Zaloguj się do portalu Mieszkalnik
          </h1>
          <form @submit.prevent="submitForm" class="space-y-4 md:space-y-6">
            <input-component
              id="email"
              type="email"
              autocomplete="email"
              label="Adres e-mail"
              placeholder="Wprowadź adres e-mail"
              required
              :errors="errors.email"
              v-model="form.email"
            />
            <input-component
              id="password"
              type="password"
              autocomplete="current-password"
              label="Hasło"
              placeholder="••••••••"
              required
              :errors="errors.password"
              v-model="form.password"
            />
            <div class="flex items-center justify-between">
              <checkbox-component
                id="remember"
                label="Zapamiętaj mnie"
                v-model="form.remember"
                :errors="errors.remember"
              />
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Zapomniałeś hasła?</a
              >
            </div>
            <button-submit :is-sending="isSending"> Zaloguj się </button-submit>
          </form>
          <button-submit @click="router.push({ name: 'Dashboard' })" type="button"
            >Skip ;)</button-submit
          >
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
import { useRouter } from "vue-router";
import type { FormErrors } from "@/types/form.ts";
import ButtonSubmit from "@/components/form/ButtonSubmit.vue";
import CheckboxComponent from "@/components/form/CheckboxComponent.vue";

const router = useRouter();

const formTemplate = {
  email: "",
  password: "",
  remember: false,
};

const isSending = ref(false);
const form = ref({ ...formTemplate });

const errors = ref<FormErrors<typeof formTemplate>>({});

type LoginResponse = {
  token: string;
  token_type: string;
  expires_at: string;
  user: {
    id: number;
    role: string;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    phone: string;
    address_registered: string;
    city: string;
    birth_date: string;
    pesel: string;
    notes: string;
  };
};

async function submitForm() {
  if (isSending.value) {
    return;
  }

  isSending.value = true;

  const [response, error] = await catchAxiosError<LoginResponse>(
    window.API.post("/login", toFormData(form.value)),
  );

  if (error) {
    console.log(response);
    console.log(error);

    isSending.value = false;
    return;
  }

  (form.value.remember ? localStorage : sessionStorage).setItem("token", response.data.token);

  form.value = { ...formTemplate };
  isSending.value = false;

  router.push({ name: "Dashboard" });
}
</script>

<style scoped></style>
