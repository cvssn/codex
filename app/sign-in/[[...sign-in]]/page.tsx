import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "sign in",
  description: "sign in to codex",
};

export default function SignInPage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center px-6 py-20">
      <Link
        href="/"
        className="absolute top-6 left-6 text-[11px] tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-seal)]"
      >
        ← § codex
      </Link>

      <header className="mb-10 text-center">
        <h1 className="text-[40px] leading-none font-medium tracking-[-0.025em]">sign in</h1>
        <p className="mt-3 text-[12px] tracking-[0.06em] text-[var(--color-muted)]">
          welcome back to your shelf.
        </p>
      </header>

      <SignIn
        signUpUrl="/sign-up"
        forceRedirectUrl="/admin"
        fallbackRedirectUrl="/admin"
      />
    </main>
  );
}
