export type FormErrors<T> =
  | {
      message?: string | null;
    }
  | {
      [key in keyof T]?: string[];
    };

export type FormErrorResponse<T> = {
  message: string | null;
  errors?: {
    [key in keyof T]?: string[];
  };
};

export type SelectOption = {
  value: string | number | boolean;
  text: string;
};

export type FormOptions<T> = {
  [key in keyof T]?: Array<SelectOption>;
};
