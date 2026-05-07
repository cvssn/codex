import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { getAllMeta, getCountsByCategory } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

const MONTHS_SHORT = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = MONTHS_SHORT[parseInt(mo, 10) - 1] ?? mo;
  return `${d} ${month} ${y}`;
}

export default function Home() {
  const all = getAllMeta();
  const recent = all.slice(0, 6);
  const counts = getCountsByCategory();
  const total = all.length;

  return (
    <main className="relative mx-auto max-w-[640px] px-6 pt-20 pb-32">
      {/* Masthead */}
      <header className="rise" style={{ animationDelay: "0ms" }}>
        <div className="flex items-baseline justify-between text-[11px] tracking-[0.18em] text-[var(--color-muted)]">
          <span>§ codex</span>
          <span data-keep-case>v0.1</span>
        </div>
        <hr className="mt-3 border-0 border-t border-[var(--color-line)]" />

        <h1 className="mt-12 text-[64px] leading-none tracking-[-0.025em] font-medium">
          codex
        </h1>
        <p className="mt-5 text-[14px] leading-relaxed text-[var(--color-ink-soft)] max-w-[42ch]">
          a personal index. a quiet shelf for notes, guides, resources, ideas,
          studies, and the technologies you keep returning to.
        </p>
        <p className="mt-2 text-[11px] tracking-[0.16em] text-[var(--color-muted)]">
          <span>{total}</span>
          <span> entries · last updated </span>
          <span>{fmtDate(all[0]?.date ?? "")}</span>
        </p>
      </header>

      {/* Search */}
      <section className="mt-14 rise" style={{ animationDelay: "120ms" }}>
        <SearchBar entries={all} />
      </section>

      {/* Recent */}
      <section className="mt-20 rise" style={{ animationDelay: "240ms" }}>
        <SectionHeading label="recent" />
        <ol className="mt-6 space-y-1">
          {recent.map((m, i) => (
            <li key={m.slug}>
              <Link
                href={`/entry/${m.slug}`}
                className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 px-2 -mx-2 py-2.5 rounded-[2px] transition-colors hover:bg-[var(--color-paper-soft)]"
              >
                <span
                  data-keep-case
                  className="text-[11px] tracking-[0.16em] text-[var(--color-muted)] tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[15px] truncate transition-colors group-hover:text-[var(--color-seal)]">
                    {m.title}
                  </span>
                  <span className="text-[11px] tracking-[0.06em] text-[var(--color-muted)]">
                    {m.category} · {fmtDate(m.date)}
                  </span>
                </span>
                <span className="text-[var(--color-muted-soft)] group-hover:text-[var(--color-seal)] transition-colors text-sm select-none">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Browse */}
      <section className="mt-20 rise" style={{ animationDelay: "360ms" }}>
        <SectionHeading label="browse" />
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
          {CATEGORIES.map((c) => {
            const n = counts[c.key];
            return (
              <li key={c.key}>
                <Link
                  href={`/?cat=${c.plural}`}
                  className="group flex items-baseline gap-3 py-2.5"
                >
                  <span className="text-[var(--color-muted)] w-3 text-center select-none transition-colors group-hover:text-[var(--color-seal)]">
                    {c.glyph}
                  </span>
                  <span className="text-[14px] transition-colors group-hover:text-[var(--color-seal)]">
                    {c.plural}
                  </span>
                  <span className="flex-1 leader self-end h-3" aria-hidden />
                  <span className="text-[12px] tabular-nums text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-colors">
                    {String(n).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Footer */}
      <footer
        className="mt-28 pt-6 border-t border-[var(--color-line)] flex items-baseline justify-between text-[10px] tracking-[0.18em] text-[var(--color-muted)] rise"
        style={{ animationDelay: "480ms" }}
      >
        <span>§ lucas · codex</span>
        <span data-keep-case>2026</span>
      </footer>
    </main>
  );
}

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] tracking-[0.22em] text-[var(--color-muted)]">
        {label}
      </span>
      <span className="flex-1 h-px bg-[var(--color-line)]" />
    </div>
  );
}
