import React from 'react';
import { motion } from 'framer-motion';

export interface RetroWindowProps {
  id?: string;
  title?: string;
  icon?: string;
  isOpen?: boolean;
  isMinimized?: boolean;
  isMaximized?: boolean;
  isActive?: boolean;
  zIndex?: number;
  hasMenu?: boolean;
  className?: string;
  onFocus?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
}

export function RetroWindow({
  id,
  title = "Program",
  icon = "https://win98icons.alexmeub.com/icons/png/windows-0.png",
  isMinimized = false,
  isMaximized = false,
  isActive = true,
  zIndex = 10,
  hasMenu = false,
  className = '',
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children
}: RetroWindowProps) {
  return (
    <motion.div
      id={id}
      layout
      initial={{ scale: 0.1, y: 180, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.1, y: 180, opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 22,
        mass: 0.8
      }}
      style={{ zIndex }}
      onClick={onFocus}
      className={`win95-raised flex flex-col p-1 mb-8 transition-shadow duration-150 ${
        isActive ? 'shadow-2xl ring-1 ring-black/40' : 'shadow-md opacity-95'
      } ${isMaximized ? 'w-full max-w-6xl' : 'w-full max-w-4xl'} ${className}`}
    >
      {/* Titlebar */}
      <div 
        className={`${
          isActive ? 'win95-titlebar-active' : 'win95-titlebar-inactive'
        } flex justify-between items-center px-1.5 py-1 select-none cursor-default`}
      >
        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide ml-1 truncate">
          <img 
            src={icon} 
            alt="icon" 
            className="w-4 h-4 flex-shrink-0 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://win98icons.alexmeub.com/icons/png/windows-0.png';
            }}
          />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-[2px] flex-shrink-0">
          <button 
            type="button"
            title="Minimize"
            aria-label="Minimize Window"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none select-none leading-none"
          >
            _
          </button>
          <button 
            type="button"
            title={isMaximized ? "Restore" : "Maximize"}
            aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize?.();
            }}
            className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none select-none leading-none"
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button 
            type="button"
            title="Close"
            aria-label="Close Window"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none select-none leading-none text-black hover:text-red-700"
          >
            ✕
          </button>
        </div>
      </div>
      
      {/* Optional Classic Menu */}
      {hasMenu && (
        <div className="flex gap-3 px-2 py-1 text-xs bg-[#c0c0c0] border-b border-gray-400 select-none text-black">
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">F<span className="underline">i</span>le</span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">E<span className="underline">d</span>it</span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">V<span className="underline">i</span>ew</span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">H<span className="underline">e</span>lp</span>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 p-2 bg-[#c0c0c0]">
        {children}
      </div>
    </motion.div>
  );
}
