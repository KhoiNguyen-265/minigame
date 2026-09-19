/**
 * FloatingScore3D – số điểm "+10" bốc lên trong không gian 3D khi cộng điểm
 * Dùng Billboard từ @react-three/drei để text luôn quay về phía camera.
 */
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ScoreTextProps {
  value: string;
  color: string;
}

function ScoreText({ value, color }: ScoreTextProps) {
  const ref = useRef<THREE.Group>(null!);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (!ref.current) return;
    ref.current.position.y = elapsed.current * 2.5;
    ref.current.scale.setScalar(
      elapsed.current < 0.15
        ? elapsed.current / 0.15 * 1.2
        : 1.2 - (elapsed.current - 0.15) * 0.5
    );
    // fade out
    ref.current.traverse(o => {
      if ((o as THREE.Mesh).isMesh) {
        const mat = (o as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat.opacity !== undefined) {
          mat.opacity = Math.max(0, 1 - elapsed.current / 1.2);
        }
      }
    });
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <Billboard>
        <Text
          fontSize={0.9}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000000"
        >
          {value}
        </Text>
      </Billboard>
    </group>
  );
}

export const FloatingScore3D: React.FC<ScoreTextProps> = (props) => (
  <Canvas
    className="absolute inset-0 pointer-events-none"
    camera={{ position: [0, 0, 5], fov: 50 }}
    gl={{ antialias: false, alpha: true }}
    style={{ background: 'transparent' }}
  >
    <ScoreText {...props} />
  </Canvas>
);

/**
 * QuestionGlow3D – hào quang 3D nhẹ sau card câu hỏi
 * Một hình cầu wireframe xoay chậm tạo chiều sâu không gian.
 */
function SpinningOrb() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.28;
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <icosahedronGeometry args={[3.5, 1]} />
      <meshBasicMaterial
        color="#00f2fe"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

export const SubtleOrb3D: React.FC = () => (
  <Canvas
    className="absolute inset-0 pointer-events-none"
    camera={{ position: [0, 0, 8], fov: 55 }}
    gl={{ antialias: false, alpha: true }}
    style={{ background: 'transparent' }}
  >
    <SpinningOrb />
  </Canvas>
);
