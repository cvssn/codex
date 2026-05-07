---
title: zod 4 migration notes
category: note
date: 2026-04-18
tags: [typescript, validation, zod]
summary: small breakages to watch when moving an existing schema codebase to zod 4
---

## what bit me

- `z.string().email()` is now a method on a top-level `z.email()` shape. the old chain still works but the new one composes better
- `.transform()` no longer infers the output type in the same place; explicit type annotations are sometimes required
- the `errorMap` api was renamed; the migration guide has a codemod

## handy commands

```bash
npx zod-migrate@latest .
```

it isn't perfect — review the diff before committing.

## a useful pattern

co-locate the schema and the inferred type in the same file:

```ts
export const User = z.object({
  id: z.uuid(),
  email: z.email(),
  createdAt: z.date(),
});

export type User = z.infer<typeof User>;
```

import the type from the same module the schema lives in, and you'll never have to reach for `as` casts at the boundary.
