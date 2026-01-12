export const pageSizes = [10, 25, 50, 100] as const;
export type PageSizesUnion = (typeof pageSizes)[number];

export type TablePropertyData = {
  id: number;
  name: string;
  address: string;
  city: string;
  rent_cost: number;
  utilities_cost: number;
  has_balcony: boolean;
};

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
