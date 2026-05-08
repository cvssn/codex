import type { Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface Props {
  category: Category | string;
  className?: string;
  size?: number;
}

const ICON_STROKE = 1.4;

function Icon({ category, size = 14 }: { category: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: ICON_STROKE,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (category) {
    case "guide":
      return (
        <svg {...common}>
          <path d="M2 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z" />
          <path d="M22 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z" />
        </svg>
      );
    case "note":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case "resource":
      return (
        <svg {...common}>
          <path d="M9.5 14.5l5-5" />
          <path d="M14 7.5l1.5-1.5a3.5 3.5 0 0 1 5 5L19 12.5" />
          <path d="M10 16.5l-1.5 1.5a3.5 3.5 0 0 1-5-5L5 11.5" />
        </svg>
      );
    case "technology":
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="1.5" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case "study":
      return (
        <svg {...common}>
          <path d="M9 3h6" />
          <path d="M10 3v6.5L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9.5V3" />
          <path d="M7 15h10" />
        </svg>
      );
    case "idea":
      return (
        <svg {...common}>
          <path d="M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4z" />
          <path d="M19 17v3M17.5 18.5h3" />
          <path d="M5 16v2M4 17h2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
  }
}

function glyphFor(cat: string): string {
  return CATEGORIES.find((c) => c.key === cat)?.glyph ?? "·";
}

export default function CategoryMark({
  category,
  className = "",
  size = 14,
}: Props) {
  return (
    <span className={`category-mark inline-flex items-center justify-center ${className}`}>
      <span className="mark-glyph" aria-hidden>
        {glyphFor(category)}
      </span>
      <span className="mark-icon" aria-hidden>
        <Icon category={category} size={size} />
      </span>
    </span>
  );
}
