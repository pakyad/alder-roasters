import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "../../components/ui";
import { brewGuides } from "../../content/guides";
import styles from "../../features/home/editorial.module.css";
export const metadata: Metadata = {
  title: "Brew guides",
  description: "Practical, forgiving coffee recipes for V60, AeroPress and home espresso.",
};
export default function BrewGuidesPage() {
  return (
    <>
      <Section spacing="generous">
        <Container>
          <div className={styles.pageHero}>
            <p className="eyebrow">Brew guides</p>
            <h1>
              Good starting points,
              <br />
              not commandments.
            </h1>
            <p className="lead text-secondary">
              Choose a method, follow the numbers once, then adjust by taste. Every recipe is built
              to help you notice what changes.
            </p>
          </div>
        </Container>
      </Section>
      <Section tone="oat">
        <Container>
          <div className={styles.grid3}>
            {brewGuides.map((guide) => (
              <article className={styles.guideCard} key={guide.slug}>
                <Image
                  className={styles.guideCardImage}
                  src="/images/guides/pour-over.webp"
                  alt="Coffee brewing equipment arranged in warm workshop light"
                  width={800}
                  height={600}
                />
                <div className={styles.guideCardBody}>
                  <p className="eyebrow">{guide.method}</p>
                  <h2>{guide.title}</h2>
                  <p>{guide.introduction}</p>
                  <p className={styles.guideMeta}>
                    {guide.difficulty} · {guide.timeMinutes} min · {guide.ratio.coffeeGrams}g /{" "}
                    {guide.ratio.waterGrams}g
                  </p>
                  <Link href={`/brew-guides/${guide.slug}`}>Follow the recipe</Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
