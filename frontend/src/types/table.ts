export const pageSizes = [10, 25, 50, 100] as const;

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
  from: null; // TODO change
  last_page: number;
  links: {
    url: string;
    label: string;
    page: null; // TODO change
    active: false;
  }[];
  path: string;
  per_page: number;
  to: null; // TODO change
  total: number;
};
