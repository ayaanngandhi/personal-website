import type { MetadataRoute } from "next";

/**
 * Sitemap, generated at build time.
 *
 * Only canonical, indexable pages are listed. /links is deliberately absent: it
 * carries `robots: { index: false }` in its layout, and a sitemap that advertises
 * a noindex URL sends the crawler a contradictory signal.
 *
 * Every URL ends in a slash because next.config.ts sets `trailingSlash: true` —
 * the no-slash form 308-redirects, and a sitemap full of redirects wastes crawl
 * budget and splits signals. Keep this list in step with the routes in src/app.
 */
const BASE = "https://ayaanngandhi.in";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/projects/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/contact/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
