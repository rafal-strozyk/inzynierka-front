<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id
        :name
        :required
        :disabled
        type="checkbox"
        v-model="model"
        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
      />
    </div>
    <div class="ml-3 text-sm">
      <label :for="id" class="text-gray-500 dark:text-gray-300" v-html="label" />
    </div>
  </div>
</template>

<script setup lang="ts">
import generateRandomAffix from "@/helpers/generate-random-affix.ts";

type InputProps = {
  id?: string;
  label: string;
  name?: string;
  errors: string[] | undefined;
  required?: boolean;
  disabled?: boolean;
};

withDefaults(defineProps<InputProps>(), {
  id: generateRandomAffix(),
});

const model = defineModel<boolean>({ required: true });
</script>

<style scoped></style>
