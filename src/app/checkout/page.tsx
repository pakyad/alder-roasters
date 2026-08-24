import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/PageTransition";
import { CheckoutView } from "@/features/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Demonstration checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <PageTransition>
      <CheckoutView />
    </PageTransition>
  );
}
