import Link from "next/link";
import type { Metadata } from "next";
import { listPhotos } from "@/lib/photos";
import PhotoUploader from "./PhotoUploader";
import DeleteButton from "./DeleteButton";

export const metadata: Metadata = {
  title: "post photographs",
  description: "upload a photograph to the codex shelf",
  robots: { index: false, follow: false },
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

export default async function AdminPhotographsPage() {
  const photos = await listPhotos();

  return (
    <>
      <section className="rise mt-14" style={{ animationDelay: "120ms" }}>
        <h1 className="text-[40px] leading-none font-medium tracking-[-0.025em]">
          post a photograph.
        </h1>
        <p className="mt-4 max-w-[42ch] text-[13px] leading-relaxed text-[var(--color-ink-soft)]">
          upload an image up to 10mb. metadata is optional — title, caption, location, and the date
          it was taken. the posted date is set automatically.
        </p>
      </section>

      <section className="rise mt-12" style={{ animationDelay: "240ms" }}>
        <SectionHeading label="new" />
        <div className="mt-6">
          <PhotoUploader />
        </div>
      </section>

      <section className="rise mt-16" style={{ animationDelay: "360ms" }}>
        <SectionHeading label={`posted · ${photos.length}`} />
        {photos.length === 0 ? (
          <p className="mt-6 text-[12px] text-[var(--color-muted)]">none yet.</p>
        ) : (
          <ul className="mt-6 space-y-1">
            {photos.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-[1fr_auto_auto] items-baseline gap-x-4 py-2 text-[13px]"
              >
                <span className="min-w-0 truncate">
                  {p.title || <span className="text-[var(--color-muted)]">untitled</span>}
                </span>
                <span className="text-[11px] tracking-[0.12em] text-[var(--color-muted)] tabular-nums">
                  {fmtDate(p.postedAt)}
                </span>
                <DeleteButton id={p.id} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer
        className="rise mt-24 flex items-baseline justify-between border-t border-[var(--color-line)] pt-6 text-[10px] tracking-[0.18em] text-[var(--color-muted)]"
        style={{ animationDelay: "480ms" }}
      >
        <Link
          href="/photographs"
          className="transition-colors hover:text-[var(--color-seal)]"
        >
          ← view shelf
        </Link>
        <span data-keep-case>private</span>
      </footer>
    </>
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
