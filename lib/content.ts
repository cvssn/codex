import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import type { Category, Entry, EntryMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

function listMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listMarkdownFiles(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function normalizeDate(value: unknown): string {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value);
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return s;
}

function parseFile(filePath: string): { meta: EntryMeta; body: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path
    .basename(filePath, ".md")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-");
  const meta: EntryMeta = {
    slug,
    title: String(data.title ?? slug).toLowerCase(),
    category: (data.category as Category) ?? "note",
    date: normalizeDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map((t: unknown) => String(t)) : [],
    summary: String(data.summary ?? "").toLowerCase(),
  };
  return { meta, body: content };
}

let _allMeta: EntryMeta[] | null = null;

export function getAllMeta(): EntryMeta[] {
  if (_allMeta) return _allMeta;
  const files = listMarkdownFiles(CONTENT_DIR);
  const items = files.map((f) => parseFile(f).meta);
  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  _allMeta = items;
  return items;
}

export async function getEntryBySlug(slug: string): Promise<Entry | null> {
  const files = listMarkdownFiles(CONTENT_DIR);
  for (const file of files) {
    const { meta, body } = parseFile(file);
    if (meta.slug === slug) {
      const html = String(await processor.process(body));
      return { ...meta, body, html };
    }
  }
  return null;
}

export function getCountsByCategory(): Record<Category, number> {
  const counts: Record<Category, number> = {
    guide: 0,
    note: 0,
    resource: 0,
    technology: 0,
    study: 0,
    idea: 0,
  };
  for (const m of getAllMeta()) counts[m.category]++;
  return counts;
}
