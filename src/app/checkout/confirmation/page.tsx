import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/PageTransition";
import { ConfirmationView } from "@/features/checkout/ConfirmationView";

export const metadata: Metadata = {
  title: "Demonstration complete",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <PageTransition>
      <ConfirmationView />
    </PageTransition>
  );
}
