<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      label
    }}</label>
    <input
      :id
      :type
      :name
      :placeholder
      :autocomplete
      v-model="model"
      class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :required
      :disabled
    />
  </div>
</template>

<script setup lang="ts">
type InputTypes = "color" | "email" | "number" | "password" | "search" | "tel" | "text";
type AutocompleteOptions =
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
  name?: string;
  errors: string[] | undefined;
  autocomplete?: AutocompleteOptions;
  required?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<InputProps>(), {
  id: (Math.random() + 1).toString(36).substring(7),
  type: "text",
});

const model = defineModel<string>({ required: true });
</script>

<style scoped></style>
