import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zimbabwe Adventure Tours",
  description: "Discover the Beauty of Zimbabwe - Amazing tours and adventures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
