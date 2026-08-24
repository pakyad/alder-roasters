import Link from "next/link";

import { Container } from "@/components/ui";
import { BrewSetupControl } from "@/features/brew-profile/BrewSetupControl";

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
            <p>
              Independent coffee roaster.
              <br />
              Petaling Jaya, Malaysia.
            </p>
          </div>
          <dl className={styles.serviceNotes}>
            <div>
              <dt>Roasting</dt>
              <dd>Weekly, in small batches</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>Malaysia / free over RM120</dd>
            </div>
            <div>
              <dt>Questions</dt>
              <dd>
                <Link href="/faq">Read the FAQ</Link>
              </dd>
            </div>
          </dl>
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
          <BrewSetupControl />
          <p>ALDER ROASTERS is a fictional brand created as a portfolio case study. No orders or payments are processed.</p>
          <p>© {new Date().getFullYear()} ALDER ROASTERS · Petaling Jaya, Malaysia</p>
        </div>
      </Container>
    </footer>
  );
}
