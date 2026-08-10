import type { Metadata } from "next";
import { policies } from "../../content/policies";
import { PolicyPage } from "../../features/home/PolicyPage";
export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for the fictional ALDER portfolio storefront.",
};
export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title={policies.terms.title}
      introduction="The essential boundary: this is a fictional service created as a portfolio demonstration."
      sections={policies.terms.sections}
    />
  );
}
