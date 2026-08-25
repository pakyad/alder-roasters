import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { Announcement, Footer, Header } from "@/components/layout";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CartDrawer, CartFlight, CartProvider } from "@/features/cart";

import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://alder-roasters.example"),
  title: { default: "ALDER ROASTERS", template: "%s — ALDER ROASTERS" },
  description:
    "Seasonal coffee and practical brew guidance from a fictional Petaling Jaya roastery.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${newsreader.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <CartProvider>
          <ScrollProgress />
          <a className="skip-link" href="#main-content">
            Skip to main content
          </a>
          <Announcement />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <CartFlight />
        </CartProvider>
      </body>
    </html>
  );
}
