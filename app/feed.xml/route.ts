import { getAllMeta } from "@/lib/content";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_LANG, SITE_NAME, getSiteUrl } from "@/lib/site";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

export async function GET() {
  const base = getSiteUrl();
  const entries = getAllMeta();
  const lastBuildDate = entries[0]?.date ? rfc822(entries[0].date) : new Date().toUTCString();

  const items = entries
    .map((e) => {
      const url = `${base}/entry/${e.slug}`;
      const categories = [e.category, ...e.tags]
        .map((c) => `    <category>${escapeXml(c)}</category>`)
        .join("\n");
      return `  <item>
    <title>${escapeXml(e.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${rfc822(e.date)}</pubDate>
    <description>${escapeXml(e.summary)}</description>
${categories}
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(SITE_NAME)}</title>
  <link>${base}</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>${SITE_LANG}</language>
  <managingEditor>${escapeXml(SITE_AUTHOR)}</managingEditor>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
