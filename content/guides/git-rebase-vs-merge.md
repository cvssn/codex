---
title: git rebase vs merge
category: guide
date: 2026-03-30
tags: [git, workflow]
summary: when to rewrite history and when to preserve it
---

## the choice

both move your branch onto another. they differ in what the resulting graph looks like.

- **merge** preserves history: every commit lives where it happened, and a merge commit ties two timelines together
- **rebase** rewrites your branch on top of the target: a clean linear history, no merge commit, but every commit is a new commit with a new sha

## a working rule

- private branch, not yet pushed → rebase freely
- branch shared with others, already pushed → merge, or coordinate before force-pushing
- main branch → never rebase or force-push without a very good reason

## small recipes

```bash
# bring your feature branch up to date with main
git fetch origin
git rebase origin/main

# resolve conflicts as they appear
git add .
git rebase --continue

# you changed your mind, abort
git rebase --abort
```

## the why

linear histories are easier to bisect and read. merge histories preserve _what actually happened_, which matters for audit and for branches with many collaborators. pick per repo, document the choice, then stop arguing.
