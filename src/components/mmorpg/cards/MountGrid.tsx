import type { Mount } from "@/types/mmorpg"
import { MountCard } from "./MountCard"

type Props = {
  mounts: Mount[]
}

export function MountGrid({ mounts }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 16,
      }}
    >
      {mounts.map((mount) => (
        <MountCard key={mount.id} mount={mount} />
      ))}
    </div>
  )
}
