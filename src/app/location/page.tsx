import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, Section } from "../../components/ui";
import { location } from "../../content/location";
import styles from "../../features/home/editorial.module.css";
export const metadata: Metadata = {
  title: "Visit the roastery",
  description: "Fictional ALDER roastery and tasting room details in Petaling Jaya.",
};
export default function LocationPage() {
  return (
    <>
      <Section spacing="generous">
        <Container>
          <div className={styles.pageHero}>
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
            <div>
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
            <div>
              <h2>Opening hours</h2>
              {location.hours.map((hours) => (
                <p key={hours.days}>
                  <strong>{hours.days}</strong>
                  <br />
                  {hours.times}
                </p>
              ))}
            </div>
            <div>
              <h2>Getting here</h2>
              <p>{location.transit}</p>
              <p>{location.parking}</p>
            </div>
            <div>
              <h2>Access</h2>
              <p>{location.accessibility}</p>
              <p>
                <strong>Amenities:</strong> {location.amenities.join(", ")}.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section tone="oat" spacing="compact">
        <Container size="narrow">
          <p>
            <strong>Portfolio note:</strong> {location.disclosure}
          </p>
        </Container>
      </Section>
    </>
  );
}
