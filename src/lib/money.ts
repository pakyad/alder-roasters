import type { Money } from "../domain/coffee";

const myrFormatter = new Intl.NumberFormat("en-MY", {
  style: "currency",
  currency: "MYR",
  minimumFractionDigits: 2,
});

export function formatMoney(money: Money): string {
  if (!Number.isSafeInteger(money.amount))
    throw new TypeError("Money amount must be an integer in minor units");
  return myrFormatter.format(money.amount / 100);
}

export function multiplyMoney(money: Money, quantity: number): Money {
  if (!Number.isInteger(quantity) || quantity < 0)
    throw new RangeError("Quantity must be a non-negative integer");
  return { ...money, amount: money.amount * quantity };
}
