"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { EntryMeta } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface Props {
  entries: EntryMeta[];
}

const glyphFor = (cat: string) =>
  CATEGORIES.find((c) => c.key === cat)?.glyph ?? "·";

export default function SearchBar({ entries }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "summary", weight: 0.25 },
          { name: "tags", weight: 0.15 },
          { name: "category", weight: 0.1 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        includeMatches: false,
        minMatchCharLength: 2,
      }),
    [entries]
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [] as EntryMeta[];
    return fuse.search(q, { limit: 8 }).map((r) => r.item);
  }, [query, fuse]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIdx]) {
      window.location.href = `/entry/${results[activeIdx].slug}`;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <label className="flex items-center gap-3 border-b border-[var(--color-line)] pb-3 transition-colors focus-within:border-[var(--color-ink)]">
        <span className="text-[var(--color-muted)] text-sm select-none">⌕</span>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder="search across everything…"
          spellCheck={false}
          autoComplete="off"
          className="w-full bg-transparent text-[15px] placeholder:text-[var(--color-muted)] focus:outline-none"
        />
        <kbd
          data-keep-case
          className="hidden md:inline text-[10px] tracking-[0.16em] text-[var(--color-muted)] border border-[var(--color-line)] px-1.5 py-0.5 rounded-[2px]"
        >
          ⌘K
        </kbd>
      </label>

      {open && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-3 border border-[var(--color-line)] bg-[var(--color-paper-soft)] shadow-[0_18px_40px_-20px_rgba(26,24,20,0.25)] z-20 fade">
          {results.length === 0 ? (
            <div className="px-5 py-6 text-sm text-[var(--color-muted)] flex items-center gap-3">
              <span>·</span>
              <span>nothing matches “{query}”</span>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--color-line-soft)]">
              {results.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    href={`/entry/${r.slug}`}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={`flex items-baseline gap-3 px-5 py-3 transition-colors ${
                      i === activeIdx
                        ? "bg-[var(--color-paper-deep)]"
                        : "hover:bg-[var(--color-paper-deep)]"
                    }`}
                  >
                    <span className="text-[var(--color-muted)] w-4 text-center select-none">
                      {glyphFor(r.category)}
                    </span>
                    <span className="flex-1 truncate text-[14px]">
                      {r.title}
                    </span>
                    <span className="text-[11px] tracking-[0.12em] text-[var(--color-muted)]">
                      {r.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="px-5 py-2 border-t border-[var(--color-line-soft)] flex items-center justify-between text-[10px] tracking-[0.16em] text-[var(--color-muted)]">
            <span data-keep-case>↑↓ navigate</span>
            <span data-keep-case>↵ open</span>
            <span data-keep-case>esc close</span>
          </div>
        </div>
      )}
    </div>
  );
}
