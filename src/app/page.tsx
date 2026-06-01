"use client";

import dynamic from "next/dynamic";

const BrowserRouter = dynamic(
  () =>
    import("react-router-dom").then((mod) => ({
      default: ({ children }: { children: React.ReactNode }) => (
        <mod.BrowserRouter>{children}</mod.BrowserRouter>
      ),
    })),
  { ssr: false }
);

const MMORPGHome = dynamic(
  () =>
    import("@/components/mmorpg/home/MMORPGHome").then((m) => ({
      default: m.MMORPGHome,
    })),
  { ssr: false }
);

export default function Page() {
  return (
    <BrowserRouter>
      <MMORPGHome />
    </BrowserRouter>
  );
}
