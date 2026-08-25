import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function SpyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // 1. Move Cursor Logic
    const onMouseMove = (e: MouseEvent) => {
      // Main dot moves instantly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      // Ring follows with a slight delay
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // 2. Detect Hoverables (Links, Buttons)
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('a, button, .tech-item, input');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  // 3. Animation for "Locking On"
  useEffect(() => {
    if (isHovering) {
      gsap.to(ringRef.current, { 
        scale: 1.6, 
        borderColor: '#D12636', 
        opacity: 1,
        duration: 0.2
      });
      gsap.to(cursorRef.current, { 
        backgroundColor: '#D12636',
        scale: 1.5,
        duration: 0.2
      });
    } else {
      gsap.to(ringRef.current, { 
        scale: 1, 
        borderColor: '#E0D5C9', 
        opacity: 0.4,
        duration: 0.2
      });
      gsap.to(cursorRef.current, { 
        backgroundColor: '#E0D5C9',
        scale: 1,
        duration: 0.2
      });
    }
  }, [isHovering]);

  return (
    <>
      <style>{`
        body { cursor: none; }
        @media (hover: none) { body { cursor: auto; } .spy-cursor { display: none; } }
      `}</style>
      
      {/* The Center Dot */}
      <div 
        ref={cursorRef} 
        className="spy-cursor fixed top-0 left-0 w-2 h-2 bg-[#E0D5C9] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_rgba(209,38,54,0.6)]"
      />

      {/* The Scanning Ring */}
      <div 
        ref={ringRef} 
        className="spy-cursor fixed top-0 left-0 w-8 h-8 border border-[#E0D5C9]/40 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
      >
        {/* The Crosshair Lines */}
        <div className={`absolute top-1/2 left-0 w-full h-[1px] bg-[#D12636] transform -translate-y-1/2 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-0 left-1/2 w-[1px] h-full bg-[#D12636] transform -translate-x-1/2 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </>
  );
}
