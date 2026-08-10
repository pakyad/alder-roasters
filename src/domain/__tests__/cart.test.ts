import { describe, expect, it } from "vitest";
import { coffees } from "../../content/coffees";
import {
  addCartLine,
  cartSubtotal,
  createCartLineId,
  priceCart,
  updateCartQuantity,
  type CartLine,
} from "../cart";

const base = {
  productId: "coffee-sabah-kundasang",
  sizeGrams: 250,
  grind: "whole-bean",
  purchaseType: "one-time",
} as const;
const line = (quantity = 1): CartLine => ({ ...base, id: createCartLineId(base), quantity });

describe("cart logic", () => {
  it("merges identical configurations immutably", () => {
    const initial = [line()];
    const result = addCartLine(initial, line(2));
    expect(result).toEqual([{ ...line(), quantity: 3 }]);
    expect(initial[0].quantity).toBe(1);
  });

  it("keeps different configurations as separate lines", () => {
    const espresso = { ...base, grind: "espresso" as const };
    const result = addCartLine([line()], {
      ...espresso,
      id: createCartLineId(espresso),
      quantity: 1,
    });
    expect(result).toHaveLength(2);
  });

  it("enforces the quantity contract", () => {
    expect(() => updateCartQuantity([line()], line().id, 11)).toThrow(RangeError);
    expect(updateCartQuantity([line()], line().id, 0)).toEqual([]);
  });

  it("reconciles with current product truth and totals minor units", () => {
    const stale: CartLine = {
      productId: "coffee-rwanda-nyamasheke",
      sizeGrams: 250,
      grind: "whole-bean",
      purchaseType: "one-time",
      id: "stale",
      quantity: 1,
    };
    const priced = priceCart([line(2), stale], coffees);
    expect(priced).toHaveLength(1);
    expect(cartSubtotal(priced)).toEqual({ currency: "MYR", amount: 10400 });
  });

  it("applies the disclosed ten percent coffee subscription saving", () => {
    const subscription: CartLine = {
      ...line(),
      id: "subscription",
      purchaseType: "subscription",
      cadenceWeeks: 4,
    };
    expect(priceCart([subscription], coffees)[0].unitPrice.amount).toBe(4680);
  });
});
