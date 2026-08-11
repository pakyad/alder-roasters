import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button, Container, Section } from "../components/ui";
import { coffees } from "../content/coffees";
import styles from "../features/home/editorial.module.css";
import { formatMoney } from "../lib/money";

export const metadata: Metadata = {
  title: "Coffee, made clear",
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
        <Image
          className={styles.heroImage}
          src="/images/editorial/hero-roastery.webp"
          alt="A coffee roaster working beside an ALDER roasting machine"
          fill
          priority
          sizes="100vw"
        />
        <Container className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">Seasonal coffee · Petaling Jaya</p>
            <h1>Coffee, made clear.</h1>
            <p className="lead">
              A small seasonal range, carefully roasted and explained in language you can actually
              use.
            </p>
            <div className={styles.heroActions}>
              <Button href="/shop">Shop current coffees</Button>
              <Link href="/story">Why ALDER exists</Link>
            </div>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className={styles.sectionHeader}>
            <div>
              <p className="eyebrow">The seasonal edit</p>
              <h2>Three good places to begin</h2>
            </div>
            <Link href="/shop">See all coffees</Link>
          </div>
          <div className={styles.grid3}>
            {featured.map((coffee) => (
              <Link className={styles.coffeeCard} href={`/shop/${coffee.slug}`} key={coffee.id}>
                <p className="eyebrow">
                  {coffee.origin.country} · {coffee.process}
                </p>
                <h3>{coffee.name}</h3>
                <p>{coffee.taste.summary}</p>
                <span className={styles.price}>From {formatMoney(coffee.sizes[0].price)}</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="dark">
        <Container>
          <div className={styles.darkIntro}>
            <p className="eyebrow">Quietly exact</p>
            <h2>Care you can see. Knowledge you can use.</h2>
            <p className="lead">
              We roast to make each coffee legible, then give you the recipe and context to enjoy it
              on your own terms.
            </p>
            <Link href="/story">Read our story</Link>
          </div>
          <div className={styles.principles}>
            <div>
              <h3>Small by design</h3>
              <p>
                A compact range follows harvests instead of pretending every coffee lasts forever.
              </p>
            </div>
            <div>
              <h3>Taste first</h3>
              <p>Plain-language flavour guides come before scores, jargon or performance.</p>
            </div>
            <div>
              <h3>A recipe for every bag</h3>
              <p>Specific, tested starting points make a better first cup more likely.</p>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="paper">
        <Container>
          <div className={styles.split}>
            <Image
              className={styles.editorialImage}
              src="/images/guides/pour-over.webp"
              alt="A measured pour-over brew in warm morning light"
              width={1200}
              height={900}
            />
            <div>
              <p className="eyebrow">Brew with confidence</p>
              <h2>A clear, sweet V60</h2>
              <p className="lead">
                15g coffee. 250g water. One calm recipe for bright, aromatic coffees.
              </p>
              <Button href="/brew-guides/v60-clear-sweet" variant="secondary">
                Follow the guide
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
