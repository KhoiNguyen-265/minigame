/**
 * VictoryFireworks – màn bắn pháo hoa 3D khi lễ trao giải
 * Các hạt bùng nổ từ tâm màn hình, màu Gold + Cyan + White.
 */
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BURST_COUNT = 3;       // số đợt bùng nổ đồng thời
const PER_BURST = 90;        // số hạt mỗi đợt

// Màu pháo hoa: Gold, Cyan, White, Mint
const PALETTE = [
  new THREE.Color('#f59e0b'),
  new THREE.Color('#00f2fe'),
  new THREE.Color('#ffffff'),
  new THREE.Color('#10b981'),
  new THREE.Color('#fbbf24'),
];

interface BurstData {
  origin: THREE.Vector3;
  velocities: Float32Array;  // vx,vy,vz per particle
  colors: Float32Array;
  lives: Float32Array;       // life 0→1 per particle
  active: boolean;
}

function createBurst(): BurstData {
  const ox = (Math.random() - 0.5) * 8;
  const oy = (Math.random() - 0.5) * 4 + 1;
  const oz = (Math.random() - 0.5) * 2;

  const vel = new Float32Array(PER_BURST * 3);
  const col = new Float32Array(PER_BURST * 3);
  const lives = new Float32Array(PER_BURST).fill(1.0);

  for (let i = 0; i < PER_BURST; i++) {
    // Phân tán đều theo hình cầu
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const spd   = 1.5 + Math.random() * 3;
    vel[i * 3]     = spd * Math.sin(phi) * Math.cos(theta);
    vel[i * 3 + 1] = spd * Math.sin(phi) * Math.sin(theta) + 1.5; // bias up
    vel[i * 3 + 2] = spd * Math.cos(phi) * 0.4;

    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    col[i * 3]     = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }

  return { origin: new THREE.Vector3(ox, oy, oz), velocities: vel, colors: col, lives, active: true };
}

function BurstPoints({ burst }: { burst: BurstData }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => new Float32Array(PER_BURST * 3), []);

  // Init tại origin
  useEffect(() => {
    for (let i = 0; i < PER_BURST; i++) {
      positions[i * 3]     = burst.origin.x;
      positions[i * 3 + 1] = burst.origin.y;
      positions[i * 3 + 2] = burst.origin.z;
    }
  }, [burst.origin, positions]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const gravity = -3.0;
    const drag    = 0.92;

    for (let i = 0; i < PER_BURST; i++) {
      if (burst.lives[i] <= 0) continue;
      burst.lives[i] -= delta * 0.55;
      // Physics
      burst.velocities[i * 3]     *= drag;
      burst.velocities[i * 3 + 1] += gravity * delta;
      burst.velocities[i * 3 + 2] *= drag;

      posAttr.array[i * 3]     += burst.velocities[i * 3]     * delta;
      posAttr.array[i * 3 + 1] += burst.velocities[i * 3 + 1] * delta;
      posAttr.array[i * 3 + 2] += burst.velocities[i * 3 + 2] * delta;
    }
    posAttr.needsUpdate = true;

    // opacity based on avg life
    const avgLife = burst.lives.reduce((s, v) => s + v, 0) / PER_BURST;
    if (ref.current.material instanceof THREE.PointsMaterial) {
      ref.current.material.opacity = Math.max(0, avgLife);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={PER_BURST}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={burst.colors}
          count={PER_BURST}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FireworksScene() {
  const [bursts, setBursts] = useState<BurstData[]>(() =>
    Array.from({ length: BURST_COUNT }, createBurst)
  );

  // Mỗi 1.8s bắn đợt mới
  useEffect(() => {
    const id = setInterval(() => {
      setBursts(Array.from({ length: BURST_COUNT }, createBurst));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {bursts.map((b, i) => (
        <BurstPoints key={`${b.origin.x.toFixed(2)}-${i}`} burst={b} />
      ))}
    </>
  );
}

export const VictoryFireworks3D: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden w-full h-full">
    <Canvas
      camera={{ position: [0, 2, 14], fov: 65 }}
      gl={{ antialias: false, alpha: true }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <FireworksScene />
    </Canvas>
  </div>
);
