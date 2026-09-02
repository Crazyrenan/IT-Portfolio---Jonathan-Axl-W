import React, { useState, useEffect, useRef } from 'react';

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
  hasInteracted: boolean;
}

export function RetroTaskbar({
  windows,
  activeWindowId,
  onToggleWindow,
  onLaunchAll,
  onMinimizeAll,
  onCloseAll,
  hasInteracted
}: RetroTaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('00:00:00 WIB');
  const startMenuRef = useRef<HTMLDivElement>(null);

  // Live WIB Clock (Asia/Jakarta UTC+7)
  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        };
        const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
        setTimeString(`${formatted} WIB`);
      } catch {
        const now = new Date();
        setTimeString(now.toLocaleTimeString());
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close Start Menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setStartMenuOpen(false);
      }
    }
    if (startMenuOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [startMenuOpen]);

  const allOpen = windows.every(w => w.isOpen && !w.isMinimized);

  return (
    <>
      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div
          ref={startMenuRef}
          className="fixed bottom-10 left-1 z-50 win95-raised flex shadow-2xl font-[Tahoma,sans-serif] text-black w-64 select-none border-2 border-white"
        >
          {/* Left Vertical Brand Banner */}
          <div className="w-8 bg-gradient-to-t from-[#000080] via-[#1084d0] to-[#000080] flex items-end justify-center pb-3">
            <span className="text-white font-bold text-sm tracking-widest -rotate-90 origin-center whitespace-nowrap">
              AXL_OS<span className="text-[#FFEA00]">98</span>
            </span>
          </div>

          {/* Right Menu Items List */}
          <div className="flex-1 bg-[#c0c0c0] p-1.5 flex flex-col gap-1 text-xs">
            {/* Quick Launch All */}
            <button
              type="button"
              onClick={() => {
                onLaunchAll();
                setStartMenuOpen(false);
              }}
              className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#000080] hover:text-white text-left font-bold"
            >
              <span className="text-base">⚡</span>
              <span>Launch All Applications</span>
            </button>

            <div className="h-[2px] bg-[#808080] border-b border-white my-0.5" />

            {/* Individual Application List */}
            {windows.map((win) => (
              <button
                key={win.id}
                type="button"
                onClick={() => {
                  onToggleWindow(win.id);
                  setStartMenuOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-1 hover:bg-[#000080] hover:text-white text-left"
              >
                <img
                  src={win.icon}
                  alt={win.title}
                  className="w-4 h-4 object-contain flex-shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://win98icons.alexmeub.com/icons/png/windows-0.png';
                  }}
                />
                <span className="truncate">{win.exeName}</span>
                {win.isOpen && !win.isMinimized && (
                  <span className="ml-auto text-[10px] text-green-700 font-mono">● RUN</span>
                )}
              </button>
            ))}

            <div className="h-[2px] bg-[#808080] border-b border-white my-0.5" />

            {/* Resume Link */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setStartMenuOpen(false)}
              className="flex items-center gap-2 px-2 py-1 hover:bg-[#000080] hover:text-white text-left no-underline text-black"
            >
              <img
                src="https://win98icons.alexmeub.com/icons/png/notepad_file-2.png"
                alt="Resume"
                className="w-4 h-4 object-contain"
              />
              <span>Download Resume (PDF)</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/crazyrenan"
              target="_blank"
              rel="noreferrer"
              onClick={() => setStartMenuOpen(false)}
              className="flex items-center gap-2 px-2 py-1 hover:bg-[#000080] hover:text-white text-left no-underline text-black"
            >
              <img
                src="https://cdn.simpleicons.org/github/181717"
                alt="GitHub"
                className="w-4 h-4 object-contain"
              />
              <span>GitHub Profile</span>
            </a>

            <div className="h-[2px] bg-[#808080] border-b border-white my-0.5" />

            {/* Window Management Controls */}
            <button
              type="button"
              onClick={() => {
                onMinimizeAll();
                setStartMenuOpen(false);
              }}
              className="flex items-center gap-2 px-2 py-1 hover:bg-[#000080] hover:text-white text-left"
            >
              <span>🗕</span>
              <span>Minimize All Windows</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onCloseAll();
                setStartMenuOpen(false);
              }}
              className="flex items-center gap-2 px-2 py-1 hover:bg-[#000080] hover:text-white text-left"
            >
              <span>✕</span>
              <span>Close All Windows</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Taskbar */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 font-[Tahoma,sans-serif] text-black shadow-[0px_-1px_0px_#808080] select-none h-10"
        role="navigation"
        aria-label="Windows Taskbar"
      >
        {/* Left: Start Button & Quick Launch All */}
        <div className="flex items-center gap-1.5 h-full py-0.5 flex-shrink-0">
          {/* Start Menu Button */}
          <button
            type="button"
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            className={`${
              startMenuOpen ? 'win95-sunken bg-[#dfdfdf]' : 'win95-raised'
            } px-2.5 py-1 flex items-center gap-1.5 font-bold text-xs h-full text-black select-none focus:outline-none`}
            aria-expanded={startMenuOpen}
          >
            <img
              src="https://win98icons.alexmeub.com/icons/png/windows-0.png"
              alt="Start"
              className="w-4 h-4"
            />
            <span className="mt-0.5">Start</span>
          </button>

          {/* Recruiter Quick Mode: Launch All / Tile All */}
          <button
            type="button"
            onClick={allOpen ? onMinimizeAll : onLaunchAll}
            title="Recruiter Quick View: Open and tile all portfolio sections"
            className={`win95-raised px-2 py-1 flex items-center gap-1 font-bold text-[11px] h-full text-black hover:bg-[#dfdfdf] transition-none select-none ${
              !hasInteracted ? 'animate-pulse ring-1 ring-blue-700 bg-[#e8e8e8]' : ''
            }`}
          >
            <span>{allOpen ? '🗕' : '⚡'}</span>
            <span className="hidden xs:inline sm:inline">
              {allOpen ? 'Minimize All' : 'Launch All'}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-[2px] h-6 bg-[#808080] border-r border-white mx-1 flex-shrink-0" />

        {/* Center: Application Window Tabs */}
        <div className="flex items-center gap-1 h-full py-0.5 flex-1 overflow-x-auto scrollbar-none px-0.5">
          {windows.map((win) => {
            const isTabActive = win.isOpen && !win.isMinimized && win.isActive;
            const isTabMinimized = win.isOpen && win.isMinimized;
            const isClosed = !win.isOpen;

            let tabStyle = 'win95-raised text-black';
            if (isTabActive) {
              tabStyle = 'win95-sunken bg-[#dfdfdf] font-bold text-black border-2 border-black/30';
            } else if (isTabMinimized) {
              tabStyle = 'win95-raised bg-[#d0d0d0] text-gray-700 italic';
            } else if (isClosed) {
              tabStyle = 'win95-raised bg-[#c0c0c0] text-gray-600 hover:text-black hover:bg-[#dfdfdf]';
            }

            return (
              <button
                key={win.id}
                type="button"
                onClick={() => onToggleWindow(win.id)}
                title={win.exeName}
                className={`${tabStyle} px-2 py-1 flex items-center gap-1.5 text-xs h-full min-w-[95px] max-w-[140px] flex-shrink-0 truncate select-none transition-none`}
              >
                <img
                  src={win.icon}
                  alt={win.title}
                  className="w-3.5 h-3.5 flex-shrink-0 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://win98icons.alexmeub.com/icons/png/windows-0.png';
                  }}
                />
                <span className="truncate text-[11px]">{win.exeName}</span>
                {win.isOpen && !win.isMinimized && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center gap-1 h-full py-0.5 ml-auto flex-shrink-0">
          <div className="win95-sunken px-2 py-0.5 flex items-center h-full gap-2 text-black bg-[#dfdfdf]">
            {/* Status Indicator */}
            <div className="hidden md:flex items-center gap-1 text-[10px] font-mono font-bold text-green-800">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              <span>ONLINE</span>
            </div>

            {/* Sound Icon */}
            <img
              src="https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png"
              alt="Volume"
              className="w-3.5 h-3.5 hidden xs:block"
            />

            {/* Live Clock */}
            <span className="text-xs font-mono font-bold whitespace-nowrap">
              {timeString}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
