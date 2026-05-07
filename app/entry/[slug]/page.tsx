import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllMeta, getEntryBySlug } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

export async function generateStaticParams() {
  return getAllMeta().map((m) => ({ slug: m.slug }));
}

const MONTHS_LONG = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = MONTHS_LONG[parseInt(mo, 10) - 1] ?? mo;
  return `${parseInt(d, 10)} ${month} ${y}`;
}

const glyphFor = (cat: string) =>
  CATEGORIES.find((c) => c.key === cat)?.glyph ?? "·";

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);
  if (!entry) notFound();

  return (
    <main className="relative mx-auto max-w-[680px] px-6 pt-12 pb-32">
      <nav className="flex items-baseline justify-between text-[11px] tracking-[0.18em] text-[var(--color-muted)]">
        <Link
          href="/"
          className="hover:text-[var(--color-seal)] transition-colors flex items-center gap-2"
        >
          <span className="select-none">←</span>
          <span>codex</span>
        </Link>
        <span>{entry.category}</span>
      </nav>

      <hr className="mt-3 border-0 border-t border-[var(--color-line)]" />

      <article className="mt-14 rise">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] text-[var(--color-muted)]">
          <span className="text-[var(--color-seal)] select-none">
            {glyphFor(entry.category)}
          </span>
          <span>{entry.category}</span>
          <span>·</span>
          <span>{fmtDate(entry.date)}</span>
        </div>

        <h1 className="mt-5 text-[40px] leading-[1.1] tracking-[-0.02em] font-medium">
          {entry.title}
        </h1>

        {entry.summary && (
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            {entry.summary}
          </p>
        )}

        {entry.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] tracking-[0.1em] text-[var(--color-muted)]">
            {entry.tags.map((t) => (
              <li key={t}>#{t}</li>
            ))}
          </ul>
        )}

        <hr className="mt-10 border-0 border-t border-[var(--color-line)]" />

        <div
          className="prose-codex mt-10 text-[15px] leading-[1.75]"
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      </article>

      <footer className="mt-24 pt-6 border-t border-[var(--color-line)] flex items-baseline justify-between text-[10px] tracking-[0.18em] text-[var(--color-muted)]">
        <Link href="/" className="hover:text-[var(--color-seal)] transition-colors">
          ← index
        </Link>
        <span>§ codex</span>
      </footer>
    </main>
  );
}
