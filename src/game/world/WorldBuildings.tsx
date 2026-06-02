"use client";

import * as THREE from "three";

function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const v = Math.floor(Math.abs(position[0] * 7 + position[2] * 3) % 3);
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.2, 0]} castShadow><cylinderGeometry args={[0.1, 0.16, 2.2, 6]} /><meshStandardMaterial color="#5a3a2a" roughness={0.9} /></mesh>
      {v === 0 && <><mesh position={[0, 2.2, 0]} castShadow><coneGeometry args={[1.3, 2.5, 8]} /><meshStandardMaterial color="#2a5a2a" roughness={0.8} /></mesh><mesh position={[0, 3.4, 0]} castShadow><coneGeometry args={[0.9, 2, 8]} /><meshStandardMaterial color="#3a7a3a" roughness={0.7} /></mesh></>}
      {v === 1 && <><mesh position={[0, 2, 0]} castShadow><sphereGeometry args={[1.1, 8, 6]} /><meshStandardMaterial color="#1a4a2a" roughness={0.8} /></mesh><mesh position={[0, 3, 0]} castShadow><sphereGeometry args={[0.8, 8, 6]} /><meshStandardMaterial color="#2a6a2a" roughness={0.7} /></mesh></>}
      {v === 2 && <><mesh position={[0, 1.8, 0]} castShadow><coneGeometry args={[1.4, 2.8, 6]} /><meshStandardMaterial color="#234a23" roughness={0.8} /></mesh><mesh position={[0, 2.8, 0]} castShadow><coneGeometry args={[1, 2.2, 6]} /><meshStandardMaterial color="#2d6a2d" roughness={0.7} /></mesh><mesh position={[0, 3.6, 0]} castShadow><coneGeometry args={[0.6, 1.5, 6]} /><meshStandardMaterial color="#3a8a3a" roughness={0.7} /></mesh></>}
    </group>
  );
}

function Bush({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow><sphereGeometry args={[0.6, 8, 6]} /><meshStandardMaterial color="#2a5a2a" roughness={0.8} /></mesh>
      <mesh position={[0.3, 0.5, 0.2]} castShadow><sphereGeometry args={[0.45, 8, 6]} /><meshStandardMaterial color="#3a6a3a" roughness={0.7} /></mesh>
      <mesh position={[-0.25, 0.45, -0.15]} castShadow><sphereGeometry args={[0.4, 8, 6]} /><meshStandardMaterial color="#2a4a2a" roughness={0.8} /></mesh>
    </group>
  );
}

function GrassTuft({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[(Math.random()-0.5)*0.3, 0.15, (Math.random()-0.5)*0.3]} rotation={[0.1, Math.random()*0.5, 0.1]}>
          <boxGeometry args={[0.04, 0.3, 0.04]} /><meshStandardMaterial color={i%2 ? "#3a6a2a":"#4a8a3a"} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Flower({ position }: { position: [number, number, number] }) {
  const colors = ["#ff6688","#ffaa44","#ff44aa","#44aaff","#ffff44","#ff4488"];
  return (
    <group position={position}>
      <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.02, 0.03, 0.3, 6]} /><meshStandardMaterial color="#4a6a2a" roughness={0.9} /></mesh>
      <mesh position={[0, 0.3, 0]}><sphereGeometry args={[0.08, 6, 4]} /><meshStandardMaterial color={colors[Math.floor(Math.abs(position[0]*100)%colors.length)]} emissiveIntensity={0.2} /></mesh>
    </group>
  );
}

function Lantern({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow><cylinderGeometry args={[0.06, 0.08, 3, 8]} /><meshStandardMaterial color="#4a3728" roughness={0.7} /></mesh>
      <mesh position={[0, 3.2, 0]}><boxGeometry args={[0.3, 0.5, 0.3]} /><meshStandardMaterial color="#ffcc66" emissive="#ffcc66" emissiveIntensity={0.6} /></mesh>
      <mesh position={[0, 3.2, 0]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#ffee88" emissive="#ffee88" emissiveIntensity={0.8} /></mesh>
    </group>
  );
}

function Crystal({ position, color = "#8844ff" }: { position: [number, number, number]; color?: string }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]} castShadow><coneGeometry args={[0.3, 1.2, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.3} metalness={0.5} /></mesh>
      <mesh position={[0.3, 0.4, 0.1]} rotation={[0, 0, 0.2]} castShadow><coneGeometry args={[0.15, 0.8, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.3} /></mesh>
    </group>
  );
}

function Rock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color="#4a5568" roughness={0.7} flatShading />
    </mesh>
  );
}

function ExchangeTower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main tower */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[3, 6, 3]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Windows grid */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <mesh key={`w-${row}-${col}`} position={[-1 + col, 1 + row * 1.1, 1.55]} castShadow>
            <planeGeometry args={[0.6, 0.7]} />
            <meshStandardMaterial color="#64b5f6" emissive="#64b5f6" emissiveIntensity={0.4} />
          </mesh>
        ))
      )}
      {/* Antenna */}
      <mesh position={[0, 6.8, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 3, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.8} />
      </mesh>
      <mesh position={[0, 8.5, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function PropFirmOffice({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[4, 4, 3]} />
        <meshStandardMaterial color="#2d2d44" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Glass panels */}
      <mesh position={[0, 2, 1.55]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#8899bb" metalness={0.3} roughness={0.1} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 4.1, 0]} castShadow>
        <boxGeometry args={[4.5, 0.2, 3.5]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Sign */}
      <mesh position={[0, 3, 1.6]}>
        <planeGeometry args={[2, 0.5]} />
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.3} />
      </mesh>
      {/* Pillars */}
      {[-1.5, 0, 1.5].map((x) => (
        <mesh key={`p-${x}`} position={[x, 0.5, 1.3]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 1, 8]} />
          <meshStandardMaterial color="#cccccc" roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function RiskTemple({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[3, 3.5, 1, 8]} />
        <meshStandardMaterial color="#4a3728" roughness={0.7} />
      </mesh>
      {/* Columns */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={`col-${i}`} position={[Math.cos(angle) * 2.5, 2, Math.sin(angle) * 2.5]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 4, 8]} />
            <meshStandardMaterial color="#8B7355" roughness={0.5} />
          </mesh>
        );
      })}
      {/* Dome */}
      <mesh position={[0, 4.3, 0]} castShadow>
        <sphereGeometry args={[2.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#8B0000" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 5.5, 0]}>
        <coneGeometry args={[0.5, 1.5, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function AcademyBuilding({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[5, 3, 4]} />
        <meshStandardMaterial color="#2c1810" roughness={0.6} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 3.3, 0]} castShadow>
        <coneGeometry args={[3.5, 1.5, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial color="#4a2828" roughness={0.7} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 1, 2.05]}>
        <boxGeometry args={[1.2, 1.8, 0.1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>
    </group>
  );
}

function WaterPlane({ position, size }: { position: [number, number, number]; size: number }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[size, 32]} />
      <meshStandardMaterial color="#0a1628" transparent opacity={0.7} roughness={0.1} metalness={0.5} />
    </mesh>
  );
}

function Observatory({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[1.5, 2, 4, 8]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 4.5, 0]} castShadow>
        <sphereGeometry args={[2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <meshStandardMaterial color="#333344" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh position={[0, 5.5, 0]}>
        <torusGeometry args={[1.8, 0.15, 8, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#64b5f6" emissive="#64b5f6" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function Arena({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[4, 5, 3, 32, 1, true]} />
        <meshStandardMaterial color="#c4a35a" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.5, 32]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>
    </group>
  );
}

function DataCenter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={`rack-${i}`} position={[i * 1.5 - 2.25, 0, 0]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[1, 3, 0.8]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Blinking lights */}
          {Array.from({ length: 5 }).map((_, j) => (
            <mesh key={`led-${i}-${j}`} position={[0, 0.5 + j * 0.5, 0.41]}>
              <boxGeometry args={[0.1, 0.15, 0.05]} />
              <meshStandardMaterial
                color={j % 3 === 0 ? "#00ff88" : j % 3 === 1 ? "#0088ff" : "#ff8800"}
                emissive={j % 3 === 0 ? "#00ff88" : j % 3 === 1 ? "#0088ff" : "#ff8800"}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export function WorldBuildings() {
  return (
    <group>
      {/* Spawn zone - Tutorial area */}
      <ExchangeTower position={[0, 0, -5]} />
      <AcademyBuilding position={[8, 0, 3]} />
      <Rock position={[-5, 0, 0]} scale={1.5} />
      <Rock position={[-3, 0, -3]} scale={1} />

      {/* Liquidity Plains */}
      <DataCenter position={[22, 0, 0]} />
      <WaterPlane position={[28, -0.1, -5]} size={4} />
      <WaterPlane position={[24, -0.1, 5]} size={3} />

      {/* Wyckoff Forest - dense trees */}
      {Array.from({ length: 25 }).map((_, i) => (
        <Tree key={`t1-${i}`} position={[(-30 + Math.random() * 20) as number, 0, (Math.random() * 20 - 10) as number]} scale={0.8 + Math.random() * 0.7} />
      ))}

      {/* Elliott Mountains */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Rock key={`em-rock-${i}`} position={[(-8 + Math.random() * 16) as number, 0, (Math.random() * 25 - 42) as number]} scale={1 + Math.random() * 3} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <Crystal key={`em-crystal-${i}`} position={[(-8 + Math.random() * 16) as number, 0, (Math.random() * 25 - 42) as number]} color="#F59E0B" />
      ))}

      {/* Prop Firm City */}
      <PropFirmOffice position={[28, 0, -28]} />
      <PropFirmOffice position={[34, 0, -30]} />
      <ExchangeTower position={[32, 0, -34]} />
      {Array.from({ length: 6 }).map((_, i) => (<Lantern key={`pf-lantern-${i}`} position={[26 + i*2, 0, -26]} />))}

      {/* Risk Temple */}
      <RiskTemple position={[-30, 0, -30]} />
      <Rock position={[-26, 0, -26]} scale={2} />
      <Rock position={[-34, 0, -34]} scale={1.8} />
      {Array.from({ length: 12 }).map((_, i) => (<Flower key={`rt-flower-${i}`} position={[(-33 + Math.random() * 6) as number, 0, (-33 + Math.random() * 6) as number]} />))}

      {/* Backtest District */}
      <AcademyBuilding position={[55, 0, -3]} />
      <DataCenter position={[55, 0, 5]} />
      {Array.from({ length: 10 }).map((_, i) => (<Tree key={`bd-tree-${i}`} position={[52 + Math.random() * 8, 0, -3 + Math.random() * 8]} scale={0.7 + Math.random() * 0.5} />))}
      {Array.from({ length: 8 }).map((_, i) => (<Bush key={`bd-bush-${i}`} position={[50 + Math.random() * 12, 0, -5 + Math.random() * 10]} />))}

      {/* Scalping Arena */}
      <Arena position={[-55, 0, 0]} />
      {Array.from({ length: 4 }).map((_, i) => (<Lantern key={`sa-lantern-${i}`} position={[(-56 + i*3), 0, -3]} />))}

      {/* Exchange Port */}
      <ExchangeTower position={[0, 0, 55]} />
      <ExchangeTower position={[-6, 0, 58]} />
      <ExchangeTower position={[6, 0, 58]} />
      <WaterPlane position={[-10, -0.1, 65]} size={5} />
      {Array.from({ length: 10 }).map((_, i) => (<Lantern key={`ep-lantern-${i}`} position={[(-8 + i*1.8), 0, 53]} />))}

      {/* Macro Observatory */}
      <Observatory position={[0, 0, -58]} />
      <Observatory position={[-8, 0, -60]} />
      {Array.from({ length: 6 }).map((_, i) => (<Crystal key={`mo-crystal-${i}`} position={[(-10 + Math.random() * 12) as number, 0, (-62 - Math.random() * 6) as number]} color="#8844ff" />))}

      {/* Scatter: trees, rocks, bushes, grass, flowers across the world */}
      {Array.from({ length: 60 }).map((_, i) => (<Tree key={`world-tree-${i}`} position={[(Math.random() - 0.5) * 180, 0, (Math.random() - 0.5) * 180]} scale={0.6 + Math.random() * 0.8} />))}
      {Array.from({ length: 40 }).map((_, i) => (<Rock key={`world-rock-${i}`} position={[(Math.random() - 0.5) * 180, 0, (Math.random() - 0.5) * 180]} scale={0.5 + Math.random() * 1.5} />))}
      {Array.from({ length: 50 }).map((_, i) => (<Bush key={`world-bush-${i}`} position={[(Math.random() - 0.5) * 180, 0, (Math.random() - 0.5) * 180]} />))}
      {Array.from({ length: 80 }).map((_, i) => (<GrassTuft key={`world-grass-${i}`} position={[(Math.random() - 0.5) * 180, 0, (Math.random() - 0.5) * 180]} />))}
      {Array.from({ length: 60 }).map((_, i) => (<Flower key={`world-flower-${i}`} position={[(Math.random() - 0.5) * 180, 0, (Math.random() - 0.5) * 180]} />))}

      {/* Roads connecting zones */}
      <RoadPath start={[0, 0, 0]} end={[25, 0, 0]} />
      <RoadPath start={[0, 0, 0]} end={[-25, 0, 0]} />
      <RoadPath start={[0, 0, -5]} end={[0, 0, -30]} />
      <RoadPath start={[0, 0, -5]} end={[30, 0, -30]} />
      <RoadPath start={[0, 0, -5]} end={[-30, 0, -30]} />
      <RoadPath start={[25, 0, 0]} end={[55, 0, 0]} />
      <RoadPath start={[-25, 0, 0]} end={[-55, 0, 0]} />
    </group>
  );
}

function RoadPath({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const dx = end[0] - start[0];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dz, dx);
  const midX = (start[0] + end[0]) / 2;
  const midZ = (start[2] + end[2]) / 2;

  return (
    <mesh position={[midX, 0.02, midZ]} rotation={[0, angle, 0]} receiveShadow>
      <planeGeometry args={[length, 1.5]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
    </mesh>
  );
}
