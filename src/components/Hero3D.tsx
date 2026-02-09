import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. Custom Shader Definition ---
// This runs on the GPU. It modifies vertex positions for the "wave" effect
// and calculates the color gradient based on height.

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
    // instanceMatrix is provided automatically by <instancedMesh>
    vec4 instancePosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    
    // 2. Undulation Math (Sine Wave)
    // We offset x and z based on y height and time.
    // The instancePosition.x adds randomness so they don't move in perfect unison.
    float waveX = sin(pos.y * 1.5 + uTime * 0.5 + instancePosition.x * 0.5) * 0.1;
    float waveZ = cos(pos.y * 1.2 + uTime * 0.3 + instancePosition.z * 0.5) * 0.1;
    
    pos.x += waveX;
    pos.z += waveZ;

    // 3. Mouse Interaction (Parallax / Repulsion)
    // Subtle influence based on mouse position relative to center screen
    float mouseDist = distance(uMouse, vec2(0.0));
    pos.x += uMouse.x * 0.1 * pos.y; // Lean threads based on mouse X
    
    // 4. Pass data to Fragment Shader
    vHeight = pos.y;
    
    // Calculate final position
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader: Color & Lighting
  `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying float vHeight;

  void main() {
    // 1. Gradient Logic
    // Map height (-2.0 to 2.0) to a 0.0 - 1.0 gradient factor
    float gradientFactor = smoothstep(-2.0, 2.0, vHeight);
    
    // Mix the Dark Red and Tactical Red
    vec3 color = mix(uColor2, uColor1, gradientFactor);

    // 2. Cinematic "Glint" (Fake Rim Light)
    // Makes the top tips brighter to catch the "light"
    float glint = smoothstep(1.0, 2.0, vHeight) * 0.5;
    
    gl_FragColor = vec4(color + glint, 1.0);
  }
  `
);

// Register the custom material with R3F
extend({ DataLoomMaterial });

// Add types for the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      dataLoomMaterial: any;
    }
  }
}

// --- 2. The Strands Logic ---

const Strands = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<any>(null);
  
  // Responsive count: fewer lines on mobile for battery saving
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 600 : 1800;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate the Grid of Threads
  useEffect(() => {
    if (!meshRef.current) return;

    const rows = Math.ceil(Math.sqrt(count));
    const spread = 8; // How wide the field is

    for (let i = 0; i < count; i++) {
      // Create a grid distribution with some random jitter
      const row = Math.floor(i / rows);
      const col = i % rows;

      const x = (row / rows) * spread - (spread / 2) + (Math.random() - 0.5) * 0.5;
      const z = (col / rows) * spread - (spread / 2) + (Math.random() - 0.5) * 0.5;
      const y = (Math.random() - 0.5) * 2; // Randomize height slightly

      dummy.position.set(x, y, z);
      
      // Randomize scale for variety in thickness/height
      const scaleY = 1 + Math.random() * 0.5; 
      dummy.scale.set(1, scaleY, 1);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  // Animation Loop
  useFrame((state) => {
    if (!materialRef.current) return;
    
    // Update Uniforms
    materialRef.current.uTime = state.clock.getElapsedTime();
    
    // Smooth mouse interpolation
    materialRef.current.uMouse.lerp(state.mouse, 0.05);
  });

  // Geometry: Very thin cylinder (radiusTop, radiusBottom, height, segments)
  // Low segments (4) is crucial for performance when rendering thousands of objects
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.01, 0.01, 5, 4), []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, null as any, count]}>
      {/* @ts-ignore */}
      <dataLoomMaterial ref={materialRef} transparent />
    </instancedMesh>
  );
};

// --- 3. Main Component ---

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#0F0F11]">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 35 }}
        dpr={[1, 2]} // Handle high-DPI screens
        gl={{ antialias: false }} // Disable AA for performance (lines look fine without it)
      >
        <fog attach="fog" args={['#0F0F11', 5, 12]} />
        <Strands />
      </Canvas>
    </div>
  );
}