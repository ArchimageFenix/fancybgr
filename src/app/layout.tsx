import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";

import "./globals.css";

import AIAssetCacheBootstrap from "@/components/cache/AIAssetCacheBootstrap";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FancyBGR — Remove Image Backgrounds",
  description:
    "Remove image backgrounds locally in your browser with AI. Your images never leave your device.",
};

const themeScript = `
  (function () {
    try {
      const savedTheme = localStorage.getItem("fancybgr-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      let theme;

      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "fancy"
      ) {
        theme = savedTheme;
      } else {
        theme = prefersDark ? "dark" : "light";
      }

      const isDark =
        theme === "dark" ||
        theme === "fancy";

      document.documentElement.classList.toggle(
        "dark",
        isDark
      );

      document.documentElement.classList.toggle(
        "fancy",
        theme === "fancy"
      );

      document.documentElement.style.colorScheme =
        theme === "light"
          ? "light"
          : "dark";
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>

      <body className={`${manrope.variable} ${sora.variable}`}>
        <AIAssetCacheBootstrap />
        {children}
      </body>
    </html>
  );
}