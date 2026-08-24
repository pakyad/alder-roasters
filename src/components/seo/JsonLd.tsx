type JsonValue = Record<string, unknown>;

/** Renders a schema.org JSON-LD block. Only pass serialisable data. */
export function JsonLd({ data, id }: { data: JsonValue; id: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
      id={id}
      type="application/ld+json"
    />
  );
}

export function productJsonLd(input: {
  name: string;
  description: string;
  url: string;
  imageSrc: string;
  brand: string;
  offers: readonly { priceAmount: number; grams: number; url: string }[];
  availability: "InStock" | "LowStock" | "SoldOut";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: [input.imageSrc],
    brand: { "@type": "Brand", name: input.brand },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "MYR",
      lowPrice: Math.min(...input.offers.map((offer) => offer.priceAmount)) / 100,
      highPrice: Math.max(...input.offers.map((offer) => offer.priceAmount)) / 100,
      offerCount: input.offers.length,
      offers: input.offers.map((offer) => ({
        "@type": "Offer",
        priceCurrency: "MYR",
        price: offer.priceAmount / 100,
        availability: `https://schema.org/${input.availability}`,
        url: input.url,
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    author: { "@type": "Organization", name: input.author },
    mainEntityOfPage: input.url,
  };
}
