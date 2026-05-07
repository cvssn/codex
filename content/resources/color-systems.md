---
title: color systems for interfaces
category: resource
date: 2026-01-28
tags: [design, color, oklch]
summary: oklch, contrast, and how to build a palette that scales beyond a single screen
---

## start in oklch

`oklch` is a perceptually-uniform color space. unlike hsl, equal lightness steps look equal. it solves the gray-band problem when you tween across hues.

```css
:root {
  --bg: oklch(0.97 0.01 85);
  --fg: oklch(0.20 0.01 85);
  --accent: oklch(0.50 0.12 35);
}
```

## think in semantic layers

bg → surface → border → fg → muted → accent. label by role, not by color name. `--blue-500` is a number; `--accent` is a decision.

## contrast targets

- body text against bg: at least 7:1 (wcag aaa)
- ui text and icons: at least 4.5:1 (wcag aa)
- decorative borders: 1.5:1 is usually enough

## tools

- [oklch.com](https://oklch.com) — interactive picker
- [contrast.tools](https://contrast.tools) — apca + wcag checks
- [huetone](https://huetone.ardov.me) — palette curve editor

## a habit

before adding a new color, ask whether weight, size, or spacing can carry the meaning instead. they almost always can.
