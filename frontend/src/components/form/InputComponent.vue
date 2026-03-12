<template>
  <div class="w-full">
    <label
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      v-html="label"
    />
    <input
      :id
      :type
      :inputmode
      :name
      :placeholder
      :autocomplete
      v-model="model"
      class="appearance-none bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="{ 'opacity-50 hover:cursor-not-allowed': disabled }"
      :required
      :disabled
    />
    <errors-component :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import generateRandomAffix from "@/helpers/generate-random-affix.ts";
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";

type InputTypes = "color" | "email" | "number" | "password" | "search" | "tel" | "text";
type InputModes = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";

type AutocompleteOptions =
  | "off"
  | "tel_national"
  | "email"
  | "name"
  | "given-name"
  | "additional-name"
  | "family-name"
  | "username"
  | "new-password"
  | "current-password"
  | "one-time-code"
  | "street-address"
  | "postal-code";

type InputProps = {
  id?: string;
  label: string;
  placeholder?: string;
  type?: InputTypes;
  inputmode?: InputModes;
  name?: string;
  errors: string[] | undefined;
  autocomplete?: AutocompleteOptions;
  required?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<InputProps>(), {
  id: generateRandomAffix(),
  type: "text",
});

const model = defineModel<string | number>({ required: true });
</script>

<style scoped></style>
