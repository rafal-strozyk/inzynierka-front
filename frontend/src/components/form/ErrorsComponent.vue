<template>
  <transition mode="out-in" name="fade">
    <div class="bg-red-600 rounded-lg px-2.5 py-1 text-sm" v-if="errors?.length">
      <p>
        {{ errors }}
      </p>
      <!--      <p v-for="error in errors" :key="error">
        {{ error }}
      </p>-->
    </div>
  </transition>
</template>

<script setup lang="ts">
type ErrorsProps = {
  errors: string | undefined;
};
defineProps<ErrorsProps>();
</script>

<style></style>
