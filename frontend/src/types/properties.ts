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
  status: string;
  has_balcony: boolean;
  rent_by_rooms: boolean;
  created_at: string;
  updated_at: string;
  photos: unknown[];
};

type TablePropertyDataKeys =
  | "id"
  | "name"
  | "city"
  | "rent_cost"
  | "utilities_cost"
  | "has_balcony";
export type TablePropertyData = Pick<PropertyData, TablePropertyDataKeys> & { address: string };
