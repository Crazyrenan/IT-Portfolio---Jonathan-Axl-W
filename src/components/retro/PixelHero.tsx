import React from 'react';
import { RetroWindow } from './RetroWindow';

export function PixelHero() {
  return (
    <section className="w-full pt-12 md:pt-24 pb-8 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <RetroWindow title="Profile.bmp - Paint" hasMenu={true}>
          <div className="flex flex-col md:flex-row gap-4 items-stretch p-2 bg-[#808080]">
            
            {/* Left: Toolbar / Tools */}
            <div className="hidden md:flex flex-col gap-1 w-12 win95-raised p-1">
              <div className="grid grid-cols-2 gap-[2px]">
                {/* Mock paint tools */}
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">▧</div>
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">▤</div>
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">✏</div>
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">🖌</div>
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">A</div>
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">/</div>
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">□</div>
                <div className="win95-btn w-5 h-5 flex items-center justify-center p-0">○</div>
              </div>
            </div>

            {/* Right: Canvas */}
            <div className="flex-1 win95-sunken bg-white p-4 md:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden min-h-[400px]">
              
              {/* Avatar on Canvas */}
              <div className="w-full md:w-1/3 flex flex-col gap-2 items-center">
                <div className="w-48 h-48 md:w-56 md:h-56 min-w-[192px] min-h-[192px] border border-dashed border-gray-400 p-1 relative group cursor-crosshair">
                  {/* Resize handles */}
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
              </div>

              {/* Text / Info on Canvas */}
              <div className="w-full md:w-2/3 flex flex-col justify-center items-start gap-4">
                <div className="border border-dashed border-gray-400 p-2 relative w-full cursor-text">
                  <h1 className="text-3xl md:text-4xl font-bold text-black mb-1">
                    Jonathan Axl Wibowo
                  </h1>
                  <h2 className="text-lg md:text-xl text-gray-700 font-semibold mb-4">
                    Junior Full-Stack Web Developer & AI/Data Enthusiast
                  </h2>
                  <p className="text-black text-sm md:text-base leading-relaxed">
                    Halo! Saya adalah mahasiswa/lulusan Sistem Informasi yang berfokus pada perancangan web modern (Laravel, React, Astro) dan penerapan model Deep Learning praktis. Terbuka untuk kesempatan kerja full-time, kontrak, maupun magang.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <a href="/Jonathan_Axl_Wibowo_CV.pdf" target="_blank" rel="noreferrer" className="win95-btn font-bold text-sm px-4 py-2">
                    Unduh Resume (PDF)
                  </a>
                  <a href="#projects" className="win95-btn font-bold text-sm px-4 py-2">
                    Lihat Portofolio Proyek
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
