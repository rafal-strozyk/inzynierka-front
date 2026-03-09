export const pageSizes = [10, 25, 50, 100] as const;
export type PageSizesUnion = (typeof pageSizes)[number];

export type ColumnData<T> = {
  label: keyof T;
  text: string;
};

type TableAction<T, K extends IdentifierOf<T>> = (
  | {
      type: "router-link";
      to: (arg: T[K]) => string | object;
    }
  | {
      type: "button";
      callbackFn: (data: T) => unknown | Promise<unknown>;
    }
) & {
  text: string;
};

export type TableActions<T, K extends IdentifierOf<T>> = Array<Array<TableAction<T, K>>>;

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

export type IdentifierOf<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];
