export type Address = {
  id: number;
  customer_id: number;
  name: string;
  phone_number: string;
  alternate_phone: string | null;
  zip_code: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark: string | null;
  country: string;
  is_default: boolean;
};

export type AddressListResponse = {
  success: boolean;
  message: string;
  data: Address[];
};

export type AddressResponse = {
  success: boolean;
  message: string;
  data: Address;
};

export type AddressPayload = {
  name: string;
  phone_number: string;
  alternate_phone?: string;
  zip_code: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  country?: string;
  is_default?: boolean;
};

export type StateItem = { id: number; code: string; name: string };

export type StateListResponse = {
  success: boolean;
  message: string;
  data: StateItem[];
};
