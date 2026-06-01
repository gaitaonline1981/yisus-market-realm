import React, { useRef, Suspense, useState, useMemo } from 'react'

type ViewerProps = {
  modelPath?: string
  parts?: string[]
  accessory?: string
  mount?: string
  rotation?: number
  zoom?: number
  wireframe?: boolean
  showGrid?: boolean
}

export function CharacterViewer3D({
  modelPath,
  parts = [],
  accessory,
  mount,
  rotation = 0,
  zoom = 1,
  wireframe = false,
  showGrid = true,
}: ViewerProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  const displayParts = useMemo(() => {
    const all = [...parts]
    if (accessory) all.push(accessory)
    if (mount) all.push(mount)
    return all
  }, [parts, accessory, mount])

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div style={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#f0f4f8', borderRadius: 12,
        fontFamily: 'monospace', color: '#6B7280', fontSize: 14,
      }}>
        Cargando visor 3D...
      </div>
    )
  }

  const containerStyle: React.CSSProperties = {
    width: '100%', height: '100%', position: 'relative',
    background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)',
    borderRadius: 12, overflow: 'hidden',
  }

  const viewportStyle: React.CSSProperties = {
    width: '100%', height: '100%', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  }

  const placeholderStyle: React.CSSProperties = {
    width: 200, height: 280, borderRadius: 16,
    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', gap: 12,
    transform: `rotate(${rotation}deg) scale(${zoom})`,
    transition: 'transform 0.3s ease',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  }

  const partBoxStyle: React.CSSProperties = {
    border: `2px solid ${wireframe ? '#3B82F6' : 'transparent'}`,
    borderRadius: 8, padding: '4px 12px',
    background: wireframe ? 'rgba(59,130,246,0.1)' : '#ffffff',
    fontSize: 11, fontFamily: 'monospace', color: '#374151',
    display: displayParts.length > 0 ? 'block' : 'none',
  }

  return (
    <div ref={canvasRef} style={containerStyle}>
      <div style={viewportStyle}>
        <div style={placeholderStyle}>
          <div style={{
            fontSize: 40, opacity: 0.4,
            filter: wireframe ? 'contrast(0.5)' : 'none',
          }}>
            {mount ? '🚗' : '🐱'}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#4B5563' }}>
            {modelPath?.split('/').pop()?.replace('.glb', '') ?? 'Personaje'}
          </div>
          <div style={partBoxStyle}>
            {displayParts.length > 0
              ? displayParts.map(p => p.split('/').pop()).join(', ')
              : 'Partes default'}
          </div>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 12, left: 12, right: 12,
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: '#9CA3AF', fontFamily: 'monospace',
      }}>
        <span>🔍 {zoom.toFixed(1)}x</span>
        <span>🔄 {rotation}°</span>
        {wireframe && <span>📐 Wireframe</span>}
        {showGrid && <span>📏 Grid</span>}
      </div>
    </div>
  )
}

export function ViewerSkeleton() {
  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: 12,
      background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
      animation: 'pulse 2s infinite',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'monospace', color: '#94A3B8', fontSize: 13,
    }}>
      Preparando visor...
    </div>
  )
}
