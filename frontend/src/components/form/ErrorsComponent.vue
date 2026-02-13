<template>
  <transition mode="out-in" name="fade">
    <div class="bg-red-600 text-white rounded-lg px-2.5 py-1 text-sm mt-2" v-if="errors?.length">
      <template v-if="Array.isArray(errors)">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </template>
      <p v-else>
        {{ errors }}
      </p>
    </div>
  </transition>
</template>

<script setup lang="ts">
type ErrorsProps = {
  errors: string | string[] | null | undefined;
};
defineProps<ErrorsProps>();
</script>

<style></style>
