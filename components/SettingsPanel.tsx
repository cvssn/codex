"use client";

import { useEffect, useState } from "react";

type Theme = "paper" | "ink";
type Toggle = "on" | "off";
type Motion = "full" | "reduced";
type Contrast = "normal" | "high";
type Density = "compact" | "regular" | "loose";
type Symbols = "glyph" | "icon";

interface Settings {
  theme: Theme;
  grain: Toggle;
  motion: Motion;
  contrast: Contrast;
  density: Density;
  symbols: Symbols;
}

const DEFAULTS: Settings = {
  theme: "paper",
  grain: "on",
  motion: "full",
  contrast: "normal",
  density: "regular",
  symbols: "glyph",
};

const STORAGE_KEY = "codex:settings";

function applyToDom(s: Settings) {
  if (typeof document === "undefined") return;
  const h = document.documentElement;
  h.dataset.theme = s.theme;
  h.dataset.grain = s.grain;
  h.dataset.motion = s.motion;
  h.dataset.contrast = s.contrast;
  h.dataset.density = s.density;
  h.dataset.symbols = s.symbols;
}

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
    applyToDom(loaded);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyToDom(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings, mounted]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function reset() {
    setSettings(DEFAULTS);
  }

  return (
    <>
      <button
        type="button"
        aria-label="open settings"
        onClick={() => setOpen(true)}
        className="fixed top-5 right-5 z-30 w-9 h-9 flex items-center justify-center rounded-[2px] border border-[var(--color-line)] bg-[var(--color-paper-soft)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-soft)] transition-colors"
      >
        <span className="text-[15px] select-none" data-keep-case>
          ⚙
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 fade"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(26,24,20,0.35)" }}
          />
          <aside
            role="dialog"
            aria-label="settings"
            className="absolute top-0 right-0 h-full w-full max-w-[380px] border-l border-[var(--color-ink-soft)] flex flex-col"
            style={{
              backgroundColor: "var(--color-paper-raised)",
              boxShadow: "-24px 0 48px -16px rgba(26,24,20,0.45)",
            }}
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-line)]">
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] tracking-[0.22em] text-[var(--color-muted)]">
                  §
                </span>
                <h2 className="text-[14px] tracking-[0.18em] text-[var(--color-ink)]">
                  settings
                </h2>
              </div>
              <button
                type="button"
                aria-label="close settings"
                onClick={() => setOpen(false)}
                className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors text-sm"
                data-keep-case
              >
                esc ×
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
              <Group label="appearance">
                <Row label="theme" hint="paper is light. ink is dark.">
                  <Segmented
                    value={settings.theme}
                    onChange={(v) => update("theme", v as Theme)}
                    options={[
                      { value: "paper", label: "paper" },
                      { value: "ink", label: "ink" },
                    ]}
                  />
                </Row>

                <Row label="grain" hint="subtle paper noise overlay.">
                  <Segmented
                    value={settings.grain}
                    onChange={(v) => update("grain", v as Toggle)}
                    options={[
                      { value: "on", label: "on" },
                      { value: "off", label: "off" },
                    ]}
                  />
                </Row>

                <Row label="density" hint="how spacious entries feel.">
                  <Segmented
                    value={settings.density}
                    onChange={(v) => update("density", v as Density)}
                    options={[
                      { value: "compact", label: "compact" },
                      { value: "regular", label: "regular" },
                      { value: "loose", label: "loose" },
                    ]}
                  />
                </Row>

                <Row
                  label="symbols"
                  hint="glyph uses geometric shapes. icon uses minimal line art."
                >
                  <Segmented
                    value={settings.symbols}
                    onChange={(v) => update("symbols", v as Symbols)}
                    options={[
                      { value: "glyph", label: "glyph" },
                      { value: "icon", label: "icon" },
                    ]}
                  />
                </Row>
              </Group>

              <Group label="accessibility">
                <Row
                  label="motion"
                  hint="reduced disables rise and fade animations."
                >
                  <Segmented
                    value={settings.motion}
                    onChange={(v) => update("motion", v as Motion)}
                    options={[
                      { value: "full", label: "full" },
                      { value: "reduced", label: "reduced" },
                    ]}
                  />
                </Row>

                <Row
                  label="contrast"
                  hint="high boosts ink and hairline contrast."
                >
                  <Segmented
                    value={settings.contrast}
                    onChange={(v) => update("contrast", v as Contrast)}
                    options={[
                      { value: "normal", label: "normal" },
                      { value: "high", label: "high" },
                    ]}
                  />
                </Row>
              </Group>

              <Group label="functionality">
                <Row label="reset" hint="restore all settings to defaults.">
                  <button
                    type="button"
                    onClick={reset}
                    className="px-3 py-1.5 text-[12px] tracking-[0.12em] border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors rounded-[2px]"
                  >
                    restore defaults
                  </button>
                </Row>
              </Group>
            </div>

            <footer className="px-6 py-4 border-t border-[var(--color-line)] text-[10px] tracking-[0.18em] text-[var(--color-muted)] flex items-baseline justify-between">
              <span>§ saved locally</span>
              <span data-keep-case>codex</span>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-[0.22em] text-[var(--color-muted)]">
          {label}
        </span>
        <span className="flex-1 h-px bg-[var(--color-line)]" />
      </div>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-[var(--color-ink)]">{label}</span>
        {children}
      </div>
      {hint && (
        <span className="text-[11px] text-[var(--color-muted)] leading-relaxed">
          {hint}
        </span>
      )}
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="inline-flex border border-[var(--color-line)] rounded-[2px] overflow-hidden">
      {options.map((opt, i) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 text-[11px] tracking-[0.1em] transition-colors ${
              i > 0 ? "border-l border-[var(--color-line)]" : ""
            } ${
              active
                ? "bg-[var(--color-paper-active)] text-[var(--color-ink)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
