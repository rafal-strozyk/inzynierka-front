<template>
  <generic-view>
    <h1 class="text-3xl font-bold">
      {{ renderTitleText() }}
    </h1>
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
    <form
      v-else-if="form !== undefined"
      @submit.prevent="submitForm"
      class="w-full space-y-4 md:space-y-6 overflow-y-auto px-0.5 pb-1"
    >
      <div v-if="isMyRole(['admin'])" class="grid md:grid-cols-2 gap-4">
        <select-component
          label="Przypisany do"
          :options="owners"
          placeholder="Wybierz właściciela nieruchomości"
          v-model="form.assigned_to"
          :errors="'assigned_to' in errors ? errors.assigned_to : undefined"
        />
        <select-component
          label="Rola"
          :options="roleOptions"
          placeholder="Wybierz rolę"
          v-model="form.role"
          :errors="'role' in errors ? errors.role : undefined"
        />
        <!--          :options="owners"-->
        <!--          :errors="'owner_id' in errors ? errors.owner_id : undefined"-->
        <!--          v-model="form.owner_id"-->
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <input-component
          id="name"
          autocomplete="off"
          label="Imię"
          placeholder="Wpisz imię"
          :errors="'name' in errors ? errors.name : undefined"
          v-model="form.name"
          :disabled
        />
        <input-component
          id="surname"
          autocomplete="off"
          label="Nazwisko"
          placeholder="Wpisz nazwisko"
          :errors="'surname' in errors ? errors.surname : undefined"
          v-model="form.surname"
          :disabled
        />
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <input-component
          id="username"
          autocomplete="off"
          label="Nazwa użytkownika"
          placeholder="Wpisz nazwę użytkownika"
          :errors="'username' in errors ? errors.username : undefined"
          v-model="form.username"
          :disabled
        />
        <input-component
          id="email"
          autocomplete="off"
          label="Adres email"
          placeholder="Wpisz adres email"
          :errors="'email' in errors ? errors.email : undefined"
          v-model="form.email"
          :disabled
        />
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <input-component
          id="address"
          autocomplete="off"
          label="Adres"
          placeholder="Wpisz adres"
          :errors="'address' in errors ? errors.address : undefined"
          v-model="form.address"
          :disabled
        />
        <input-component
          id="postal_code"
          autocomplete="off"
          label="Kod pocztowy"
          placeholder="Wpisz kod pocztowy"
          :errors="'postal_code' in errors ? errors.postal_code : undefined"
          v-model="form.postal_code"
          :disabled
        />
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <input-component
          id="birth_date"
          autocomplete="off"
          label="Data urodzenia"
          placeholder="Wpisz datę urodzenia"
          :errors="'birth_date' in errors ? errors.birth_date : undefined"
          v-model="form.birth_date"
          :disabled
        />
        <input-component
          id="pesel"
          autocomplete="off"
          label="PESEL"
          placeholder="Wpisz PESEL"
          :errors="'pesel' in errors ? errors.pesel : undefined"
          v-model="form.pesel"
          :disabled
        />
      </div>
      <div
        v-if="props.mode === 'add' && form.password !== undefined"
        class="grid md:grid-cols-2 gap-4"
      >
        <input-component
          id="password"
          autocomplete="off"
          label="Hasło"
          placeholder="Wpisz hasło"
          :errors="'password' in errors ? errors.password : undefined"
          v-model="form.password"
          :disabled
        />
      </div>
      <errors-component :errors="'message' in errors ? errors.message : undefined" />
      <div class="flex justify-center">
        <generic-button type="submit" :is-sending="isSending" :disabled>
          {{
            props.mode === "add"
              ? `Utwórz ${isMyRole(["admin"]) ? "użytkownika" : "najemcę"}`
              : "Zmień dane"
          }}
        </generic-button>
      </div>
    </form>
    <div class="w-fit" v-else-if="errors">
      <errors-component :errors="'message' in errors ? errors.message : undefined" />
    </div>
  </generic-view>
</template>

<script setup lang="ts">
import InputComponent from "@/components/form/InputComponent.vue";
import { onMounted, ref } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import toFormData from "@/helpers/to-form-data.ts";
import type { FormErrorResponse, FormErrors } from "@/types/form.ts";
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";
import { useModalStore } from "@/stores/modal.ts";
import SelectComponent from "@/components/form/SelectComponent.vue";
import GenericButton from "@/components/form/GenericButton.vue";
import { handleFetchErrors } from "@/composables/form.ts";
import isMyRole from "@/helpers/is-my-role.ts";
import GenericView from "@/views/GenericView.vue";
import { isRouteParamValidString } from "@/helpers/route.ts";
import { ROLES_DICTIONARY } from "@/helpers/dictionary.ts";
import type { UserData } from "@/types/user.ts";

type UserFormProps = { mode: "add" | "edit" };

const props = defineProps<UserFormProps>();

const formTemplate = {
  id: "",
  assigned_to: "",
  name: "",
  surname: "",
  username: "",
  email: "",
  password: "",
  role: "",
  phone: "",
  address: "",
  postal_code: "",
  birth_date: "",
  pesel: "",
};

const userId = ref();
const endpoint = `/${isMyRole(["admin"]) ? "admin/users" : "owner/tenants"}`;

const modalStore = useModalStore();

const isLoading = ref(false);
const isSending = ref(false);

const form = ref<typeof formTemplate | UserData>({ ...formTemplate });

const owners = ref([]);
const roleOptions = ref(Object.entries(ROLES_DICTIONARY).map(([value, text]) => ({ value, text })));

const errors = ref<FormErrors<typeof formTemplate>>({});
const disabled = ref(false);

function renderTitleText() {
  if (props.mode === "add") {
    return `Dodaj nowego ${isMyRole(["admin"]) ? "użytkownika" : "najemcę"}`;
  }

  return `Edytuj dane ${isMyRole(["admin"]) ? "użytkownika" : "najemcy"}`;
}

async function submitForm() {
  if (isSending.value) {
    return;
  }

  errors.value = {};
  isSending.value = true;

  const [, error] = await catchAxiosError<unknown, FormErrorResponse<typeof formTemplate>>(
    props.mode === "add"
      ? window.API.post(endpoint, toFormData(form.value))
      : window.API.put(`${endpoint}/${form.value.id}`, toFormData(form.value)),
  );

  if (error) {
    errors.value = handleFetchErrors(error);

    isSending.value = false;
    return;
  }

  modalStore.setModal({
    show: true,
    status: "success",
    type: "confirm",
    title: "Sukces",
    body:
      props.mode === "add"
        ? `${isMyRole(["admin"]) ? "Użytkownik" : "Najemca"} został utworzony poprawnie.`
        : `Dane ${isMyRole(["admin"]) ? "użytkownika" : "najemcy"} zostały zmienione poprawnie.`,
  });

  if (props.mode === "add") {
    form.value = { ...formTemplate };
  }

  isSending.value = false;
}

async function fetchUserData() {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  const [response, error] = await catchAxiosError<{
    data: UserData;
  }>(window.API.get(`${endpoint}/${userId.value}`));

  isLoading.value = false;

  if (error) {
    errors.value = {
      message: `Nie udało się znaleźć danych ${isMyRole(["admin"]) ? "użytkownika" : "najemcy"}.`,
    };
    disabled.value = true;
    return;
  }

  form.value = response.data.data;
}

onMounted(async () => {
  if (props.mode === "add") {
    form.value = { ...formTemplate };
    return;
  }

  const [id, error] = isRouteParamValidString(isMyRole(["admin"]) ? "userId" : "tenantId");
  if (error !== undefined) {
    errors.value = { message: error };
    disabled.value = true;
    return;
  }

  userId.value = id;
  void fetchUserData();
});
</script>

<style scoped></style>
