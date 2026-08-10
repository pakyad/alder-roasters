import { describe, expect, it } from "vitest";

import {
  cartTotal,
  labelGrind,
  parseCart,
  planLineId,
  reconcileCart,
  reduceCart,
  type CartState,
} from "./cart-store";

const empty: CartState = { version: 1, lines: [] };

describe("cart store", () => {
  it("rejects malformed and old persisted data", () => {
    expect(parseCart(null)).toEqual(empty);
    expect(parseCart("not json")).toEqual(empty);
    expect(parseCart(JSON.stringify({ version: 0, lines: [] }))).toEqual(empty);
  });

  it("merges matching lines without mutating state", () => {
    const line = {
      kind: "coffee",
      id: "a",
      productId: "coffee-sabah-kundasang",
      sizeGrams: 250,
      grind: "whole-bean",
      purchaseType: "one-time",
      quantity: 1,
    } as const;
    const next = reduceCart(empty, { type: "add", line });
    const merged = reduceCart(next, { type: "add", line: { ...line, quantity: 2 } });
    expect(merged.lines[0].quantity).toBe(3);
    expect(next.lines[0].quantity).toBe(1);
  });

  it("drops invalid persisted lines defensively", () => {
    const parsed = parseCart(JSON.stringify({ version: 1, lines: [{ id: "bad", quantity: 99 }] }));
    expect(parsed.lines).toEqual([]);
  });

  it("updates, removes, clears and bounds quantities", () => {
    const line = {
      kind: "coffee",
      id: "a",
      productId: "coffee-sabah-kundasang",
      sizeGrams: 250,
      grind: "whole-bean",
      purchaseType: "one-time",
      quantity: 1,
    } as const;
    const added = reduceCart(empty, { type: "add", line: { ...line, quantity: 20 } });
    expect(added.lines[0].quantity).toBe(10);
    expect(reduceCart(added, { type: "quantity", id: "a", quantity: 3 }).lines[0].quantity).toBe(3);
    expect(reduceCart(added, { type: "quantity", id: "a", quantity: -1 })).toBe(added);
    expect(reduceCart(added, { type: "quantity", id: "a", quantity: 0 }).lines).toEqual([]);
    expect(reduceCart(added, { type: "remove", id: "a" }).lines).toEqual([]);
    expect(reduceCart(added, { type: "clear" })).toEqual(empty);
  });

  it("reconciles valid coffee and plan lines into priced display lines", () => {
    const lines = [
      {
        kind: "coffee",
        id: "coffee",
        productId: "coffee-sabah-kundasang",
        sizeGrams: 250,
        grind: "whole-bean",
        purchaseType: "subscription",
        cadenceWeeks: 2,
        quantity: 2,
      },
      {
        kind: "plan",
        id: "plan",
        planId: "roasters-choice",
        bags: 2,
        grind: "filter",
        cadenceWeeks: 4,
        quantity: 1,
      },
    ] as const;
    const display = reconcileCart(lines);
    expect(display).toHaveLength(2);
    expect(display[0].detail).toContain("every 2 weeks");
    expect(cartTotal(display).amount).toBe(display[0].total.amount + display[1].total.amount);
    expect(planLineId("roasters-choice", 2, "filter", 4)).toBe("plan:roasters-choice:2:filter:4");
    expect(labelGrind("french-press")).toBe("French Press");
  });

  it("accepts valid persisted lines and discards unavailable catalogue references", () => {
    const raw = JSON.stringify({
      version: 1,
      lines: [
        {
          kind: "plan",
          id: "p",
          planId: "roasters-choice",
          bags: 1,
          cadenceWeeks: 2,
          grind: "filter",
          quantity: 1,
        },
      ],
    });
    expect(parseCart(raw).lines).toHaveLength(1);
    expect(
      reconcileCart([
        {
          kind: "coffee",
          id: "missing",
          productId: "missing",
          sizeGrams: 250,
          grind: "whole-bean",
          purchaseType: "one-time",
          quantity: 1,
        },
      ]),
    ).toEqual([]);
  });
});
