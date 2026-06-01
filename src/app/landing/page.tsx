"use client";

import dynamic from "next/dynamic";

const LandingPage = dynamic(
  () =>
    import("@/components/LandingPage").then((m) => ({
      default: m.LandingPage,
    })),
  { ssr: false }
);

const BrowserRouter = dynamic(
  () =>
    import("react-router-dom").then((mod) => ({
      default: ({ children }: { children: React.ReactNode }) => (
        <mod.BrowserRouter>{children}</mod.BrowserRouter>
      ),
    })),
  { ssr: false }
);

export default function Page() {
  return (
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  );
}
