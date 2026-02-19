<template>
  <generic-view>
    <h1 class="text-3xl font-bold">
      {{ props.mode === "add" ? "Dodaj nową nieruchomość" : "Edytuj dane nieruchomości" }}
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
      <div v-if="isMyRole(['admin'])" class="flex max-md:flex-wrap justify-between gap-4">
        <select-component
          label="Właściciel nieruchomości"
          :options="owners"
          placeholder="Wybierz właściciela nieruchomości"
          :errors="'owner_id' in errors ? errors.owner_id : undefined"
          v-model="form.owner_id"
        />
      </div>
      <div class="flex max-md:flex-wrap justify-between gap-4">
        <input-component
          id="name"
          autocomplete="off"
          label="Nazwa nieruchomości"
          placeholder="Wpisz nazwę"
          :errors="'name' in errors ? errors.name : undefined"
          v-model="form.name"
        />
      </div>
      <div class="flex max-md:flex-wrap justify-between gap-4">
        <input-component
          id="city"
          label="Miasto"
          placeholder="Wpisz miasto"
          :errors="'city' in errors ? errors.city : undefined"
          v-model="form.city"
        />
        <input-component
          id="street"
          label="Ulica"
          placeholder="Wpisz ulicę"
          :errors="'street' in errors ? errors.street : undefined"
          v-model="form.street"
        />
      </div>
      <div class="flex max-md:flex-wrap justify-between gap-4">
        <input-component
          id="street_number"
          label="Numer domu"
          placeholder="Wpisz numer domu"
          :errors="'street_number' in errors ? errors.street_number : undefined"
          v-model="form.street_number"
        />
        <input-component
          id="apartment_number"
          label="Numer mieszkania"
          placeholder="Wpisz numer mieszkania"
          :errors="'apartment_number' in errors ? errors.apartment_number : undefined"
          v-model="form.apartment_number"
        />
      </div>
      <div class="flex max-md:flex-wrap justify-between gap-4">
        <select-component
          id="status"
          label="Status"
          placeholder="Wybierz status"
          :options="propertyFormOptions.status"
          :errors="'status' in errors ? errors.status : undefined"
          v-model="form.status"
        />
        <input-component
          id="rent_cost"
          inputmode="decimal"
          label="Czynsz (zł)"
          placeholder="Wpisz czynsz"
          :errors="'rent_cost' in errors ? errors.rent_cost : undefined"
          v-model.number="form.rent_cost"
        />
      </div>
      <div class="flex max-md:flex-wrap justify-between gap-4">
        <input-component
          id="utilities_cost"
          inputmode="decimal"
          label="Koszt mediów (zł)"
          placeholder="Wpisz koszt mediów"
          :errors="'utilities_cost' in errors ? errors.utilities_cost : undefined"
          v-model.number="form.utilities_cost"
        />
        <input-component
          id="additional_costs"
          inputmode="decimal"
          label="Dodatkowe koszta (zł)"
          placeholder="Wpisz dodatkowe koszta"
          :errors="'additional_costs' in errors ? errors.additional_costs : undefined"
          v-model.number="form.additional_costs"
        />
      </div>
      <div class="flex max-md:flex-wrap justify-between gap-4">
        <input-component
          id="area_total"
          inputmode="decimal"
          label="Powierzchnia (m<sup>2</sup>)"
          placeholder="Wpisz powierzchnię"
          :errors="'area_total' in errors ? errors.area_total : undefined"
          v-model.number="form.area_total"
        />
        <input-component
          id="bathrooms_count"
          inputmode="numeric"
          label="Łazienki"
          placeholder="Wpisz ilość łazienek"
          :errors="'bathrooms_count' in errors ? errors.bathrooms_count : undefined"
          v-model.number="form.bathrooms_count"
        />
      </div>
      <div class="flex max-md:flex-wrap justify-between gap-4">
        <select-component
          id="has_balcony"
          label="Czy posiada balkon"
          placeholder="Wybierz opcję"
          :options="propertyFormOptions.has_balcony"
          :errors="'has_balcony' in errors ? errors.has_balcony : undefined"
          v-model="form.has_balcony"
        />
        <select-component
          id="rent_by_rooms"
          label="Czy wynajmowane na pokoje"
          placeholder="Wybierz opcję"
          :options="propertyFormOptions.rent_by_rooms"
          :errors="'rent_by_rooms' in errors ? errors.rent_by_rooms : undefined"
          v-model="form.rent_by_rooms"
        />
      </div>
      <textarea-component
        id="description"
        label="Opis"
        placeholder="Dodaj opis"
        :errors="'description' in errors ? errors.description : undefined"
        v-model="form.description"
      />
      <errors-component :errors="'message' in errors ? errors.message : undefined" />
      <div class="flex justify-center">
        <generic-button type="submit" :is-sending="isSending">
          {{ props.mode === "add" ? "Utwórz nieruchomość" : "Zmień dane" }}
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
import { type PropertyData, propertyFormOptions } from "@/types/properties.ts";
import SelectComponent from "@/components/form/SelectComponent.vue";
import GenericButton from "@/components/form/GenericButton.vue";
import { handleFetchErrors } from "@/composables/form.ts";
import TextareaComponent from "@/components/form/TextareaComponent.vue";
import isMyRole from "@/helpers/is-my-role.ts";
import GenericView from "@/views/GenericView.vue";
import { isRouteParamValidNumber } from "@/composables/route.ts";

type PropertyFormProps = { mode: "add" | "edit" };

const props = defineProps<PropertyFormProps>();

const formTemplate = {
  id: "",
  owner_id: "",
  name: "",
  street: "",
  street_number: "",
  apartment_number: "",
  city: "",
  rent_cost: "",
  utilities_cost: "",
  additional_costs: "",
  description: "",
  area_total: "",
  bathrooms_count: "",
  status: "",
  has_balcony: "",
  rent_by_rooms: "",
  created_at: "",
  updated_at: "",
};

const propertyId = ref();

const modalStore = useModalStore();

const isLoading = ref(false);
const isSending = ref(false);

const form = ref<typeof formTemplate | PropertyData>({ ...formTemplate });
const owners = ref([]);

const errors = ref<FormErrors<typeof formTemplate>>({});

async function submitForm() {
  if (isSending.value) {
    return;
  }

  errors.value = {};
  isSending.value = true;

  const [, error] = await catchAxiosError<unknown, FormErrorResponse<typeof formTemplate>>(
    props.mode === "add"
      ? window.API.post(`/properties`, toFormData(form.value))
      : window.API.put(
          `/properties/${form.value.id}`,
          toFormData({
            ...form.value,
            owner_id: isMyRole(["owner"]) ? undefined : form.value.owner_id,
          }),
        ),
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
        ? "Nieruchomość została utworzona poprawnie."
        : "Dane nieruchomości zostały zmienione poprawnie.",
  });

  if (props.mode === "add") {
    form.value = { ...formTemplate };
  }

  isSending.value = false;
}

async function fetchOwners() {
  //  TODO add fetch owners list logic
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
    errors.value = { message: "Nie udało się znaleźć danych nieruchomości" };
    return;
  }

  form.value = response.data.data;
}

onMounted(async () => {
  void fetchOwners();

  if (props.mode === "add") {
    form.value = { ...formTemplate };
    return;
  }

  const [id, error] = isRouteParamValidNumber("propertyId");
  if (error !== undefined) {
    errors.value = { message: error };
    return;
  }

  propertyId.value = id;
  void fetchPropertyData();
});
</script>

<style scoped></style>
