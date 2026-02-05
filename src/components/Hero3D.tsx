import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Star Field Component
const Stars = () => {
  const meshRef = useRef<THREE.Points>(null!);
  
  // Create stars once
  const [geometry] = useState(() => {
    const geo = new THREE.BufferGeometry();
    const count = 3000; // Reduce count slightly for cleaner look in light mode
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10; // Spread them out
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  });

  // Animation: Rotate slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta / 15;
      meshRef.current.rotation.y -= delta / 20;
    }
  });

  // THE FIX: Dynamic Color System
  // We use state to track the color because Canvas is isolated from CSS
  const [starColor, setStarColor] = useState('#681826'); // Default Dark Red

  useEffect(() => {
    // Function to check theme and update color
    const updateColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      // Light Mode: Use Primary Color (Dusty Rose #B85C68) or Dark Grey (#4A4442) for visibility
      // Dark Mode: Use White (#FFFFFF) or Red (#681826)
      setStarColor(isDark ? '#E0D5C9' : '#B85C68'); 
    };

    // Check immediately
    updateColor();

    // Listen for theme changes (using our custom event from ThemeToggle)
    // Or simpler: use a MutationObserver on the <html> tag
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color={starColor} // Dynamic Color
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

export default function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Stars />
      </Canvas>
    </div>
  );
}