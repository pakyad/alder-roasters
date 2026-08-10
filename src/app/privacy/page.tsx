import type { Metadata } from "next";
import { policies } from "../../content/policies";
import { PolicyPage } from "../../features/home/PolicyPage";
export const metadata: Metadata = {
  title: "Privacy",
  description: "How the ALDER portfolio demonstration handles information.",
};
export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title={policies.privacy.title}
      introduction="This demonstration is designed to keep personal information out of the experience."
      sections={policies.privacy.sections}
    />
  );
}
