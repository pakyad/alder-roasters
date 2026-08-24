import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageTransition } from "../../../components/motion/PageTransition";
import { reveal } from "../../../components/motion/reveal";
import { Container, Section } from "../../../components/ui";
import { articleJsonLd, JsonLd } from "../../../components/seo/JsonLd";
import { coffees } from "../../../content/coffees";
import { brewGuides, getBrewGuideBySlug } from "../../../content/guides";
import { formatMoney } from "../../../lib/money";
import { RatioCalculator } from "../../../features/home/RatioCalculator";
import { BrewTimer } from "../../../features/shop/BrewTimer";
import { ProductBag } from "../../../features/catalogue/ProductBag";
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
    <PageTransition>
      <JsonLd
        data={articleJsonLd({
          headline: guide.title,
          description: guide.introduction,
          url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://alder-roasters.example"}/brew-guides/${guide.slug}`,
          datePublished: "2026-08-01",
          author: "ALDER ROASTERS",
        })}
        id={`guide-jsonld-${guide.slug}`}
      />
      <Section spacing="generous" tone="pandan-wash">
        <Container>
          <div {...reveal(0)}>
            <Link href="/brew-guides" transitionTypes={["nav-back"]}>
              ← All brew guides
            </Link>
          </div>
          <div className={styles.guideHeader}>
            <div {...reveal(1)}>
              <p className="eyebrow">{guide.method} guide</p>
              <h1>{guide.title}</h1>
              <p className="lead text-secondary">{guide.introduction}</p>
            </div>
            <div {...reveal(2)}>
              <RatioCalculator
                coffeeGrams={guide.ratio.coffeeGrams}
                waterGrams={guide.ratio.waterGrams}
              />
            </div>
          </div>
          <dl className={styles.statGrid} {...reveal(3)}>
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
      <Section tone="pandan">
        <Container>
          <BrewTimer guideTitle={guide.title} steps={guide.steps} totalSeconds={guide.totalSeconds} />
        </Container>
      </Section>
      <Section tone="pandan-wash">
        <Container>
          <div className={styles.methodHead} {...reveal(0)}>
            <div>
              <p className="eyebrow">Method</p>
              <h2>Make the cup</h2>
            </div>
            <aside className={styles.kit} aria-label="Equipment you will need">
              <p className={styles.kitTitle}>What you need</p>
              <ul className={styles.kitList}>
                {guide.equipment.map((item) => (
                  <li key={item}>
                    <svg aria-hidden="true" viewBox="0 0 16 16">
                      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      <path
                        d="M4.8 8.2l2.1 2.1 4.3-4.6"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.kitNote}>
                Everything is weighed — a scale is the one worth owning.
              </p>
            </aside>
          </div>
          <ol className={styles.steps}>
            {guide.steps.map((step, index) => (
              <li key={step.title} {...reveal(index)}>
                <span aria-hidden="true" className={styles.stepChip}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.instruction}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="paper">
        <Container>
          <h2 {...reveal(0)}>If the cup is not quite right</h2>
          <div className={styles.trouble}>
            {guide.troubleshooting.map((item, index) => (
              <div className={styles.troubleCard} key={item.problem} {...reveal(index + 1)}>
                <h3>{item.problem}</h3>
                <p>{item.adjustment}</p>
              </div>
            ))}
          </div>
          {recommended.length > 0 && (
            <>
              <h2 {...reveal(0, { marginTop: "var(--space-16)" })}>Coffees for this method</h2>
              <div className={styles.recoGrid}>
                {recommended.map((coffee, index) => (
                  <Link
                    className={styles.recoCard}
                    href={`/shop/${coffee.slug}`}
                    key={coffee.id}
                    transitionTypes={["nav-forward"]}
                    {...reveal(index + 1, { "--row-hue": coffee.packageHue } as React.CSSProperties)}
                  >
                    <span aria-hidden="true" className={styles.recoBag}>
                      <ProductBag bare coffee={coffee} />
                    </span>
                    <span className={styles.recoBody}>
                      <span className={styles.recoOrigin}>
                        {coffee.origin.country} · {coffee.process}
                      </span>
                      <span className={styles.recoName}>{coffee.name}</span>
                      <span className={styles.recoTaste}>{coffee.taste.summary}</span>
                      <span className={styles.recoMeta}>
                        From {formatMoney(coffee.sizes[0].price)}
                        <span aria-hidden="true" className={styles.recoArrow}>
                          →
                        </span>
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </PageTransition>
  );
}
