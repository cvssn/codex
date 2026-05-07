---
title: postgres full-text search
category: technology
date: 2026-04-04
tags: [postgres, search, sql]
summary: tsvector, tsquery, gin indexes, and when to skip elasticsearch entirely
---

## the primitives

- `tsvector` — a document parsed into lexemes
- `tsquery` — a search query in the same lexeme space
- the `@@` operator — matches a tsquery against a tsvector

```sql
select id, title
from articles
where to_tsvector('english', title || ' ' || body)
  @@ plainto_tsquery('english', 'server components');
```

## make it fast

a generated column plus a gin index turns the whole thing into an index lookup:

```sql
alter table articles
  add column search tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'a') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'b')
  ) stored;

create index articles_search_idx on articles using gin (search);
```

## ranking and snippets

- `ts_rank` and `ts_rank_cd` for relevance scores
- `ts_headline` for highlighted excerpts (slow on big bodies — generate offline if you can)

## when not to

if you need fuzzy matching, faceting, or huge corpora, reach for meilisearch, typesense, or elasticsearch. for an app that already runs postgres and has under a million documents, fts is the right call.
