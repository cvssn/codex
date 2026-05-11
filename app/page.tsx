import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import SearchBar from "@/components/SearchBar";
import CategoryMark from "@/components/CategoryMark";
import { getAllMeta, getCountsByCategory } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

const MONTHS_SHORT = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
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
          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="transition-colors hover:text-[var(--color-seal)]"
              >
                sign in
              </Link>
              <span aria-hidden className="text-[var(--color-line)]">·</span>
              <Link
                href="/sign-up"
                className="transition-colors hover:text-[var(--color-seal)]"
              >
                sign up
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/admin"
                className="transition-colors hover:text-[var(--color-seal)]"
              >
                admin
              </Link>
              <UserButton />
            </Show>
            <span data-keep-case>v0.1</span>
          </div>
        </div>
        <hr className="mt-3 border-0 border-t border-[var(--color-line)]" />

        <h1 className="mt-12 text-[64px] leading-none font-medium tracking-[-0.025em]">codex</h1>
        <p className="mt-5 max-w-[42ch] text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
          a personal index. a quiet shelf for notes, guides, resources, ideas, studies, and the
          technologies you keep returning to.
        </p>
        <p className="mt-2 text-[11px] tracking-[0.16em] text-[var(--color-muted)]">
          <span>{total}</span>
          <span> entries · last updated </span>
          <span>{fmtDate(all[0]?.date ?? "")}</span>
        </p>
      </header>

      {/* Search */}
      <section className="rise mt-14" style={{ animationDelay: "120ms" }}>
        <SearchBar entries={all} />
      </section>

      {/* Recent */}
      <section className="rise mt-20" style={{ animationDelay: "240ms" }}>
        <SectionHeading label="recent" />
        <ol className="mt-6 space-y-1">
          {recent.map((m, i) => (
            <li key={m.slug}>
              <Link
                href={`/entry/${m.slug}`}
                className="group -mx-2 grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 rounded-[2px] px-2 py-2.5 transition-colors hover:bg-[var(--color-paper-soft)]"
              >
                <span
                  data-keep-case
                  className="text-[11px] tracking-[0.16em] text-[var(--color-muted)] tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-[15px] transition-colors group-hover:text-[var(--color-seal)]">
                    {m.title}
                  </span>
                  <span className="text-[11px] tracking-[0.06em] text-[var(--color-muted)]">
                    {m.category} · {fmtDate(m.date)}
                  </span>
                </span>
                <span className="text-sm text-[var(--color-muted-soft)] transition-colors select-none group-hover:text-[var(--color-seal)]">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Browse */}
      <section className="rise mt-20" style={{ animationDelay: "360ms" }}>
        <SectionHeading label="browse" />
        <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-1 sm:grid-cols-2">
          {CATEGORIES.map((c) => {
            const n = counts[c.key];
            return (
              <li key={c.key}>
                <Link href={`/?cat=${c.plural}`} className="group flex items-baseline gap-3 py-2.5">
                  <span className="w-3 text-center text-[var(--color-muted)] transition-colors select-none group-hover:text-[var(--color-seal)]">
                    <CategoryMark category={c.key} size={14} />
                  </span>
                  <span className="text-[14px] transition-colors group-hover:text-[var(--color-seal)]">
                    {c.plural}
                  </span>
                  <span className="leader h-3 flex-1 self-end" aria-hidden />
                  <span className="text-[12px] text-[var(--color-muted)] tabular-nums transition-colors group-hover:text-[var(--color-ink)]">
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
        className="rise mt-28 flex items-baseline justify-between border-t border-[var(--color-line)] pt-6 text-[10px] tracking-[0.18em] text-[var(--color-muted)]"
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
      <span className="text-[11px] tracking-[0.22em] text-[var(--color-muted)]">{label}</span>
      <span className="h-px flex-1 bg-[var(--color-line)]" />
    </div>
  );
}
