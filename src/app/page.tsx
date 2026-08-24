import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Steam } from "../components/motion/Steam";
import { reveal } from "../components/motion/reveal";
import { PageTransition } from "../components/motion/PageTransition";
import { Button, Container, Section } from "../components/ui";
import { coffees } from "../content/coffees";
import type { Coffee } from "../domain/coffee";
import { ProductBag } from "../features/catalogue/ProductBag";
import styles from "../features/home/editorial.module.css";
import { FlightFinder } from "../features/shop/FlightFinder";
import { NewsletterForm } from "../features/home/NewsletterForm";
import { TasteMapExplorer } from "../features/taste/TasteMapExplorer";
import { formatMoney } from "../lib/money";

export const metadata: Metadata = {
  title: "Seasonal coffee from Petaling Jaya",
  description:
    "Seasonal specialty coffee roasted in Petaling Jaya, with practical guidance for every bag.",
};

export default function HomePage() {
  const featured = (coffees as readonly Coffee[])
    .filter((coffee) => !coffee.archived && coffee.featuredRank !== null)
    .toSorted((left, right) => Number(left.featuredRank) - Number(right.featuredRank))
    .slice(0, 4);

  return (
    <PageTransition>
      <section className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={`${styles.kicker} entrance`}>Independent roaster / Petaling Jaya</p>
            <h1 className="entrance" style={{ "--entrance-delay": "90ms" } as React.CSSProperties}>
              Coffee from the current harvest.
            </h1>
            <p
              className={`lead entrance`}
              style={{ "--entrance-delay": "180ms" } as React.CSSProperties}
            >
              Seven coffees, roasted in small batches. Each one comes with a plain tasting note and
              a tested place to start brewing.
            </p>
            <div
              className={styles.heroActions}
              style={{ "--entrance-delay": "270ms" } as React.CSSProperties}
            >
              <Button href="/shop" transitionTypes={["nav-forward"]}>
                See the coffee
              </Button>
              <Link href="/story" transitionTypes={["nav-forward"]}>
                How we roast →
              </Link>
            </div>
          </div>
          <figure
            className={`${styles.heroMedia} entrance-media`}
            style={{ "--entrance-delay": "150ms" } as React.CSSProperties}
          >
            <Image
              className={styles.heroImage}
              src="/images/editorial/hero-roastery.webp"
              alt="A coffee roaster working beside an ALDER roasting machine"
              fill
              priority
              sizes="(max-width: 48rem) 100vw, 58vw"
            />
            <Steam />
            <figcaption>
              <span>Roasted in Petaling Jaya</span>
              <span>Small batches / weekly</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      <Section>
        <Container>
          <div className={styles.sectionHeader} {...reveal(0)}>
            <div>
              <p className={styles.kicker}>On the shelf</p>
              <h2>Current coffees</h2>
            </div>
            <Link href="/shop" transitionTypes={["nav-forward"]}>
              All seven coffees →
            </Link>
          </div>
          <div className={styles.coffeeIndex}>
            {featured.map((coffee, index) => (
              <Link
                className={styles.coffeeRow}
                href={`/shop/${coffee.slug}`}
                key={coffee.id}
                transitionTypes={["nav-forward"]}
                {...reveal(index + 1, { "--row-hue": coffee.packageHue } as React.CSSProperties)}
              >
                <span className={styles.rowNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.rowOrigin}>
                  {coffee.origin.country}
                  <small>{coffee.process}</small>
                </span>
                <span className={styles.rowName}>{coffee.name}</span>
                <span className={styles.rowTaste}>{coffee.taste.notes.join(" / ")}</span>
                <span className={styles.price}>{formatMoney(coffee.sizes[0].price)}</span>
                <span aria-hidden="true" className={styles.rowBag}>
                  <ProductBag bare coffee={coffee} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="oat">
        <Container>
          <div className={styles.sectionHeader} {...reveal(0)}>
            <div>
              <p className={styles.kicker}>Find your taste</p>
              <h2>Choose by how it drinks.</h2>
            </div>
          </div>
          <p className={`${styles.sectionIntro} lead`} {...reveal(1)}>
            Two simple dials — bright to comforting, delicate to full. No jargon, no quiz; just the
            range arranged around your preference.
          </p>
          <TasteMapExplorer coffees={coffees} />
        </Container>
      </Section>

      <Section className={styles.workingNote} data-header-tone="dark" tone="pandan">
        <Steam intensity={0.7} />
        <Container className={styles.noteGrid}>
          <p className={styles.noteLabel} {...reveal(0)}>
            How we work
          </p>
          <h2 {...reveal(1)}>
            Buy for taste.
            <br />
            Brew from a recipe.
          </h2>
          <div className={styles.noteCopy} {...reveal(2)}>
            <p>We keep the range short enough to know every coffee properly.</p>
            <p>
              Origin and process stay visible, but the first description is always about the cup.
            </p>
            <Link href="/story" transitionTypes={["nav-forward"]}>
              About the roastery →
            </Link>
          </div>
        </Container>
      </Section>

      <Section tone="cherry-wash">
        <Container>
          <div className={styles.split}>
            <div className={styles.guideCopy} {...reveal(0)}>
              <p className={styles.kicker}>Subscriptions</p>
              <h2>Coffee that keeps up with you.</h2>
              <dl className={styles.recipe}>
                <div>
                  <dt>Plans</dt>
                  <dd>Roaster&rsquo;s Choice or one fixed coffee</dd>
                </div>
                <div>
                  <dt>Every</dt>
                  <dd>2 or 4 weeks</dd>
                </div>
                <div>
                  <dt>Pause anytime</dt>
                  <dd>Before each dispatch</dd>
                </div>
              </dl>
              <p>
                Your first box shows exactly what ships, when it roasts and what recurs — before you
                commit to anything.
              </p>
              <Button href="/subscriptions" transitionTypes={["nav-forward"]}>
                Configure a plan
              </Button>
            </div>
            <div className={styles.nextBox} {...reveal(1)}>
              <p className={styles.kicker}>Example next box</p>
              <ul className={styles.boxLines}>
                <li>2 × 250g bags, whole bean or ground</li>
                <li>Roasted Tuesday, dispatched Thursday</li>
                <li>Brew card with a tested recipe</li>
                <li>From RM52.20 per delivery · 10% off shelf price</li>
              </ul>
              <p className={styles.boxFoot}>
                Terms are plain on purpose: skip, pause or cancel before the next dispatch.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className={styles.sectionHeader} {...reveal(0)}>
            <div>
              <p className={styles.kicker}>Not sure where to start?</p>
              <h2>Build a tasting flight.</h2>
            </div>
          </div>
          <FlightFinder coffees={coffees} />
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
              {...reveal(0)}
            />
            <div className={styles.guideCopy} {...reveal(1)}>
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
              <Button
                href="/brew-guides/v60-clear-sweet"
                transitionTypes={["nav-forward"]}
                variant="secondary"
              >
                Read the method
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="pandan-wash">
        <Container className={styles.visitGrid}>
          <Image
            className={styles.editorialImage}
            src="/images/editorial/hero-roastery.webp"
            alt="The ALDER roastery and tasting room in Petaling Jaya"
            height={900}
            width={1200}
            {...reveal(0)}
          />
          <div {...reveal(1)}>
            <p className={styles.kicker}>Visit / Tasting room</p>
            <h2>The cupping table is open.</h2>
            <p className="text-secondary">
              Every first Saturday, we cup the current range publicly — no experience needed, no
              charge, just clean palates and honest notes. Weekdays the bar pours two coffees black,
              and the roastery works behind glass.
            </p>
            <dl className={styles.recipe}>
              <div>
                <dt>Where</dt>
                <dd>Section 17, Petaling Jaya</dd>
              </div>
              <div>
                <dt>Cupping</dt>
                <dd>First Saturday, 10:00</dd>
              </div>
              <div>
                <dt>Bar hours</dt>
                <dd>Wed–Sun, 9:00–17:00</dd>
              </div>
            </dl>
            <Button href="/location" transitionTypes={["nav-forward"]} variant="secondary">
              Plan a visit
            </Button>
          </div>
        </Container>
      </Section>

      <Section data-header-tone="dark" tone="pandan">
        <Container>
          <NewsletterForm />
        </Container>
      </Section>
    </PageTransition>
  );
}
