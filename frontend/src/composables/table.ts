import { useRoute } from "vue-router";
import { pageSizes, type PageSizesUnion } from "@/types/table.ts";

export function getTableQueryParams() {
  const route = useRoute();
  return {
    search: ((): string => {
      const search = route.query.search;
      if (!search || Array.isArray(search)) {
        return "";
      }

      return search;
    })(),
    page: ((): number => {
      const page = route.query.page;
      if (!page || Array.isArray(page)) {
        return 1;
      }
      return parseInt(page) || 1;
    })(),
    per_page: ((): PageSizesUnion => {
      const perPage = route.query.per_page;
      if (!perPage || Array.isArray(perPage)) {
        return pageSizes[0];
      }

      const intPerPage = parseInt(perPage) as PageSizesUnion;
      return pageSizes.includes(intPerPage) ? intPerPage : pageSizes[0];
    })(),
  };
}
