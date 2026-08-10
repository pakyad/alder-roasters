import type { Metadata } from "next";
import { SubscriptionConfigurator } from "@/features/subscription/SubscriptionConfigurator";
export const metadata: Metadata = {
  title: "Coffee subscriptions",
  description: "Build a transparent, flexible ALDER coffee subscription.",
};
export default function SubscriptionsPage() {
  return <SubscriptionConfigurator />;
}
