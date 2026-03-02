<template>
  <section class="max-w-7xl mx-auto">
    <div class="flex max-sm:flex-col justify-between items-center gap-4 mb-4">
      <h1 class="text-3xl font-bold mb-0">Użytkownicy</h1>
      <generic-button :callback="() => router.push({ name: 'AddUser' })" :iconPath="UserIconSVG"
        >Dodaj użytkownika</generic-button
      >
    </div>
    <table-component v-model:queryParams="queryParams" :data :columns :actions :meta :is-loading />
  </section>
</template>

<script setup lang="ts">
import TableComponent from "@/components/table/TableComponent.vue";
import { onMounted, ref, watch } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import { useRouter } from "vue-router";
import { type ColumnData, type TableActions, type TableMetaData } from "@/types/table.ts";
import { useModalStore } from "@/stores/modal.ts";
import { getTableQueryParams } from "@/composables/table.ts";
import type { TableUserData, TableUserResponse } from "@/types/user.ts";
import { roleDictionary } from "@/helpers/dictionary.ts";
import GenericButton from "@/components/form/GenericButton.vue";
import UserIconSVG from "@/assets/img/icons/users_white.svg";

const router = useRouter();
const modalStore = useModalStore();

const queryParams = ref(getTableQueryParams());

const columns = ref<ColumnData<TableUserData>[]>([
  {
    label: "name",
    text: "Imię i Nazwisko",
  },
  {
    label: "role",
    text: "Rola",
  },
  {
    label: "email",
    text: "Adres email",
  },
  {
    label: "phone",
    text: "Numer telefonu",
  },
] as const);

const actions = ref<TableActions<TableUserData>>([
  [
    {
      type: "router-link",
      text: "Podgląd",
      to: (userId: TableUserData["id"]) => {
        return {
          name: "User",
          params: { userId },
        };
      },
    },
    // {
    //   type: "button",
    //   text: "Edytuj dane",
    //   callbackFn: async (propertyData: TablePropertyData) => {
    //     const [response, error] = await catchAxiosError<{
    //       data: PropertyData;
    //     }>(window.API.get(`/properties/${propertyData.id}`));
    //
    //     if (error) {
    //       modalStore.setModal({
    //         show: true,
    //         type: "confirm",
    //         status: "error",
    //         title: "Wystąpił błąd",
    //         body: "Nie udało się pobrać danych nieruchomości",
    //       });
    //       return;
    //     }
    //     editPropertyModal(response.data.data);
    //   },
    // },
  ],
  // [
  //   {
  //     type: "button",
  //     text: "Usuń",
  //     callbackFn: (propertyData: TablePropertyData) => {
  //       deletePropertyModal(propertyData, fetchProperties);
  //     },
  //   },
  // ],
]);

const isLoading = ref(false);
const bypassLoading = ref(false);

const data = ref<TableUserData[]>([]);
const meta = ref<TableMetaData>();

async function fetchUsers() {
  if (isLoading.value && !bypassLoading.value) {
    return;
  }

  isLoading.value = true;
  bypassLoading.value = false;

  const [response, error] = await catchAxiosError<{
    data: TableUserResponse[];
    meta: TableMetaData;
  }>(
    window.API.get(
      `/admin/users?page=${queryParams.value.page}&per_page=${queryParams.value.per_page}`,
    ),
  );

  if (error) {
    isLoading.value = false;
    return;
  }

  meta.value = response.data.meta;

  const currentPage = meta.value?.current_page;
  if (currentPage < 1 || currentPage > meta.value?.last_page) {
    bypassLoading.value = true;
    queryParams.value.page = 1;

    return;
  }

  data.value = response.data.data.map((user) => ({
    ...user,
    role: roleDictionary[user.role],
  }));
  isLoading.value = false;

  void router.replace({
    query: {
      ...router.currentRoute.value.query,
      page: queryParams.value.page.toString(),
      per_page: queryParams.value.per_page.toString(),
    },
  });
}

let fetchTimeout = NaN;

watch(
  queryParams,
  () => {
    clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
      fetchUsers();
    }, 300);
  },
  {
    deep: true,
  },
);

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped></style>
