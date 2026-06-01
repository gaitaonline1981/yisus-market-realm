import type { Character } from "@/types/mmorpg"
import { CharacterCard } from "./CharacterCard"

type Props = {
  characters: Character[]
}

export function CharacterGrid({ characters }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 16,
      }}
    >
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}
