import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function FloatingRetroBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const floatA: any = shouldReduceMotion ? {} : {
    y: [-8, 8, -8],
    rotate: [-1, 1.5, -1],
    transition: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
  };

  const floatB: any = shouldReduceMotion ? {} : {
    y: [6, -6, 6],
    rotate: [1, -1.5, 1],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
  };

  const floatC: any = shouldReduceMotion ? {} : {
    y: [-5, 7, -5],
    rotate: [-0.5, 1, -0.5],
    transition: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' }
  };

  const initialFade: any = { opacity: 0, scale: 0.95 };
  const animateFade: any = { opacity: 1, scale: 1, transition: { duration: 1.2, ease: 'easeOut' } };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none hidden md:block overflow-hidden">
      
      {/* Window A: Winamp (Top Right) */}
      <motion.div 
        initial={initialFade}
        animate={shouldReduceMotion ? animateFade : { ...animateFade, ...floatA }}
        className="absolute top-[10%] right-[10%] w-64 win95-raised p-1 opacity-70"
        style={{ transformOrigin: 'center' }}
      >
        <div className="win95-titlebar flex justify-between items-center px-1 py-0.5 select-none">
          <div className="flex items-center gap-1 text-white font-bold text-xs tracking-wide ml-1">
            <span>⚡ Winamp v2.8</span>
          </div>
          <div className="flex gap-[2px]">
            <div className="win95-btn font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0">_</div>
            <div className="win95-btn font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0">X</div>
          </div>
        </div>
        <div className="bg-[#111] p-2 mt-1 border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white">
          <div className="text-[#00FF00] font-mono text-[10px] whitespace-nowrap overflow-hidden mb-2">
            <span className="inline-block animate-[marquee_5s_linear_infinite]">Axl_Vibes_2026.mp3 (192kbps) *** </span>
          </div>
          <div className="flex gap-1 mb-2 items-end h-8">
            {/* Fake Equalizer */}
            {[1, 2, 3, 2, 4, 3, 5, 2, 4, 3].map((val, i) => (
              <motion.div 
                key={i}
                className="w-1.5 bg-[#00FF00]"
                animate={shouldReduceMotion ? { height: val * 4 } : { height: [val * 3, val * 6, val * 2, val * 5] }}
                transition={{ duration: 0.5 + (i * 0.1), repeat: Infinity, repeatType: 'reverse' }}
                style={{ height: val * 4 }}
              />
            ))}
          </div>
          <div className="flex gap-1 justify-center">
            <div className="win95-btn w-6 h-4 text-[8px] flex items-center justify-center">⏮</div>
            <div className="win95-btn w-6 h-4 text-[8px] flex items-center justify-center">▶</div>
            <div className="win95-btn w-6 h-4 text-[8px] flex items-center justify-center">⏸</div>
            <div className="win95-btn w-6 h-4 text-[8px] flex items-center justify-center">⏹</div>
            <div className="win95-btn w-6 h-4 text-[8px] flex items-center justify-center">⏭</div>
          </div>
        </div>
      </motion.div>

      {/* Window B: Projects Explorer (Mid Left) */}
      <motion.div 
        initial={initialFade}
        animate={shouldReduceMotion ? animateFade : { ...animateFade, ...floatB }}
        className="absolute top-[40%] left-[8%] w-72 win95-raised p-1 opacity-60"
        style={{ transformOrigin: 'center' }}
      >
        <div className="win95-titlebar flex justify-between items-center px-1 py-0.5 select-none">
          <div className="flex items-center gap-1 text-white font-bold text-xs tracking-wide ml-1">
            <span className="text-[10px]">📁</span> C:\AXL_OS\PROJECTS
          </div>
          <div className="flex gap-[2px]">
            <div className="win95-btn font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0">_</div>
            <div className="win95-btn font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0">☐</div>
            <div className="win95-btn font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0">X</div>
          </div>
        </div>
        <div className="bg-white p-2 mt-1 border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white flex flex-col gap-2 min-h-[100px]">
          <div className="flex items-center gap-2 text-xs font-[Tahoma] text-black">
            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-5 h-5 opacity-70" alt="folder" />
            <span className="truncate">IEEE_YESIST12_TB_Research</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-[Tahoma] text-black">
            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-5 h-5 opacity-70" alt="folder" />
            <span className="truncate">PT_LKH_Internal</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-[Tahoma] text-black">
            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" className="w-5 h-5 opacity-70" alt="folder" />
            <span className="truncate">IMIP_Portal_V2</span>
          </div>
        </div>
      </motion.div>

      {/* Window C: Video Player (Bottom Right) */}
      <motion.div 
        initial={initialFade}
        animate={shouldReduceMotion ? animateFade : { ...animateFade, ...floatC }}
        className="absolute bottom-[20%] right-[15%] w-60 win95-raised p-1 opacity-65"
        style={{ transformOrigin: 'center' }}
      >
        <div className="win95-titlebar flex justify-between items-center px-1 py-0.5 select-none">
          <div className="flex items-center gap-1 text-white font-bold text-xs tracking-wide ml-1">
            <span className="text-[10px]">🎞️</span> Stream_Player.avi
          </div>
          <div className="flex gap-[2px]">
            <div className="win95-btn font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0">_</div>
            <div className="win95-btn font-bold text-[10px] w-4 h-4 flex items-center justify-center p-0">X</div>
          </div>
        </div>
        <div className="bg-black p-1 mt-1 border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white relative h-32 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 pointer-events-none"></div>
          <div className="font-mono text-[#00FF00] text-xs opacity-50 text-center animate-pulse">
            BUFFERING...<br/>[##-------] 24%
          </div>
        </div>
      </motion.div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
