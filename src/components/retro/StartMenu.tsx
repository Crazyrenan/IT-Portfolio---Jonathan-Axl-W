import React, { useEffect, useRef, useState } from 'react';
import type { TaskbarWindowItem } from './RetroTaskbar';

export interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  windows: TaskbarWindowItem[];
  onToggleWindow: (id: string) => void;
  onLaunchAll: () => void;
  onMinimizeAll: () => void;
  onCloseAll: () => void;
  onShowDesktop: () => void;
  onReboot?: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

interface CoreAppItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

const CORE_APPS: CoreAppItem[] = [
  {
    id: 'hero',
    title: 'Welcome Center',
    desc: 'About Jonathan & Executive Summary',
    icon: '/icons/xp/user-profile.svg'
  },
  {
    id: 'projects',
    title: 'My Projects',
    desc: 'Technical Dossier & Case Studies',
    icon: '/icons/xp/projects-folder.svg'
  },
  {
    id: 'skills',
    title: 'System Skills',
    desc: 'Technical Stack & Capabilities',
    icon: '/icons/xp/my-computer.svg'
  },
  {
    id: 'experience',
    title: 'Work History',
    desc: 'Career Milestones & Roles',
    icon: '/icons/xp/work-history.svg'
  },
  {
    id: 'contact',
    title: 'Contact & Inquiries',
    desc: 'Inquiries, Email & Networks',
    icon: '/icons/xp/contact-mail.svg'
  },
  {
    id: 'certificates',
    title: 'Licenses & Credentials',
    desc: 'Verified Certifications & Honors',
    icon: '/icons/xp/certificates.svg'
  }
];

const EXTRA_APPS: CoreAppItem[] = [
  {
    id: 'browser',
    title: 'Internet Explorer 6',
    desc: 'Retro Web Portal & Curated Links',
    icon: '/icons/xp/web-browser.svg'
  },
  {
    id: 'p5r',
    title: 'Persona 5 Royal',
    desc: 'Phantom Thieves Visual Archive',
    icon: '/icons/retro/persona5.svg'
  },
  {
    id: 'apex',
    title: 'Apex Legends',
    desc: 'High-Rank FPS Competitive Dossier',
    icon: '/icons/retro/apex.svg'
  },
  {
    id: 'elden',
    title: 'Elden Ring',
    desc: 'Lands Between Chronicle & Stats',
    icon: '/icons/retro/eldenring.svg'
  }
];

export function StartMenu({
  isOpen,
  onClose,
  windows,
  onToggleWindow,
  onLaunchAll,
  onMinimizeAll,
  onCloseAll,
  onShowDesktop,
  onReboot,
  triggerRef
}: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  // Close on Outside Pointer / Touch Down
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: PointerEvent | MouseEvent) {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        // If clicking the trigger button itself, let the button's onClick toggle it
        if (triggerRef?.current && triggerRef.current.contains(target)) {
          return;
        }
        onClose();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, onClose, triggerRef]);

  // Handle Escape Key to dismiss and return focus to Start button
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const isAppRunning = (id: string) => {
    const found = windows.find((w) => w.id === id);
    return Boolean(found?.isOpen && !found.isMinimized);
  };

  return (
    <div
      ref={menuRef}
      id="start-menu"
      role="dialog"
      aria-label="Windows XP Start Menu"
      className="fixed bottom-12 left-1 z-50 w-[420px] max-w-[96vw] xp-start-menu flex flex-col font-sans select-none animate-slide-in-right"
    >
      {/* ── 1. Top Identity Header ── */}
      <div className="bg-gradient-to-r from-xp-blue-900 via-xp-blue-700 to-xp-blue-900 p-3 flex items-center gap-3 border-b-2 border-[#E8A542] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
        <div className="w-11 h-11 rounded-md border-2 border-white shadow-md overflow-hidden bg-white flex-shrink-0">
          <img
            src="/profile.jpg"
            alt="Jonathan Axl Wibowo"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/icons/xp/user-profile.svg';
            }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-white font-bold text-sm tracking-tight truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Jonathan Axl Wibowo
          </span>
          <span className="text-blue-100 text-xs truncate">
            Software Engineer & AI Specialist
          </span>
        </div>
      </div>

      {/* ── 2. Two-Column Body ── */}
      <div className="flex flex-col sm:flex-row min-h-[340px] max-h-[70vh] overflow-y-auto">
        {/* Left Column: Programs (White Background) */}
        <div className="flex-1 bg-white p-2 flex flex-col gap-1 text-xs">
          <div className="text-[10px] font-bold uppercase text-gray-500 px-2 pt-1 pb-0.5 tracking-wider">
            {showAllPrograms ? 'Interactive Extras' : 'Portfolio Applications'}
          </div>

          {!showAllPrograms ? (
            <>
              {CORE_APPS.map((app) => {
                const running = isAppRunning(app.id);
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => {
                      onToggleWindow(app.id);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-left group transition-colors focus:outline-none focus:ring-1 focus:ring-[#2B72E2]"
                  >
                    <img
                      src={app.icon}
                      alt=""
                      className="w-7 h-7 flex-shrink-0 object-contain drop-shadow"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/icons/xp/my-computer.svg';
                      }}
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-[11.5px] text-gray-900 group-hover:text-white truncate">
                        {app.title}
                      </span>
                      <span className="text-[10px] text-gray-500 group-hover:text-blue-100 truncate">
                        {app.desc}
                      </span>
                    </div>
                    {running && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-white flex-shrink-0 ml-1" title="Running" />
                    )}
                  </button>
                );
              })}

              <div className="mt-auto pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAllPrograms(true)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-bold text-gray-800 hover:bg-[#2B72E2] hover:text-white rounded text-left group"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="text-sm">📁</span>
                    <span>All Programs & Interactive Extras</span>
                  </span>
                  <span className="text-xs">▶</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {EXTRA_APPS.map((app) => {
                const running = isAppRunning(app.id);
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => {
                      onToggleWindow(app.id);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-left group transition-colors focus:outline-none focus:ring-1 focus:ring-[#2B72E2]"
                  >
                    <img
                      src={app.icon}
                      alt=""
                      className="w-7 h-7 flex-shrink-0 object-contain drop-shadow"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/icons/xp/web-browser.svg';
                      }}
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-[11.5px] text-gray-900 group-hover:text-white truncate">
                        {app.title}
                      </span>
                      <span className="text-[10px] text-gray-500 group-hover:text-blue-100 truncate">
                        {app.desc}
                      </span>
                    </div>
                    {running && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-white flex-shrink-0 ml-1" title="Running" />
                    )}
                  </button>
                );
              })}

              <div className="mt-auto pt-2 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAllPrograms(false)}
                  className="w-full flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-bold text-gray-800 hover:bg-[#2B72E2] hover:text-white rounded text-left group"
                >
                  <span className="text-xs">◀</span>
                  <span>Back to Main Programs</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Destinations, Documents & Utilities (Pale Blue Background) */}
        <div className="w-full sm:w-[195px] bg-[#DCEBFA] border-t sm:border-t-0 sm:border-l border-[#91B8ED] p-2 flex flex-col gap-1 text-xs">
          <div className="text-[10px] font-bold uppercase text-[#1B56B7] px-2 pt-1 pb-0.5 tracking-wider">
            Quick Destinations
          </div>

          {/* Quick View Recruiter Bypass */}
          <a
            href="/quick-view"
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-gray-900 font-bold no-underline group transition-colors"
          >
            <img src="/icons/xp/quick-view.svg" alt="" className="w-4 h-4 object-contain" />
            <span className="truncate">Quick View (Recruiter)</span>
          </a>

          {/* Download CV */}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-gray-900 font-medium no-underline group transition-colors"
          >
            <img src="/icons/xp/work-history.svg" alt="" className="w-4 h-4 object-contain" />
            <span className="truncate">Download CV (PDF)</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/crazyrenan"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-gray-900 font-medium no-underline group transition-colors"
          >
            <img src="/icons/github.svg" alt="" className="w-4 h-4 object-contain" />
            <span className="truncate">GitHub Profile ↗</span>
          </a>

          <div className="h-[1px] bg-[#91B8ED] my-1" />

          <div className="text-[10px] font-bold uppercase text-[#1B56B7] px-2 pt-0.5 pb-0.5 tracking-wider">
            Workspace Tools
          </div>

          {/* Launch All */}
          <button
            type="button"
            onClick={() => {
              onLaunchAll();
              onClose();
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-gray-900 text-left font-bold group transition-colors"
          >
            <span className="text-sm">⚡</span>
            <span className="truncate">Launch All Windows</span>
          </button>

          {/* Show Desktop */}
          <button
            type="button"
            onClick={() => {
              onShowDesktop();
              onClose();
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-gray-900 text-left group transition-colors"
          >
            <span className="text-sm">🗔</span>
            <span className="truncate">Show Desktop</span>
          </button>

          {/* Minimize All */}
          <button
            type="button"
            onClick={() => {
              onMinimizeAll();
              onClose();
            }}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2B72E2] hover:text-white text-gray-900 text-left group transition-colors"
          >
            <span className="text-sm">🗕</span>
            <span className="truncate">Minimize All</span>
          </button>
        </div>
      </div>

      {/* ── 3. Truthful Utility Footer ── */}
      <div className="bg-gradient-to-r from-xp-blue-700 via-xp-blue-600 to-xp-blue-700 px-3 py-2 flex items-center justify-end gap-2 border-t border-[#0C3875] text-xs">
        {/* Close All Windows */}
        <button
          type="button"
          onClick={() => {
            onCloseAll();
            onClose();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 text-white hover:bg-white/20 rounded font-medium transition-colors border border-transparent hover:border-white/40 focus:outline-none focus:ring-1 focus:ring-white"
        >
          <span className="text-red-300 font-bold">✕</span>
          <span>Close All Windows</span>
        </button>

        {/* Replay Intro */}
        {onReboot && (
          <button
            type="button"
            onClick={() => {
              onReboot();
              onClose();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-white hover:bg-white/20 rounded font-medium transition-colors border border-transparent hover:border-white/40 focus:outline-none focus:ring-1 focus:ring-white"
          >
            <span className="text-yellow-300">🔄</span>
            <span>Replay Intro</span>
          </button>
        )}
      </div>
    </div>
  );
}
