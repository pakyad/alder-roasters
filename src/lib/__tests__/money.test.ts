import { describe, expect, it } from "vitest";
import { formatMoney, multiplyMoney } from "../money";

describe("money", () => {
  it("formats integer sen as Malaysian ringgit", () => {
    expect(formatMoney({ currency: "MYR", amount: 5200 })).toMatch(/RM\s?52\.00/);
  });

  it("rejects fractional minor units", () => {
    expect(() => formatMoney({ currency: "MYR", amount: 10.5 })).toThrow(TypeError);
  });

  it("multiplies without changing the input", () => {
    const price = { currency: "MYR", amount: 5200 } as const;
    expect(multiplyMoney(price, 3)).toEqual({ currency: "MYR", amount: 15600 });
    expect(price.amount).toBe(5200);
  });
});
