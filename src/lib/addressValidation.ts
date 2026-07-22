import type { AddressPayload } from "@/types/address";

export type AddressFormErrors = Partial<Record<keyof AddressPayload, string>>;

export function validateAddressForm(data: AddressPayload): AddressFormErrors {
  const errors: AddressFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Full name is required.";
  } else if (data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  }

  if (!data.phone_number.trim()) {
    errors.phone_number = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(data.phone_number.trim())) {
    errors.phone_number = "Enter a valid 10-digit mobile number.";
  }

  if (
    data.alternate_phone?.trim() &&
    !/^[6-9]\d{9}$/.test(data.alternate_phone.trim())
  ) {
    errors.alternate_phone = "Enter a valid 10-digit mobile number.";
  }

  if (!data.zip_code.trim()) {
    errors.zip_code = "Pincode is required.";
  } else if (!/^\d{6}$/.test(data.zip_code.trim())) {
    errors.zip_code = "Enter a valid 6-digit pincode.";
  }

  if (!data.locality.trim()) {
    errors.locality = "Locality is required.";
  }

  if (!data.address.trim()) {
    errors.address = "Address (house/building name) is required.";
  } else if (data.address.trim().length < 5) {
    errors.address = "Please enter a more complete address.";
  }

  if (!data.city.trim()) {
    errors.city = "City is required.";
  }

  if (!data.state.trim()) {
    errors.state = "Please select a state.";
  }

  return errors;
}

export function hasErrors(errors: AddressFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
