<template>
  <h2
    class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
  >
    Edytuj dane nieruchomości: {{ props.name }}
  </h2>
  <transition mode="out-in" name="fade">
    <form
      v-if="!formSent"
      @submit.prevent="submitForm"
      class="w-full space-y-4 md:space-y-6 overflow-y-auto px-0.5 pb-1"
    >
      <div v-if="allowedRoles(['admin'])" class="flex max-md:flex-wrap justify-between gap-4">
        <select-component
          label="Właściciel nieruchomości"
          :options="owners"
          placeholder="Wybierz właściciela nieruchomości"
          :errors="'owner_id' in errors ? errors.name : undefined"
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
        <generic-button type="submit" :is-sending="isSending"> Zmień dane </generic-button>
      </div>
    </form>
    <div v-else>
      <p class="mb-4">Hasło zostało poprawnie zmienione.</p>
      <div class="text-center">
        <generic-button :callback="modalStore.resetModal" type="button"> Zamknij </generic-button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import InputComponent from "@/components/form/InputComponent.vue";
import { ref } from "vue";
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
import allowedRoles from "@/helpers/allowed-roles.ts";

type EditPropertyProps = PropertyData & { callback: () => unknown };

const props = defineProps<EditPropertyProps>();

const formTemplate = { ...props };

const modalStore = useModalStore();

const isSending = ref(false);
const form = ref({ ...formTemplate });
const owners = ref([]);

const formSent = ref(false);
const errors = ref<FormErrors<typeof formTemplate>>({});

async function submitForm() {
  if (isSending.value) {
    return;
  }

  errors.value = {};
  isSending.value = true;

  const [, error] = await catchAxiosError<unknown, FormErrorResponse<typeof formTemplate>>(
    window.API.put(`/properties/${props.id}`, toFormData(form.value)),
  );

  if (error) {
    errors.value = handleFetchErrors(error);

    isSending.value = false;
    return;
  }

  props.callback();

  form.value = { ...formTemplate };
  isSending.value = false;
  formSent.value = true;
}

async function fetchOwners() {
  //  TODO add fetch owners list logic
}
</script>

<style scoped></style>
