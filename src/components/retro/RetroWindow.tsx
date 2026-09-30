import React, { useState, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';

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
  icon = "/icons/retro/windows.svg",
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
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  // Custom size state for interactive window resizing
  const [size, setSize] = useState<{ width: number | null; height: number | null }>({
    width: null,
    height: null
  });

  const handleTitlePointerDown = (e: React.PointerEvent) => {
    onFocus?.();
    if (!isMaximized) {
      dragControls.start(e);
    }
  };

  // Corner Resize Handler (Both Width & Height)
  const handleCornerResize = (e: React.PointerEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();

    const startX = e.clientX;
    const startY = e.clientY;
    const el = windowRef.current;
    if (!el) return;

    const startWidth = el.offsetWidth;
    const startHeight = el.offsetHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 30 : 1200;
      const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 70 : 800;
      const newWidth = Math.max(340, Math.min(maxWidth, startWidth + (moveEvent.clientX - startX)));
      const newHeight = Math.max(220, Math.min(maxHeight, startHeight + (moveEvent.clientY - startY)));
      setSize({ width: newWidth, height: newHeight });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Right Edge Resize Handler (Width only)
  const handleRightResize = (e: React.PointerEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();

    const startX = e.clientX;
    const el = windowRef.current;
    if (!el) return;
    const startWidth = el.offsetWidth;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 30 : 1200;
      const newWidth = Math.max(340, Math.min(maxWidth, startWidth + (moveEvent.clientX - startX)));
      setSize((prev) => ({ ...prev, width: newWidth }));
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Bottom Edge Resize Handler (Height only)
  const handleBottomResize = (e: React.PointerEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();

    const startY = e.clientY;
    const el = windowRef.current;
    if (!el) return;
    const startHeight = el.offsetHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 70 : 800;
      const newHeight = Math.max(220, Math.min(maxHeight, startHeight + (moveEvent.clientY - startY)));
      setSize((prev) => ({ ...prev, height: newHeight }));
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <motion.div
      ref={windowRef}
      id={id}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={isMaximized ? { x: 0, y: 0, scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 26,
        mass: 0.7
      }}
      style={{
        zIndex,
        width: !isMaximized && size.width ? `${size.width}px` : undefined,
        height: !isMaximized && size.height ? `${size.height}px` : undefined,
        minHeight: !isMaximized && size.height ? `${size.height}px` : undefined
      }}
      onPointerDown={onFocus}
      className={`win95-raised relative flex flex-col p-1 mb-6 transition-shadow duration-150 select-none ${
        isActive ? 'shadow-2xl ring-1 ring-black/40' : 'shadow-md opacity-95'
      } ${
        isMaximized
          ? 'w-full max-w-6xl'
          : size.width
          ? ''
          : 'w-full max-w-3xl sm:max-w-4xl'
      } ${className}`}
    >
      {/* Titlebar */}
      <div 
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={onMaximize}
        className={`${
          isActive ? 'win95-titlebar-active' : 'win95-titlebar-inactive'
        } flex justify-between items-center px-1.5 py-1 select-none ${
          isMaximized ? 'cursor-default' : 'cursor-move'
        } touch-none`}
      >
        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide ml-1 truncate pointer-events-none">
          <img 
            src={icon} 
            alt="icon" 
            className="w-4 h-4 flex-shrink-0 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/icons/retro/windows.svg';
            }}
          />
          <span className="truncate">{title}</span>
        </div>
        <div className="flex gap-[2px] flex-shrink-0">
          <button 
            type="button"
            title="Minimize"
            aria-label="Minimize Window"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none select-none leading-none text-black"
          >
            _
          </button>
          <button 
            type="button"
            title={isMaximized ? "Restore" : "Maximize"}
            aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize?.();
            }}
            className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none select-none leading-none text-black"
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button 
            type="button"
            title="Close"
            aria-label="Close Window"
            onPointerDown={(e) => e.stopPropagation()}
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

      {/* Content Area - Scrollable & full-height responsive */}
      <div className="flex-1 p-1.5 sm:p-2 bg-[#c0c0c0] overflow-y-auto flex flex-col min-h-0">
        {children}
      </div>

      {/* Edge & Corner Resizers (Desktop / Active when not maximized) */}
      {!isMaximized && (
        <>
          {/* Right Edge Resizer */}
          <div
            onPointerDown={handleRightResize}
            className="absolute top-7 right-0 bottom-4 w-1.5 cursor-e-resize z-30 hover:bg-blue-600/30 transition-colors"
            title="Drag horizontally to resize width"
          />

          {/* Bottom Edge Resizer */}
          <div
            onPointerDown={handleBottomResize}
            className="absolute bottom-0 left-4 right-4 h-1.5 cursor-s-resize z-30 hover:bg-blue-600/30 transition-colors"
            title="Drag vertically to resize height"
          />

          {/* Classic Win95/98 Bottom-Right Corner Grip */}
          <div
            onPointerDown={handleCornerResize}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize select-none flex items-end justify-end p-0.5 z-40 group"
            title="Drag corner to resize window"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-70 group-hover:opacity-100">
              <path d="M8 2L2 8M9 5L5 9M9 8L8 9" stroke="#808080" strokeWidth="1.5" strokeLinecap="square"/>
              <path d="M9 3L3 9M10 6L6 10M10 9L9 10" stroke="#ffffff" strokeWidth="1" strokeLinecap="square"/>
            </svg>
          </div>
        </>
      )}
    </motion.div>
  );
}
