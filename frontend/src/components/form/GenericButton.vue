<template>
  <button
    @click.prevent="props.callback()"
    type="button"
    class="cursor-pointer inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-auto"
    :class="buttonTypeStyling[props.type]"
  >
    <inline-svg v-if="props.iconPath" class="-ms-0.5 me-1.5 size-5" :src="props.iconPath">
    </inline-svg>
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
type GenericButtonTypes = "primary" | "danger";

type GenericButtonProps = {
  type?: GenericButtonTypes;
  iconPath?: `/${string}`;
  callback: () => unknown;
};

const buttonTypeStyling = {
  primary:
    "bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
  danger:
    "bg-danger-700 hover:bg-danger-800 focus:ring-danger-300 dark:bg-danger-600 dark:hover:bg-danger-700 dark:focus:ring-danger-800",
} satisfies Record<GenericButtonTypes, string>;

const props = withDefaults(defineProps<GenericButtonProps>(), {
  type: "primary",
  callback: () => {},
});
</script>
<style scoped></style>
