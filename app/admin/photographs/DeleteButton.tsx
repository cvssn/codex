"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function trigger() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      setError(null);
      try {
        const res = await fetch(`/api/photographs?id=${encodeURIComponent(id)}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          setError(typeof j?.error === "string" ? j.error : "delete failed");
          setConfirming(false);
          return;
        }
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "delete failed");
        setConfirming(false);
      }
    });
  }

  const label = pending
    ? "removing…"
    : error
      ? "retry"
      : confirming
        ? "confirm?"
        : "remove";

  return (
    <button
      type="button"
      onClick={trigger}
      disabled={pending}
      title={error ?? undefined}
      className={`text-[11px] tracking-[0.16em] transition-colors disabled:opacity-50 ${
        confirming || error
          ? "text-[var(--color-seal)]"
          : "text-[var(--color-muted)] hover:text-[var(--color-seal)]"
      }`}
    >
      {label}
    </button>
  );
}
