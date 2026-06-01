import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Crypto Lunaticos Terminal",
  description: "Trading Terminal MMORPG",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-realm-bg text-realm-text antialiased">{children}</body>
    </html>
  );
}
