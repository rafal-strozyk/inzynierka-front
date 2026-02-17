import type { PropertyData } from "@/types/properties.ts";

export const pageSizes = [10, 25, 50, 100] as const;
export type PageSizesUnion = (typeof pageSizes)[number];

export type ColumnData<T> = {
  label: keyof T;
  text: string;
};

type TableAction<CallbackData> = (
  | {
      type: "router-link";
      to: (id: number) => string | object;
    }
  | {
      type: "button";
      callbackFn: (data: CallbackData) => unknown | Promise<unknown>;
    }
) & {
  text: string;
};

export type TableActions<T> = Array<Array<TableAction<T>>>;

export type TableMetaData = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: {
    url: string;
    label: string;
    page: number | null;
    active: false;
  }[];
  path: string;
  per_page: number;
  to: number | null;
  total: number | null;
};
