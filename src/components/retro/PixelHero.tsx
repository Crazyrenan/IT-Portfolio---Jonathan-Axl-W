import React from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

export function PixelHero(props?: Partial<RetroWindowProps>) {
  return (
    <RetroWindow 
      id="hero"
      title="C:\SYSTEM\Hero.exe" 
      icon="/icons/retro/hero.svg"
      hasMenu={true}
      {...props}
    >
      <div className="flex flex-col md:flex-row gap-4 items-stretch p-2 bg-[#808080]">
        
        {/* Left: Retro Paint Tools */}
        <div className="hidden md:flex flex-col gap-1 w-12 win95-raised p-1 select-none">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">▧</div>
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">▤</div>
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">✏</div>
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">🖌</div>
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">A</div>
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">/</div>
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">□</div>
            <div className="win95-btn w-5 h-5 flex items-center justify-center p-0 font-bold text-xs text-black">○</div>
          </div>
        </div>

        {/* Right: Canvas */}
        <div className="flex-1 win95-sunken bg-white p-3 sm:p-4 md:p-6 flex flex-col md:flex-row gap-5 md:gap-6 relative overflow-hidden min-h-0 md:min-h-[360px]">
          
          {/* Avatar Canvas */}
          <div className="w-full md:w-1/3 flex flex-col gap-2 items-center justify-center">
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 border border-dashed border-gray-400 p-1 relative group cursor-crosshair bg-gray-50">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-black"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-black"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-black"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-black"></div>
              
              <img 
                src="/images/me.jpg" 
                alt="Jonathan Axl Wibowo" 
                className="w-full h-full object-cover object-top block" 
                style={{ imageRendering: 'pixelated' }} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/images/me 2.png';
                }}
              />
            </div>
            <div className="text-[10px] font-mono text-gray-500">[256x256 8-bit RGB]</div>
          </div>

          {/* Bio & Intro */}
          <div className="w-full md:w-2/3 flex flex-col justify-center items-start gap-3">
            <div className="border border-dashed border-gray-400 p-3 sm:p-3.5 relative w-full cursor-text bg-white">
              <div className="text-[10px] sm:text-[11px] font-mono font-bold text-[#000080] uppercase tracking-wider mb-1">
                SYS_USER: JONATHAN_AXL_WIBOWO // ACTIVE
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 font-[Tahoma]">
                Jonathan Axl Wibowo
              </h1>
              <h2 className="text-xs sm:text-sm md:text-base text-blue-900 font-bold mb-2.5 font-[Tahoma]">
                Full-Stack Engineer &amp; Applied Deep Learning Researcher
              </h2>
              <p className="text-black text-xs sm:text-sm leading-relaxed font-[Tahoma]">
                Hi! I am a full-stack engineer and applied deep learning researcher specializing in building high-performance web applications and production-ready machine learning solutions. Experienced in architecting robust backend microservices, database optimization, and crafting responsive, interactive user experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-1 sm:mt-2">
              <a href="/cv.pdf" target="_blank" rel="noreferrer" className="win95-btn font-bold text-xs px-3 py-1.5 no-underline text-black hover:bg-white shadow">
                📄 Download CV (PDF)
              </a>
              <a href="#projects" className="win95-btn font-bold text-xs px-3 py-1.5 no-underline text-black hover:bg-white shadow">
                📁 Explore Projects
              </a>
              <a href="#contact" className="win95-btn font-bold text-xs px-3 py-1.5 no-underline text-black hover:bg-white shadow">
                ✉️ Get in Touch
              </a>
            </div>
          </div>

        </div>

      </div>
    </RetroWindow>
  );
}
