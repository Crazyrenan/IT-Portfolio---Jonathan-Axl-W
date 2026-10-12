import React, { useState, useEffect } from 'react';
import { formatWibTime } from '../../lib/clock';

export { formatWibTime };

/**
 * SystemClock — Isolated Windows XP Tray Clock
 * Displays time in Asia/Jakarta (WIB) timezone, updating at minute intervals.
 * Isolated to prevent 1-second ticks from causing shell or taskbar re-renders.
 */
export function SystemClock() {
  const [timeState, setTimeState] = useState<{ display: string; fullDate: string }>(() => {
    return formatWibTime(new Date());
  });

  useEffect(() => {
    function updateClock() {
      setTimeState(formatWibTime(new Date()));
    }

    // Update immediately on mount
    updateClock();

    // Align to the next minute boundary for precise minute ticks
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let intervalId: NodeJS.Timeout | null = null;
    const timeoutId = setTimeout(() => {
      updateClock();
      intervalId = setInterval(updateClock, 60000);
    }, Math.max(100, msUntilNextMinute));

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <span
      className="text-xs font-mono font-medium tracking-tight whitespace-nowrap select-none text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
      title={timeState.fullDate}
      aria-label={`Current system time: ${timeState.fullDate}`}
    >
      {timeState.display}
    </span>
  );
}
