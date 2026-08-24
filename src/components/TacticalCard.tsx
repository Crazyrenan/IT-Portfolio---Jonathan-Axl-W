import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TacticalCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  interactive?: boolean;
}

export default function TacticalCard({ 
  children, 
  className = "", 
  depth = 25,
  interactive = true 
}: TacticalCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    x.set(clientX / rect.width - 0.5);
    y.set(clientY / rect.height - 0.5);
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  function handleMouseEnter() {
    if (interactive) setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={`relative group bg-[#1B1B1E]/80 backdrop-blur-xl border border-[#681826]/40 hover:border-[#D12636] rounded-xs p-6 md:p-8 transition-colors duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(104,24,38,0.25)] overflow-hidden ${className}`}
    >
      {/* Dynamic Holographic Glare Follower */}
      {interactive && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(209, 38, 54, 0.12), rgba(104, 24, 38, 0.05) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* Tactical Corner Brackets (Ada Wong Red) */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D12636]/40 group-hover:border-[#D12636] transition-colors duration-300 pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D12636]/40 group-hover:border-[#D12636] transition-colors duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D12636]/40 group-hover:border-[#D12636] transition-colors duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D12636]/40 group-hover:border-[#D12636] transition-colors duration-300 pointer-events-none z-20" />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D12636]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Multi-Layer Depth Content Container */}
      <div 
        style={{ transform: `translateZ(${depth}px)` }} 
        className="relative z-20 transition-transform duration-200 ease-out"
      >
        {children}
      </div>
    </motion.div>
  );
}