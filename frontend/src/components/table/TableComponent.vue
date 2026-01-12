<template>
  <div class="mx-auto">
    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div
        class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
      >
        <!--    TODO ADD SEARCH FUNCTIONALITY    -->
        <search-component />
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white"
            >{{
              Math.min(
                Math.max((queryParams.page - 1) * queryParams.per_page + 1, 1),
                meta?.total || 0,
              )
            }}-{{ Math.min(queryParams.page * queryParams.per_page, meta?.total || 0) }}</span
          >
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{ meta?.total || 0 }}</span>
        </span>
      </div>
      <div class="overflow-x-auto">
        <div class="w-fit py-5 mx-auto overflow-hidden" v-if="isLoading">
          <svg
            aria-hidden="true"
            class="size-10 text-neutral-tertiary animate-spin brightness-200 fill-primary-300 text-gray-800 dark:text-gray-700 dark:fill-primary-200"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <table v-else class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3 font-medium text-gray-900 dark:text-white">Nazwa</th>
              <th
                v-for="(column, index) in displayedColumns"
                :key="index"
                scope="col"
                class="px-4 py-3"
              >
                {{ column.text }}
              </th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-gray-700" v-if="data.length <= 0">
              <td
                class="text-base text-white text-center py-3 px-2"
                :colspan="displayedColumns.length + 2"
              >
                Brak danych do wyświetlenia.
              </td>
            </tr>
            <tr
              v-else
              v-for="(row, row_index) in data"
              :key="row_index"
              class="border-b dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ row.name }}
              </th>
              <td v-for="(column, index) in displayedColumns" :key="index" class="px-4 py-3">
                {{
                  column.label.startsWith("has") ? (column.label ? "✅" : "❌") : row[column.label]
                }}
              </td>
              <!--       TODO add button functions       -->
              <td class="px-4 py-3">
                <button
                  @click.prevent="toggleActionsDropdown(row_index)"
                  class="cursor-pointer inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                  type="button"
                >
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                  <span class="sr-only"> Open Actions </span>
                </button>
                <div
                  class="absolute z-10 w-44 bg-white rounded divide-y divide-gray-200 border border-gray-300 shadow dark:bg-gray-700 dark:divide-gray-600 dark:border-gray-500"
                  :class="{ hidden: openedActionsIndex !== row_index }"
                  style="transform: translateX(calc(-100% - 8px)) translateY(-52px)"
                >
                  <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Show</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Edit</a
                      >
                    </li>
                  </ul>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Delete</a
                    >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav
        class="flex flex-col md:flex-row justify-end gap-x-3 items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <per-page-component v-model="queryParams.per_page" />
        <pagination-component v-model="queryParams.page" :meta />
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type PageSizesUnion, type TableMetaData, type TablePropertyData } from "@/types/table.ts";
import PerPageComponent from "@/components/table/PerPageComponent.vue";
import SearchComponent from "@/components/table/SearchComponent.vue";
import PaginationComponent from "@/components/table/PaginationComponent.vue";

type TableProps = {
  data: TablePropertyData[];
  meta: TableMetaData | undefined;
  isLoading: boolean;
};
defineProps<TableProps>();

const queryParams = defineModel<{
  page: number;
  per_page: PageSizesUnion;
}>("queryParams", { required: true });

type ColumnData = {
  label: keyof TablePropertyData;
  text: string;
};
const displayedColumns = ref<ColumnData[]>([
  {
    label: "address",
    text: "Adres",
  },
  {
    label: "city",
    text: "Miasto",
  },
  {
    label: "rent_cost",
    text: "Czynsz",
  },
  {
    label: "utilities_cost",
    text: "Media",
  },
  {
    label: "has_balcony",
    text: "Balkon",
  },
] as const);

const openedActionsIndex = ref<number>();

function toggleActionsDropdown(index: number) {
  if (openedActionsIndex.value === undefined || openedActionsIndex.value !== index) {
    openedActionsIndex.value = index;
    return;
  }
  openedActionsIndex.value = undefined;
}
</script>

<style scoped></style>
