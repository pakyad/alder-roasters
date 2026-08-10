import { coffees } from "@/content/coffees";
import { subscriptionPlans } from "@/content/subscriptions";
import type { GrindOption, Money } from "@/domain/coffee";

export const CART_STORAGE_KEY = "alder-cart-v1";

type BaseLine = { readonly id: string; readonly quantity: number };
export type CoffeeCartLine = BaseLine & {
  readonly kind: "coffee";
  readonly productId: string;
  readonly sizeGrams: 250 | 1000;
  readonly grind: GrindOption;
  readonly purchaseType: "one-time" | "subscription";
  readonly cadenceWeeks?: 2 | 4;
};
export type PlanCartLine = BaseLine & {
  readonly kind: "plan";
  readonly planId: "roasters-choice" | "stay-with-one";
  readonly bags: 1 | 2 | 3;
  readonly grind: GrindOption;
  readonly cadenceWeeks: 2 | 4;
};
export type CommerceCartLine = CoffeeCartLine | PlanCartLine;
export type CartState = { readonly version: 1; readonly lines: readonly CommerceCartLine[] };
export type CartAction =
  | { readonly type: "add"; readonly line: CommerceCartLine }
  | { readonly type: "quantity"; readonly id: string; readonly quantity: number }
  | { readonly type: "remove"; readonly id: string }
  | { readonly type: "clear" };
export type DisplayCartLine = CommerceCartLine & {
  readonly name: string;
  readonly detail: string;
  readonly unitPrice: Money;
  readonly total: Money;
};

export const EMPTY_CART: CartState = { version: 1, lines: [] };

export function reduceCart(state: CartState, action: CartAction): CartState {
  if (action.type === "clear") return EMPTY_CART;
  if (action.type === "remove")
    return { ...state, lines: state.lines.filter((line) => line.id !== action.id) };
  if (action.type === "quantity") {
    if (!Number.isInteger(action.quantity) || action.quantity < 0 || action.quantity > 10)
      return state;
    return action.quantity === 0
      ? reduceCart(state, { type: "remove", id: action.id })
      : {
          ...state,
          lines: state.lines.map((line) =>
            line.id === action.id ? { ...line, quantity: action.quantity } : line,
          ),
        };
  }
  const found = state.lines.find((line) => line.id === action.line.id);
  const lines = found
    ? state.lines.map((line) =>
        line.id === action.line.id
          ? { ...line, quantity: Math.min(10, line.quantity + action.line.quantity) }
          : line,
      )
    : [
        ...state.lines,
        { ...action.line, quantity: Math.min(10, Math.max(1, action.line.quantity)) },
      ];
  return { ...state, lines };
}

export function parseCart(raw: string | null): CartState {
  if (!raw) return EMPTY_CART;
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.lines)) return EMPTY_CART;
    return { version: 1, lines: value.lines.filter(isCartLine) };
  } catch {
    return EMPTY_CART;
  }
}

export function reconcileCart(lines: readonly CommerceCartLine[]): readonly DisplayCartLine[] {
  return lines.reduce<DisplayCartLine[]>((result, line) => {
    if (line.kind === "plan") {
      const plan = subscriptionPlans.find((item) => item.id === line.planId);
      if (
        !plan ||
        !plan.compatibleGrinds.some((grind) => grind === line.grind) ||
        !plan.quantities.some((quantity) => quantity === line.bags)
      )
        return result;
      const amount = plan.pricePerBag.amount * line.bags;
      return [
        ...result,
        {
          ...line,
          name: plan.name,
          detail: `${line.bags} × 250g · ${labelGrind(line.grind)} · every ${line.cadenceWeeks} weeks`,
          unitPrice: { currency: "MYR", amount },
          total: { currency: "MYR", amount: amount * line.quantity },
        },
      ];
    }
    const coffee = coffees.find((item) => item.id === line.productId);
    const size = coffee?.sizes.find((item) => item.grams === line.sizeGrams);
    if (
      !coffee ||
      !size ||
      coffee.status === "sold-out" ||
      !coffee.compatibleGrinds.some((grind) => grind === line.grind)
    )
      return result;
    const amount =
      line.purchaseType === "subscription"
        ? Math.round(size.price.amount * 0.9)
        : size.price.amount;
    return [
      ...result,
      {
        ...line,
        name: coffee.name,
        detail: `${line.sizeGrams}g · ${labelGrind(line.grind)}${line.purchaseType === "subscription" ? ` · every ${line.cadenceWeeks ?? 4} weeks` : ""}`,
        unitPrice: { currency: "MYR", amount },
        total: { currency: "MYR", amount: amount * line.quantity },
      },
    ];
  }, []);
}

export const cartTotal = (lines: readonly DisplayCartLine[]): Money => ({
  currency: "MYR",
  amount: lines.reduce((sum, line) => sum + line.total.amount, 0),
});
export const planLineId = (planId: string, bags: number, grind: string, cadence: number) =>
  `plan:${planId}:${bags}:${grind}:${cadence}`;
export const labelGrind = (grind: string) =>
  grind
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
function isCartLine(value: unknown): value is CommerceCartLine {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    !Number.isInteger(value.quantity) ||
    Number(value.quantity) < 1 ||
    Number(value.quantity) > 10
  )
    return false;
  if (value.kind === "plan")
    return (
      ["roasters-choice", "stay-with-one"].includes(String(value.planId)) &&
      [1, 2, 3].includes(Number(value.bags)) &&
      [2, 4].includes(Number(value.cadenceWeeks)) &&
      typeof value.grind === "string"
    );
  return (
    value.kind === "coffee" &&
    typeof value.productId === "string" &&
    [250, 1000].includes(Number(value.sizeGrams)) &&
    typeof value.grind === "string" &&
    ["one-time", "subscription"].includes(String(value.purchaseType))
  );
}
