import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Container, Section } from "../components/ui";
import { coffees } from "../content/coffees";
import styles from "../features/home/editorial.module.css";
import { formatMoney } from "../lib/money";

export const metadata: Metadata = {
  title: "Seasonal coffee from Petaling Jaya",
  description:
    "Seasonal specialty coffee roasted in Petaling Jaya, with practical guidance for every bag.",
};

export default function HomePage() {
  const featured = coffees
    .filter((coffee) => coffee.featuredRank !== null)
    .toSorted((left, right) => Number(left.featuredRank) - Number(right.featuredRank))
    .slice(0, 3);

  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Independent roaster / Petaling Jaya</p>
            <h1>Coffee from the current harvest.</h1>
            <p className="lead">
              Seven coffees, roasted in small batches. Each one comes with a plain tasting note and
              a tested place to start brewing.
            </p>
            <div className={styles.heroActions}>
              <Button href="/shop">See the coffee</Button>
              <Link href="/brew-guides">Brew guides</Link>
            </div>
          </div>
          <figure className={styles.heroMedia}>
            <Image
              className={styles.heroImage}
              src="/images/editorial/hero-roastery.webp"
              alt="A coffee roaster working beside an ALDER roasting machine"
              fill
              priority
              sizes="(max-width: 48rem) 100vw, 58vw"
            />
            <figcaption>
              <span>Roasted in Petaling Jaya</span>
              <span>Small batches / weekly</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      <Section className={styles.inventory}>
        <Container>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>On the shelf</p>
              <h2>Current coffees</h2>
            </div>
            <Link href="/shop">All seven coffees →</Link>
          </div>
          <div className={styles.coffeeIndex}>
            {featured.map((coffee, index) => (
              <Link className={styles.coffeeRow} href={`/shop/${coffee.slug}`} key={coffee.id}>
                <span className={styles.rowNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.rowOrigin}>
                  {coffee.origin.country}
                  <small>{coffee.process}</small>
                </span>
                <span className={styles.rowName}>{coffee.name}</span>
                <span className={styles.rowTaste}>{coffee.taste.notes.join(" / ")}</span>
                <span className={styles.price}>{formatMoney(coffee.sizes[0].price)}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className={styles.workingNote} tone="dark">
        <Container className={styles.noteGrid}>
          <p className={styles.noteLabel}>How we work</p>
          <h2>
            Buy for taste.
            <br />
            Brew from a recipe.
          </h2>
          <div className={styles.noteCopy}>
            <p>We keep the range short enough to know every coffee properly.</p>
            <p>Origin and process stay visible, but the first description is always about the cup.</p>
            <Link href="/story">About the roastery →</Link>
          </div>
        </Container>
      </Section>

      <Section className={styles.guideFeature} tone="paper">
        <Container>
          <div className={styles.split}>
            <Image
              className={styles.editorialImage}
              src="/images/guides/pour-over.webp"
              alt="A measured pour-over brew in warm morning light"
              width={1200}
              height={900}
            />
            <div className={styles.guideCopy}>
              <p className={styles.kicker}>Brew note / 01</p>
              <h2>A clear, sweet V60</h2>
              <dl className={styles.recipe}>
                <div>
                  <dt>Coffee</dt>
                  <dd>15g</dd>
                </div>
                <div>
                  <dt>Water</dt>
                  <dd>250g</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>2:45–3:15</dd>
                </div>
              </dl>
              <p>One repeatable starting point for bright, aromatic coffees.</p>
              <Button href="/brew-guides/v60-clear-sweet" variant="secondary">
                Read the method
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
