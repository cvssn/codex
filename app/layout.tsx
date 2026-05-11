import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import SettingsPanel from "@/components/SettingsPanel";
import { SITE_DESCRIPTION, SITE_NAME, getSiteUrl } from "@/lib/site";
import { clerkAppearance } from "@/lib/clerk-appearance";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: SITE_NAME }],
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

const initSettingsScript = `
try {
  var s = JSON.parse(localStorage.getItem('codex:settings') || '{}');
  var h = document.documentElement;
  h.dataset.theme = s.theme || 'paper';
  h.dataset.grain = s.grain || 'on';
  h.dataset.motion = s.motion || 'full';
  h.dataset.contrast = s.contrast || 'normal';
  h.dataset.density = s.density || 'regular';
  h.dataset.symbols = s.symbols || 'glyph';
} catch(e){}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance} afterSignOutUrl="/">
      <html lang="en" className={jetbrainsMono.variable}>
        <head>
          <script dangerouslySetInnerHTML={{ __html: initSettingsScript }} />
        </head>
        <body className="grain">
          {children}
          <SettingsPanel />
        </body>
      </html>
    </ClerkProvider>
  );
}
