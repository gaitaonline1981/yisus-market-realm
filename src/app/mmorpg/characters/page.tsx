"use client";

import dynamic from "next/dynamic";

const CharactersPage = dynamic(() => import("@/_pages/mmorpg/characters/CharactersPage").then((m) => ({ default: m.CharactersPage })), { ssr: false });

export default function Page() {
  return <CharactersPage />;
}
