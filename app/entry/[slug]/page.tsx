import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllMeta, getEntryBySlug } from "@/lib/content";
import CategoryMark from "@/components/CategoryMark";

export async function generateStaticParams() {
  return getAllMeta().map((m) => ({ slug: m.slug }));
}

const MONTHS_LONG = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = MONTHS_LONG[parseInt(mo, 10) - 1] ?? mo;
  return `${parseInt(d, 10)} ${month} ${y}`;
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);
  if (!entry) notFound();

  return (
    <main className="relative mx-auto max-w-[680px] px-6 pt-12 pb-32">
      <nav className="flex items-baseline justify-between text-[11px] tracking-[0.18em] text-[var(--color-muted)]">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:text-[var(--color-seal)]"
        >
          <span className="select-none">←</span>
          <span>codex</span>
        </Link>
        <span>{entry.category}</span>
      </nav>

      <hr className="mt-3 border-0 border-t border-[var(--color-line)]" />

      <article className="rise mt-14">
        <div className="flex items-center gap-3 text-[11px] tracking-[0.16em] text-[var(--color-muted)]">
          <span className="text-[var(--color-seal)] select-none">
            <CategoryMark category={entry.category} size={14} />
          </span>
          <span>{entry.category}</span>
          <span>·</span>
          <span>{fmtDate(entry.date)}</span>
        </div>

        <h1 className="mt-5 text-[40px] leading-[1.1] font-medium tracking-[-0.02em]">
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

      <footer className="mt-24 flex items-baseline justify-between border-t border-[var(--color-line)] pt-6 text-[10px] tracking-[0.18em] text-[var(--color-muted)]">
        <Link href="/" className="transition-colors hover:text-[var(--color-seal)]">
          ← index
        </Link>
        <span>§ codex</span>
      </footer>
    </main>
  );
}
