import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

import { Container } from "../../../components/ui";
import { coffees, getCoffeeBySlug } from "../../../content/coffees";
import { ProductBag, PurchaseConfigurator } from "../../../features/catalogue";
import styles from "./page.module.css";

export function generateStaticParams() {
  return coffees.map((coffee) => ({ slug: coffee.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const coffee = getCoffeeBySlug((await params).slug);
  return coffee ? { title: `${coffee.name} coffee`, description: coffee.taste.summary } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const coffee = getCoffeeBySlug((await params).slug);
  if (!coffee) notFound();
  const status =
    coffee.status === "available"
      ? "Available"
      : coffee.status === "low-stock"
        ? "Low stock"
        : "Sold out";
  return (
    <div className={styles.main}>
      <Container>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/shop">Shop</Link> <span aria-hidden="true">/</span>{" "}
          <span aria-current="page">{coffee.name}</span>
        </nav>
        <section className={styles.hero}>
          <div className={styles.gallery} aria-label={`${coffee.name} product image`}>
            <ProductBag coffee={coffee} priority />
          </div>
          <div className={styles.summary}>
            <p className={styles.origin}>
              {coffee.origin.country} · {coffee.origin.region}
            </p>
            <h1>{coffee.name}</h1>
            <p className={styles.taste}>{coffee.taste.summary}</p>
            <p className={styles.availability} data-status={coffee.status}>
              {status}
            </p>
            <PurchaseConfigurator coffee={coffee} />
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
        <section className={styles.story}>
          <div>
            <p className="eyebrow">In the cup</p>
            <h2>Clear character, without the theatre.</h2>
            <ul className={styles.tasteList}>
              {coffee.taste.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className={styles.meters}>
              <div className={styles.meter}>
                <span>Brightness</span>
                <span
                  role="img"
                  aria-label={`Brightness ${coffee.taste.brightness} out of 5`}
                  style={{ "--value": `${coffee.taste.brightness * 20}%` } as CSSProperties}
                />
              </div>
              <div className={styles.meter}>
                <span>Body</span>
                <span
                  role="img"
                  aria-label={`Body ${coffee.taste.body} out of 5`}
                  style={{ "--value": `${coffee.taste.body * 20}%` } as CSSProperties}
                />
              </div>
            </div>
            <p>
              <strong>Best brewed for:</strong> {coffee.brewMethods.join(", ")}.
            </p>
          </div>
          <div>
            <p className="eyebrow">From place to cup</p>
            <h2>
              {coffee.origin.locality}, {coffee.origin.region}
            </h2>
            <p>{coffee.story.place}</p>
            <p>{coffee.story.process}</p>
            <p>{coffee.story.roast}</p>
            <p>{coffee.story.cup}</p>
            <p>
              <strong>Roast intent:</strong> {coffee.roastIntent}
            </p>
          </div>
        </section>
        <aside className={styles.shipping}>
          <h2>Freshly roasted, carefully sent.</h2>
          <p>
            We roast in small batches and pack after resting. Delivery timing is shown at checkout;
            subscriptions recur every four weeks and can be paused or cancelled before the next
            dispatch.
          </p>
        </aside>
      </Container>
    </div>
  );
}
