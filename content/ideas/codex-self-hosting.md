---
title: codex self-hosting
category: idea
date: 2026-04-26
tags: [codex, infra, self-host]
summary: a small plan for running this index from a personal server with sync from a markdown vault
---

## the want

a single source of truth for everything i've learned, written, or saved. searchable from any device, editable from a real text editor, never locked into someone else's product.

## the shape

- markdown vault on disk, synced via syncthing or git
- this codex app, served from a tiny vps, building from the vault on push
- a small webhook turns `git push` into a rebuild
- sqlite cache of parsed entries for fast cold start

## open questions

- inline backlinks vs explicit `[[wiki-link]]` syntax — which holds up after 3 years of use?
- do i want comments on entries, or is the silence the point?
- does the search need synonyms, or is fuzzy enough?

## next step

ship the read-only version, live with it for a month, _then_ decide what to add. resist the temptation to scaffold a feature i don't know i need.
