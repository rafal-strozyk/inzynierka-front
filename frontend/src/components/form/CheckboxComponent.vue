<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        id="remember"
        aria-describedby="remember"
        type="checkbox"
        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
      />
    </div>
    <div class="ml-3 text-sm">
      <label for="remember" class="text-gray-500 dark:text-gray-300">Zapamiętaj mnie</label>
    </div>
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
