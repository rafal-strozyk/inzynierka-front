import { ROLES_DICTIONARY } from "@/helpers/dictionary.ts";
export const USER_ROLES = ["admin", "owner", "tenant"] as const;

export type UserData = {
  name: string;
  surname: string;
  username: string;
  email: string;
  role: (typeof USER_ROLES)[number];
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  phone: string;
  address_registered: string;
  city: string;
  birth_date: string;
  pesel: string;
  // notes: string;
};

type TableUserDataKeys = "username" | "name" | "email" | "phone";
export type TableUserResponse = Pick<UserData, TableUserDataKeys | "role">;

export type TableUserData = Pick<UserData, TableUserDataKeys> & {
  role: (typeof ROLES_DICTIONARY)[(typeof USER_ROLES)[number]];
};
