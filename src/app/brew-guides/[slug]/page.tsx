import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section } from "../../../components/ui";
import { coffees } from "../../../content/coffees";
import { brewGuides, getBrewGuideBySlug } from "../../../content/guides";
import { RatioCalculator } from "../../../features/home/RatioCalculator";
import styles from "../../../features/home/editorial.module.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return brewGuides.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getBrewGuideBySlug((await params).slug);
  return guide ? { title: guide.title, description: guide.introduction } : {};
}
export default async function GuidePage({ params }: Props) {
  const guide = getBrewGuideBySlug((await params).slug);
  if (!guide) notFound();
  const recommended = coffees.filter((coffee) =>
    guide.recommendedCoffeeIds.includes(coffee.id as never),
  );
  return (
    <>
      <Section spacing="generous">
        <Container>
          <Link href="/brew-guides">← All brew guides</Link>
          <div className={styles.guideHeader}>
            <div>
              <p className="eyebrow">{guide.method} guide</p>
              <h1>{guide.title}</h1>
              <p className="lead text-secondary">{guide.introduction}</p>
            </div>
            <RatioCalculator
              coffeeGrams={guide.ratio.coffeeGrams}
              waterGrams={guide.ratio.waterGrams}
            />
          </div>
          <dl className={styles.statGrid}>
            <div>
              <dt>Difficulty</dt>
              <dd>{guide.difficulty}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{guide.timeMinutes} minutes</dd>
            </div>
            <div>
              <dt>Starting ratio</dt>
              <dd>
                {guide.ratio.coffeeGrams}g : {guide.ratio.waterGrams}g
              </dd>
            </div>
          </dl>
        </Container>
      </Section>
      <Image
        src="/images/guides/pour-over.webp"
        alt="Coffee being carefully brewed in warm directional light"
        width={1800}
        height={1100}
        style={{ width: "100%", maxHeight: "44rem", objectFit: "cover" }}
      />
      <Section>
        <Container>
          <div className={styles.split}>
            <div>
              <p className="eyebrow">Method</p>
              <h2>Make the cup</h2>
              <ol className={styles.steps}>
                {guide.steps.map((step) => (
                  <li key={step.title}>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.instruction}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <aside>
              <h2>What you need</h2>
              <ul className={styles.equipment}>
                {guide.equipment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
      <Section tone="oat">
        <Container>
          <h2>If the cup is not quite right</h2>
          <div className={styles.trouble}>
            {guide.troubleshooting.map((item) => (
              <div key={item.problem}>
                <h3>{item.problem}</h3>
                <p>{item.adjustment}</p>
              </div>
            ))}
          </div>
          {recommended.length > 0 && (
            <>
              <h2 style={{ marginTop: "var(--space-12)" }}>Coffees for this method</h2>
              <div className={styles.grid3}>
                {recommended.map((coffee) => (
                  <Link key={coffee.id} href={`/shop/${coffee.slug}`}>
                    {coffee.name} · {coffee.taste.summary}
                  </Link>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
