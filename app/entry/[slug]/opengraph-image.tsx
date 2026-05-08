import { ImageResponse } from "next/og";
import { getEntryBySlug } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "codex entry";

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function fmtDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  return `${parseInt(d, 10)} ${MONTHS[parseInt(mo, 10) - 1]} ${y}`;
}

const PAPER = "#efeae0";
const PAPER_RAISED = "#fbf7ec";
const INK = "#1a1814";
const INK_SOFT = "#3a352d";
const MUTED = "#8a8478";
const LINE = "#c9c2b3";
const SEAL = "#7a3d1f";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryBySlug(slug);

  const title = (entry?.title ?? slug).slice(0, 110);
  const category = entry?.category ?? "note";
  const date = entry?.date ? fmtDate(entry.date) : "";
  const summary = (entry?.summary ?? "").slice(0, 220);
  const tags = (entry?.tags ?? []).slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          fontFamily: "monospace",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* hairline border */}
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: `1px solid ${LINE}`,
            borderRadius: "4px",
            display: "flex",
          }}
        />

        {/* top row: category + date */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            color: MUTED,
            letterSpacing: "0.22em",
            textTransform: "lowercase",
            zIndex: 1,
          }}
        >
          <span style={{ color: SEAL, fontSize: 28, marginRight: 18 }}>§</span>
          <span>{category}</span>
          {date && (
            <>
              <span style={{ margin: "0 14px" }}>·</span>
              <span>{date}</span>
            </>
          )}
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 64 : 88,
            lineHeight: 1.04,
            marginTop: 56,
            color: INK,
            letterSpacing: "-0.02em",
            fontWeight: 500,
            textTransform: "lowercase",
            zIndex: 1,
          }}
        >
          {title}
        </div>

        {/* summary */}
        {summary && (
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.45,
              marginTop: 36,
              color: INK_SOFT,
              textTransform: "lowercase",
              zIndex: 1,
            }}
          >
            {summary}
          </div>
        )}

        {/* tags */}
        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 32,
              fontSize: 18,
              color: MUTED,
              letterSpacing: "0.12em",
              zIndex: 1,
            }}
          >
            {tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        )}

        {/* footer: site mark */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: MUTED,
            letterSpacing: "0.22em",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: PAPER_RAISED,
                border: `1.5px solid ${INK}`,
                borderRadius: 3,
                display: "flex",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 7,
                  background: SEAL,
                  display: "flex",
                }}
              />
            </div>
            <span style={{ color: INK }}>{SITE_NAME}</span>
          </div>
          <span>§</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
