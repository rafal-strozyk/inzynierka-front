<template>
  <section class="max-w-7xl mx-auto">
    <div>
      <h1 class="text-3xl font-bold">Moje dane</h1>
      <div class="w-fit py-5 mx-auto overflow-hidden" v-if="isLoading">
        <svg
          aria-hidden="true"
          class="size-10 text-neutral-tertiary animate-spin brightness-200 fill-primary-300 text-gray-800 dark:text-gray-700 dark:fill-primary-200"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
      <div class="w-fit" v-else-if="errors">
        <errors-component :errors="errors" />
      </div>
      <div v-else-if="user">
        <div class="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
          <div class="space-y-4">
            <div class="flex space-x-4">
              <svg
                class="size-12 text-fg-disabled me-3"
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
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <h2
                class="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl mb-0"
              >
                {{ user.first_name }} {{ user.last_name }} - {{ roleDictionary[user.role] }}
              </h2>
            </div>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Numer telefonu</dt>
              <dd class="text-gray-500 dark:text-gray-400">
                {{ user.phone }}
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Adres email</dt>
              <dd class="capitalize text-gray-500 dark:text-gray-400">
                {{ user.email }}
              </dd>
            </dl>
          </div>
          <div class="space-y-4">
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Adres zameldowania</dt>
              <dd class="capitalize text-gray-500 dark:text-gray-400">
                {{ user.address_registered }}, {{ user.city }}
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Data urodzenia</dt>
              <dd class="text-gray-500 dark:text-gray-400">
                {{ user.birth_date }}
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Numer PESEL</dt>
              <dd class="text-gray-500 dark:text-gray-400">
                {{ user.pesel }}
              </dd>
            </dl>
          </div>
        </div>
        <generic-button
          :iconPath="EditIconSVG"
          :callback="
            () =>
              modal.setModal({
                show: true,
                type: 'component',
                component: {
                  is: markRaw(ChangePasswordComponent),
                  props: {},
                },
              })
          "
        >
          Zmień hasło
        </generic-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";
import { markRaw, onMounted, ref } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import { useUserStore } from "@/stores/user.ts";
import type { UserData } from "@/types/user.ts";
import { useModalStore } from "@/stores/modal.ts";
import ChangePasswordComponent from "@/components/modal/ChangePasswordComponent.vue";
import GenericButton from "@/components/form/GenericButton.vue";
import { roleDictionary } from "@/helpers/dictionary.ts";
import EditIconSVG from "@/assets/img/icons/edit.svg";

const modal = useModalStore();
const userStore = useUserStore();
const user = userStore.getUser();

const isLoading = ref(false);
const errors = ref();

async function fetchUserData() {
  if (user.value || isLoading.value) {
    return;
  }

  isLoading.value = true;

  const [response, error] = await catchAxiosError<{
    user: UserData;
  }>(window.API.get(`/me`));

  isLoading.value = false;

  if (error) {
    errors.value = "Nie udało się znaleźć danych użytkownika";
    return;
  }

  userStore.setUser(response.data.user);
}

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped></style>
