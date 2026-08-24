"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type CSSProperties } from "react";

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

/**
 * Site header.
 *
 * Stays anchored during view transitions, condenses once the page scrolls,
 * and reads the tone of the chapter underneath (light paper or dark pandan)
 * so the header always belongs to the section you are in.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-tone]"),
    );
    if (targets.length === 0) {
      const frame = requestAnimationFrame(() => setOnDark(false));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setOnDark(visible[0].target.getAttribute("data-header-tone") === "dark");
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const headerClass = [
    styles.header,
    scrolled ? styles.scrolled : "",
    onDark ? styles.onDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClass} style={{ viewTransitionName: "site-header" } as CSSProperties}>
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
              transitionTypes={["nav-forward"]}
              aria-current={pathname?.startsWith(link.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className={styles.utilities} aria-label="Utility navigation">
          <Link href="/search" transitionTypes={["nav-forward"]} aria-label="Search" aria-current={pathname === "/search" ? "page" : undefined}>
            Search
          </Link>
          <Link
            href="/cart"
            id="header-cart"
            transitionTypes={["nav-forward"]}
            aria-current={pathname === "/cart" ? "page" : undefined}
          >
            Cart{" "}
            <span className={styles.cartCount} key={itemCount} aria-label={`${itemCount} items`}>
              ({itemCount})
            </span>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
