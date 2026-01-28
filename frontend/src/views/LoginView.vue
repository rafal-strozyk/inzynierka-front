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
            <errors-component :errors="errors.message" />
            <div class="flex items-center justify-between">
              <checkbox-component
                id="remember"
                label="Zapamiętaj mnie"
                v-model="form.remember"
                :errors="errors.remember"
              />
              <router-link
                :to="{ name: 'ForgotPassword' }"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Zapomniałeś hasła?</router-link
              >
            </div>
            <button-submit :is-sending="isSending"> Zaloguj się </button-submit>
          </form>
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
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";
import type { UserData } from "@/types/user.ts";

const router = useRouter();

const formTemplate = {
  email: "",
  password: "",
  remember: false,
};

const isSending = ref(false);
const form = ref({ ...formTemplate });

const errors = ref<FormErrors<typeof formTemplate & { message: null }>>({});

type LoginResponse = {
  token: string;
  token_type: string;
  expires_at: string;
  user: UserData;
};

async function submitForm() {
  if (isSending.value) {
    return;
  }

  errors.value = {};
  isSending.value = true;

  const [response, error] = await catchAxiosError<LoginResponse, typeof errors.value>(
    window.API.post("/login", toFormData(form.value)),
  );

  if (error) {
    errors.value = error.response?.data || { message: "Unhandled error!" };

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
