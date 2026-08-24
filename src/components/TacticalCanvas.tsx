import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function HologramCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08;
      meshRef.current.rotation.y = t * 0.12;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.15;
      ringRef1.current.rotation.y = t * 0.05;
      ringRef1.current.rotation.z = Math.sin(t * 0.2) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -t * 0.1;
      ringRef2.current.rotation.z = t * 0.12;
    }
  });

  return (
    <group position={[2.8, -0.5, -1]}>
      {/* Central Holographic Geodesic Core */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <MeshDistortMaterial
            wireframe
            color="#D12636"
            emissive="#681826"
            emissiveIntensity={0.8}
            distort={0.2}
            speed={1.2}
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Primary Orbital Tactical Ring */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.6, 0.015, 8, 48]} />
        <meshBasicMaterial color="#D12636" transparent opacity={0.35} />
      </mesh>

      {/* Secondary Tilted Ring */}
      <mesh ref={ringRef2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.01, 8, 48]} />
        <meshBasicMaterial color="#681826" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function FloatingNodes({ count = 35 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 16;
      p[i * 3 + 1] = (Math.random() - 0.5) * 12;
      p[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#D12636"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function TacticalCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 4, 4]} color="#D12636" intensity={2.5} />
        <pointLight position={[-6, -4, -2]} color="#681826" intensity={1.5} />
        <HologramCore />
        <FloatingNodes count={40} />
      </Canvas>
    </div>
  );
}