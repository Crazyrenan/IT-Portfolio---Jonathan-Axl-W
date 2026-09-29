import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface RetroBootScreenProps {
  onComplete: () => void;
  durationMs?: number;
}

export function RetroBootScreen({ onComplete, durationMs = 2800 }: RetroBootScreenProps) {
  const [bootStep, setBootStep] = useState(0);

  // Synthesize authentic retro boot chord using Web Audio API
  const playBootChime = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      // Nostalgic ascending arpeggio (C4 -> E4 -> G4 -> C5)
      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        const startTime = ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 1.4);
      });
    } catch {
      // Audio context silently ignored if blocked by browser policy
    }
  }, []);

  // Cycle boot messages
  useEffect(() => {
    const t1 = setTimeout(() => setBootStep(1), 600);
    const t2 = setTimeout(() => setBootStep(2), 1300);
    const t3 = setTimeout(() => setBootStep(3), 2000);
    const tEnd = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
    };
  }, [durationMs, onComplete]);

  // Keyboard shortcut listener (ESC or Space to skip immediately)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        playBootChime();
        onComplete();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete, playBootChime]);

  const handleScreenClick = () => {
    playBootChime();
    onComplete();
  };

  const BOOT_MESSAGES = [
    "Starting AXL_OS System Architecture...",
    "Loading VMM32.VXD & SYSTEM.DAT drivers... [OK]",
    "Mounting Full-Stack Services & PyTorch Kernels... [OK]",
    "Launching Desktop GUI Environment..."
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05, 
        filter: "brightness(2)",
        transition: { duration: 0.35, ease: "easeOut" } 
      }}
      onClick={handleScreenClick}
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between items-center p-6 sm:p-12 select-none overflow-hidden font-mono cursor-pointer"
      role="dialog"
      aria-label="System Boot Screen"
    >
      {/* CRT Scanline & Grain Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* Top: Retro BIOS Telemetry */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-[11px] text-gray-500 font-mono tracking-tight z-20">
        <div>
          <span>AXL_BIOS (C) 1998-2026 American Megatrends // JONATHAN AXL</span>
        </div>
        <div className="text-gray-400">
          <span>65,536K EXTENDED RAM OK</span>
        </div>
      </div>

      {/* Center: Iconic Windows XP / 95 Boot Emblem & Caterpillar Loader */}
      <div className="flex flex-col items-center justify-center my-auto z-20">
        
        {/* Brand Header */}
        <div className="text-xs sm:text-sm text-gray-400 tracking-wider mb-1 font-serif italic">
          Jonathan Axl Presents
        </div>

        {/* Logo Row: 4-Color Windows Flag & Title */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <img 
            src="/icons/retro/windows.svg" 
            alt="Windows Logo" 
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain [image-rendering:pixelated] drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
          />
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-5xl font-black tracking-tight text-white font-[Tahoma,sans-serif] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                AXL<span className="text-[#3399FF]">_OS</span>
              </span>
              <span className="text-base sm:text-xl font-bold italic text-[#FF3333] font-[Tahoma]">
                98
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-blue-300 font-bold tracking-widest uppercase">
              Professional Workstation Edition
            </div>
          </div>
        </div>

        {/* Windows XP Style Caterpillar Track & Scrolling Blocks */}
        <div className="mt-8 mb-4">
          <div className="w-56 sm:w-64 h-5 sm:h-6 bg-black border-2 border-gray-600 rounded-[3px] p-[2px] relative overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,1)]">
            {/* The 3 Cyan Caterpillar Blocks */}
            <div className="absolute top-[2px] bottom-[2px] flex gap-[3px] animate-xp-caterpillar">
              <div className="w-2.5 sm:w-3 h-full rounded-[1px] bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 shadow-[0_0_8px_#00d4ff]" />
              <div className="w-2.5 sm:w-3 h-full rounded-[1px] bg-gradient-to-r from-cyan-400 via-sky-200 to-cyan-400 shadow-[0_0_10px_#00d4ff]" />
              <div className="w-2.5 sm:w-3 h-full rounded-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 shadow-[0_0_8px_#00d4ff]" />
            </div>
          </div>
        </div>

        {/* Boot Status Ticker */}
        <div className="text-xs text-gray-300 font-mono tracking-tight min-h-[20px] text-center">
          {BOOT_MESSAGES[bootStep]}
        </div>

      </div>

      {/* Bottom: Copyright & Skip Instruction */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] text-gray-500 z-20 gap-2">
        <div className="text-center sm:text-left">
          <span>Copyright © 1998-2026 Jonathan Axl Wibowo. All rights reserved.</span>
        </div>
        <div className="text-center sm:text-right text-[#FFEA00] animate-pulse font-mono">
          [ Click anywhere or press ESC to skip ]
        </div>
      </div>

    </motion.div>
  );
}
