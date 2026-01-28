<template>
  <section class="max-w-7xl mx-auto">
    <div>
      <h1 class="text-3xl font-bold mb-4">
        Nieruchomość{{ propertyData && `: ${propertyData.name}` }}
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
      <div class="w-fit" v-else-if="errors">
        <errors-component :errors="errors" />
      </div>
      <div v-else-if="propertyData">
        <div class="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
          <div class="space-y-4">
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">
                Status
                <span
                  class="inline-block size-3 ml-1 rounded-full"
                  :class="[propertyData.status === 'wolna' ? 'bg-green-500' : 'bg-red-600']"
                ></span>
              </dt>
              <dd class="capitalize text-gray-500 dark:text-gray-400">
                {{ propertyData.status }}
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Adres</dt>
              <dd class="text-gray-500 dark:text-gray-400">
                <svg
                  class="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
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
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                {{ propertyData.street }} {{ propertyData.street_number }}, m.
                {{ propertyData.apartment_number ?? "-" }}, {{ propertyData.city }}
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Czynsz</dt>
              <dd class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                {{ propertyData.rent_cost }}&nbsp;zł
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Media</dt>
              <dd class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                {{ propertyData.utilities_cost }}&nbsp;zł
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Opłaty dodatkowe</dt>
              <dd class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                {{ propertyData.additional_costs }}&nbsp;zł
              </dd>
            </dl>
          </div>
          <div class="space-y-4">
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Powierzchnia</dt>
              <dd class="text-gray-500 dark:text-gray-400">
                {{ propertyData.area_total }}&nbsp;m<sup>2</sup>
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Łazienki</dt>
              <dd class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                {{ propertyData.bathrooms_count }}
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Balkon</dt>
              <dd class="text-gray-500 dark:text-gray-400">
                {{ propertyData.has_balcony ? "✅" : "❌" }}
              </dd>
            </dl>
            <dl>
              <dt class="font-semibold text-gray-900 dark:text-white">Wynajem na pokoje</dt>
              <dd class="text-gray-500 dark:text-gray-400">
                {{ propertyData.rent_by_rooms ? "✅" : "❌" }}
              </dd>
            </dl>
          </div>
        </div>
        <button
          type="button"
          data-modal-target="accountInformationModal2"
          data-modal-toggle="accountInformationModal2"
          class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
        >
          <svg
            class="-ms-0.5 me-1.5 h-4 w-4"
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
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            ></path>
          </svg>
          Edit your data
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import catchAxiosError from "@/helpers/catch-axios-error.ts";
import type { PropertyData } from "@/types/properties.ts";
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";

const router = useRouter();
const isLoading = ref(false);
const errors = ref();

const propertyId = ref<number | null>(null);
const propertyData = ref<PropertyData>();

function isPropertyIdParamValid(): boolean {
  const routePropertyId = router.currentRoute.value.params.propertyId;
  if (Array.isArray(routePropertyId) || routePropertyId === undefined) {
    errors.value = "Invalid property ID";
    return false;
  }
  const parsedPropertyId = parseInt(routePropertyId);
  if (Number.isNaN(parsedPropertyId)) {
    errors.value = "Invalid property ID";
    return false;
  }
  propertyId.value = parsedPropertyId;
  return true;
}

async function fetchPropertyData() {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;

  const [response, error] = await catchAxiosError<{
    data: PropertyData;
  }>(window.API.get(`/properties/${propertyId.value}`));

  isLoading.value = false;

  if (error) {
    errors.value = "Couldn't find property data";
    return;
  }

  propertyData.value = response.data.data;
}

onMounted(() => {
  if (!isPropertyIdParamValid()) {
    return;
  }
  fetchPropertyData();
});
</script>

<style scoped></style>
