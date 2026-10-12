import React, { useReducer, useState, useEffect, useCallback, useMemo } from 'react';
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
import {
  createInitialWorkspaceState,
  windowReducer,
  getAppZIndex,
  parseHashIntent,
  APP_REGISTRY,
  CORE_APP_IDS,
  type AppId,
  type Rect
} from '../../lib/window-manager';

export function DesktopManager() {
  const [state, dispatch] = useReducer(windowReducer, undefined, () => {
    const bounds =
      typeof window !== 'undefined'
        ? { width: Math.max(320, window.innerWidth - 30), height: Math.max(240, window.innerHeight - 70) }
        : { width: 1200, height: 750 };

    let initialTarget: AppId | undefined;
    if (typeof window !== 'undefined') {
      const intent = parseHashIntent(window.location.hash);
      if (intent.appId) initialTarget = intent.appId;
    }

    return createInitialWorkspaceState(bounds, initialTarget);
  });

  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isBooting, setIsBooting] = useState<boolean>(true);

  // Reboot System (replays boot screen without wiping open window state)
  const rebootOS = useCallback(() => {
    setIsBooting(true);
  }, []);

  // Viewport tracking (does not auto-open windows on resize, respecting TRD)
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      dispatch({
        type: 'BOUNDS_CHANGED',
        bounds: {
          width: Math.max(320, window.innerWidth - 30),
          height: Math.max(240, window.innerHeight - 70)
        }
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // URL Hash handling for external / back-forward navigation (T09)
  useEffect(() => {
    function handleHashChange() {
      if (typeof window === 'undefined') return;
      const intent = parseHashIntent(window.location.hash);
      if (intent.appId) {
        dispatch({ type: 'OPEN', id: intent.appId });
        setHasInteracted(true);
        setTimeout(() => {
          const el = document.getElementById(intent.appId!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 120);
      }
    }

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Focus restoration: when active window changes, focus its titlebar button unless typing in an input (T07)
  useEffect(() => {
    if (!state.activeId) return;
    const activeEl = document.getElementById(state.activeId);
    if (activeEl) {
      const activeTag = document.activeElement?.tagName;
      const isInputFocused =
        activeEl.contains(document.activeElement) &&
        (activeTag === 'INPUT' || activeTag === 'TEXTAREA');

      if (!isInputFocused) {
        const titleBtn = activeEl.querySelector<HTMLElement>('button[title^="System Menu"]');
        titleBtn?.focus();
      }
    }
  }, [state.activeId]);

  // Launch from desktop icon: dispatches OPEN (never minimizes, satisfying FR-06)
  const handleLaunchIcon = useCallback((id: AppId) => {
    setHasInteracted(true);
    dispatch({ type: 'SELECT_ICON', id });
    dispatch({ type: 'OPEN', id });

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  }, []);

  // Taskbar window item click (dispatches TASK_ACTIVATE: toggles active / restores minimized / raises inactive)
  const handleToggleTaskbar = useCallback((id: string) => {
    setHasInteracted(true);
    dispatch({ type: 'TASK_ACTIVATE', id: id as AppId });

    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  }, []);

  // Desktop utilities
  const handleLaunchAll = useCallback(() => {
    setHasInteracted(true);
    dispatch({ type: 'OPEN_CORE' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMinimizeAll = useCallback(() => {
    dispatch({ type: 'MINIMIZE_ALL' });
  }, []);

  const handleCloseAll = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL' });
  }, []);

  // Prepare taskbar items (only open or minimized windows appear on taskbar)
  const taskbarWindows: TaskbarWindowItem[] = useMemo(() => {
    return Object.values(state.windows)
      .filter((w) => w.phase !== 'closed')
      .sort((a, b) => APP_REGISTRY[a.id].order - APP_REGISTRY[b.id].order)
      .map((w) => ({
        id: w.id,
        title: APP_REGISTRY[w.id].title,
        exeName: APP_REGISTRY[w.id].exeName,
        icon: APP_REGISTRY[w.id].icon,
        isOpen: true,
        isMinimized: w.phase === 'minimized',
        isActive: state.activeId === w.id && w.phase !== 'minimized'
      }));
  }, [state.windows, state.activeId]);

  const anyWindowOpen = state.stack.length > 0;

  return (
    <div className="relative w-full min-h-screen pb-20 select-none xp-desktop-bg">
      {/* Desktop Shortcuts (Visible on Wallpaper in 2 Authentic Luna Columns) */}
      <nav aria-label="Desktop Shortcuts" className="fixed top-5 left-5 z-10 hidden sm:flex flex-row gap-3">
        {/* Column 1: Core System & Portfolio Dossier */}
        <div className="flex flex-col gap-2">
          {/* Quick View Recruiter Bypass Shortcut */}
          <a
            href="/quick-view"
            className="group flex flex-col items-center justify-start w-[84px] h-[88px] p-1.5 rounded text-center transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#FFE88C] hover:bg-white/15 border border-transparent"
            title="Open Quick View (Accessible Recruiter Summary)"
            aria-label="Open Quick View (Accessible Recruiter Summary)"
          >
            <div className="w-10 h-10 flex items-center justify-center p-1 rounded group-hover:scale-105 transition-transform">
              <img
                src="/icons/xp/quick-view.svg"
                alt=""
                className="w-8 h-8 object-contain drop-shadow"
              />
            </div>
            <span className="text-[11px] font-sans font-medium tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/40 rounded leading-tight text-center line-clamp-2 max-w-full">
              Quick View
            </span>
          </a>

          {(['hero', 'skills', 'projects', 'experience', 'contact'] as AppId[]).map((winId) => {
            const win = state.windows[winId];
            const def = APP_REGISTRY[winId];
            if (!win || !def) return null;
            const isCurrentlyOpen = win.phase === 'normal' || win.phase === 'maximized';
            const isSelected = state.selectedIcon === winId;

            return (
              <button
                key={win.id}
                type="button"
                onClick={() => handleLaunchIcon(winId)}
                aria-label={`Open ${def.exeName}`}
                aria-pressed={isCurrentlyOpen}
                className={`group flex flex-col items-center justify-start w-[84px] h-[88px] p-1.5 rounded text-center transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#FFE88C] ${
                  isSelected || isCurrentlyOpen
                    ? 'bg-[#0A246A]/60 text-white border border-[#4988E8]/70 shadow-inner'
                    : 'hover:bg-white/15 text-white border border-transparent'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center p-1 rounded group-hover:scale-105 transition-transform">
                  <img
                    src={def.icon}
                    alt=""
                    className="w-8 h-8 object-contain drop-shadow"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/icons/xp/my-computer.svg';
                    }}
                  />
                </div>
                <span className="text-[11px] font-sans font-medium tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/40 rounded leading-tight text-center line-clamp-2 max-w-full">
                  {def.exeName}
                </span>
              </button>
            );
          })}

          {/* Quick Launch All Shortcut */}
          <button
            type="button"
            onClick={handleLaunchAll}
            className="group flex flex-col items-center justify-start w-[84px] h-[88px] p-1.5 rounded text-center hover:bg-white/15 text-[#FFE88C] border border-transparent focus:outline-none focus:ring-1 focus:ring-[#FFE88C]"
            title="Launch All Portfolio Windows"
            aria-label="Launch All Portfolio Windows"
          >
            <div className="w-10 h-10 flex items-center justify-center p-1 bg-blue-900/60 rounded border border-[#FFE88C]/60 group-hover:scale-105 transition-transform shadow-lg">
              <span className="text-xl">⚡</span>
            </div>
            <span className="text-[11px] font-sans font-medium tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/50 rounded leading-tight text-center max-w-full">
              Launch All
            </span>
          </button>
        </div>

        {/* Column 2: Web Browser, Games & Utilities */}
        <div className="flex flex-col gap-2">
          {(['browser', 'p5r', 'apex', 'elden'] as AppId[]).map((winId) => {
            const win = state.windows[winId];
            const def = APP_REGISTRY[winId];
            if (!win || !def) return null;
            const isCurrentlyOpen = win.phase === 'normal' || win.phase === 'maximized';
            const isSelected = state.selectedIcon === winId;

            return (
              <button
                key={win.id}
                type="button"
                onClick={() => handleLaunchIcon(winId)}
                aria-label={`Open ${def.exeName}`}
                aria-pressed={isCurrentlyOpen}
                className={`group flex flex-col items-center justify-start w-[84px] h-[88px] p-1.5 rounded text-center transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#FFE88C] ${
                  isSelected || isCurrentlyOpen
                    ? 'bg-[#0A246A]/60 text-white border border-[#4988E8]/70 shadow-inner'
                    : 'hover:bg-white/15 text-white border border-transparent'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center p-1 rounded group-hover:scale-105 transition-transform">
                  <img
                    src={def.icon}
                    alt=""
                    className="w-8 h-8 object-contain drop-shadow"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/icons/xp/my-computer.svg';
                    }}
                  />
                </div>
                <span className="text-[11px] font-sans font-medium tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/40 rounded leading-tight text-center line-clamp-2 max-w-full">
                  {def.exeName}
                </span>
              </button>
            );
          })}

          {/* Reboot OS Shortcut */}
          <button
            type="button"
            onClick={rebootOS}
            className="group flex flex-col items-center justify-start w-[84px] h-[88px] p-1.5 rounded text-center hover:bg-white/15 text-white border border-transparent focus:outline-none focus:ring-1 focus:ring-[#FFE88C]"
            title="Reboot System & Replay Boot Animation"
            aria-label="Reboot System & Replay Boot Animation"
          >
            <div className="w-10 h-10 flex items-center justify-center p-1 bg-black/40 rounded border border-gray-400/50 group-hover:scale-105 transition-transform shadow-lg">
              <span className="text-xl">🔄</span>
            </div>
            <span className="text-[11px] font-sans font-medium tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mt-1 px-1 bg-black/50 rounded leading-tight text-center max-w-full">
              Restart OS
            </span>
          </button>
        </div>
      </nav>

      {/* Pristine Desktop Initial Prompt Banner (When All Closed on Desktop) */}
      {!anyWindowOpen && !isMobile && (
        <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 text-center z-20 relative pointer-events-auto lg:pr-[280px]">
          <div className="xp-window p-5 sm:p-6 max-w-lg mx-auto shadow-2xl">
            <div className="xp-titlebar-active p-1.5 px-3 flex items-center gap-2 mb-4 font-bold text-xs text-white">
              <img
                src="/icons/xp/my-computer.svg"
                alt=""
                className="w-4 h-4 object-contain drop-shadow"
              />
              <span>AXL_OS XP // READY</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-sans text-gray-900 mb-1">
              Jonathan Axl Wibowo
            </h1>
            <h2 className="text-xs sm:text-sm text-xp-blue-700 font-bold mb-3 font-sans">
              Full-Stack Engineer &amp; Applied Deep Learning Researcher
            </h2>

            <p className="text-xs text-gray-700 leading-relaxed mb-5 font-sans">
              Welcome to my interactive retro OS portfolio! Click any desktop shortcut or taskbar item to launch an application, or launch all windows to explore the full portfolio dossier at once.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={handleLaunchAll}
                className="xp-btn font-bold text-xs px-4 py-2 flex items-center gap-2 text-xp-text shadow hover:border-xp-blue-700"
              >
                <span className="text-sm">⚡</span>
                <span>Launch All Windows</span>
              </button>
              <a
                href="/quick-view"
                className="xp-btn font-bold text-xs px-4 py-2 flex items-center gap-2 text-xp-text shadow hover:border-xp-blue-700"
                title="Open Static Recruiter Dossier"
              >
                <span className="text-sm">📄</span>
                <span>Recruiter Quick View</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Active Windows Assembled Layout Area (Offset on desktop for sidebar) */}
      <main className="w-full flex-1 flex flex-col items-center justify-center relative z-20 pt-3 pb-16 px-2 sm:px-4 lg:pr-[280px] min-h-0" aria-label="Desktop Workspace">
        {/* 1. Hero Window */}
        <AnimatePresence>
          {state.windows.hero?.visited && state.windows.hero?.phase !== 'closed' && (
            <PixelHero
              id="hero"
              isMaximized={state.windows.hero.phase === 'maximized'}
              isMinimized={state.windows.hero.phase === 'minimized'}
              isActive={state.activeId === 'hero'}
              zIndex={getAppZIndex(state, 'hero')}
              rect={state.windows.hero.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'hero' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'hero' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'hero' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'hero' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'hero' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'hero', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'hero' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'hero' })}
            />
          )}
        </AnimatePresence>

        {/* 2. Skills Window */}
        <AnimatePresence>
          {state.windows.skills?.visited && state.windows.skills?.phase !== 'closed' && (
            <RetroSkillsGrid
              id="skills"
              isMaximized={state.windows.skills.phase === 'maximized'}
              isMinimized={state.windows.skills.phase === 'minimized'}
              isActive={state.activeId === 'skills'}
              zIndex={getAppZIndex(state, 'skills')}
              rect={state.windows.skills.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'skills' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'skills' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'skills' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'skills' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'skills' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'skills', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'skills' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'skills' })}
            />
          )}
        </AnimatePresence>

        {/* 3. Projects Window */}
        <AnimatePresence>
          {state.windows.projects?.visited && state.windows.projects?.phase !== 'closed' && (
            <RetroProjectsDossier
              id="projects"
              isMaximized={state.windows.projects.phase === 'maximized'}
              isMinimized={state.windows.projects.phase === 'minimized'}
              isActive={state.activeId === 'projects'}
              zIndex={getAppZIndex(state, 'projects')}
              rect={state.windows.projects.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'projects' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'projects' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'projects' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'projects' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'projects' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'projects', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'projects' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'projects' })}
            />
          )}
        </AnimatePresence>

        {/* 4. Experience Timeline Window */}
        <AnimatePresence>
          {state.windows.experience?.visited && state.windows.experience?.phase !== 'closed' && (
            <RetroTimeline
              id="experience"
              isMaximized={state.windows.experience.phase === 'maximized'}
              isMinimized={state.windows.experience.phase === 'minimized'}
              isActive={state.activeId === 'experience'}
              zIndex={getAppZIndex(state, 'experience')}
              rect={state.windows.experience.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'experience' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'experience' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'experience' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'experience' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'experience' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'experience', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'experience' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'experience' })}
            />
          )}
        </AnimatePresence>

        {/* 5. Contact Terminal Window */}
        <AnimatePresence>
          {state.windows.contact?.visited && state.windows.contact?.phase !== 'closed' && (
            <RetroTerminal
              id="contact"
              isMaximized={state.windows.contact.phase === 'maximized'}
              isMinimized={state.windows.contact.phase === 'minimized'}
              isActive={state.activeId === 'contact'}
              zIndex={getAppZIndex(state, 'contact')}
              rect={state.windows.contact.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'contact' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'contact' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'contact' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'contact' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'contact' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'contact', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'contact' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'contact' })}
            />
          )}
        </AnimatePresence>

        {/* 6. Retro Internet Explorer Window */}
        <AnimatePresence>
          {state.windows.browser?.visited && state.windows.browser?.phase !== 'closed' && (
            <RetroBrowserWindow
              id="browser"
              isMaximized={state.windows.browser.phase === 'maximized'}
              isMinimized={state.windows.browser.phase === 'minimized'}
              isActive={state.activeId === 'browser'}
              zIndex={getAppZIndex(state, 'browser')}
              rect={state.windows.browser.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'browser' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'browser' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'browser' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'browser' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'browser' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'browser', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'browser' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'browser' })}
            />
          )}
        </AnimatePresence>

        {/* 7. Persona 5 Royal Window */}
        <AnimatePresence>
          {state.windows.p5r?.visited && state.windows.p5r?.phase !== 'closed' && (
            <Persona5Window
              id="p5r"
              isMaximized={state.windows.p5r.phase === 'maximized'}
              isMinimized={state.windows.p5r.phase === 'minimized'}
              isActive={state.activeId === 'p5r'}
              zIndex={getAppZIndex(state, 'p5r')}
              rect={state.windows.p5r.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'p5r' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'p5r' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'p5r' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'p5r' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'p5r' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'p5r', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'p5r' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'p5r' })}
            />
          )}
        </AnimatePresence>

        {/* 8. Apex Legends Window */}
        <AnimatePresence>
          {state.windows.apex?.visited && state.windows.apex?.phase !== 'closed' && (
            <ApexLegendsWindow
              id="apex"
              isMaximized={state.windows.apex.phase === 'maximized'}
              isMinimized={state.windows.apex.phase === 'minimized'}
              isActive={state.activeId === 'apex'}
              zIndex={getAppZIndex(state, 'apex')}
              rect={state.windows.apex.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'apex' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'apex' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'apex' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'apex' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'apex' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'apex', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'apex' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'apex' })}
            />
          )}
        </AnimatePresence>

        {/* 9. Elden Ring Window */}
        <AnimatePresence>
          {state.windows.elden?.visited && state.windows.elden?.phase !== 'closed' && (
            <EldenRingWindow
              id="elden"
              isMaximized={state.windows.elden.phase === 'maximized'}
              isMinimized={state.windows.elden.phase === 'minimized'}
              isActive={state.activeId === 'elden'}
              zIndex={getAppZIndex(state, 'elden')}
              rect={state.windows.elden.rect}
              bounds={state.bounds}
              onFocus={() => dispatch({ type: 'FOCUS', id: 'elden' })}
              onClose={() => dispatch({ type: 'CLOSE', id: 'elden' })}
              onMinimize={() => dispatch({ type: 'MINIMIZE', id: 'elden' })}
              onMaximize={() => dispatch({ type: 'MAXIMIZE', id: 'elden' })}
              onRestore={() => dispatch({ type: 'RESTORE', id: 'elden' })}
              onCommitRect={(rect: Rect) => dispatch({ type: 'COMMIT_RECT', id: 'elden', rect })}
              onCenter={() => dispatch({ type: 'CENTER_WINDOW', id: 'elden' })}
              onFit={() => dispatch({ type: 'FIT_WINDOW', id: 'elden' })}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Retro Certificate Gallery (Desktop Sidebar & Mobile Drawer) */}
      <RetroCertificateGallery />

      {/* Interactive Bottom Taskbar */}
      <RetroTaskbar
        windows={taskbarWindows}
        activeWindowId={state.activeId}
        onToggleWindow={handleToggleTaskbar}
        onLaunchAll={handleLaunchAll}
        onMinimizeAll={handleMinimizeAll}
        onCloseAll={handleCloseAll}
        onReboot={rebootOS}
        hasInteracted={hasInteracted}
      />

      {/* ── Retro Windows XP Boot Loading Screen ── */}
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
