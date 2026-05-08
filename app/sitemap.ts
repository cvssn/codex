import type { MetadataRoute } from "next";
import { getAllMeta } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries = getAllMeta();

  const home: MetadataRoute.Sitemap[number] = {
    url: `${base}/`,
    lastModified: entries[0]?.date ? new Date(entries[0].date) : new Date(),
    changeFrequency: "weekly",
    priority: 1,
  };

  const entryRoutes: MetadataRoute.Sitemap = entries.map((e) => ({
    url: `${base}/entry/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [home, ...entryRoutes];
}
