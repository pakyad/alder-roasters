import type { Metadata } from "next";
import { CheckoutView } from "@/features/checkout/CheckoutView";
export const metadata: Metadata = {
  title: "Demonstration checkout",
  robots: { index: false, follow: false },
};
export default function CheckoutPage() {
  return <CheckoutView />;
}
