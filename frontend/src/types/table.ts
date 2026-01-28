import type { PropertyData } from "@/types/properties.ts";

export const pageSizes = [10, 25, 50, 100] as const;
export type PageSizesUnion = (typeof pageSizes)[number];

type TablePropertyDataKeys =
  | "id"
  | "name"
  | "city"
  | "rent_cost"
  | "utilities_cost"
  | "has_balcony";

export type TablePropertyData = Pick<PropertyData, TablePropertyDataKeys> & { address: string };

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
