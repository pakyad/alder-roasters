import Link from "next/link";

import { Button, Container } from "@/components/ui";

import { Logo } from "./Logo";
import styles from "./Footer.module.css";

const footerGroups = [
  {
    title: "Explore",
    links: [
      ["Shop", "/shop"],
      ["Subscriptions", "/subscriptions"],
      ["Brew Guides", "/brew-guides"],
      ["Our Story", "/story"],
    ],
  },
  {
    title: "Visit",
    links: [
      ["Petaling Jaya roastery", "/location"],
      ["FAQ", "/faq"],
      ["Shipping & returns", "/shipping-returns"],
    ],
  },
  {
    title: "Information",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Search", "/search"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p>Seasonal coffee, roasted with care in Petaling Jaya.</p>
          </div>
          <form className={styles.newsletter} action="#" noValidate>
            <label htmlFor="footer-email">Roastery notes, occasionally.</label>
            <p>
              New coffees and practical brew guidance. This demonstration does not store your email.
            </p>
            <div className={styles.field}>
              <input
                id="footer-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
              <Button type="submit" variant="secondary">
                Join
              </Button>
            </div>
          </form>
        </div>
        <div className={styles.links}>
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} ALDER ROASTERS</p>
          <p>
            ALDER ROASTERS is a fictional brand created as a portfolio case study. No orders or
            payments are processed.
          </p>
        </div>
      </Container>
    </footer>
  );
}
