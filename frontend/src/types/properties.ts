import type { FormOptions } from "@/types/form.ts";

type PropertyStatus = "wolna" | "zajęta" | "remontowana" | "nieaktywna";

export type PropertyData = {
  id: number;
  owner_id: number;
  name: string;
  street: string;
  street_number: string;
  apartment_number: string;
  city: string;
  rent_cost: number;
  utilities_cost: number;
  additional_costs: number;
  description: string;
  area_total: number;
  bathrooms_count: number;
  status: PropertyStatus;
  has_balcony: boolean;
  rent_by_rooms: boolean;
  created_at: string;
  updated_at: string;
  // TODO add photos typing
  // photos: unknown[];
};

export const propertyFormOptions = {
  status: [
    {
      value: "wolna",
      text: "Wolna",
    },
    {
      value: "zajęta",
      text: "Zajęta",
    },
    {
      value: "remontowana",
      text: "Remontowana",
    },
    {
      value: "nieaktywna",
      text: "Nieaktywna",
    },
  ],
  has_balcony: [
    {
      value: true,
      text: "Tak",
    },
    {
      value: false,
      text: "Nie",
    },
  ],
  rent_by_rooms: [
    {
      value: true,
      text: "Tak",
    },
    {
      value: false,
      text: "Nie",
    },
  ],
} satisfies FormOptions<PropertyData>;

type TablePropertyDataKeys =
  | "id"
  | "name"
  | "city"
  | "rent_cost"
  | "utilities_cost"
  | "has_balcony";
export type TablePropertyData = Pick<PropertyData, TablePropertyDataKeys> & { address: string };
