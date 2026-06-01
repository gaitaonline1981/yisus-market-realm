"use client";

import * as THREE from "three";

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 2, 6]} />
        <meshStandardMaterial color="#4a3728" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.2, 3, 8]} />
        <meshStandardMaterial color="#1a4a2a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 3.8, 0]} castShadow>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
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

      {/* Wyckoff Forest */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Tree key={`t1-${i}`} position={[(-25 + Math.random() * 15) as number, 0, (Math.random() * 15 - 8) as number]} />
      ))}

      {/* Elliott Mountains */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Rock key={`em-rock-${i}`} position={[(-5 + Math.random() * 10) as number, 0, (Math.random() * 20 - 40) as number]} scale={1 + Math.random() * 2} />
      ))}

      {/* Prop Firm City */}
      <PropFirmOffice position={[28, 0, -28]} />
      <PropFirmOffice position={[34, 0, -30]} />
      <ExchangeTower position={[32, 0, -34]} />

      {/* Risk Temple */}
      <RiskTemple position={[-30, 0, -30]} />
      <Rock position={[-26, 0, -26]} scale={2} />
      <Rock position={[-34, 0, -34]} scale={1.8} />

      {/* Backtest District */}
      <AcademyBuilding position={[55, 0, -3]} />
      <DataCenter position={[55, 0, 5]} />
      {Array.from({ length: 6 }).map((_, i) => (
        <Tree key={`bd-tree-${i}`} position={[52 + Math.random() * 6, 0, -3 + Math.random() * 6]} />
      ))}

      {/* Scalping Arena */}
      <Arena position={[-55, 0, 0]} />

      {/* Exchange Port */}
      <ExchangeTower position={[0, 0, 55]} />
      <ExchangeTower position={[-6, 0, 58]} />
      <ExchangeTower position={[6, 0, 58]} />
      <WaterPlane position={[-10, -0.1, 65]} size={5} />

      {/* Macro Observatory */}
      <Observatory position={[0, 0, -58]} />
      <Observatory position={[-8, 0, -60]} />

      {/* Random trees and rocks across the map */}
      {Array.from({ length: 40 }).map((_, i) => (
        <Tree key={`random-tree-${i}`} position={[(Math.random() - 0.5) * 100, 0, (Math.random() - 0.5) * 100]} />
      ))}
      {Array.from({ length: 30 }).map((_, i) => (
        <Rock key={`random-rock-${i}`} position={[(Math.random() - 0.5) * 100, 0, (Math.random() - 0.5) * 100]} scale={0.5 + Math.random() * 1.5} />
      ))}

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
