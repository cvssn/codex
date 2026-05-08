import type { Metadata } from "next";
import "./globals.css";
import SettingsPanel from "@/components/SettingsPanel";

export const metadata: Metadata = {
  title: "codex",
  description: "a personal index of notes, guides, resources, ideas",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: initSettingsScript }} />
      </head>
      <body className="grain">
        {children}
        <SettingsPanel />
      </body>
    </html>
  );
}
