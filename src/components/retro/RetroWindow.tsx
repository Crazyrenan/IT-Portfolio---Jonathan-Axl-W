import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useDragControls } from 'framer-motion';
import type { Rect, Bounds } from '../../lib/window-manager';

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
  rect?: Rect;
  bounds?: Bounds;
  onFocus?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onRestore?: () => void;
  onCommitRect?: (rect: Rect) => void;
  onCenter?: () => void;
  onFit?: () => void;
  children: React.ReactNode;
}

export function RetroWindow({
  id,
  title = "Program",
  icon = "/icons/xp/my-computer.svg",
  isMinimized = false,
  isMaximized = false,
  isActive = true,
  zIndex = 10,
  hasMenu = false,
  className = '',
  rect,
  bounds,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  onCommitRect,
  onCenter,
  onFit,
  children
}: RetroWindowProps) {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const systemMenuRef = useRef<HTMLDivElement>(null);

  // Custom size state for interactive window resizing
  const [size, setSize] = useState<{ width: number | null; height: number | null }>({
    width: rect?.width ?? null,
    height: rect?.height ?? null
  });

  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);

  // Sync size when rect changes from external actions (like Center or Fit)
  useEffect(() => {
    if (rect?.width && rect?.height) {
      setSize({ width: rect.width, height: rect.height });
    }
  }, [rect?.width, rect?.height]);

  // Outside click listener to dismiss system menu
  useEffect(() => {
    if (!isSystemMenuOpen) return;

    function handlePointerDownOutside(e: PointerEvent) {
      if (systemMenuRef.current && !systemMenuRef.current.contains(e.target as Node)) {
        setIsSystemMenuOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsSystemMenuOpen(false);
      }
    }

    window.addEventListener('pointerdown', handlePointerDownOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDownOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSystemMenuOpen]);

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
    let latestWidth = startWidth;
    let latestHeight = startHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const maxWidth = bounds ? bounds.width : typeof window !== 'undefined' ? window.innerWidth - 30 : 1200;
      const maxHeight = bounds ? bounds.height : typeof window !== 'undefined' ? window.innerHeight - 70 : 800;
      latestWidth = Math.max(340, Math.min(maxWidth, startWidth + (moveEvent.clientX - startX)));
      latestHeight = Math.max(220, Math.min(maxHeight, startHeight + (moveEvent.clientY - startY)));
      setSize({ width: latestWidth, height: latestHeight });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (onCommitRect) {
        onCommitRect({
          x: rect?.x ?? 0,
          y: rect?.y ?? 0,
          width: latestWidth,
          height: latestHeight
        });
      }
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
    let latestWidth = startWidth;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const maxWidth = bounds ? bounds.width : typeof window !== 'undefined' ? window.innerWidth - 30 : 1200;
      latestWidth = Math.max(340, Math.min(maxWidth, startWidth + (moveEvent.clientX - startX)));
      setSize((prev) => ({ ...prev, width: latestWidth }));
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (onCommitRect) {
        onCommitRect({
          x: rect?.x ?? 0,
          y: rect?.y ?? 0,
          width: latestWidth,
          height: size.height ?? rect?.height ?? 540
        });
      }
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
    let latestHeight = startHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const maxHeight = bounds ? bounds.height : typeof window !== 'undefined' ? window.innerHeight - 70 : 800;
      latestHeight = Math.max(220, Math.min(maxHeight, startHeight + (moveEvent.clientY - startY)));
      setSize((prev) => ({ ...prev, height: latestHeight }));
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (onCommitRect) {
        onCommitRect({
          x: rect?.x ?? 0,
          y: rect?.y ?? 0,
          width: size.width ?? rect?.width ?? 760,
          height: latestHeight
        });
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleRestore = useCallback(() => {
    setIsSystemMenuOpen(false);
    if (onRestore) {
      onRestore();
    } else if (isMaximized) {
      onMaximize?.();
    }
  }, [onRestore, isMaximized, onMaximize]);

  return (
    <motion.div
      ref={windowRef}
      id={id}
      tabIndex={-1}
      // When minimized, mark inert so it is completely removed from tab & AX tree
      // @ts-ignore
      inert={isMinimized ? "" : undefined}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.02}
      onDragEnd={(_e, info) => {
        if (rect && onCommitRect) {
          onCommitRect({
            ...rect,
            x: Math.max(0, rect.x + info.offset.x),
            y: Math.max(0, rect.y + info.offset.y)
          });
        }
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isMaximized ? { x: 0, y: 0, scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.12, ease: "easeOut" } }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 28,
        mass: 0.6
      }}
      style={{
        zIndex,
        display: isMinimized ? 'none' : undefined,
        width: !isMaximized && size.width ? `${size.width}px` : undefined,
        height: !isMaximized && size.height ? `${size.height}px` : undefined,
        minHeight: !isMaximized && size.height ? `${size.height}px` : undefined
      }}
      onPointerDown={onFocus}
      onFocusCapture={onFocus}
      className={`relative flex flex-col p-[3px] mb-6 select-none transition-shadow duration-150 ${
        isActive ? 'xp-window' : 'xp-window-inactive'
      } ${
        isMaximized
          ? 'w-full max-w-6xl'
          : size.width
          ? ''
          : 'w-full max-w-3xl sm:max-w-4xl'
      } ${className}`}
    >
      {/* Windows XP Titlebar */}
      <div 
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={onMaximize}
        className={`${
          isActive ? 'xp-titlebar-active' : 'xp-titlebar-inactive'
        } relative flex justify-between items-center px-2 py-1 select-none ${
          isMaximized ? 'cursor-default' : 'cursor-move'
        } touch-none`}
      >
        {/* System Menu Button & Title */}
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            type="button"
            title={`System Menu: ${title}`}
            aria-label={`System Menu: ${title}`}
            aria-expanded={isSystemMenuOpen}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setIsSystemMenuOpen(!isSystemMenuOpen);
            }}
            className="flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-white/80 p-0.5 rounded cursor-pointer"
          >
            <img 
              src={icon} 
              alt="" 
              className="w-4 h-4 flex-shrink-0 object-contain drop-shadow"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/icons/xp/my-computer.svg';
              }}
            />
            <span className="font-bold text-xs sm:text-sm tracking-tight truncate max-w-[220px] sm:max-w-md pointer-events-none">
              {title}
            </span>
          </button>
        </div>

        {/* System Menu Dropdown Overlay */}
        {isSystemMenuOpen && (
          <div 
            ref={systemMenuRef}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute top-full left-1 mt-0.5 w-44 bg-[#ECE9D8] border border-[#7890B1] shadow-xl rounded z-50 text-xs text-[#1B2533] p-1 flex flex-col gap-0.5"
          >
            <button
              type="button"
              disabled={!isMaximized}
              onClick={handleRestore}
              className="px-3 py-1 text-left rounded hover:bg-[#164DA6] hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#1B2533]"
            >
              Restore
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSystemMenuOpen(false);
                onCenter?.();
              }}
              className="px-3 py-1 text-left rounded hover:bg-[#164DA6] hover:text-white"
            >
              Center Window
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSystemMenuOpen(false);
                onFit?.();
              }}
              className="px-3 py-1 text-left rounded hover:bg-[#164DA6] hover:text-white"
            >
              Fit to Workspace
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSystemMenuOpen(false);
                onMinimize?.();
              }}
              className="px-3 py-1 text-left rounded hover:bg-[#164DA6] hover:text-white"
            >
              Minimize
            </button>
            <button
              type="button"
              disabled={isMaximized}
              onClick={() => {
                setIsSystemMenuOpen(false);
                if (!isMaximized) onMaximize?.();
              }}
              className="px-3 py-1 text-left rounded hover:bg-[#164DA6] hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#1B2533]"
            >
              Maximize
            </button>
            <div className="border-t border-[#7890B1]/40 my-0.5" />
            <button
              type="button"
              onClick={() => {
                setIsSystemMenuOpen(false);
                onClose?.();
              }}
              className="px-3 py-1 text-left rounded font-bold hover:bg-[#A52720] hover:text-white"
            >
              Close
            </button>
          </div>
        )}

        {/* Grouped Window Controls (32x32px hit-target padding with centered buttons) */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button 
            type="button"
            title={`Minimize ${title}`}
            aria-label={`Minimize ${title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            className="xp-btn-ctrl w-6 h-6 flex items-center justify-center p-0 font-bold text-xs select-none focus:outline-none focus:ring-1 focus:ring-white"
          >
            _
          </button>
          <button 
            type="button"
            title={isMaximized ? `Restore ${title}` : `Maximize ${title}`}
            aria-label={isMaximized ? `Restore ${title}` : `Maximize ${title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              if (isMaximized) {
                handleRestore();
              } else {
                onMaximize?.();
              }
            }}
            className="xp-btn-ctrl w-6 h-6 flex items-center justify-center p-0 font-bold text-xs select-none focus:outline-none focus:ring-1 focus:ring-white"
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button 
            type="button"
            title={`Close ${title}`}
            aria-label={`Close ${title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className="xp-btn-ctrl xp-btn-close w-6 h-6 flex items-center justify-center p-0 font-bold text-xs select-none focus:outline-none focus:ring-1 focus:ring-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content Area - Scrollable, warm Luna surface, text selectable */}
      <div className="flex-1 p-2 bg-[#ECE9D8] overflow-y-auto flex flex-col min-h-0 select-text">
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

          {/* Bottom-Right Corner Grip */}
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
