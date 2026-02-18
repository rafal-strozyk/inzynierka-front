<template>
  <section class="max-w-7xl mx-auto">
    <div class="flex max-sm:flex-col justify-between items-center gap-4 mb-4">
      <h1 class="text-3xl font-bold mb-0">Nieruchomości</h1>
      <generic-button
        :callback="addPropertyModal"
        iconPath="/src/assets/img/icons/property_white.svg"
        >Dodaj nieruchomość</generic-button
      >
    </div>
    <table-component v-model:queryParams="queryParams" :data :columns :actions :meta :is-loading />
  </section>
</template>

<script setup lang="ts">
import TableComponent from "@/components/table/TableComponent.vue";
import { markRaw, onMounted, ref, watch } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import { useRouter } from "vue-router";
import { type ColumnData, type TableActions, type TableMetaData } from "@/types/table.ts";
import { deletePropertyModal, editPropertyModal } from "@/composables/properties.ts";
import type { PropertyData, TablePropertyData } from "@/types/properties.ts";
import { useModalStore } from "@/stores/modal.ts";
import { getTableQueryParams } from "@/composables/table.ts";
import GenericButton from "@/components/form/GenericButton.vue";
import AddPropertyComponent from "@/components/modal/AddPropertyComponent.vue";

const router = useRouter();
const modalStore = useModalStore();

const queryParams = ref(getTableQueryParams());

const columns = ref<ColumnData<TablePropertyData>[]>([
  {
    label: "name",
    text: "Nazwa",
  },
  {
    label: "address",
    text: "Adres",
  },
  {
    label: "city",
    text: "Miasto",
  },
  {
    label: "rent_cost",
    text: "Czynsz",
  },
  {
    label: "utilities_cost",
    text: "Media",
  },
  {
    label: "has_balcony",
    text: "Balkon",
  },
] as const);

const actions = ref<TableActions<TablePropertyData>>([
  [
    {
      type: "router-link",
      text: "Podgląd",
      to: (propertyId: TablePropertyData["id"]) => {
        return {
          name: "Property",
          params: { propertyId: propertyId },
        };
      },
    },
    {
      type: "button",
      text: "Edytuj dane",
      callbackFn: async (propertyData: TablePropertyData) => {
        const [response, error] = await catchAxiosError<{
          data: PropertyData;
        }>(window.API.get(`/properties/${propertyData.id}`));

        if (error) {
          modalStore.setModal({
            show: true,
            type: "confirm",
            status: "error",
            title: "Wystąpił błąd",
            body: "Nie udało się pobrać danych nieruchomości",
          });
          return;
        }
        editPropertyModal(response.data.data, fetchProperties);
      },
    },
  ],
  [
    {
      type: "button",
      text: "Usuń",
      callbackFn: (propertyData: TablePropertyData) => {
        deletePropertyModal(propertyData, fetchProperties);
      },
    },
  ],
]);

const isLoading = ref(false);
const bypassLoading = ref(false);

const data = ref<TablePropertyData[]>([]);
const meta = ref<TableMetaData>();

function addPropertyModal() {
  modalStore.setModal({
    type: "component",
    show: true,
    component: {
      is: markRaw(AddPropertyComponent),
      props: { callback: fetchProperties },
    },
  });
}

async function fetchProperties() {
  if (isLoading.value && !bypassLoading.value) {
    return;
  }

  isLoading.value = true;
  bypassLoading.value = false;

  const [response, error] = await catchAxiosError<{
    data: TablePropertyData[];
    meta: TableMetaData;
  }>(
    window.API.get(
      `/properties?page=${queryParams.value.page}&per_page=${queryParams.value.per_page}`,
    ),
  );

  if (error) {
    return;
  }
  meta.value = response.data.meta;

  const currentPage = meta.value?.current_page;
  if (currentPage < 1 || currentPage > meta.value?.last_page) {
    bypassLoading.value = true;
    queryParams.value.page = 1;

    return;
  }

  data.value = response.data.data;
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
      fetchProperties();
    }, 300);
  },
  {
    deep: true,
  },
);

onMounted(() => {
  fetchProperties();
});
</script>

<style scoped></style>
