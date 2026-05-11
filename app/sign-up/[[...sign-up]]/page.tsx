import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "sign up",
  description: "create a codex account",
};

export default function SignUpPage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center px-6 py-20">
      <Link
        href="/"
        className="absolute top-6 left-6 text-[11px] tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-seal)]"
      >
        ← § codex
      </Link>

      <header className="mb-10 text-center">
        <h1 className="text-[40px] leading-none font-medium tracking-[-0.025em]">sign up</h1>
        <p className="mt-3 text-[12px] tracking-[0.06em] text-[var(--color-muted)]">
          claim a quiet corner of the index.
        </p>
      </header>

      <SignUp
        signInUrl="/sign-in"
        forceRedirectUrl="/admin"
        fallbackRedirectUrl="/admin"
      />
    </main>
  );
}
