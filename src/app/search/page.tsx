import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section } from "../../components/ui";
import { SearchExperience } from "../../features/home/SearchExperience";
import styles from "../../features/home/editorial.module.css";
export const metadata: Metadata = {
  title: "Search",
  description: "Search ALDER coffees and brew guides.",
  robots: { index: false, follow: true },
};
export default function SearchPage() {
  return (
    <Section spacing="generous">
      <Container size="content">
        <div className={styles.pageHero}>
          <p className="eyebrow">Search</p>
          <h1>Find your next cup</h1>
          <p className="lead text-secondary">
            Search by flavour, origin, process or the way you like to brew.
          </p>
        </div>
        <Suspense fallback={<p>Preparing search…</p>}>
          <SearchExperience />
        </Suspense>
      </Container>
    </Section>
  );
}
