import { ErrorBoundary } from "@/components/realm/ErrorBoundary"
import { CharacterViewer } from "@/components/mmorpg/viewer/CharacterViewer"
import { useRealmStore } from "@/stores/useRealmStore"
import { realmTheme } from "@/components/realm/styles"

export function CharacterMountPreview() {
  const character = useRealmStore((s) => s.character)
  const mount = useRealmStore((s) => s.mount)

  if (!character) {
    return (
      <div style={{
        height: 400, borderRadius: realmTheme.radius, border: `1px solid ${realmTheme.border}`,
        background: realmTheme.bgCard, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, color: realmTheme.textMuted,
      }}>
        Seleccioná un personaje para ver el preview combinado
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div style={{ borderRadius: realmTheme.radius, overflow: "hidden", border: `1px solid ${realmTheme.accent}30` }}>
        <CharacterViewer
          characterId={character.id}
          mountId={mount?.id}
          characterModelUrl={character.modelUrl}
          mountModelUrl={mount?.modelUrl}
          characterModelScale={[1, 1, 1]}
          characterModelPosition={[0, 0.25, 0]}
          mountModelPosition={[0, -0.35, 0]}
          useRealModels={true}
          autoRotate={true}
          cameraPreset="default"
        />
      </div>
    </ErrorBoundary>
  )
}
