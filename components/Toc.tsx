import type { Heading } from "@/lib/types";

export default function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="table of contents"
      className="mt-10 border-l border-[var(--color-line)] pl-5"
    >
      <p className="text-[10px] tracking-[0.22em] text-[var(--color-muted)] uppercase">contents</p>
      <ol className="mt-3 space-y-1.5 text-[13px] leading-[1.5]">
        {headings.map((h) => (
          <li
            key={h.id}
            className={h.depth === 3 ? "pl-4 text-[var(--color-muted)]" : "text-[var(--color-ink-soft)]"}
          >
            <a
              href={`#${h.id}`}
              className="transition-colors hover:text-[var(--color-seal)]"
            >
              {h.text.toLowerCase()}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
