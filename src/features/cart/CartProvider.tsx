"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  EMPTY_CART,
  parseCart,
  reconcileCart,
  reduceCart,
  type CartAction,
  type CartState,
  type CommerceCartLine,
} from "./cart-store";
import type { GrindOption } from "@/domain/coffee";

type CartContextValue = {
  state: CartState;
  displayLines: ReturnType<typeof reconcileCart>;
  itemCount: number;
  hydrated: boolean;
  dispatch: React.Dispatch<CartAction>;
  addLine: (line: CommerceCartLine) => void;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduceCart, EMPTY_CART);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const saved = parseCart(window.localStorage.getItem(CART_STORAGE_KEY));
    queueMicrotask(() => {
      saved.lines.forEach((line) => dispatch({ type: "add", line }));
      setHydrated(true);
    });
  }, []);
  useEffect(() => {
    const addProduct = (event: Event) => {
      const selection = (
        event as CustomEvent<{
          productId: string;
          sizeGrams: 250 | 1000;
          grind: GrindOption;
          purchaseType: "one-time" | "subscription";
          cadenceWeeks?: 4;
          quantity: 1;
        }>
      ).detail;
      if (!selection) return;
      const cadence =
        selection.purchaseType === "subscription" ? (selection.cadenceWeeks ?? 4) : undefined;
      const id = [
        selection.productId,
        selection.sizeGrams,
        selection.grind,
        selection.purchaseType,
        cadence ?? "once",
      ].join(":");
      dispatch({ type: "add", line: { kind: "coffee", id, ...selection, cadenceWeeks: cadence } });
    };
    window.addEventListener("alder:add-to-cart", addProduct);
    return () => window.removeEventListener("alder:add-to-cart", addProduct);
  }, []);
  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);
  const displayLines = useMemo(() => reconcileCart(state.lines), [state.lines]);
  const value = useMemo(
    () => ({
      state,
      displayLines,
      hydrated,
      dispatch,
      itemCount: state.lines.reduce((sum, line) => sum + line.quantity, 0),
      addLine: (line: CommerceCartLine) => dispatch({ type: "add", line }),
    }),
    [displayLines, hydrated, state],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
