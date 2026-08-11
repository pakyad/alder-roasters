"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { Container } from "@/components/ui";
import { useCart } from "@/features/cart";

import { Logo } from "./Logo";
import styles from "./Header.module.css";

const primaryLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/subscriptions", label: "Subscriptions" },
  { href: "/story", label: "Our Story" },
  { href: "/brew-guides", label: "Brew Guides" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />
        <button
          className={styles.menuButton}
          type="button"
          aria-controls={menuId}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav
          id={menuId}
          className={`${styles.navigation} ${menuOpen ? styles.open : ""}`.trim()}
          aria-label="Primary navigation"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname?.startsWith(link.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className={styles.utilities} aria-label="Utility navigation">
          <Link href="/search" aria-label="Search" aria-current={pathname === "/search" ? "page" : undefined}>
            Search
          </Link>
          <Link href="/cart" aria-current={pathname === "/cart" ? "page" : undefined}>
            Cart <span aria-label={`${itemCount} items`}>({itemCount})</span>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
