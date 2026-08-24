import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageTransition } from "../../../components/motion/PageTransition";
import { reveal } from "../../../components/motion/reveal";
import { Container } from "../../../components/ui";
import { breadcrumbJsonLd, JsonLd, productJsonLd } from "../../../components/seo/JsonLd";
import { nearestTasteMatch } from "../../../domain/archive";
import type { Coffee } from "../../../domain/coffee";
import { coffees, getCoffeeBySlug } from "../../../content/coffees";
import { PurchaseConfigurator } from "../../../features/catalogue";
import { GrindAdvice } from "../../../features/shop/GrindAdvice";
import { PackageViewer } from "../../../features/shop/PackageViewer";
import { RoastWeekPanel } from "../../../features/shop/RoastWeekPanel";
import styles from "./page.module.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alder-roasters.example";

export function generateStaticParams() {
  return coffees.map((coffee) => ({ slug: coffee.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const coffee = getCoffeeBySlug((await params).slug);
  if (!coffee) return {};
  return {
    title: `${coffee.name} coffee`,
    description: coffee.taste.summary,
    openGraph: { title: `${coffee.name} — ALDER ROASTERS`, description: coffee.taste.summary },
  };
}

function statusLabel(coffee: Coffee): string {
  if (coffee.archived) return "Archived — past season";
  return coffee.status === "available"
    ? "Available"
    : coffee.status === "low-stock"
      ? "Low stock"
      : "Sold out";
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const coffee = getCoffeeBySlug((await params).slug);
  if (!coffee) notFound();
  const match = coffee.archived ? nearestTasteMatch(coffee, coffees) : null;
  const storyChapters = [
    { label: "Place", body: coffee.story.place },
    { label: "Process", body: coffee.story.process },
    { label: "Roast", body: coffee.story.roast },
    { label: "Cup", body: coffee.story.cup },
  ];

  return (
    <PageTransition>
      <div
        className={styles.main}
        style={{ "--bag-hue": coffee.packageHue } as React.CSSProperties}
      >
        <JsonLd
          data={productJsonLd({
            name: `${coffee.name} — ${coffee.origin.country} ${coffee.process} coffee`,
            description: coffee.taste.summary,
            url: `${siteUrl}/shop/${coffee.slug}`,
            imageSrc: `${siteUrl}/images/products/coffee-bag-master.webp`,
            brand: "ALDER ROASTERS",
            offers: coffee.sizes.map((size) => ({
              priceAmount: size.price.amount,
              grams: size.grams,
              url: `${siteUrl}/shop/${coffee.slug}`,
            })),
            availability:
              coffee.status === "available"
                ? "InStock"
                : coffee.status === "low-stock"
                  ? "LowStock"
                  : "SoldOut",
          })}
          id={`product-jsonld-${coffee.id}`}
        />
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Shop", url: `${siteUrl}/shop` },
            { name: coffee.name, url: `${siteUrl}/shop/${coffee.slug}` },
          ])}
          id={`breadcrumb-jsonld-${coffee.id}`}
        />
        <Container>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/shop" transitionTypes={["nav-back"]}>
              Shop
            </Link>{" "}
            <span aria-hidden="true">/</span> <span aria-current="page">{coffee.name}</span>
          </nav>
          {coffee.archived && (
            <aside className={styles.archiveBanner}>
              <p>
                <strong>{coffee.name} has finished its season.</strong> The story stays up because
                good lots deserve a record. When a similar lot returns, it will appear here.
              </p>
              {match && (
                <p className={styles.matchLine}>
                  Closest cup on the shelf right now:{" "}
                  <Link href={`/shop/${match.coffee.slug}`}>{match.coffee.name}</Link> —{" "}
                  {match.coffee.taste.summary}
                </p>
              )}
            </aside>
          )}
          <section className={styles.hero}>
            <div
              className={`${styles.gallery} entrance-media`}
              aria-label={`${coffee.name} packaging`}
            >
              <PackageViewer coffee={coffee} />
            </div>
            <div
              className={`${styles.summary} entrance`}
              style={{ "--entrance-delay": "140ms" } as React.CSSProperties}
            >
              <p className={styles.origin}>
                {coffee.origin.country} · {coffee.origin.region}
              </p>
              <h1>{coffee.name}</h1>
              <p className={styles.taste}>{coffee.taste.summary}</p>
              <p className={styles.availability} data-status={coffee.status}>
                {statusLabel(coffee)}
              </p>
              {!coffee.archived && (
                <>
                  <PurchaseConfigurator coffee={coffee} />
                  <GrindAdvice coffee={coffee} />
                </>
              )}
            </div>
          </section>
          <dl className={styles.facts}>
            <div>
              <dt>Producer</dt>
              <dd>{coffee.producer}</dd>
            </div>
            <div>
              <dt>Process</dt>
              <dd>{coffee.process}</dd>
            </div>
            <div>
              <dt>Altitude</dt>
              <dd>
                {coffee.altitudeMetres[0]}–{coffee.altitudeMetres[1]}m
              </dd>
            </div>
            <div>
              <dt>Varieties</dt>
              <dd>{coffee.varieties.join(", ")}</dd>
            </div>
          </dl>

          <section
            className={styles.storyRail}
            aria-label={`The story of ${coffee.name}`}
            {...reveal(0)}
          >
            <p className="eyebrow">From place to cup</p>
            <h2>One continuous story.</h2>
            <ol className={styles.chapters}>
              {storyChapters.map((chapter, index) => (
                <li className={styles.chapter} key={chapter.label} {...reveal(index + 1)}>
                  <span className={styles.chapterMark}>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{chapter.label}</h3>
                    <p>{chapter.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.roastIntent}>
              <strong>Roast intent:</strong> {coffee.roastIntent}
            </p>
          </section>

          <div className={styles.lowerGrid}>
            <section aria-label="Taste profile" className={styles.profile} {...reveal(0)}>
              <p className="eyebrow">In the cup</p>
              <h2>How {coffee.name} drinks.</h2>
              <ul className={styles.tasteList}>
                {coffee.taste.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <dl className={styles.axes}>
                <div>
                  <dt>Taste position</dt>
                  <dd>
                    {describePosition(
                      coffee.taste.coordinates.brightComforting,
                      coffee.taste.coordinates.delicateFull,
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Best brewed for</dt>
                  <dd>{coffee.brewMethods.join(", ")}</dd>
                </div>
              </dl>
              {coffee.relatedGuideSlugs.length > 0 && (
                <p>
                  Brew it properly:{" "}
                  {coffee.relatedGuideSlugs.map((slug, index) => (
                    <span key={slug}>
                      {index > 0 && " · "}
                      <Link href={`/brew-guides/${slug}`}>Read the guide</Link>
                    </span>
                  ))}
                </p>
              )}
            </section>
            <RoastWeekPanel />
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}

function describePosition(x: number, y: number): string {
  const xWord = x < 3.5 ? "bright" : x > 6.5 ? "comforting" : "balanced";
  const yWord = y < 3.5 ? "delicate" : y > 6.5 ? "full" : "medium-bodied";
  return `Leans ${xWord} and ${yWord}.`;
}
