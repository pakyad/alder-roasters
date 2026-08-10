import { describe, expect, it } from "vitest";

import { validateCheckout } from "./validation";

describe("demo checkout validation", () => {
  it("reports required contact and delivery fields", () => {
    expect(
      Object.keys(validateCheckout({ name: "", email: "", address: "", city: "", postcode: "" })),
    ).toEqual(["name", "email", "address", "city", "postcode"]);
  });

  it("accepts a plausible Malaysian delivery address", () => {
    expect(
      validateCheckout({
        name: "Amina Lee",
        email: "amina@example.com",
        address: "12 Jalan Utara",
        city: "Petaling Jaya",
        postcode: "46200",
      }),
    ).toEqual({});
  });
});
