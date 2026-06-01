import React, { useState, useMemo } from 'react'
import { CharacterViewer3D } from './CharacterViewer3D'
import { InventoryPanel } from './InventoryPanel'
import {
  CHARACTERS, MOUNTS, BODY_PARTS, ACCESSORIES,
  getBodyPartsForCharacter, getAccessoriesForCharacter,
  getMountsForCharacter,
} from '@cl/market-core/src/modular-editor'
import type {
  CharacterId, CharacterEquipment, AccessorySlot,
  Rarity,
} from '@cl/market-core/src/modular-editor'
import { RARITY_CONFIG, BODY_PART_SLOTS, ACCESSORY_SLOTS } from '@cl/market-core/src/modular-editor'

const CHAR_IDS: CharacterId[] = ['ticker', 'hedgey', 'slyde', 'maci', 'volumax', 'waven', 'sproket', 'flipper']

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'grid', gridTemplateColumns: '320px 1fr 280px',
    gap: 16, height: '100%', fontFamily: 'system-ui, sans-serif',
    color: '#1F2937',
  },
  sidebar: {
    background: '#ffffff', borderRadius: 12,
    padding: 16, border: '1px solid #E5E7EB',
    overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12,
  },
  viewer: {
    background: '#ffffff', borderRadius: 12,
    border: '1px solid #E5E7EB', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
  },
  charBtn: (active: boolean): React.CSSProperties => ({
    padding: '8px 12px', borderRadius: 8, cursor: 'pointer',
    border: `2px solid ${active ? '#3B82F6' : '#E5E7EB'}`,
    background: active ? '#EFF6FF' : '#FFFFFF',
    fontWeight: active ? 600 : 400, fontSize: 13,
    textAlign: 'left', transition: 'all 0.15s',
  }),
  slotBtn: (active: boolean): React.CSSProperties => ({
    padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
    border: `1px solid ${active ? '#3B82F6' : '#E5E7EB'}`,
    background: active ? '#EFF6FF' : '#F9FAFB',
    fontSize: 12, textAlign: 'left',
  }),
  partBtn: (rarity: Rarity, active: boolean): React.CSSProperties => ({
    padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
    border: `2px solid ${active ? RARITY_CONFIG[rarity].color : '#E5E7EB'}`,
    background: active ? '#F3F4F6' : '#FFFFFF',
    fontSize: 12, borderLeft: `4px solid ${RARITY_CONFIG[rarity].color}`,
    textAlign: 'left',
  }),
  tooltip: {
    fontSize: 11, color: '#6B7280', fontFamily: 'monospace',
  },
}

export function EditorPanel() {
  const [selectedChar, setSelectedChar] = useState<CharacterId>('ticker')
  const [equipment, setEquipment] = useState<CharacterEquipment>(() => ({
    characterId: 'ticker',
    parts: {}, accessories: {}, mount: null,
  }))
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [viewRotation, setViewRotation] = useState(0)
  const [viewZoom, setViewZoom] = useState(1)
  const [wireframe, setWireframe] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [tab, setTab] = useState<'parts' | 'accessories' | 'mounts'>('parts')

  const character = useMemo(() => CHARACTERS.find(c => c.id === selectedChar)!, [selectedChar])
  const bodyParts = useMemo(() => getBodyPartsForCharacter(selectedChar), [selectedChar])
  const accessories = useMemo(() => getAccessoriesForCharacter(selectedChar), [selectedChar])
  const mounts = useMemo(() => getMountsForCharacter(selectedChar), [selectedChar])

  function selectCharacter(id: CharacterId) {
    setSelectedChar(id)
    setEquipment({ characterId: id, parts: {}, accessories: {}, mount: null })
    setSelectedSlot(null)
  }

  function equipPart(slot: string, partId: string) {
    setEquipment(prev => ({
      ...prev, parts: { ...prev.parts, [slot]: partId },
    }))
  }

  function equipAccessory(slot: AccessorySlot, accId: string) {
    setEquipment(prev => ({
      ...prev, accessories: { ...prev.accessories, [slot]: accId },
    }))
  }

  function equipMount(mountId: string) {
    setEquipment(prev => ({
      ...prev, mount: prev.mount === mountId ? null : mountId,
    }))
  }

  return (
    <div style={styles.container}>
      {/* Left sidebar - Character + Slot selector */}
      <div style={styles.sidebar}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
          Personajes
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {CHAR_IDS.map(id => (
            <button key={id} style={styles.charBtn(id === selectedChar)}
              onClick={() => selectCharacter(id)}>
              {character.name} — {character.title}
            </button>
          ))}
        </div>

        <div style={{ fontWeight: 600, fontSize: 13, marginTop: 8 }}>
          Editor
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['parts', 'accessories', 'mounts'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setSelectedSlot(null) }}
              style={{
                ...styles.slotBtn(t === tab), flex: 1,
                fontWeight: t === tab ? 600 : 400,
              }}>
              {t === 'parts' ? 'Partes' : t === 'accessories' ? 'Accesorios' : 'Monturas'}
            </button>
          ))}
        </div>

        {/* Slot selector */}
        {tab === 'parts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>Selecciona una parte:</div>
            {BODY_PART_SLOTS.map(slot => {
              const equipped = equipment.parts[slot.slot]
              return (
                <button key={slot.slot}
                  style={styles.slotBtn(selectedSlot === slot.slot)}
                  onClick={() => setSelectedSlot(selectedSlot === slot.slot ? null : slot.slot)}>
                  {slot.icon} {slot.label}
                  {equipped && <span style={{ fontSize: 10, color: '#6B7280', marginLeft: 6 }}>
                    ({bodyParts.find(p => p.id === equipped)?.name ?? equipped})
                  </span>}
                </button>
              )
            })}
          </div>
        )}

        {tab === 'accessories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {ACCESSORY_SLOTS.map(slot => {
              const equipped = equipment.accessories[slot.slot]
              const count = accessories.filter(a => a.slot === slot.slot).length
              return (
                <button key={slot.slot}
                  style={styles.slotBtn(selectedSlot === slot.slot)}
                  onClick={() => setSelectedSlot(selectedSlot === slot.slot ? null : slot.slot)}>
                  {slot.icon} {slot.label}
                  <span style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 6 }}>
                    {count} disponibles
                  </span>
                  {equipped && <span style={{ fontSize: 10, color: '#6B7280', marginLeft: 6 }}>
                    ({accessories.find(a => a.id === equipped)?.name ?? equipped})
                  </span>}
                </button>
              )
            })}
          </div>
        )}

        {tab === 'mounts' && (
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>
            {mounts.length === 0
              ? 'Este personaje no tiene monturas compatibles aún.'
              : `Monturas disponibles para ${character.name}:`}
          </div>
        )}

        {/* View controls */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid #E5E7EB', paddingTop: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 8 }}>Control de Vista</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => setViewRotation(r => r - 45)}
              style={styles.slotBtn(false)}>🔄 -45°</button>
            <button onClick={() => setViewRotation(r => r + 45)}
              style={styles.slotBtn(false)}>🔄 +45°</button>
            <button onClick={() => setViewZoom(z => Math.max(0.5, z - 0.2))}
              style={styles.slotBtn(false)}>🔍 -</button>
            <button onClick={() => setViewZoom(z => Math.min(2, z + 0.2))}
              style={styles.slotBtn(false)}>🔍 +</button>
            <button onClick={() => setWireframe(w => !w)}
              style={styles.slotBtn(wireframe)}>📐 Wire</button>
            <button onClick={() => setShowGrid(g => !g)}
              style={styles.slotBtn(showGrid)}>📏 Grid</button>
          </div>
        </div>
      </div>

      {/* Center - 3D Viewer */}
      <div style={styles.viewer}>
        <div style={{
          padding: '8px 16px', borderBottom: '1px solid #E5E7EB',
          fontWeight: 600, fontSize: 13, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>Vista Previa 3D — {character.name}</span>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>
            {Object.keys(equipment.parts).length} partes |{' '}
            {Object.keys(equipment.accessories).length} accesorios
            {equipment.mount ? ' | 1 montura' : ''}
          </span>
        </div>
        <div style={{ flex: 1, minHeight: 400 }}>
          <CharacterViewer3D
            modelPath={`/models/characters/${selectedChar}`}
            parts={Object.values(equipment.parts)}
            accessory={Object.values(equipment.accessories)[0]}
            mount={equipment.mount ?? undefined}
            rotation={viewRotation}
            zoom={viewZoom}
            wireframe={wireframe}
            showGrid={showGrid}
          />
        </div>
      </div>

      {/* Right sidebar - Item selector */}
      <div style={styles.sidebar}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
          {tab === 'parts' ? 'Partes disponibles' :
           tab === 'accessories' ? 'Accesorios disponibles' : 'Monturas disponibles'}
        </div>
        <div style={styles.tooltip}>
          {character.name} — nivel de rareza visible en el borde izquierdo
        </div>

        {tab === 'parts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
            {selectedSlot
              ? bodyParts
                  .filter(p => p.slot === selectedSlot)
                  .map(part => {
                    const active = equipment.parts[part.slot] === part.id
                    return (
                      <button key={part.id}
                        style={styles.partBtn(part.rarity, active)}
                        onClick={() => equipPart(part.slot, part.id)}>
                        <div style={{ fontWeight: 500 }}>{part.name}</div>
                        <div style={{ fontSize: 10, color: '#6B7280' }}>
                          {RARITY_CONFIG[part.rarity].label} | {part.slot}
                          {part.tags.length > 0 && ` | ${part.tags.join(', ')}`}
                        </div>
                      </button>
                    )
                  })
              : <div style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', padding: 20 }}>
                  Selecciona una parte en el panel izquierdo
                </div>}
          </div>
        )}

        {tab === 'accessories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
            {selectedSlot
              ? accessories
                  .filter(a => a.slot === selectedSlot)
                  .map(acc => {
                    const active = equipment.accessories[acc.slot] === acc.id
                    return (
                      <button key={acc.id}
                        style={styles.partBtn(acc.rarity, active)}
                        onClick={() => equipAccessory(acc.slot, acc.id)}>
                        <div style={{ fontWeight: 500 }}>{acc.name}</div>
                        <div style={{ fontSize: 10, color: '#6B7280' }}>
                          {RARITY_CONFIG[acc.rarity].label} | {acc.slot}
                          {acc.stats && Object.entries(acc.stats).map(([k, v]) =>
                            ` | ${k}:+${v}`).join('')}
                        </div>
                      </button>
                    )
                  })
              : <div style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', padding: 20 }}>
                  Selecciona un slot de accesorio en el panel izquierdo
                </div>}
          </div>
        )}

        {tab === 'mounts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
            {mounts.map(mount => {
              const active = equipment.mount === mount.id
              return (
                <button key={mount.id}
                  style={styles.partBtn(mount.rarity, active)}
                  onClick={() => equipMount(mount.id)}>
                  <div style={{ fontWeight: 500 }}>{mount.name}</div>
                  <div style={{ fontSize: 10, color: '#6B7280' }}>
                    {RARITY_CONFIG[mount.rarity].label} | {mount.type} | ⚡{mount.speed}/10
                    {active && ' | ✅ equipada'}
                  </div>
                  <div style={{ fontSize: 10, color: '#9CA3AF' }}>
                    {mount.specialAbility}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Stats summary */}
        {tab === 'parts' && (
          <div style={{ marginTop: 'auto', borderTop: '1px solid #E5E7EB', paddingTop: 12 }}>
            <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 4 }}>Stats</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {Object.entries(character.baseStats).map(([key, val]) => (
                <div key={key} style={{ fontSize: 11, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6B7280' }}>{key}:</span>
                  <span style={{ fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
