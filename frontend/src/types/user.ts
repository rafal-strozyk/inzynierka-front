type UserRoles = "admin" | "owner" | "tenant";

export type UserData = {
  id: number;
  role: UserRoles;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_registered: string;
  city: string;
  birth_date: string;
  pesel: string;
  notes: string;
};
