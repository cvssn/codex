---
title: tailwind v4 css-first config
category: note
date: 2026-02-14
tags: [tailwind, css, tooling]
summary: how the @theme directive replaces tailwind.config.ts and what stays the same
---

## the change

tailwind v4 ships with a css-first configuration model. instead of a `tailwind.config.ts` file, theme tokens live inside an `@theme` block in your css.

```css
@import "tailwindcss";

@theme {
  --color-paper: #efeae0;
  --color-ink: #1a1814;
  --font-display: "iA Writer Quattro", serif;
  --tracking-tight: -0.02em;
}
```

every token becomes a css variable _and_ a utility (`bg-paper`, `text-ink`, `font-display`, `tracking-tight`).

## what stays

- jit mode still scans the source for class names
- arbitrary values (`bg-[#abcdef]`) still work
- variants, modifiers, container queries — all unchanged

## what changed quietly

- `@apply` still exists but is discouraged; prefer composing utilities in the markup
- the `theme()` function is replaced by direct css variable references: `var(--color-ink)`
- postcss config is reduced to one line: `"@tailwindcss/postcss": {}`

## why it's nice

tokens become first-class css. you can read them in devtools, override them in a media query, expose them to a `@property` declaration for animation. the build is faster too.
