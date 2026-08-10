import type { Metadata } from "next";
import { policies } from "../../content/policies";
import { PolicyPage } from "../../features/home/PolicyPage";
export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Answers about ALDER’s fictional shop, subscriptions and delivery.",
};
export default function FaqPage() {
  return (
    <PolicyPage
      eyebrow="Help"
      title={policies.faq.title}
      introduction="Straight answers about what this portfolio shop does—and what it deliberately does not do."
      sections={policies.faq.sections}
    />
  );
}
