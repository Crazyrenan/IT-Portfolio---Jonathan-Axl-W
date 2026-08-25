import React, { useState, useEffect, type ReactElement } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { motion } from 'framer-motion';

interface Props {
  username: string;
}

interface Activity {
  date: string;
  count: number;
  level: number;
}

export default function GitHubIntel({ username }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    light: ['#1B1B1E', '#420F18', '#681826', '#A31D2D', '#D12636'],
    dark: [
      '#0F0F11',
      '#420F18',
      '#681826',
      '#A31D2D',
      '#D12636',
    ],
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="h-44 bg-[#1B1B1E]/40 border border-[#681826]/20 rounded-xs animate-pulse flex items-center justify-center font-mono text-xs text-[#E0D5C9]/40">
          // INITIALIZING_INTEL_STREAM...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-[#681826]/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#D12636] rounded-full animate-pulse shadow-[0_0_10px_#D12636]" />
          <h2 className="text-xl font-mono text-[#D12636] tracking-widest uppercase font-bold">
            Open Source Intel
          </h2>
        </div>
        <div className="text-xs font-mono text-[#E0D5C9]/60">
          TARGET: <span className="text-[#E0D5C9] font-bold">{username}</span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#1B1B1E]/80 backdrop-blur-xl border border-[#681826]/40 hover:border-[#D12636] p-6 rounded-xs relative group overflow-hidden shadow-2xl transition-colors duration-500"
      >
        {/* Tactical Corners */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-l-2 border-t-2 border-[#D12636]/60" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-r-2 border-t-2 border-[#D12636]/60" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-l-2 border-b-2 border-[#D12636]/60" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-r-2 border-b-2 border-[#D12636]/60" />

        <div className="flex justify-center font-mono text-sm overflow-x-auto py-2">
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
        <div className="absolute inset-0 bg-[#681826]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </div>
  );
}
