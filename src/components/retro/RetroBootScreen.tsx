import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

export interface RetroBootScreenProps {
  onComplete: () => void;
  durationMs?: number;
  enableSound?: boolean;
}

export function RetroBootScreen({
  onComplete,
  durationMs = 800,
  enableSound = false
}: RetroBootScreenProps) {
  const [bootStep, setBootStep] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const completedRef = useRef(false);

  const finishBoot = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Clean up AudioContext safely
  const cleanupAudio = useCallback(() => {
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, [cleanupAudio]);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishBoot();
    }
  }, [finishBoot]);

  // Synthesize original gentle chord only if sound is opted-in
  const playBootChime = useCallback(() => {
    if (!enableSound) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Gentle C-major arpeggio (C4 -> E4 -> G4 -> C5)
      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const startTime = ctx.currentTime + idx * 0.05;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.7);
      });

      // Schedule closure of AudioContext to return resources to baseline
      setTimeout(() => {
        cleanupAudio();
      }, 800);
    } catch {
      // Audio context silently ignored if blocked by browser policy
    }
  }, [enableSound, cleanupAudio]);

  // Progressive boot message step (compact <=800ms lifecycle)
  useEffect(() => {
    const t1 = setTimeout(() => setBootStep(1), Math.round(durationMs * 0.35));
    const t2 = setTimeout(() => setBootStep(2), Math.round(durationMs * 0.7));
    const tEnd = setTimeout(() => {
      finishBoot();
    }, durationMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tEnd);
    };
  }, [durationMs, finishBoot]);

  // Keyboard shortcut listener (ESC, Space, Enter to skip immediately)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        playBootChime();
        finishBoot();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finishBoot, playBootChime]);

  const handleScreenClick = () => {
    playBootChime();
    finishBoot();
  };

  const BOOT_MESSAGES = [
    "Starting AXL_OS XP Architecture...",
    "Mounting Engineering Services & Machine Learning Models... [OK]",
    "Initializing Luna Desktop Workspace..."
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.18, ease: "easeOut" }
      }}
      onClick={handleScreenClick}
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between items-center p-6 sm:p-12 select-none overflow-hidden font-mono cursor-pointer"
      role="dialog"
      aria-label="System Boot Screen"
    >
      {/* Subtle Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* Top: BIOS Telemetry */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-[11px] text-gray-500 font-mono tracking-tight z-20">
        <div>
          <span>AXL_BIOS (C) 2001-2026 // JONATHAN AXL WIBOWO</span>
        </div>
        <div className="text-gray-400">
          <span>65,536K EXTENDED RAM OK</span>
        </div>
      </div>

      {/* Center: AXL_OS XP Boot Emblem & Caterpillar Loader */}
      <div className="flex flex-col items-center justify-center my-auto z-20">
        {/* Brand Header */}
        <div className="text-xs sm:text-sm text-gray-400 tracking-wider mb-1 font-sans font-medium">
          Jonathan Axl Presents
        </div>

        {/* Logo Row: Original Monitor Icon & Title */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          <img
            src="/icons/xp/my-computer.svg"
            alt=""
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
          />
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                AXL<span className="text-xp-blue-500">_OS</span>
              </span>
              <span className="text-base sm:text-xl font-bold italic text-xp-blue-700 font-sans">
                XP
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-blue-300 font-bold tracking-widest uppercase">
              Personal Workstation Edition
            </div>
          </div>
        </div>

        {/* Windows XP Style Caterpillar Track & Scrolling Blocks */}
        <div className="mt-8 mb-4">
          <div className="w-56 sm:w-64 h-5 sm:h-6 bg-black border-2 border-gray-600 rounded-[3px] p-[2px] relative overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,1)]">
            <div className="absolute top-[2px] bottom-[2px] flex gap-[3px] animate-xp-caterpillar">
              <div className="w-2.5 sm:w-3 h-full rounded-[1px] bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 shadow-[0_0_8px_#00d4ff]" />
              <div className="w-2.5 sm:w-3 h-full rounded-[1px] bg-gradient-to-r from-cyan-400 via-sky-200 to-cyan-400 shadow-[0_0_10px_#00d4ff]" />
              <div className="w-2.5 sm:w-3 h-full rounded-[1px] bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 shadow-[0_0_8px_#00d4ff]" />
            </div>
          </div>
        </div>

        {/* Boot Status Ticker */}
        <div className="text-xs text-gray-300 font-mono tracking-tight min-h-[20px] text-center">
          {BOOT_MESSAGES[bootStep] || BOOT_MESSAGES[0]}
        </div>
      </div>

      {/* Bottom: Copyright & Explicit Professional Bypass Actions (R10) */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-400 z-20 gap-3 border-t border-gray-800/80 pt-3">
        <div className="text-center sm:text-left text-[10px] text-gray-500">
          <span>Copyright © 2001-2026 Jonathan Axl Wibowo. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finishBoot();
            }}
            aria-label="Skip Intro and enter desktop portfolio"
            className="px-3 py-1.5 bg-[#1B56B7] hover:bg-[#2B72E2] text-white rounded font-sans font-bold text-xs border border-white/40 cursor-pointer shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE88C]"
          >
            Skip Intro &amp; Enter Portfolio
          </button>
          <a
            href="/quick-view"
            onClick={(e) => e.stopPropagation()}
            title="Open accessible recruiter summary"
            className="px-3 py-1.5 bg-black/70 hover:bg-black/90 text-[#FFE88C] rounded font-sans font-medium text-xs border border-[#FFE88C]/60 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFE88C]"
          >
            Recruiter Quick View ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
}
