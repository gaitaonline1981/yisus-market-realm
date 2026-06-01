import React, { useMemo } from 'react'
import type { CharacterId, Rarity } from '@cl/market-core/src/modular-editor'
import { RARITY_CONFIG, CHARACTERS } from '@cl/market-core/src/modular-editor'
import { COMPATIBILITY_MATRIX, getExclusiveMounts } from '@cl/market-core/src/modular-editor/compatibility'

const CHAR_IDS: CharacterId[] = ['ticker', 'hedgey', 'slyde', 'maci', 'volumax', 'waven', 'sproket', 'flipper']

export function InventoryPanel() {
  const [selectedChar, setSelectedChar] = React.useState<CharacterId>('ticker')
  const [unlocked, setUnlocked] = React.useState<Set<string>>(new Set([
    'ticker_head_default', 'ticker_ears_default', 'ticker_eyes_default',
    'ticker_torso_default', 'hat_trader', 'collar_token',
  ]))

  const matrix = COMPATIBILITY_MATRIX[selectedChar]
  const character = CHARACTERS.find(c => c.id === selectedChar)!

  const exclusive = useMemo(() => getExclusiveMounts(selectedChar), [selectedChar])

  const totalParts = matrix.bodyParts.length
  const unlockedParts = matrix.bodyParts.filter(p => unlocked.has(p.id)).length
  const totalAccessories = matrix.compatibleAccessories.length
  const unlockedAccessories = matrix.compatibleAccessories.filter(a => unlocked.has(a)).length

  return (
    <div style={{
      padding: 16, fontFamily: 'system-ui, sans-serif', color: '#1F2937',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ fontWeight: 700, fontSize: 18 }}>📦 Inventario</div>

      {/* Character selector tabs */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {CHAR_IDS.map(id => (
          <button key={id}
            onClick={() => setSelectedChar(id)}
            style={{
              padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
              border: `2px solid ${id === selectedChar ? '#3B82F6' : '#E5E7EB'}`,
              background: id === selectedChar ? '#EFF6FF' : '#FFFFFF',
              fontWeight: id === selectedChar ? 600 : 400, fontSize: 13,
            }}>
            {CHARACTERS.find(c => c.id === id)?.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Progress card */}
        <div style={{
          background: '#FFFFFF', borderRadius: 12, border: '1px solid #E5E7EB',
          padding: 16,
        }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>
            Progreso — {character.name}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ProgressBar label="Partes" current={unlockedParts} total={totalParts} color="#3B82F6" />
            <ProgressBar label="Accesorios" current={unlockedAccessories} total={totalAccessories} color="#8B5CF6" />
            <ProgressBar label="Monturas exclusivas" current={exclusive.length > 0 ? 1 : 0} total={exclusive.length || 1} color="#F59E0B" />
          </div>
        </div>

        {/* Exclusive mounts card */}
        <div style={{
          background: '#FFFFFF', borderRadius: 12, border: '1px solid #E5E7EB',
          padding: 16,
        }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
            ⭐ Monturas Exclusivas
          </div>
          {exclusive.length === 0
            ? <div style={{ fontSize: 12, color: '#9CA3AF' }}>
                Este personaje no tiene monturas exclusivas.
              </div>
            : exclusive.map(m => (
                <div key={m.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '6px 0', borderBottom: '1px solid #F3F4F6',
                }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{m.specialAbility}</div>
                  </div>
                  <RarityBadge rarity={m.rarity} />
                </div>
              ))}
        </div>
      </div>

      {/* Full inventory grid */}
      <div style={{
        background: '#FFFFFF', borderRadius: 12, border: '1px solid #E5E7EB',
        padding: 16,
      }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
          Partes ({unlockedParts}/{totalParts})
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr)', gap: 6,
        }}>
          {matrix.bodyParts.map(part => {
            const isUnlocked = unlocked.has(part.id)
            return (
              <div key={part.id} style={{
                padding: '6px 10px', borderRadius: 6,
                border: `2px solid ${isUnlocked ? RARITY_CONFIG[part.rarity].color : '#E5E7EB'}`,
                background: isUnlocked ? '#FFFFFF' : '#F9FAFB',
                opacity: isUnlocked ? 1 : 0.5,
                fontSize: 12, borderLeft: `4px solid ${RARITY_CONFIG[part.rarity].color}`,
              }}>
                <div style={{ fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{part.name}</span>
                  {isUnlocked ? '✅' : '🔒'}
                </div>
                <div style={{ fontSize: 10, color: '#6B7280' }}>
                  {RARITY_CONFIG[part.rarity].label} | {part.slot}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Accessories grid */}
      <div style={{
        background: '#FFFFFF', borderRadius: 12, border: '1px solid #E5E7EB',
        padding: 16,
      }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
          Accesorios ({unlockedAccessories}/{totalAccessories})
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr)', gap: 6,
        }}>
          {matrix.compatibleAccessories.length === 0
            ? <div style={{ fontSize: 12, color: '#9CA3AF', gridColumn: '1/-1' }}>
                No hay accesorios compatibles.
              </div>
            : <div style={{ fontSize: 12, color: '#9CA3AF', gridColumn: '1/-1' }}>
                {matrix.compatibleAccessories.length} accesorios compatibles
                (detalles en el editor)
              </div>}
        </div>
      </div>
    </div>
  )
}

function ProgressBar({ label, current, total, color }: {
  label: string; current: number; total: number; color: string
}) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{current}/{total} ({pct}%)</span>
      </div>
      <div style={{
        height: 8, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden',
      }}>
        <div style={{
          width: `${pct}%`, height: '100%', background: color,
          borderRadius: 4, transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  )
}

function RarityBadge({ rarity }: { rarity: Rarity }) {
  const config = RARITY_CONFIG[rarity]
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: '2px 8px',
      borderRadius: 10, background: config.color + '20',
      color: config.color, border: `1px solid ${config.color}40`,
    }}>
      {config.label}
    </span>
  )
}
