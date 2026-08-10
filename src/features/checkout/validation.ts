export type CheckoutFields = {
  name: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
};
export type CheckoutErrors = Partial<Record<keyof CheckoutFields, string>>;
export function validateCheckout(fields: CheckoutFields): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Enter the recipient’s full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Enter a valid email address.";
  if (fields.address.trim().length < 5) errors.address = "Enter a complete street address.";
  if (fields.city.trim().length < 2) errors.city = "Enter a city.";
  if (!/^\d{5}$/.test(fields.postcode)) errors.postcode = "Enter a 5-digit postcode.";
  return errors;
}
