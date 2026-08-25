import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DataLoomMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uColor1: new THREE.Color('#D12636'), // Tactical Red
    uColor2: new THREE.Color('#681826'), // Darker Red
  },
  // Vertex Shader: Shape & Motion
  `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vHeight;
  varying float vHighlight;

  void main() {
    vec3 pos = position;

    // 1. Get the instance position (where this specific thread is in the world)
    vec4 instancePosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    
    // 2. Undulation Math (Sine Wave)
    float waveX = sin(pos.y * 1.5 + uTime * 0.5 + instancePosition.x * 0.5) * 0.1;
    float waveZ = cos(pos.y * 1.2 + uTime * 0.3 + instancePosition.z * 0.5) * 0.1;
    
    pos.x += waveX;
    pos.z += waveZ;

    // 3. Mouse Interaction (Parallax / Repulsion)
    pos.x += uMouse.x * 0.1 * pos.y;
    
    // 4. Pass data to Fragment Shader
    vHeight = pos.y;
    
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader: Color & Lighting
  `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying float vHeight;

  void main() {
    float gradientFactor = smoothstep(-2.0, 2.0, vHeight);
    vec3 color = mix(uColor2, uColor1, gradientFactor);
    float glint = smoothstep(1.0, 2.0, vHeight) * 0.5;
    
    gl_FragColor = vec4(color + glint, 1.0);
  }
  `
);

extend({ DataLoomMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dataLoomMaterial: any;
    }
  }
}

const Strands = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<any>(null);
  
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 600 : 1800;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;

    const rows = Math.ceil(Math.sqrt(count));
    const spread = 8;

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / rows);
      const col = i % rows;

      const x = (row / rows) * spread - (spread / 2) + (Math.random() - 0.5) * 0.5;
      const z = (col / rows) * spread - (spread / 2) + (Math.random() - 0.5) * 0.5;
      const y = (Math.random() - 0.5) * 2;

      dummy.position.set(x, y, z);
      
      const scaleY = 1 + Math.random() * 0.5; 
      dummy.scale.set(1, scaleY, 1);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uTime = state.clock.getElapsedTime();
    materialRef.current.uMouse.lerp(state.mouse, 0.05);
  });

  const geometry = useMemo(() => new THREE.CylinderGeometry(0.01, 0.01, 5, 4), []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, null as any, count]}>
      {/* @ts-ignore */}
      <dataLoomMaterial ref={materialRef} transparent />
    </instancedMesh>
  );
};

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#0F0F11]">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: false }}
      >
        <fog attach="fog" args={['#0F0F11', 5, 12]} />
        <Strands />
      </Canvas>
    </div>
  );
}
