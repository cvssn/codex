import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { addPhoto, deletePhoto, listPhotos } from "@/lib/photos";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export async function GET() {
  const photos = await listPhotos();
  return NextResponse.json({ photos });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "invalid form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file too large (max 10mb)" }, { status: 413 });
  }
  if (file.type && !ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "unsupported file type" }, { status: 415 });
  }

  const title = String(form.get("title") ?? "").slice(0, 120);
  const caption = String(form.get("caption") ?? "").slice(0, 1000);
  const dateTaken = String(form.get("dateTaken") ?? "").slice(0, 10);
  const location = String(form.get("location") ?? "").slice(0, 120);

  try {
    const photo = await addPhoto({ file, title, caption, dateTaken, location });
    return NextResponse.json({ photo }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const ok = await deletePhoto(id);
  if (!ok) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
