import { roleDictionary } from "@/helpers/dictionary.ts";
export const userRoles = ["admin", "owner", "tenant"] as const;

export type UserData = {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  role: (typeof userRoles)[number];
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

type TableUserDataKeys = "id" | "name" | "email" | "phone";
export type TableUserResponse = Pick<UserData, TableUserDataKeys | "role">;
export type TableUserData = Pick<UserData, TableUserDataKeys> & {
  role: (typeof roleDictionary)[(typeof userRoles)[number]];
};
