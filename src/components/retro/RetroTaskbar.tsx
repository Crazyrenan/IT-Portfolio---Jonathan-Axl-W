import React, { useState, useRef } from 'react';
import { StartMenu } from './StartMenu';
import { SystemClock } from './SystemClock';

export interface TaskbarWindowItem {
  id: string;
  title: string;
  exeName: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isActive: boolean;
}

export interface RetroTaskbarProps {
  windows: TaskbarWindowItem[];
  activeWindowId: string | null;
  onToggleWindow: (id: string) => void;
  onLaunchAll: () => void;
  onMinimizeAll: () => void;
  onCloseAll: () => void;
  onShowDesktop?: () => void;
  onReboot?: () => void;
  hasInteracted: boolean;
}

export function RetroTaskbar({
  windows,
  activeWindowId,
  onToggleWindow,
  onLaunchAll,
  onMinimizeAll,
  onCloseAll,
  onShowDesktop,
  onReboot,
  hasInteracted
}: RetroTaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const startBtnRef = useRef<HTMLButtonElement>(null);

  const handleShowDesktop = () => {
    if (onShowDesktop) {
      onShowDesktop();
    } else {
      onMinimizeAll();
    }
  };

  const openWindows = windows.filter((w) => w.isOpen);

  return (
    <>
      {/* ── Windows XP Two-Column Start Menu Disclosure ── */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        windows={windows}
        onToggleWindow={onToggleWindow}
        onLaunchAll={onLaunchAll}
        onMinimizeAll={onMinimizeAll}
        onCloseAll={onCloseAll}
        onShowDesktop={handleShowDesktop}
        onReboot={onReboot}
        triggerRef={startBtnRef}
      />

      {/* ── Windows XP Luna Taskbar ── */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-50 xp-taskbar flex items-center px-0.5 sm:px-1 font-sans text-white select-none h-11"
        role="navigation"
        aria-label="Windows XP Taskbar"
      >
        {/* Left: Luna Start Button */}
        <div className="flex items-center h-full py-0.5 flex-shrink-0">
          <button
            ref={startBtnRef}
            type="button"
            id="start-button"
            onClick={() => setStartMenuOpen((prev) => !prev)}
            aria-expanded={startMenuOpen}
            aria-controls="start-menu"
            aria-haspopup="dialog"
            aria-label="Start menu"
            className="xp-start-btn px-2 sm:px-3 h-full flex items-center gap-1.5 sm:gap-2 text-sm select-none focus:outline-none focus:ring-1 focus:ring-white/80 cursor-pointer mr-1"
          >
            {/* Original 4-Quadrant XP Emblem */}
            <svg
              className="w-4 h-4 flex-shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 2.5C4 2 6 3 7.5 3.5V7C6 6.5 4 5.5 1 6V2.5Z" fill="#E84833" />
              <path d="M8.5 3.8C10 4.2 12 4.5 15 3.5V7C12 8 10 7.8 8.5 7.2V3.8Z" fill="#4B9FE1" />
              <path d="M1 7.5C4 7 6 8 7.5 8.5V12C6 11.5 4 10.5 1 11V7.5Z" fill="#67B92A" />
              <path d="M8.5 8.8C10 9.2 12 9.5 15 8.5V12C12 13 10 12.8 8.5 12.2V8.8Z" fill="#F8BC1C" />
            </svg>
            <span className="font-extrabold italic tracking-tight text-[13px] sm:text-sm lowercase">
              start
            </span>
          </button>

          {/* Quick Launch Section */}
          <div className="hidden xs:flex items-center gap-1 px-1 border-r border-[#1B56B7]/60 pr-1.5 mr-1 flex-shrink-0">
            {/* Show Desktop */}
            <button
              type="button"
              onClick={handleShowDesktop}
              title="Show Desktop (Minimize/Restore Windows)"
              aria-label="Show Desktop"
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/15 text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3zm1 0v8h12V3H2zm3 10h6v1H5v-1z"/>
              </svg>
            </button>

            {/* Launch All */}
            <button
              type="button"
              onClick={onLaunchAll}
              title="Launch All Portfolio Windows"
              aria-label="Launch All Portfolio Windows"
              className={`w-7 h-7 flex items-center justify-center rounded hover:bg-white/15 text-yellow-300 transition-colors focus:outline-none focus:ring-1 focus:ring-white ${
                !hasInteracted ? 'animate-pulse' : ''
              }`}
            >
              <span className="text-sm">⚡</span>
            </button>

            {/* Quick View Shortcut */}
            <a
              href="/quick-view"
              title="Recruiter Quick View"
              aria-label="Recruiter Quick View"
              className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/15 text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white"
            >
              <img
                src="/icons/xp/quick-view.svg"
                alt=""
                className="w-4 h-4 object-contain"
              />
            </a>
          </div>
        </div>

        {/* Center: Running Task Tabs Strip */}
        <div
          className="flex items-center gap-1 h-full py-0.5 flex-1 overflow-x-auto scrollbar-none px-1"
          role="tablist"
          aria-label="Open Windows"
        >
          {openWindows.map((win) => {
            const isTabActive = !win.isMinimized && win.isActive;
            const isTabMinimized = win.isMinimized;

            let btnClass = 'xp-task-btn';
            if (isTabActive) {
              btnClass = 'xp-task-btn-active';
            } else if (isTabMinimized) {
              btnClass = 'xp-task-btn-minimized';
            }

            const accessibleLabel = `${win.title}${isTabMinimized ? ' (minimized)' : isTabActive ? ' (active)' : ''}`;

            return (
              <button
                key={win.id}
                type="button"
                role="tab"
                aria-selected={isTabActive}
                aria-label={accessibleLabel}
                title={accessibleLabel}
                onClick={() => onToggleWindow(win.id)}
                className={`${btnClass} px-2 py-1 flex items-center gap-1.5 text-xs h-full min-w-[38px] sm:min-w-[110px] max-w-[170px] flex-shrink-0 select-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/80 transition-none`}
              >
                <img
                  src={win.icon}
                  alt=""
                  className="w-4 h-4 flex-shrink-0 object-contain drop-shadow"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/icons/xp/my-computer.svg';
                  }}
                />
                <span className="hidden sm:inline truncate text-[11px] leading-tight font-sans">
                  {win.exeName}
                </span>
                {isTabActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 ml-auto flex-shrink-0 hidden sm:block shadow-[0_0_4px_#00d4ff]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Windows XP Luna System Tray */}
        <div className="flex items-center h-full py-0.5 ml-auto flex-shrink-0">
          <div className="xp-tray px-2 py-0.5 flex items-center h-full gap-2 rounded-sm">
            {/* Audio Icon (Visual cue) */}
            <button
              type="button"
              title="System Audio"
              aria-label="System Audio"
              className="text-white hover:text-cyan-200 bg-transparent border-0 p-0 cursor-pointer hidden xs:flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M2 5h3l4-3v12l-4-3H2V5zm10 0a4 4 0 0 1 0 6v-1.5a2.5 2.5 0 0 0 0-3V5zm2-2a6.5 6.5 0 0 1 0 10v-1.5a5 5 0 0 0 0-7V3z"/>
              </svg>
            </button>

            {/* Isolated Minute-Level System Clock (Asia/Jakarta WIB) */}
            <SystemClock />
          </div>
        </div>
      </footer>
    </>
  );
}
