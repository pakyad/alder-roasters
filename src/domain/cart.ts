import type { Coffee, GrindOption, Money } from "./coffee";

export interface CartLine {
  readonly id: string;
  readonly productId: string;
  readonly sizeGrams: 250 | 1000;
  readonly grind: GrindOption;
  readonly purchaseType: "one-time" | "subscription";
  readonly cadenceWeeks?: 2 | 4;
  readonly quantity: number;
}

export interface PricedCartLine extends CartLine {
  readonly productName: string;
  readonly unitPrice: Money;
  readonly lineTotal: Money;
}

export function createCartLineId(line: Omit<CartLine, "id" | "quantity">): string {
  return [
    line.productId,
    line.sizeGrams,
    line.grind,
    line.purchaseType,
    line.cadenceWeeks ?? "once",
  ].join(":");
}

export function addCartLine(lines: readonly CartLine[], incoming: CartLine): readonly CartLine[] {
  const existing = lines.find((line) => line.id === incoming.id);
  if (!existing) return [...lines, { ...incoming, quantity: clampQuantity(incoming.quantity) }];
  return lines.map((line) =>
    line.id === incoming.id
      ? { ...line, quantity: clampQuantity(line.quantity + incoming.quantity) }
      : line,
  );
}

export function updateCartQuantity(
  lines: readonly CartLine[],
  id: string,
  quantity: number,
): readonly CartLine[] {
  if (!Number.isInteger(quantity)) throw new RangeError("Cart quantity must be an integer");
  if (quantity === 0) return lines.filter((line) => line.id !== id);
  if (quantity < 1 || quantity > 10) throw new RangeError("Cart quantity must be between 1 and 10");
  return lines.map((line) => (line.id === id ? { ...line, quantity } : line));
}

export function priceCart(
  lines: readonly CartLine[],
  coffees: readonly Coffee[],
): readonly PricedCartLine[] {
  return lines.flatMap((line) => {
    const coffee = coffees.find((item) => item.id === line.productId);
    const size = coffee?.sizes.find((item) => item.grams === line.sizeGrams);
    if (
      !coffee ||
      !size ||
      coffee.status === "sold-out" ||
      !coffee.compatibleGrinds.includes(line.grind)
    )
      return [];
    if (line.purchaseType === "subscription" && !coffee.subscriptionEligible) return [];
    const unitAmount =
      line.purchaseType === "subscription"
        ? Math.round(size.price.amount * 0.9)
        : size.price.amount;
    return [
      {
        ...line,
        productName: coffee.name,
        unitPrice: { currency: "MYR", amount: unitAmount },
        lineTotal: { currency: "MYR", amount: unitAmount * line.quantity },
      },
    ];
  });
}

export function cartSubtotal(lines: readonly PricedCartLine[]): Money {
  return {
    currency: "MYR",
    amount: lines.reduce((total, line) => total + line.lineTotal.amount, 0),
  };
}

function clampQuantity(quantity: number): number {
  if (!Number.isInteger(quantity)) throw new RangeError("Cart quantity must be an integer");
  return Math.min(10, Math.max(1, quantity));
}
