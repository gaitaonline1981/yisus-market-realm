import { ErrorBoundary } from "@/components/realm/ErrorBoundary"
import { CharacterViewer } from "@/components/mmorpg/viewer/CharacterViewer"
import type { RealmCharacter } from "@/types/realm"

interface Props {
  character: RealmCharacter
}

export function RealmCharacterViewer3D({ character }: Props) {
  return (
    <ErrorBoundary>
      <CharacterViewer
        characterId={character.id}
        characterModelUrl={character.modelUrl}
        characterModelScale={[1, 1, 1]}
        characterModelPosition={[0, 0.25, 0]}
        characterModelRotation={[0, 0, 0]}
        useRealModels={true}
        autoRotate={true}
        cameraPreset="default"
      />
    </ErrorBoundary>
  )
}
