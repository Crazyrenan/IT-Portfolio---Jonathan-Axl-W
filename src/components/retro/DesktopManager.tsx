import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PixelHero } from './PixelHero';
import { RetroSkillsGrid } from './RetroSkillsGrid';
import { RetroProjectsDossier } from './RetroProjectsDossier';
import { RetroTimeline } from './RetroTimeline';
import { RetroTerminal } from './RetroTerminal';
import { RetroTaskbar, type TaskbarWindowItem } from './RetroTaskbar';

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
    title: 'Hero.exe - Profile',
    exeName: 'Hero.exe',
    icon: 'https://win98icons.alexmeub.com/icons/png/paint_file-1.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 1
  },
  skills: {
    id: 'skills',
    title: 'Skills.sys - Driver Stack',
    exeName: 'Skills.sys',
    icon: 'https://win98icons.alexmeub.com/icons/png/hardware_wiz-1.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 2
  },
  projects: {
    id: 'projects',
    title: 'Projects.exe - Explorer',
    exeName: 'Projects.exe',
    icon: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 3
  },
  experience: {
    id: 'experience',
    title: 'Quest_Log.bat - Career Log',
    exeName: 'Quest_Log.bat',
    icon: 'https://win98icons.alexmeub.com/icons/png/notepad_file-2.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 4
  },
  contact: {
    id: 'contact',
    title: 'Contact.exe - Communication',
    exeName: 'Contact.exe',
    icon: 'https://win98icons.alexmeub.com/icons/png/envelope_closed-0.png',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    order: 5
  }
};

export function DesktopManager() {
  const [windows, setWindows] = useState<Record<string, WindowConfig>>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState<number>(20);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Responsive Mobile Fallback Check (< 768px)
  useEffect(() => {
    function checkViewport() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        // Mobile fallback: auto-open and tile all windows sequentially
        setWindows((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((k) => {
            next[k] = { ...next[k], isOpen: true, isMinimized: false };
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
    setWindows((curr) => {
      const next = { ...curr };
      Object.keys(next).forEach((key) => {
        currentZ += 1;
        next[key] = {
          ...next[key],
          isOpen: true,
          isMinimized: false,
          zIndex: currentZ
        };
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
      {/* Desktop Shortcuts (Visible on Wallpaper) */}
      <div className="fixed top-6 left-6 z-10 hidden sm:flex flex-col gap-4">
        {Object.values(windows)
          .sort((a, b) => a.order - b.order)
          .map((win) => {
            const isCurrentlyOpen = win.isOpen && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => toggleWindow(win.id)}
                className={`group flex flex-col items-center justify-center w-20 p-1.5 rounded text-center transition-all duration-150 focus:outline-none ${
                  isCurrentlyOpen
                    ? 'bg-blue-900/40 text-[#FFEA00] border border-blue-400/40'
                    : 'hover:bg-white/10 text-white border border-transparent'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center p-1 bg-black/20 rounded group-hover:scale-105 transition-transform">
                  <img
                    src={win.icon}
                    alt={win.title}
                    className="w-8 h-8 object-contain [image-rendering:pixelated]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://win98icons.alexmeub.com/icons/png/windows-0.png';
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold font-mono tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/40 rounded truncate max-w-full">
                  {win.exeName}
                </span>
              </button>
            );
          })}

        {/* Quick Launch All Shortcut */}
        <button
          type="button"
          onClick={launchAll}
          className="group flex flex-col items-center justify-center w-20 p-1.5 rounded text-center hover:bg-white/10 text-[#FFEA00] border border-transparent focus:outline-none"
        >
          <div className="w-10 h-10 flex items-center justify-center p-1 bg-blue-900/60 rounded border border-[#FFEA00]/60 group-hover:scale-105 transition-transform shadow-lg">
            <span className="text-xl">⚡</span>
          </div>
          <span className="text-[10px] font-bold font-mono tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/60 rounded truncate max-w-full">
            Launch_All.bat
          </span>
        </button>
      </div>

      {/* Pristine Desktop Initial Prompt Banner (When All Closed on Desktop) */}
      {!anyWindowOpen && !isMobile && (
        <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 text-center z-20 relative pointer-events-auto">
          <div className="win95-raised p-6 max-w-lg mx-auto shadow-2xl border-2 border-white">
            <div className="win95-titlebar-active p-1.5 flex items-center gap-2 mb-4 font-bold text-xs text-white">
              <img
                src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png"
                alt="System"
                className="w-4 h-4"
              />
              <span>AXL_OS v98.4 // SYSTEM READY</span>
            </div>

            <h1 className="text-xl font-bold font-[Tahoma] text-black mb-2">
              Jonathan Axl Wibowo
            </h1>
            <h2 className="text-xs text-blue-900 font-bold mb-4 font-[Tahoma]">
              Full-Stack Software Engineer &times; Deep Learning Researcher
            </h2>

            <p className="text-xs text-gray-800 leading-relaxed mb-5 font-[Tahoma]">
              Welcome to the Interactive Retro OS Portfolio. Click any icon on the desktop or taskbar to launch individual applications, or press the button below to tile all windows for immediate recruiter review.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={launchAll}
                className="win95-btn font-bold text-xs px-4 py-2 bg-[#dfdfdf] flex items-center gap-2 text-black hover:bg-white shadow"
              >
                <span className="text-sm">⚡</span>
                <span>Launch All Applications (Recruiter View)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Windows Assembled Layout Area */}
      <main className="w-full flex flex-col items-center justify-center relative z-20 pt-4">
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
      </main>

      {/* Interactive Bottom Taskbar */}
      <RetroTaskbar
        windows={taskbarWindows}
        activeWindowId={activeWindowId}
        onToggleWindow={toggleWindow}
        onLaunchAll={launchAll}
        onMinimizeAll={minimizeAll}
        onCloseAll={closeAll}
        hasInteracted={hasInteracted}
      />
    </div>
  );
}
