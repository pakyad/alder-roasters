import type { Metadata } from "next";
import Image from "next/image";

import { PageTransition } from "../../components/motion/PageTransition";
import { reveal } from "../../components/motion/reveal";
import { Button, Container, Section } from "../../components/ui";
import { location } from "../../content/location";
import styles from "../../features/home/editorial.module.css";

export const metadata: Metadata = {
  title: "Visit the roastery",
  description: "Fictional ALDER roastery and tasting room details in Petaling Jaya.",
};

export default function LocationPage() {
  return (
    <PageTransition>
      <Section spacing="generous">
        <Container>
          <div className={styles.pageHero} {...reveal(0)}>
            <p className="eyebrow">Visit</p>
            <h1>
              Roastery &<br />
              tasting room
            </h1>
            <p className="lead text-secondary">
              Coffee at the bar, bags from the current roast and a clear view into the work behind
              both.
            </p>
          </div>
        </Container>
      </Section>
      <Image
        src="/images/editorial/hero-roastery.webp"
        alt="Inside the fictional ALDER roastery and tasting room"
        width={1800}
        height={1000}
        style={{ width: "100%", maxHeight: "44rem", objectFit: "cover" }}
      />
      <Section>
        <Container>
          <div className={styles.locationDetails}>
            <div {...reveal(0)}>
              <h2>{location.name}</h2>
              <address>
                {location.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </address>
              <div style={{ marginTop: "var(--space-6)" }}>
                <Button href={location.mapUrl} variant="secondary">
                  View presentation coordinates
                </Button>
              </div>
            </div>
            <div {...reveal(1)}>
              <h2>Opening hours</h2>
              {location.hours.map((hours) => (
                <p key={hours.days}>
                  <strong>{hours.days}</strong>
                  <br />
                  {hours.times}
                </p>
              ))}
            </div>
            <div {...reveal(2)}>
              <h2>Getting here</h2>
              <p>{location.transit}</p>
              <p>{location.parking}</p>
            </div>
            <div {...reveal(3)}>
              <h2>Access</h2>
              <p>{location.accessibility}</p>
              <p>
                <strong>Amenities:</strong> {location.amenities.join(", ")}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="pandan-wash">
        <Container size="narrow" {...reveal(0)}>
          <p className="eyebrow">The cupping table</p>
          <h2>First Saturdays, ten sharp.</h2>
          <p>
            Once a month we set out the current range and taste it together, publicly. No
            experience required — you smell, slurp and say what you notice. We explain what in the
            variety, process or roast might have caused it, and nothing more formal than that.
          </p>
          <dl className={styles.recipe}>
            <div>
              <dt>When</dt>
              <dd>First Saturday, 10:00–11:30</dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd>Free, walk in</dd>
            </div>
            <div>
              <dt>Seats</dt>
              <dd>Twelve at the long table</dd>
            </div>
          </dl>
        </Container>
      </Section>
      <Section tone="oat" spacing="compact">
        <Container size="narrow">
          <p>
            <strong>Portfolio note:</strong> {location.disclosure}
          </p>
        </Container>
      </Section>
    </PageTransition>
  );
}
