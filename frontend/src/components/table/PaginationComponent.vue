<template>
  <ul class="inline-flex items-stretch -space-x-px">
    <li>
      <button
        type="button"
        @click.prevent="changePage(page - 1)"
        class="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :class="{ 'pointer-events-none': page <= 1 }"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </li>
    <li v-for="pageNumber in pageNumbers" :key="pageNumber?.value">
      <button
        type="button"
        @click.prevent="changePage(pageNumber.value)"
        class="flex items-center justify-center text-sm py-2 px-3 leading-tight"
        :class="[
          pageNumber.active
            ? 'pointer-events-none text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
            : (pageNumber.type !== 'ellipsis'
                ? 'cursor-pointer hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white '
                : '') +
              'text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400',
        ]"
      >
        {{ pageNumber.type !== "ellipsis" ? pageNumber.value : "..." }}
      </button>
    </li>
    <li>
      <button
        type="button"
        @click.prevent="changePage(page + 1)"
        class="cursor-pointer flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :class="{ 'pointer-events-none': page >= (meta?.last_page || 0) }"
      >
        <span class="sr-only">Next</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type TableMetaData } from "@/types/table.ts";
import { computed } from "vue";
const props = defineProps<{ meta: TableMetaData | undefined }>();

type PaginationItem =
  | { type: "page"; value: number; active: boolean }
  | { type: "ellipsis"; value: undefined; active: false };

const pageNumbers = computed((): PaginationItem[] => {
  if (props.meta === undefined) {
    return [{ type: "ellipsis", value: undefined, active: false }];
  }
  const items: PaginationItem[] = [];

  const lastPage = props.meta.last_page;
  const maxVisible = 5;
  const currentPage = props.meta.current_page;

  // Case 1: show all pages
  if (lastPage <= maxVisible) {
    for (let i = 1; i <= lastPage; i++) {
      items.push({
        type: "page",
        value: i,
        active: i === currentPage,
      });
    }
    return items;
  }

  const middleCount = maxVisible - 2; // pages between 1 and last
  const half = Math.floor(middleCount / 2);

  let start = Math.max(2, currentPage - half);
  let end = Math.min(lastPage - 1, currentPage + half);

  // Adjust window if too close to start
  if (currentPage <= half + 1) {
    start = 2;
    end = maxVisible - 1;
  }

  // Adjust window if too close to end
  if (currentPage >= lastPage - half) {
    start = lastPage - (maxVisible - 2);
    end = lastPage - 1;
  }

  // First page
  items.push({
    type: "page",
    value: 1,
    active: currentPage === 1,
  });

  // Left ellipsis
  if (start > 2) {
    items.push({ type: "ellipsis", value: undefined, active: false });
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    items.push({
      type: "page",
      value: i,
      active: i === currentPage,
    });
  }

  // Right ellipsis
  if (end < lastPage - 1) {
    items.push({ type: "ellipsis", value: undefined, active: false });
  }

  // Last page
  items.push({
    type: "page",
    value: lastPage,
    active: currentPage === lastPage,
  });

  return items;
});

function changePage(pageNumber: number | undefined): void {
  if (pageNumber === undefined) {
    return;
  }
  page.value = Math.min(Math.max(pageNumber, 0), props.meta?.last_page || 1);
}

const page = defineModel<number>({
  required: true,
});
</script>

<style scoped></style>
