## codex

> a personal index. a quiet shelf for notes, guides, resources, ideas, studies, and the technologies you keep returning to.

a file-based personal knowledge base. markdown in, static site out. designed to feel like a printed reference manual — warm paper, jetbrains mono, lowercase, no clutter.

---

### why

most knowledge tools optimize for capture. codex optimizes for return. the things you've already learned, written down once, and want to find again — fast.

- one folder per category, one markdown file per entry
- fuzzy search across titles, summaries, tags, categories
- everything renders statically; no database, no auth, no deploy step beyond `next build`

---

### stack

- next.js 15 · app router · static export friendly
- react 19
- tailwind css 4 (`@theme` tokens, no config file)
- typescript 5
- unified · remark-parse · remark-gfm · remark-rehype · rehype-stringify
- gray-matter for frontmatter
- fuse.js for fuzzy search

---

### structure

```
app/
  page.tsx              homepage — masthead, search, recent, browse
  entry/[slug]/page.tsx individual entry page
  globals.css           design tokens + prose-codex typography
components/
  SearchBar.tsx         fuzzy search w/ keyboard nav (cmd+k)
content/
  guides/               long-form how-tos
  notes/                short fragments and reminders
  resources/            external links worth keeping
  technologies/         tools, libraries, platforms
  studies/              deeper dives, research notes
  ideas/                speculative, in-progress
lib/
  content.ts            file reading, parsing, indexing
  types.ts              entry shape + category metadata
```

---

### getting started

```bash
npm install
npm run dev          # http://localhost:4317
npm run build && npm start
```

---

### adding an entry

create a markdown file inside any `content/<category>/` folder:

```markdown
---
title: react server components
category: guide
date: 2026-04-26
tags: [react, rsc, next]
summary: a quick mental model for when to reach for a server component.
---

your prose here. gfm supported. fenced code blocks rendered with prose-codex styles.
```

`slug` is derived from the filename. order on the homepage is by `date` desc.

---

### design

warm paper palette, all lowercase ui, no emojis, jetbrains mono nerd font. tokens live in `app/globals.css` under `@theme`:

```
--color-paper        #efeae0   page bg
--color-paper-soft   #f6f2e9   subtle hover
--color-paper-deep   #e6e0d2   deeper surfaces
--color-paper-raised #fbf7ec   floating popovers (search dropdown)
--color-paper-active #d9d2c0   selected item
--color-ink          #1a1814   primary text
--color-ink-soft     #3a352d   secondary text
--color-muted        #8a8478   meta / labels
--color-muted-soft   #b0a99a   tertiary
--color-line         #c9c2b3   hairlines
--color-line-soft    #ddd6c5   inner separators
--color-seal         #7a3d1f   accent — links, selection, focus
```

categories are denoted by single glyphs (◆ ▢ ◇ ◯ ▲ ✦) instead of icons.

---

### keyboard

| key     | action              |
| ------- | ------------------- |
| `cmd+k` | focus search        |
| `↑ ↓`   | navigate results    |
| `↵`     | open selected entry |
| `esc`   | close search        |

---

### roadmap

- tag pages
- category filter on `?cat=`
- backlinks between entries
- rss feed of recent entries
- self-host on a vps behind tailscale

---

### license

personal. no license — fork freely, use at your own risk.

§ lucas · codex
