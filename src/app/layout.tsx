import type { Metadata } from "next";
import "./globals.css";

import AIAssetCacheBootstrap from "@/components/cache/AIAssetCacheBootstrap";

export const metadata: Metadata = {
  title: "FancyBGR — Remove Image Backgrounds",
  description:
    "Remove image backgrounds locally in your browser with AI. Your images never leave your device.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AIAssetCacheBootstrap />
        {children}
      </body>
    </html>
  );
}