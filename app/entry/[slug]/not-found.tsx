import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[640px] px-6 pt-24 pb-32">
      <p className="text-[11px] tracking-[0.18em] text-[var(--color-muted)]">
        § codex · 404
      </p>
      <h1 className="mt-8 text-[40px] leading-none tracking-[-0.02em]">
        no such entry.
      </h1>
      <p className="mt-4 text-[14px] text-[var(--color-ink-soft)]">
        the page you looked for is not in the index.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-[13px] border-b border-[var(--color-line)] hover:border-[var(--color-seal)] hover:text-[var(--color-seal)] transition-colors"
      >
        ← back to index
      </Link>
    </main>
  );
}
