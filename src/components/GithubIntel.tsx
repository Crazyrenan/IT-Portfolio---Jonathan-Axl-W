import React, { type ReactElement } from 'react';
// FIX 1: Use Named Import (Curly Braces) as the original error suggested
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

interface Props {
  username: string;
}

// Interface for the data inside the calendar blocks
interface Activity {
  date: string;
  count: number;
  level: number;
}

export default function GitHubIntel({ username }: Props) {
  // THEME: "Ada Wong" Tactical Red Scale
  const theme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: [
      '#1A1A1D', // Level 0: Empty (Matte Gunmetal)
      '#5C1823', // Level 1: Visible Dark Red (Was #3f1016 - too dark!)
      '#8A1C2E', // Level 2: Mid Red
      '#C42438', // Level 3: Bright Red
      '#FF2E44', // Level 4: Neon/Active Red (Highest Intensity)
    ],
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-primary/20 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
          <h2 className="text-xl font-mono text-primary tracking-widest uppercase">
            Open Source Intel
          </h2>
        </div>
        <div className="text-xs font-mono text-text/50">
          TARGET: <span className="text-white">{username}</span>
        </div>
      </div>

      {/* Calendar Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-surface/30 border border-white/5 p-6 rounded-sm relative group overflow-hidden"
      >
        {/* Tactical Corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-primary/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/50" />

        {/* The Graph */}
        <div className="flex justify-center font-mono text-sm overflow-x-auto">
          <GitHubCalendar 
            username={username} 
            colorScheme="dark"
            theme={theme}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            labels={{
              totalCount: '{{count}} operations in the last year',
            }}
            renderBlock={(block: ReactElement, activity: Activity) => (
              <div title={`${activity.count} activities on ${activity.date}`}>
                {block}
              </div>
            )}
          />
        </div>
        
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </div>
  );
}