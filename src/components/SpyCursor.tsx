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
      // Ring follows with a slight delay (Spy gadget feel)
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
      gsap.to(ringRef.current, { scale: 1.5, borderColor: '#681826', opacity: 1 }); // Red Brand Color
      gsap.to(cursorRef.current, { backgroundColor: '#681826' });
    } else {
      gsap.to(ringRef.current, { scale: 1, borderColor: '#ffffff', opacity: 0.5 });
      gsap.to(cursorRef.current, { backgroundColor: '#ffffff' });
    }
  }, [isHovering]);

  return (
    <>
      <style>{`
        body { cursor: none; } /* Hide default cursor */
        @media (hover: none) { body { cursor: auto; } .spy-cursor { display: none; } } /* Mobile safe */
      `}</style>
      
      {/* The Center Dot */}
      <div 
        ref={cursorRef} 
        className="spy-cursor fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* The Scanning Ring */}
      <div 
        ref={ringRef} 
        className="spy-cursor fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
      >
        {/* The Crosshair Lines */}
        <div className={`absolute top-1/2 left-0 w-full h-[1px] bg-current transform -translate-y-1/2 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-0 left-1/2 w-[1px] h-full bg-current transform -translate-x-1/2 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </>
  );
}