import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/PageTransition";
import { SubscriptionConfigurator } from "@/features/subscription/SubscriptionConfigurator";

export const metadata: Metadata = {
  title: "Coffee subscriptions",
  description: "Build a transparent, flexible ALDER coffee subscription.",
};

export default function SubscriptionsPage() {
  return (
    <PageTransition>
      <SubscriptionConfigurator />
    </PageTransition>
  );
}
