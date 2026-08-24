import { ImageResponse } from "next/og";

import { coffees, getCoffeeBySlug } from "../../../content/coffees";

export const alt = "ALDER ROASTERS coffee";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Per-coffee OG card tinted with the same hue that drives the packaging. */
export default async function CoffeeOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const coffee = getCoffeeBySlug((await params).slug);
  if (!coffee) return new ImageResponse(<div style={{ display: "flex" }}>Not found</div>, size);
  const hue = coffee.packageHue;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f7f4ec",
          color: "#20302a",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 10 }}>ALDER ROASTERS</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#5a6b60", display: "flex", fontSize: 32, marginBottom: 18 }}>
            {coffee.origin.country} · {coffee.process}
          </div>
          <div style={{ display: "flex", fontSize: 96 }}>{coffee.name}</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 22, maxWidth: 900 }}>
            {coffee.taste.notes.join(" · ")}
          </div>
        </div>
        <div
          style={{
            backgroundColor: `hsl(${hue}deg 45% 42%)`,
            bottom: 0,
            height: 14,
            left: 0,
            position: "absolute",
            width: "100%",
          }}
        />
      </div>
    ),
    size,
  );
}

export function generateStaticParams() {
  return coffees.map((coffee) => ({ slug: coffee.slug }));
}
