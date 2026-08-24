import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/PageTransition";
import { CartView } from "@/features/cart/CartView";

export const metadata: Metadata = { title: "Cart", robots: { index: false, follow: false } };

export default function CartPage() {
  return (
    <PageTransition>
      <CartView />
    </PageTransition>
  );
}
