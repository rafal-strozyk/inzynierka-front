<template>
  <section class="max-w-7xl mx-auto">
    <div>
      <h1 class="text-3xl font-bold mb-4">Nieruchomości</h1>
    </div>
    <table-component v-model:queryParams="queryParams" :data :meta :is-loading />
  </section>
</template>

<script setup lang="ts">
import TableComponent from "@/components/table/TableComponent.vue";
import { onMounted, ref, watch } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import { useRoute, useRouter } from "vue-router";
import {
  pageSizes,
  type PageSizesUnion,
  type TableMetaData,
  type TablePropertyData,
} from "@/types/table.ts";

const route = useRoute();
const router = useRouter();

const queryParams = ref({
  page: ((): number => {
    const page = route.query.page;
    if (!page || Array.isArray(page)) {
      return 1;
    }
    return parseInt(page) || 1;
  })(),
  per_page: ((): PageSizesUnion => {
    const perPage = route.query.per_page;
    if (!perPage || Array.isArray(perPage)) {
      return pageSizes[0];
    }

    const intPerPage = parseInt(perPage) as PageSizesUnion;
    return pageSizes.includes(intPerPage) ? intPerPage : pageSizes[0];
  })(),
});

const isLoading = ref(false);

const data = ref<TablePropertyData[]>([]);
const meta = ref<TableMetaData>();

const bypassLoading = ref(false);

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

  router.replace({
    query: {
      ...router.currentRoute.value.query,
      page: queryParams.value.page.toString(),
      per_page: queryParams.value.per_page.toString(),
    },
  });

  data.value = response.data.data;

  isLoading.value = false;
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
