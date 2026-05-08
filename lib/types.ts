export type Category = "guide" | "note" | "resource" | "technology" | "study" | "idea";

export const CATEGORIES: { key: Category; plural: string; glyph: string }[] = [
  { key: "guide", plural: "guides", glyph: "◆" },
  { key: "note", plural: "notes", glyph: "▢" },
  { key: "resource", plural: "resources", glyph: "◇" },
  { key: "technology", plural: "technologies", glyph: "◯" },
  { key: "study", plural: "studies", glyph: "▲" },
  { key: "idea", plural: "ideas", glyph: "✦" },
];

export interface EntryMeta {
  slug: string;
  title: string;
  category: Category;
  date: string;
  tags: string[];
  summary: string;
}

export interface Entry extends EntryMeta {
  body: string;
  html: string;
}
