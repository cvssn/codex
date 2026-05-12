"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "uploading" | "success" | "error";

export default function PhotoUploader() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setStatus("error");
      setMessage("choose a file first.");
      return;
    }

    setStatus("uploading");
    setMessage("uploading…");

    try {
      const res = await fetch("/api/photographs", {
        method: "POST",
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errMsg = typeof json?.error === "string" ? json.error : "upload failed";
        setStatus("error");
        setMessage(errMsg);
        return;
      }
      setStatus("success");
      setMessage("posted.");
      form.reset();
      setFileName("");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "upload failed");
    }
  }

  const disabled = status === "uploading";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
      <Field label="file">
        <label
          htmlFor="photo-file"
          className="group flex cursor-pointer items-baseline gap-3 border border-dashed border-[var(--color-line)] px-3 py-3 transition-colors hover:border-[var(--color-seal)]"
        >
          <span className="text-[11px] tracking-[0.18em] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-seal)]">
            choose image
          </span>
          <span className="leader h-3 flex-1 self-end" aria-hidden />
          <span
            data-keep-case
            className="max-w-[18ch] truncate text-[12px] text-[var(--color-ink-soft)]"
            title={fileName || "no file"}
          >
            {fileName || "—"}
          </span>
        </label>
        <input
          ref={fileRef}
          id="photo-file"
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          required
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </Field>

      <Field label="title">
        <TextInput name="title" placeholder="untitled" maxLength={120} />
      </Field>

      <Field label="caption">
        <Textarea name="caption" placeholder="a short note" rows={3} maxLength={1000} />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="date taken">
          <TextInput name="dateTaken" type="date" />
        </Field>
        <Field label="location">
          <TextInput name="location" placeholder="somewhere" maxLength={120} />
        </Field>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          disabled={disabled}
          className="text-[11px] tracking-[0.18em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-seal)] disabled:opacity-50"
        >
          {status === "uploading" ? "posting…" : "post →"}
        </button>
        {message && (
          <span
            className={`text-[11px] tracking-[0.12em] ${
              status === "error"
                ? "text-[var(--color-seal)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            {message}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="text-[10px] tracking-[0.22em] text-[var(--color-muted)]">{label}</div>
      {children}
    </div>
  );
}

function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className="w-full border-0 border-b border-[var(--color-line)] bg-transparent py-1.5 text-[13px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-soft)] focus:border-[var(--color-seal)] focus:outline-none"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full resize-none border-0 border-b border-[var(--color-line)] bg-transparent py-1.5 text-[13px] leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-muted-soft)] focus:border-[var(--color-seal)] focus:outline-none"
    />
  );
}
