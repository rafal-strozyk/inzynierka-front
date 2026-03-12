import { ROLES_DICTIONARY } from "@/helpers/dictionary.ts";
export const USER_ROLES = ["admin", "owner", "tenant"] as const;

export type UserData = {
  id: number;
  assigned_to: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  role: (typeof USER_ROLES)[number];
  password?: string;
  phone: string;
  address: string;
  postal_code: string;
  birth_date: string;
  pesel: string;
  notes: string;
};

type TableUserDataKeys = "username" | "name" | "email" | "phone";
export type TableUserResponse = Pick<UserData, TableUserDataKeys | "role">;

export type TableUserData = Pick<UserData, TableUserDataKeys> & {
  role: (typeof ROLES_DICTIONARY)[(typeof USER_ROLES)[number]];
};
