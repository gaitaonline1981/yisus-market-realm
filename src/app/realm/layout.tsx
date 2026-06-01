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

export default function RealmLayout({ children }: { children: React.ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>;
}
