import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await currentUser();

  const handle =
    user?.username ||
    user?.firstName?.toLowerCase() ||
    user?.primaryEmailAddress?.emailAddress.split("@")[0] ||
    "guest";

  return (
    <main className="relative mx-auto max-w-[640px] px-6 pt-20 pb-32">
      <header className="rise" style={{ animationDelay: "0ms" }}>
        <div className="flex items-baseline justify-between text-[11px] tracking-[0.18em] text-[var(--color-muted)]">
          <Link href="/" className="transition-colors hover:text-[var(--color-seal)]">
            § codex / admin
          </Link>
          <div className="flex items-center gap-3">
            <span data-keep-case className="lowercase">
              {handle}
            </span>
            <UserButton />
          </div>
        </div>
        <hr className="mt-3 border-0 border-t border-[var(--color-line)]" />
      </header>
      {children}
    </main>
  );
}
