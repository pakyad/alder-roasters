import type { MetadataRoute } from "next";

import { brewGuides, coffees } from "@/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alder-roasters.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/subscriptions",
    "/story",
    "/brew-guides",
    "/location",
    "/faq",
    "/shipping-returns",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...coffees.map((coffee) => ({
      url: `${siteUrl}/shop/${coffee.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...brewGuides.map((guide) => ({
      url: `${siteUrl}/brew-guides/${guide.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
