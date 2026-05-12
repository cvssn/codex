import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Show, UserButton } from "@clerk/nextjs";
import { listPhotos } from "@/lib/photos";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "photographs",
  description: "a quiet shelf of photographs.",
  alternates: { canonical: `${getSiteUrl()}/photographs` },
  openGraph: {
    title: `photographs · ${SITE_NAME}`,
    description: "a quiet shelf of photographs.",
    url: `${getSiteUrl()}/photographs`,
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export default async function PhotographsPage() {
  const photos = await listPhotos();

  return (
    <main className="relative mx-auto max-w-[640px] px-6 pt-20 pb-32">
      <header className="rise" style={{ animationDelay: "0ms" }}>
        <div className="flex items-baseline justify-between text-[11px] tracking-[0.18em] text-[var(--color-muted)]">
          <Link href="/" className="transition-colors hover:text-[var(--color-seal)]">
            § codex / photographs
          </Link>
          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="transition-colors hover:text-[var(--color-seal)]"
              >
                sign in
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/admin/photographs"
                className="transition-colors hover:text-[var(--color-seal)]"
              >
                post
              </Link>
              <UserButton />
            </Show>
            <span data-keep-case>v0.1</span>
          </div>
        </div>
        <hr className="mt-3 border-0 border-t border-[var(--color-line)]" />

        <h1 className="mt-12 text-[64px] leading-none font-medium tracking-[-0.025em]">
          photographs
        </h1>
        <p className="mt-5 max-w-[42ch] text-[14px] leading-relaxed text-[var(--color-ink-soft)]">
          a quiet shelf of stills. ordered by when they were posted, not when they were taken.
        </p>
        <p className="mt-2 text-[11px] tracking-[0.16em] text-[var(--color-muted)]">
          <span>{photos.length}</span>
          <span> photographs</span>
        </p>
      </header>

      <section className="rise mt-20" style={{ animationDelay: "120ms" }}>
        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <ol className="space-y-20">
            {photos.map((p, i) => (
              <li
                key={p.id}
                className="rise"
                style={{ animationDelay: `${Math.min(i * 80, 480)}ms` }}
              >
                <figure>
                  <div className="relative overflow-hidden bg-[var(--color-paper-soft)]">
                    <Image
                      src={p.url}
                      alt={p.title || "untitled"}
                      width={1280}
                      height={853}
                      sizes="(max-width: 640px) 100vw, 640px"
                      className="h-auto w-full"
                      priority={i === 0}
                    />
                  </div>
                  <figcaption className="mt-4 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-4 text-[13px]">
                      <span className="truncate">{p.title || "untitled"}</span>
                      <span className="text-[11px] tracking-[0.12em] whitespace-nowrap text-[var(--color-muted)]">
                        {fmtDate(p.postedAt)}
                      </span>
                    </div>
                    {p.caption && (
                      <p className="max-w-[56ch] text-[12px] leading-relaxed text-[var(--color-ink-soft)]">
                        {p.caption}
                      </p>
                    )}
                    <div className="mt-1 flex items-baseline gap-3 text-[10px] tracking-[0.18em] text-[var(--color-muted)]">
                      {p.location && <span>{p.location}</span>}
                      {p.location && p.dateTaken && (
                        <span aria-hidden className="text-[var(--color-line)]">·</span>
                      )}
                      {p.dateTaken && <span>taken {fmtDate(p.dateTaken)}</span>}
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        )}
      </section>

      <footer
        className="rise mt-28 flex items-baseline justify-between border-t border-[var(--color-line)] pt-6 text-[10px] tracking-[0.18em] text-[var(--color-muted)]"
        style={{ animationDelay: "600ms" }}
      >
        <Link href="/" className="transition-colors hover:text-[var(--color-seal)]">
          ← back to index
        </Link>
        <span data-keep-case>2026</span>
      </footer>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="border-t border-[var(--color-line)] pt-10">
      <p className="text-[13px] text-[var(--color-ink-soft)]">
        nothing here yet. the shelf is bare.
      </p>
      <Show when="signed-in">
        <Link
          href="/admin/photographs"
          className="mt-4 inline-block text-[11px] tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-seal)]"
        >
          post the first →
        </Link>
      </Show>
    </div>
  );
}
