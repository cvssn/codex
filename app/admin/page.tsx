import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllMeta, getCountsByCategory } from "@/lib/content";
import { CATEGORIES } from "@/lib/types";

export const metadata: Metadata = {
  title: "admin",
  description: "codex admin dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await currentUser();
  const all = getAllMeta();
  const counts = getCountsByCategory();

  const greeting =
    user?.firstName?.toLowerCase() ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress.split("@")[0] ||
    "you";

  return (
    <>
      <section className="rise mt-14" style={{ animationDelay: "120ms" }}>
        <h1 className="text-[40px] leading-none font-medium tracking-[-0.025em]">
          welcome, {greeting}.
        </h1>
        <p className="mt-4 max-w-[42ch] text-[13px] leading-relaxed text-[var(--color-ink-soft)]">
          a private workspace. drafts, stats, and tools live here. content stays in{" "}
          <code className="rounded-[2px] bg-[var(--color-paper-soft)] px-1 py-0.5 text-[12px]">
            content/
          </code>{" "}
          as markdown — edit, commit, deploy.
        </p>
      </section>

      <section className="rise mt-16" style={{ animationDelay: "240ms" }}>
        <SectionHeading label="overview" />
        <dl className="mt-6 grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">
          <Stat label="entries" value={all.length} />
          <Stat label="categories" value={CATEGORIES.length} />
          <Stat
            label="latest"
            value={all[0]?.date?.slice(0, 10) ?? "—"}
            mono
          />
        </dl>
      </section>

      <section className="rise mt-16" style={{ animationDelay: "360ms" }}>
        <SectionHeading label="by category" />
        <ul className="mt-6 space-y-1">
          {CATEGORIES.map((c) => (
            <li
              key={c.key}
              className="flex items-baseline gap-3 py-1.5 text-[13px]"
            >
              <span className="w-24 text-[var(--color-muted)]">{c.plural}</span>
              <span className="leader h-3 flex-1 self-end" aria-hidden />
              <span className="text-[var(--color-muted)] tabular-nums">
                {String(counts[c.key] ?? 0).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rise mt-16" style={{ animationDelay: "480ms" }}>
        <SectionHeading label="account" />
        <ul className="mt-6 space-y-2 text-[13px]">
          <Row label="email" value={user?.primaryEmailAddress?.emailAddress ?? "—"} />
          <Row
            label="username"
            value={user?.username ?? user?.firstName?.toLowerCase() ?? "—"}
          />
          <Row
            label="joined"
            value={
              user?.createdAt
                ? new Date(user.createdAt).toISOString().slice(0, 10)
                : "—"
            }
          />
        </ul>
      </section>

      <footer
        className="rise mt-24 flex items-baseline justify-between border-t border-[var(--color-line)] pt-6 text-[10px] tracking-[0.18em] text-[var(--color-muted)]"
        style={{ animationDelay: "600ms" }}
      >
        <Link href="/" className="transition-colors hover:text-[var(--color-seal)]">
          ← back to index
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

function Stat({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-[10px] tracking-[0.18em] text-[var(--color-muted)]">{label}</dt>
      <dd
        className={`mt-1 text-[24px] font-medium tracking-tight ${mono ? "tabular-nums" : ""}`}
        data-keep-case={mono ? "" : undefined}
      >
        {value}
      </dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-baseline gap-3">
      <span className="w-20 text-[11px] tracking-[0.12em] text-[var(--color-muted)]">
        {label}
      </span>
      <span className="leader h-3 flex-1 self-end" aria-hidden />
      <span data-keep-case className="text-[var(--color-ink-soft)]">
        {value}
      </span>
    </li>
  );
}
