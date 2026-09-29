import React from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

const EXPERIENCE = [
  {
    id: 'lkh',
    company: 'PT Lautan Kencana Hidup',
    role: 'Full-Stack Engineer (Intern)',
    date: '2026 - Present',
    description: 'Architected and developed an enterprise SaaS intranet platform featuring Two-Stage Inventory Management, automated Work Orders, and an anti-fraud cryptographic audit trail using SHA-256 hash chaining to guarantee transaction integrity.',
    tags: ['Enterprise SaaS', 'FastAPI', 'PostgreSQL', 'React 18', 'Zustand', 'TanStack Query', 'SHA-256 Ledger']
  },
  {
    id: 'ieee',
    company: 'IEEE YESIST12 — Medical AI Research',
    role: 'AI / Deep Learning Researcher',
    date: '2026',
    description: 'Conducted comparative clinical AI research on pulmonary Tuberculosis detection evaluating Vision Transformers (Swin-T & DeiT) against Hybrid CNNs. Achieved 97.0% classification accuracy and F1-Score with 100% recall on healthy cases, augmented with Grad-CAM activation heatmaps for physician explainability.',
    tags: ['PyTorch', 'Vision Transformers', 'Swin Transformer', 'DeiT', 'Hybrid CNN', 'Grad-CAM', 'Medical AI']
  },
  {
    id: 'imip',
    company: 'PT Indonesia Morowali Industrial Park (IMIP)',
    role: 'Full-Stack Software Developer (Intern)',
    date: '2025 - 2026',
    description: 'Engineered a high-throughput corporate E-Recruitment portal handling thousands of concurrent applicants with automated document validation workflows, granular multi-tier RBAC security, and interactive candidate search.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Livewire AI Search', 'SCSS', 'Bootstrap', 'RBAC Security']
  },
  {
    id: 'umn',
    company: 'Universitas Multimedia Nusantara',
    role: 'B.S. in Information Systems (GPA 3.78 / 4.00)',
    date: '2022 - 2026',
    description: 'Graduated with high distinction specializing in scalable software engineering, distributed database design, and applied machine learning. Engineered multiple production systems including Intelligent IT Help Desk (40% duplicate ticket reduction), Telegram OCR Bot, and Windbreaker AI.',
    tags: ['Academic', 'GPA 3.78', 'Software Engineering', 'Applied AI', 'Data Architecture']
  }
];

export function RetroTimeline(props?: Partial<RetroWindowProps>) {
  return (
    <RetroWindow 
      id="experience"
      title="C:\LOGS\Quest_Log.bat" 
      icon="/icons/retro/quest.svg"
      hasMenu={true}
      {...props}
    >
      <div className="bg-white win95-sunken p-2.5 sm:p-4 max-h-[380px] sm:max-h-[440px] overflow-y-auto text-black text-xs font-mono leading-relaxed">
        <div className="text-gray-600 mb-3 pb-2 border-b border-gray-300 flex items-center justify-between text-[11px]">
          <span>[LOG RECORD] CAREER_QUEST_LOG.TXT</span>
          <span className="text-blue-900 font-bold">4 RECORDS FOUND</span>
        </div>

        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="mb-5 border-b border-dashed border-gray-400 pb-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <h3 className="font-bold text-sm text-[#000080]">{exp.role}</h3>
              <span className="text-gray-700 text-[10.5px] font-bold bg-[#dfdfdf] px-1.5 py-0.5 border border-gray-400 w-fit">
                {exp.date}
              </span>
            </div>

            <h4 className="font-bold text-gray-800 text-xs mb-2 flex items-center gap-1.5">
              <span>🏢</span> {exp.company}
            </h4>

            <p className="text-gray-800 text-xs mb-2.5 leading-relaxed font-sans">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {exp.tags.map(tag => (
                <span key={tag} className="win95-btn px-1.5 py-0.5 text-[9.5px] text-black">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center text-gray-500 italic text-[11px] pt-1">
          *** END OF LOG ARCHIVE ***
        </div>
      </div>
    </RetroWindow>
  );
}
