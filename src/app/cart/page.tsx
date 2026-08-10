import type { Metadata } from "next";
import { CartView } from "@/features/cart/CartView";
export const metadata: Metadata = { title: "Cart", robots: { index: false, follow: false } };
export default function CartPage() {
  return <CartView />;
}
