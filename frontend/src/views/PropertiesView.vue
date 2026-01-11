<template>
  <section class="max-w-7xl mx-auto">
    <h1 class="even:bg-gray-200 mb-4">Properties View</h1>
    <table-component v-bind="queryParams" />
  </section>
</template>

<script setup lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import { onMounted, ref } from "vue";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import { useRoute, useRouter } from "vue-router";
import { pageSizes } from "@/types/table.ts";

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
  per_page: ((): number => {
    const perPage = route.query.per_page;
    if (!perPage || Array.isArray(perPage)) {
      return pageSizes[0];
    }

    const intPerPage = parseInt(perPage);
    return pageSizes.includes(intPerPage as (typeof pageSizes)[number]) ? intPerPage : pageSizes[0];
  })(),
});

const isLoading = ref(false);
const data = ref();

async function fetchProperties() {
  isLoading.value = true;

  const [response, error] = await catchAxiosError(
    window.API.get(
      `/properties?page=${queryParams.value.page}&per_page=${queryParams.value.per_page}`,
    ),
  );
  if (error) {
    return;
  }
  // TODO check if not outside range of pages;

  router.replace({
    query: {
      ...router.currentRoute.value.query,
      page: queryParams.value.page.toString(),
      per_page: queryParams.value.per_page.toString(),
    },
  });

  data.value = response.data;
  isLoading.value = false;
}

onMounted(() => {
  fetchProperties();
});
</script>

<style scoped></style>
