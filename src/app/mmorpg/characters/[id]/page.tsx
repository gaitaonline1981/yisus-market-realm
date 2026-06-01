"use client";

import dynamic from "next/dynamic";

const CharacterProfilePage = dynamic(
  () =>
    import("@/_pages/mmorpg/characters/CharacterProfilePage").then((m) => ({
      default: m.CharacterProfilePage,
    })),
  { ssr: false }
);

export default function Page() {
  return <CharacterProfilePage />;
}
