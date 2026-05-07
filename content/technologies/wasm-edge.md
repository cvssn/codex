---
title: wasm at the edge
category: technology
date: 2026-02-26
tags: [wasm, edge, runtime]
summary: why webassembly is winning the cold-start race for edge functions
---

## the constraint

cold start. v8 isolates start in a couple of milliseconds. node containers take seconds. for code that runs near the user, every millisecond is a tax on every request.

## why wasm fits

- compiled, deterministic, sandboxed by design
- starts in microseconds on a fresh isolate
- portable across runtimes: cloudflare workers, fastly, deno deploy, fermyon spin

## the wasi piece

wasi (webassembly system interface) is the standard system call layer. wasi preview 2 adds component model support — pieces of code that import and export typed interfaces, regardless of source language.

## what works today

- rust, go (tinygo), zig, c++ all compile cleanly
- typescript via javy or quickjs-bound runtimes
- networking, storage, and key-value bindings differ per platform

## what doesn't yet

- threading is partial; shared memory is platform-specific
- dynamic loading of native libraries is mostly unavailable
- debugging tooling is improving but still rough compared to node
