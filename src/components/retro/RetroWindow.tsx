import React from 'react';

interface RetroWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  hasMenu?: boolean;
}

export function RetroWindow({ title = "Program", children, className = '', hasMenu = false }: RetroWindowProps) {
  return (
    <div className={`win95-raised flex flex-col p-1 mb-8 ${className}`}>
      {/* Titlebar */}
      <div className="win95-titlebar flex justify-between items-center px-1 py-1 select-none">
        <div className="flex items-center gap-2 text-white font-bold text-sm tracking-wide ml-1">
          <div className="w-4 h-4 bg-white border border-gray-400 text-[10px] flex items-center justify-center text-blue-900">W</div>
          {title}
        </div>
        <div className="flex gap-[2px]">
          <button className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none">_</button>
          <button className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none">☐</button>
          <button className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 focus:outline-none">X</button>
        </div>
      </div>
      
      {/* Optional Menu */}
      {hasMenu && (
        <div className="flex gap-4 px-2 py-1 text-sm bg-[#c0c0c0]">
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1 underline decoration-transparent hover:decoration-white underline-offset-2">F<span className="no-underline">ile</span></span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1 underline decoration-transparent hover:decoration-white underline-offset-2">E<span className="no-underline">dit</span></span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1 underline decoration-transparent hover:decoration-white underline-offset-2">V<span className="no-underline">iew</span></span>
          <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1 underline decoration-transparent hover:decoration-white underline-offset-2">H<span className="no-underline">elp</span></span>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 p-2 bg-[#c0c0c0]">
        {children}
      </div>
    </div>
  );
}
