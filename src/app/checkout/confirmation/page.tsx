import type { Metadata } from "next";
import { ConfirmationView } from "@/features/checkout/ConfirmationView";
export const metadata: Metadata = {
  title: "Demonstration complete",
  robots: { index: false, follow: false },
};
export default function ConfirmationPage() {
  return <ConfirmationView />;
}
