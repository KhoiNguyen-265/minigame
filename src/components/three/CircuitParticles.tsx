/**
 * CircuitParticles – nền 3D particle "mạch điện" lơ lửng cho Lobby
 * Hàng trăm điểm sáng nổi trong không gian, kết nối đường mạch nhẹ nhàng xoay.
 */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Số lượng điểm – tăng/giảm tuỳ hiệu năng máy
const PARTICLE_COUNT = 320;
const SPREAD = 14; // phạm vi không gian (đơn vị Three.js)

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);

  // Sinh tọa độ ngẫu nhiên một lần
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Phân bố theo hình cầu lõm (tập trung hơn ở tâm)
      const r = Math.random() * SPREAD;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.6;

      // Màu: pha trộn Cyan (#00f2fe) và Mint (#10b981)
      const t = Math.random();
      col[i * 3]     = t * 0.063 + (1 - t) * 0.0;   // R
      col[i * 3 + 1] = t * 0.722 + (1 - t) * 0.949; // G
      col[i * 3 + 2] = t * 0.506 + (1 - t) * 0.996; // B
    }

    return { positions: pos, colors: col };
  }, []);

  // Quay chậm mỗi frame
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Các đường kết nối (circuit lines) giữa các điểm gần nhau
const LINE_COUNT = 60;
const LINE_SPREAD = 6;

function CircuitLines() {
  const lineGroupRef = useRef<THREE.LineSegments>(null!);

  const { positions, colors } = useMemo(() => {
    const pos: number[] = [];
    const col: number[] = [];
    for (let i = 0; i < LINE_COUNT; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * LINE_SPREAD * 2,
        (Math.random() - 0.5) * LINE_SPREAD * 2,
        (Math.random() - 0.5) * LINE_SPREAD,
      );
      const bendX = new THREE.Vector3(
        start.x + (Math.random() - 0.5) * 2,
        start.y,
        start.z,
      );
      const end = new THREE.Vector3(
        bendX.x,
        bendX.y + (Math.random() - 0.5) * 2,
        start.z,
      );
      const t = Math.random();
      const color = new THREE.Color(`hsl(${170 + t * 50}, 90%, ${50 + t * 20}%)`);

      // Segment 1: start -> bendX
      pos.push(start.x, start.y, start.z, bendX.x, bendX.y, bendX.z);
      col.push(color.r, color.g, color.b, color.r, color.g, color.b);

      // Segment 2: bendX -> end
      pos.push(bendX.x, bendX.y, bendX.z, end.x, end.y, end.z);
      col.push(color.r, color.g, color.b, color.r, color.g, color.b);
    }
    return {
      positions: new Float32Array(pos),
      colors: new Float32Array(col),
    };
  }, []);

  useFrame((_, delta) => {
    if (lineGroupRef.current) {
      lineGroupRef.current.rotation.y += delta * 0.04;
      lineGroupRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <lineSegments ref={lineGroupRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.35} />
    </lineSegments>
  );
}

export const CircuitParticlesBg: React.FC = () => (
  <Canvas
    className="absolute inset-0 pointer-events-none"
    camera={{ position: [0, 0, 12], fov: 60 }}
    gl={{ antialias: false, alpha: true }}
    style={{ background: 'transparent' }}
  >
    {/* Ambient dim light */}
    <ambientLight intensity={0.2} />
    <CircuitLines />
    <Particles />
  </Canvas>
);
