import Link from "next/link";

import { Container } from "@/components/ui";

import styles from "./Announcement.module.css";

export function Announcement() {
  return (
    <aside className={styles.bar} aria-label="Store announcement">
      <Container className={styles.inner}>
        <p>Complimentary delivery in Malaysia on orders over RM120.</p>
        <Link href="/shipping-returns">Shipping details</Link>
      </Container>
    </aside>
  );
}
