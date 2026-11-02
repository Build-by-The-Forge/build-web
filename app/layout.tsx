import type { Metadata, Viewport } from "next";
import { Archivo, Jost, Space_Mono } from "next/font/google";
import "./globals.css";

const jost = Jost({ subsets: ["latin"], weight: ["500", "800"], variable: "--font-jost", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-archivo", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "BUILD — The AI Companion for University Students",
  description: "Learn, practise and ask questions in one place, and keep going even when the network drops.",
  icons: {
    icon: [{ url: "/mark.webp", type: "image/webp" }],
    shortcut: "/mark.webp",
    apple: "/mark.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${archivo.variable} ${mono.variable}`}>
      <body data-o="none" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
