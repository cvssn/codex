---
title: react server components
category: guide
date: 2026-04-22
tags: [react, ssr, framework, next]
summary: when components run on the server and stream html instead of bundling javascript to the client
---

## the shift

react server components (rsc) move the default rendering location to the server. components that don't need interactivity never reach the browser as javascript. the bundle shrinks. the network does less work. the server gets to read filesystems and databases directly.

## what changes

- async components are allowed: `async function Page() { const data = await db.query(...) }`
- no `useState`, no `useEffect`, no event handlers in server components
- to opt into interactivity, mark a file with `"use client"` at the top
- the boundary is the import: a client component can import another client component, never the reverse

## mental model

think of a server component as a function that returns serializable jsx. it produces a payload — not a bundle. the runtime stitches the payload into the page and hydrates only the islands that asked for it.

## traps

- importing a client component into a server component is fine
- importing a server component into a client component is **not** fine; pass it as a `children` prop instead
- third-party libraries that use context need a small client-side wrapper

## further

- [react docs · server components](https://react.dev/reference/rsc/server-components)
- [next.js · app router](https://nextjs.org/docs/app)
