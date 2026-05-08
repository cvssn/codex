import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SettingsPanel from "@/components/SettingsPanel";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initSettingsScript }} />
      </head>
      <body className="grain">
        {children}
        <SettingsPanel />
      </body>
    </html>
  );
}
