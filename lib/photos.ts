import "server-only";
import { put, del, list } from "@vercel/blob";
import type { Photo } from "@/lib/types";

const MANIFEST_PATHNAME = "photos/manifest.json";

async function fetchManifest(): Promise<Photo[]> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATHNAME, limit: 1 });
    const manifestBlob = blobs.find((b) => b.pathname === MANIFEST_PATHNAME);
    if (!manifestBlob) return [];
    const res = await fetch(manifestBlob.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as Photo[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeManifest(photos: Photo[]): Promise<void> {
  await put(MANIFEST_PATHNAME, JSON.stringify(photos, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

export async function listPhotos(): Promise<Photo[]> {
  const photos = await fetchManifest();
  return photos
    .slice()
    .sort((a, b) => (a.postedAt < b.postedAt ? 1 : a.postedAt > b.postedAt ? -1 : 0));
}

export async function addPhoto(input: {
  file: File;
  title: string;
  caption: string;
  dateTaken: string;
  location: string;
}): Promise<Photo> {
  const ext = input.file.name.split(".").pop()?.toLowerCase() || "jpg";
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const pathname = `photos/${id}.${ext}`;

  const uploaded = await put(pathname, input.file, {
    access: "public",
    contentType: input.file.type || undefined,
    addRandomSuffix: false,
    allowOverwrite: false,
  });

  const photo: Photo = {
    id,
    url: uploaded.url,
    pathname: uploaded.pathname,
    title: input.title.trim(),
    caption: input.caption.trim(),
    dateTaken: input.dateTaken,
    location: input.location.trim(),
    postedAt: new Date().toISOString(),
  };

  const current = await fetchManifest();
  current.push(photo);
  await writeManifest(current);

  return photo;
}

export async function deletePhoto(id: string): Promise<boolean> {
  const current = await fetchManifest();
  const target = current.find((p) => p.id === id);
  if (!target) return false;

  try {
    await del(target.url);
  } catch {
    // blob may already be gone; continue manifest cleanup
  }

  const next = current.filter((p) => p.id !== id);
  await writeManifest(next);
  return true;
}
