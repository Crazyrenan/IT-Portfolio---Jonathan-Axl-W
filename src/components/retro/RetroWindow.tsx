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
  const activeResizeCleanupRef = useRef<(() => void) | null>(null);

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

  // Clean up any active resize listener session on unmount (R05)
  useEffect(() => {
    return () => {
      if (activeResizeCleanupRef.current) {
        activeResizeCleanupRef.current();
        activeResizeCleanupRef.current = null;
      }
    };
  }, []);

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

  // Unified Resize Handler with RAF, pointercancel, Escape cancellation and bounds clamping (R05)
  const startResize = (
    e: React.PointerEvent,
    mode: 'both' | 'width' | 'height'
  ) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    onFocus?.();

    if (activeResizeCleanupRef.current) {
      activeResizeCleanupRef.current();
      activeResizeCleanupRef.current = null;
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const el = windowRef.current;
    if (!el) return;

    const startWidth = el.offsetWidth;
    const startHeight = el.offsetHeight;
    let currentW = startWidth;
    let currentH = startHeight;
    let rafId: number | null = null;

    const actualBoundsW = Math.max(1, bounds ? bounds.width : (typeof window !== 'undefined' ? window.innerWidth - 30 : 1200));
    const actualBoundsH = Math.max(1, bounds ? bounds.height : (typeof window !== 'undefined' ? window.innerHeight - 70 : 800));

    // Minimum size never exceeds usable bounds (R05)
    const minW = Math.min(320, actualBoundsW);
    const minH = Math.min(220, actualBoundsH);

    const cancelResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', cancelResize);
      window.removeEventListener('keydown', onKeyDown);
      activeResizeCleanupRef.current = null;
      setSize({ width: startWidth, height: startHeight });
    };

    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'Escape') {
        cancelResize();
      }
    };

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (mode === 'both' || mode === 'width') {
        currentW = Math.max(minW, Math.min(actualBoundsW, startWidth + (moveEvent.clientX - startX)));
      }
      if (mode === 'both' || mode === 'height') {
        currentH = Math.max(minH, Math.min(actualBoundsH, startHeight + (moveEvent.clientY - startY)));
      }
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setSize({ width: currentW, height: currentH });
      });
    };

    const onPointerUp = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', cancelResize);
      window.removeEventListener('keydown', onKeyDown);
      activeResizeCleanupRef.current = null;

      if (onCommitRect) {
        onCommitRect({
          x: rect?.x ?? 0,
          y: rect?.y ?? 0,
          width: currentW,
          height: currentH
        });
      }
    };

    activeResizeCleanupRef.current = cancelResize;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', cancelResize);
    window.addEventListener('keydown', onKeyDown);
  };

  const handleCornerResize = (e: React.PointerEvent) => startResize(e, 'both');
  const handleRightResize = (e: React.PointerEvent) => startResize(e, 'width');
  const handleBottomResize = (e: React.PointerEvent) => startResize(e, 'height');

  const handleRestore = useCallback(() => {
    setIsSystemMenuOpen(false);
    if (onRestore) {
      onRestore();
    } else if (isMaximized) {
      onMaximize?.();
    }
  }, [onRestore, isMaximized, onMaximize]);

  const currentW = size.width ?? rect?.width ?? 760;
  const currentH = size.height ?? rect?.height ?? 540;
  const posX = rect?.x ?? 0;
  const posY = rect?.y ?? 0;
  const workspaceW = bounds?.width ?? 1200;
  const workspaceH = bounds?.height ?? 750;

  const dragConstraints = bounds && rect ? {
    left: -posX,
    top: -posY,
    right: Math.max(0, workspaceW - posX - currentW),
    bottom: Math.max(0, workspaceH - posY - currentH)
  } : undefined;

  return (
    <motion.div
      ref={windowRef}
      id={id}
      role="region"
      aria-label={title}
      tabIndex={-1}
      // When minimized, mark inert so it is completely removed from tab & AX tree
      // @ts-ignore
      inert={isMinimized ? "" : undefined}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.02}
      dragConstraints={dragConstraints}
      onDragEnd={(_e, info) => {
        if (rect && onCommitRect) {
          const clampedX = Math.max(0, Math.min(workspaceW - currentW, posX + info.offset.x));
          const clampedY = Math.max(0, Math.min(workspaceH - currentH, posY + info.offset.y));
          onCommitRect({
            ...rect,
            x: Math.round(clampedX),
            y: Math.round(clampedY),
            width: currentW,
            height: currentH
          });
        }
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.12, ease: "easeOut" } }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 28,
        mass: 0.6
      }}
      style={{
        zIndex,
        position: 'absolute',
        left: isMaximized ? 0 : `${posX}px`,
        top: isMaximized ? 0 : `${posY}px`,
        width: isMaximized ? '100%' : `${currentW}px`,
        height: isMaximized ? (bounds?.height ? `${bounds.height}px` : 'calc(100vh - 44px)') : `${currentH}px`,
        maxWidth: isMaximized ? '100%' : `${workspaceW}px`,
        maxHeight: isMaximized ? '100%' : `${workspaceH}px`,
        display: isMinimized ? 'none' : undefined,
      }}
      onPointerDown={onFocus}
      onFocusCapture={onFocus}
      className={`flex flex-col p-[3px] select-none transition-shadow duration-150 ${
        isActive ? 'xp-window' : 'xp-window-inactive'
      } ${isMaximized ? 'w-full' : ''} ${className}`}
    >
      {/* Windows XP Titlebar */}
      <div 
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={isMaximized ? handleRestore : onMaximize}
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

        {/* Grouped Window Controls (32x32px desktop / 44x44px touch hit-target) */}
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
            className="xp-btn-ctrl w-8 h-8 flex items-center justify-center p-0 font-bold text-xs select-none focus:outline-none focus:ring-1 focus:ring-white"
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
            className="xp-btn-ctrl w-8 h-8 flex items-center justify-center p-0 font-bold text-xs select-none focus:outline-none focus:ring-1 focus:ring-white"
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
            className="xp-btn-ctrl xp-btn-close w-8 h-8 flex items-center justify-center p-0 font-bold text-xs select-none focus:outline-none focus:ring-1 focus:ring-white"
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
