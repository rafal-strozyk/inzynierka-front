<template>
  <div class="w-full">
    <label
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      v-html="label"
    />
    <textarea
      :id
      :name
      :placeholder
      v-model="model"
      class="resize-none min-h-32 appearance-none bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="{ 'opacity-65 hover:cursor-not-allowed': disabled }"
      :required
      :disabled
    />
    <errors-component :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import generateRandomAffix from "@/helpers/generate-random-affix.ts";
import ErrorsComponent from "@/components/form/ErrorsComponent.vue";

type TextareaProps = {
  id?: string;
  label: string;
  placeholder?: string;
  name?: string;
  errors: string[] | undefined;
  required?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<TextareaProps>(), {
  id: generateRandomAffix(),
});

const model = defineModel<string | number>({ required: true });
</script>

<style scoped></style>
