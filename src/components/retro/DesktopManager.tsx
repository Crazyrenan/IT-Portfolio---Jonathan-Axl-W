import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RetroBootScreen } from './RetroBootScreen';
import { PixelHero } from './PixelHero';
import { RetroSkillsGrid } from './RetroSkillsGrid';
import { RetroProjectsDossier } from './RetroProjectsDossier';
import { RetroTimeline } from './RetroTimeline';
import { RetroTerminal } from './RetroTerminal';
import { RetroCertificateGallery } from './RetroCertificateGallery';
import { RetroTaskbar, type TaskbarWindowItem } from './RetroTaskbar';
import {
  Persona5Window,
  ApexLegendsWindow,
  EldenRingWindow,
  RetroBrowserWindow
} from './RetroEasterEggs';

export interface WindowConfig {
  id: string;
  title: string;
  exeName: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  order: number;
}

const INITIAL_WINDOWS: Record<string, WindowConfig> = {
  hero: {
    id: 'hero',
    title: 'Hero Section',
    exeName: 'Hero Section',
    icon: '/icons/retro/hero.svg',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 1
  },
  skills: {
    id: 'skills',
    title: 'Skills & Tech Stack',
    exeName: 'Skills & Tech Stack',
    icon: '/icons/retro/skills.svg',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 2
  },
  projects: {
    id: 'projects',
    title: 'Projects Dossier',
    exeName: 'Projects Dossier',
    icon: '/icons/retro/projects.svg',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 3
  },
  experience: {
    id: 'experience',
    title: 'Experience & Career',
    exeName: 'Experience & Career',
    icon: '/icons/retro/quest.svg',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 4
  },
  contact: {
    id: 'contact',
    title: 'Contact Transmission',
    exeName: 'Contact Transmission',
    icon: '/icons/retro/contact.svg',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 5
  },
  browser: {
    id: 'browser',
    title: 'Web Browser',
    exeName: 'Web Browser',
    icon: '/icons/retro/browser.svg',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 6
  },
  p5r: {
    id: 'p5r',
    title: 'Persona 5 Royal',
    exeName: 'Persona 5 Royal',
    icon: '/icons/retro/persona5.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 7
  },
  apex: {
    id: 'apex',
    title: 'Apex Legends',
    exeName: 'Apex Legends',
    icon: '/icons/retro/apex.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 8
  },
  elden: {
    id: 'elden',
    title: 'Elden Ring',
    exeName: 'Elden Ring',
    icon: '/icons/retro/eldenring.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 9
  }
};

export function DesktopManager() {
  const [windows, setWindows] = useState<Record<string, WindowConfig>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState<number>(20);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isBooting, setIsBooting] = useState<boolean>(true);

  // Reboot System
  const rebootOS = useCallback(() => {
    setIsBooting(true);
  }, []);

  // Responsive Mobile Fallback Check (< 768px)
  useEffect(() => {
    function checkViewport() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // Mobile fallback: auto-open core portfolio windows sequentially
        const corePortfolioIds = ['hero', 'skills', 'projects', 'experience', 'contact'];
        setWindows((prev) => {
          const next = { ...prev };
          corePortfolioIds.forEach((k) => {
            if (next[k]) {
              next[k] = { ...next[k], isOpen: true, isMinimized: false };
            }
          });
          return next;
        });
        setHasInteracted(true);
      }
    }

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Bring a window to front
  const bringToFront = useCallback((id: string) => {
    setHighestZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((curr) => ({
        ...curr,
        [id]: { ...curr[id], zIndex: nextZ, isMinimized: false }
      }));
      return nextZ;
    });
    setActiveWindowId(id);
    setHasInteracted(true);
  }, []);

  // Toggle Window state from Taskbar or Desktop icon
  const toggleWindow = useCallback((id: string) => {
    setHasInteracted(true);
    setWindows((curr) => {
      const target = curr[id];
      if (!target) return curr;

      // If closed, open it and bring to front
      if (!target.isOpen) {
        const nextZ = highestZIndex + 1;
        setHighestZIndex(nextZ);
        setActiveWindowId(id);
        
        // On desktop or mobile, smoothly scroll into view
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);

        return {
          ...curr,
          [id]: { ...target, isOpen: true, isMinimized: false, zIndex: nextZ }
        };
      }

      // If open & minimized, restore it
      if (target.isMinimized) {
        const nextZ = highestZIndex + 1;
        setHighestZIndex(nextZ);
        setActiveWindowId(id);

        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);

        return {
          ...curr,
          [id]: { ...target, isMinimized: false, zIndex: nextZ }
        };
      }

      // If open, active, and not minimized: minimize it (like Windows taskbar)
      if (activeWindowId === id) {
        setActiveWindowId(null);
        return {
          ...curr,
          [id]: { ...target, isMinimized: true }
        };
      }

      // If open but not active: focus it
      const nextZ = highestZIndex + 1;
      setHighestZIndex(nextZ);
      setActiveWindowId(id);

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);

      return {
        ...curr,
        [id]: { ...target, zIndex: nextZ }
      };
    });
  }, [activeWindowId, highestZIndex]);

  // Close Window
  const closeWindow = useCallback((id: string) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isOpen: false, isMinimized: false }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  // Minimize Window
  const minimizeWindow = useCallback((id: string) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isMinimized: true }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  // Maximize / Restore Window
  const maximizeWindow = useCallback((id: string) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isMaximized: !curr[id].isMaximized }
    }));
  }, []);

  // Quick Action: Launch All / Tile All (Recruiter Mode)
  const launchAll = useCallback(() => {
    setHasInteracted(true);
    let currentZ = highestZIndex;
    const corePortfolioIds = ['hero', 'skills', 'projects', 'experience', 'contact'];
    setWindows((curr) => {
      const next = { ...curr };
      corePortfolioIds.forEach((key) => {
        if (next[key]) {
          currentZ += 1;
          next[key] = {
            ...next[key],
            isOpen: true,
            isMinimized: false,
            zIndex: currentZ
          };
        }
      });
      return next;
    });
    setHighestZIndex(currentZ);
    setActiveWindowId('hero');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [highestZIndex]);

  // Minimize All
  const minimizeAll = useCallback(() => {
    setWindows((curr) => {
      const next = { ...curr };
      Object.keys(next).forEach((key) => {
        next[key] = { ...next[key], isMinimized: true };
      });
      return next;
    });
    setActiveWindowId(null);
  }, []);

  // Close All
  const closeAll = useCallback(() => {
    setWindows((curr) => {
      const next = { ...curr };
      Object.keys(next).forEach((key) => {
        next[key] = { ...next[key], isOpen: false, isMinimized: false };
      });
      return next;
    });
    setActiveWindowId(null);
  }, []);

  // Prepare taskbar items
  const taskbarWindows: TaskbarWindowItem[] = useMemo(() => {
    return Object.values(windows)
      .sort((a, b) => a.order - b.order)
      .map((w) => ({
        id: w.id,
        title: w.title,
        exeName: w.exeName,
        icon: w.icon,
        isOpen: w.isOpen,
        isMinimized: w.isMinimized,
        isActive: activeWindowId === w.id
      }));
  }, [windows, activeWindowId]);

  const anyWindowOpen = Object.values(windows).some((w) => w.isOpen && !w.isMinimized);

  return (
    <div className="relative w-full min-h-screen pb-20 select-none">
      {/* Desktop Shortcuts (Visible on Wallpaper in 2 Authentic Retro Columns) */}
      <div className="fixed top-5 left-5 z-10 hidden sm:flex flex-row gap-3">
        {/* Column 1: Core System & Portfolio Dossier */}
        <div className="flex flex-col gap-2.5">
          {['hero', 'skills', 'projects', 'experience', 'contact'].map((winId) => {
            const win = windows[winId];
            if (!win) return null;
            const isCurrentlyOpen = win.isOpen && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => toggleWindow(win.id)}
                className={`group flex flex-col items-center justify-center w-20 p-1 rounded text-center transition-all duration-150 focus:outline-none ${
                  isCurrentlyOpen
                    ? 'bg-blue-900/50 text-[#FFEA00] border border-blue-400/60'
                    : 'hover:bg-white/10 text-white border border-transparent'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center p-1 bg-black/25 rounded group-hover:scale-105 transition-transform">
                  <img
                    src={win.icon}
                    alt={win.title}
                    className="w-8 h-8 object-contain [image-rendering:pixelated]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/icons/retro/windows.svg';
                    }}
                  />
                </div>
                <span className="text-[10.5px] font-sans font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/50 rounded leading-tight text-center line-clamp-2 max-w-full">
                  {win.exeName}
                </span>
              </button>
            );
          })}

          {/* Quick Launch All Shortcut */}
          <button
            type="button"
            onClick={launchAll}
            className="group flex flex-col items-center justify-center w-20 p-1 rounded text-center hover:bg-white/10 text-[#FFEA00] border border-transparent focus:outline-none"
            title="Launch All Portfolio Windows"
          >
            <div className="w-10 h-10 flex items-center justify-center p-1 bg-blue-900/60 rounded border border-[#FFEA00]/60 group-hover:scale-105 transition-transform shadow-lg">
              <span className="text-xl">⚡</span>
            </div>
            <span className="text-[10.5px] font-sans font-semibold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/60 rounded leading-tight text-center max-w-full">
              Launch All
            </span>
          </button>
        </div>

        {/* Column 2: Web Browser, Games & Utilities */}
        <div className="flex flex-col gap-2.5">
          {['browser', 'p5r', 'apex', 'elden'].map((winId) => {
            const win = windows[winId];
            if (!win) return null;
            const isCurrentlyOpen = win.isOpen && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => toggleWindow(win.id)}
                className={`group flex flex-col items-center justify-center w-20 p-1 rounded text-center transition-all duration-150 focus:outline-none ${
                  isCurrentlyOpen
                    ? 'bg-blue-900/50 text-[#FFEA00] border border-blue-400/60'
                    : 'hover:bg-white/10 text-white border border-transparent'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center p-1 bg-black/25 rounded group-hover:scale-105 transition-transform">
                  <img
                    src={win.icon}
                    alt={win.title}
                    className="w-8 h-8 object-contain [image-rendering:pixelated]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/icons/retro/windows.svg';
                    }}
                  />
                </div>
                <span className="text-[10.5px] font-sans font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/50 rounded leading-tight text-center line-clamp-2 max-w-full">
                  {win.exeName}
                </span>
              </button>
            );
          })}

          {/* Reboot OS Shortcut */}
          <button
            type="button"
            onClick={rebootOS}
            className="group flex flex-col items-center justify-center w-20 p-1 rounded text-center hover:bg-white/10 text-white border border-transparent focus:outline-none"
            title="Reboot System & Replay Boot Animation"
          >
            <div className="w-10 h-10 flex items-center justify-center p-1 bg-black/40 rounded border border-gray-500/50 group-hover:scale-105 transition-transform shadow-lg">
              <span className="text-xl">🔄</span>
            </div>
            <span className="text-[10.5px] font-sans font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/60 rounded leading-tight text-center max-w-full">
              Restart System
            </span>
          </button>
        </div>
      </div>

      {/* Pristine Desktop Initial Prompt Banner (When All Closed on Desktop) */}
      {!anyWindowOpen && !isMobile && (
        <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 text-center z-20 relative pointer-events-auto lg:pr-[280px]">
          <div className="win95-raised p-5 sm:p-6 max-w-lg mx-auto shadow-2xl border-2 border-white">
            <div className="win95-titlebar-active p-1.5 flex items-center gap-2 mb-4 font-bold text-xs text-white">
              <img
                src="/icons/retro/computer.svg"
                alt="System"
                className="w-4 h-4"
              />
              <span>AXL_OS v98.4 // READY</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-[Tahoma] text-black mb-1">
              Jonathan Axl Wibowo
            </h1>
            <h2 className="text-xs sm:text-sm text-blue-900 font-bold mb-3 font-[Tahoma]">
              Full-Stack Engineer &amp; Applied Deep Learning Researcher
            </h2>

            <p className="text-xs text-gray-800 leading-relaxed mb-5 font-[Tahoma]">
              Welcome to my interactive retro OS portfolio! Click any desktop shortcut or taskbar item to launch an application, or launch all windows to explore the full portfolio dossier at once.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={launchAll}
                className="win95-btn font-bold text-xs px-4 py-2 bg-[#dfdfdf] flex items-center gap-2 text-black hover:bg-white shadow"
              >
                <span className="text-sm">⚡</span>
                <span>Launch All Windows (Recruiter Mode)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Windows Assembled Layout Area (Offset on desktop for sidebar) */}
      <main className="w-full flex-1 flex flex-col items-center justify-center relative z-20 pt-3 pb-12 px-2 sm:px-4 lg:pr-[280px] min-h-0">
        {/* 1. Hero Window */}
        <AnimatePresence>
          {windows.hero.isOpen && !windows.hero.isMinimized && (
            <PixelHero
              id="hero"
              isMaximized={windows.hero.isMaximized}
              isActive={activeWindowId === 'hero'}
              zIndex={windows.hero.zIndex}
              onFocus={() => bringToFront('hero')}
              onClose={() => closeWindow('hero')}
              onMinimize={() => minimizeWindow('hero')}
              onMaximize={() => maximizeWindow('hero')}
            />
          )}
        </AnimatePresence>

        {/* 2. Skills Window */}
        <AnimatePresence>
          {windows.skills.isOpen && !windows.skills.isMinimized && (
            <RetroSkillsGrid
              id="skills"
              isMaximized={windows.skills.isMaximized}
              isActive={activeWindowId === 'skills'}
              zIndex={windows.skills.zIndex}
              onFocus={() => bringToFront('skills')}
              onClose={() => closeWindow('skills')}
              onMinimize={() => minimizeWindow('skills')}
              onMaximize={() => maximizeWindow('skills')}
            />
          )}
        </AnimatePresence>

        {/* 3. Projects Window (7 verified projects) */}
        <AnimatePresence>
          {windows.projects.isOpen && !windows.projects.isMinimized && (
            <RetroProjectsDossier
              id="projects"
              isMaximized={windows.projects.isMaximized}
              isActive={activeWindowId === 'projects'}
              zIndex={windows.projects.zIndex}
              onFocus={() => bringToFront('projects')}
              onClose={() => closeWindow('projects')}
              onMinimize={() => minimizeWindow('projects')}
              onMaximize={() => maximizeWindow('projects')}
            />
          )}
        </AnimatePresence>

        {/* 4. Experience Timeline Window */}
        <AnimatePresence>
          {windows.experience.isOpen && !windows.experience.isMinimized && (
            <RetroTimeline
              id="experience"
              isMaximized={windows.experience.isMaximized}
              isActive={activeWindowId === 'experience'}
              zIndex={windows.experience.zIndex}
              onFocus={() => bringToFront('experience')}
              onClose={() => closeWindow('experience')}
              onMinimize={() => minimizeWindow('experience')}
              onMaximize={() => maximizeWindow('experience')}
            />
          )}
        </AnimatePresence>

        {/* 5. Contact Terminal Window */}
        <AnimatePresence>
          {windows.contact.isOpen && !windows.contact.isMinimized && (
            <RetroTerminal
              id="contact"
              isMaximized={windows.contact.isMaximized}
              isActive={activeWindowId === 'contact'}
              zIndex={windows.contact.zIndex}
              onFocus={() => bringToFront('contact')}
              onClose={() => closeWindow('contact')}
              onMinimize={() => minimizeWindow('contact')}
              onMaximize={() => maximizeWindow('contact')}
            />
          )}
        </AnimatePresence>

        {/* 6. Retro Internet Explorer 5.0 Window (Easter Egg) */}
        <AnimatePresence>
          {windows.browser.isOpen && !windows.browser.isMinimized && (
            <RetroBrowserWindow
              id="browser"
              isMaximized={windows.browser.isMaximized}
              isActive={activeWindowId === 'browser'}
              zIndex={windows.browser.zIndex}
              onFocus={() => bringToFront('browser')}
              onClose={() => closeWindow('browser')}
              onMinimize={() => minimizeWindow('browser')}
              onMaximize={() => maximizeWindow('browser')}
            />
          )}
        </AnimatePresence>

        {/* 7. Persona 5 Royal Window (Easter Egg) */}
        <AnimatePresence>
          {windows.p5r.isOpen && !windows.p5r.isMinimized && (
            <Persona5Window
              id="p5r"
              isMaximized={windows.p5r.isMaximized}
              isActive={activeWindowId === 'p5r'}
              zIndex={windows.p5r.zIndex}
              onFocus={() => bringToFront('p5r')}
              onClose={() => closeWindow('p5r')}
              onMinimize={() => minimizeWindow('p5r')}
              onMaximize={() => maximizeWindow('p5r')}
            />
          )}
        </AnimatePresence>

        {/* 8. Apex Legends Window (Easter Egg) */}
        <AnimatePresence>
          {windows.apex.isOpen && !windows.apex.isMinimized && (
            <ApexLegendsWindow
              id="apex"
              isMaximized={windows.apex.isMaximized}
              isActive={activeWindowId === 'apex'}
              zIndex={windows.apex.zIndex}
              onFocus={() => bringToFront('apex')}
              onClose={() => closeWindow('apex')}
              onMinimize={() => minimizeWindow('apex')}
              onMaximize={() => maximizeWindow('apex')}
            />
          )}
        </AnimatePresence>

        {/* 9. Elden Ring Window (Easter Egg) */}
        <AnimatePresence>
          {windows.elden.isOpen && !windows.elden.isMinimized && (
            <EldenRingWindow
              id="elden"
              isMaximized={windows.elden.isMaximized}
              isActive={activeWindowId === 'elden'}
              zIndex={windows.elden.zIndex}
              onFocus={() => bringToFront('elden')}
              onClose={() => closeWindow('elden')}
              onMinimize={() => minimizeWindow('elden')}
              onMaximize={() => maximizeWindow('elden')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Retro Certificate Gallery (Desktop Sidebar & Mobile Toggle Drawer) */}
      <RetroCertificateGallery />

      {/* Interactive Bottom Taskbar */}
      <RetroTaskbar
        windows={taskbarWindows}
        activeWindowId={activeWindowId}
        onToggleWindow={toggleWindow}
        onLaunchAll={launchAll}
        onMinimizeAll={minimizeAll}
        onCloseAll={closeAll}
        onReboot={rebootOS}
        hasInteracted={hasInteracted}
      />

      {/* ── Retro Windows XP / 95 Boot Loading Screen ── */}
      <AnimatePresence>
        {isBooting && (
          <RetroBootScreen
            onComplete={() => setIsBooting(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
