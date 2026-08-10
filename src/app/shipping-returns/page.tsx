import type { Metadata } from "next";
import { policies } from "../../content/policies";
import { PolicyPage } from "../../features/home/PolicyPage";
export const metadata: Metadata = {
  title: "Shipping & returns",
  description: "Fictional roast, dispatch, delivery and return terms for ALDER.",
};
export default function ShippingPage() {
  return (
    <PolicyPage
      eyebrow="Customer care"
      title={policies.shipping.title}
      introduction="Clear expectations for this demonstration’s fictional fulfilment flow."
      sections={policies.shipping.sections}
    />
  );
}
