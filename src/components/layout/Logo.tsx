import Link from "next/link";

import styles from "./Logo.module.css";

export function Logo() {
  return (
    <Link className={styles.logo} href="/" aria-label="ALDER Roasters, home">
      <span>ALDER</span>
      <small>Roasters</small>
    </Link>
  );
}
