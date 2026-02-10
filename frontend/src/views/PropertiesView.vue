<template>
  <section class="max-w-7xl mx-auto">
    <div>
      <h1 class="text-3xl font-bold mb-4">Nieruchomości</h1>
    </div>
    <table-component v-model:queryParams="queryParams" :data :columns :actions :meta :is-loading />
  </section>
</template>

<script setup lang="ts">
import TableComponent from "@/components/table/TableComponent.vue";
import { onMounted, ref, watch } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import { useRouter } from "vue-router";
import {
  type ColumnData,
  type TableActions,
  type TableMetaData,
  type TablePropertyData,
} from "@/types/table.ts";
import {
  deletePropertyModal,
  editPropertyModal,
  getPropertiesQueryParams,
} from "@/composables/properties.ts";
import type { PropertyData } from "@/types/properties.ts";
import { useModalStore } from "@/stores/modal.ts";

const router = useRouter();
const modalStore = useModalStore();

const queryParams = ref(getPropertiesQueryParams());

const columns = ref<ColumnData<TablePropertyData>[]>([
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
        editPropertyModal(response.data.data);
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
