import Link from "next/link";
import { Button, Container, Section } from "../components/ui";
import styles from "../features/home/editorial.module.css";
export default function NotFound() {
  return (
    <Section spacing="generous">
      <Container size="narrow">
        <div className={styles.pageHero}>
          <p className="eyebrow">404 · Page not found</p>
          <h1>This path has gone out of season.</h1>
          <p className="lead text-secondary">
            The coffee or page may have moved, or the address may be incomplete. The current range
            and brew guides are still close by.
          </p>
          <div className={styles.heroActions}>
            <Button href="/shop">Browse current coffees</Button>
            <Link href="/brew-guides">Explore brew guides</Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
