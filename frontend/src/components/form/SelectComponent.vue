<template>
  <div class="w-full">
    <label
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      v-html="label"
    />
    <div class="relative">
      <select
        :id
        :name
        v-model="model"
        class="appearance-none cursor-pointer bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 py-2.5 pl-2.5 pr-9"
        :class="[
          { 'opacity-65 hover:cursor-not-allowed': disabled },
          { 'text-gray-400': model === '' },
        ]"
        :required
        :disabled
      >
        <option disabled hidden value="">{{ $props.placeholder }}</option>
        <option
          v-for="option in $props.options"
          :key="option.value.toString()"
          class="text-gray-900 dark:text-white"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      <inline-svg
        :src="chevronIconSVG"
        class="absolute pointer-events-none top-1/2 -translate-y-1/2 right-1.5"
      ></inline-svg>
    </div>
    <errors-component :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import generateRandomAffix from "@/helpers/generate-random-affix.ts";
import type { SelectOption } from "@/types/form.ts";
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";
import chevronIconSVG from "@/assets/img/icons/chevron.svg";

type InputProps = {
  id?: string;
  label: string;
  placeholder?: string;
  name?: string;
  options: SelectOption[];
  errors: string[] | undefined;
  required?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<InputProps>(), {
  id: generateRandomAffix(),
});

const model = defineModel<SelectOption["value"]>({ required: true });
</script>

<style scoped></style>
