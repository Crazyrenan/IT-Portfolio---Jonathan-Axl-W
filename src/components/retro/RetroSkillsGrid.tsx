import React, { useState } from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

interface SkillItem {
  name: string;
  slug: string;
  color: string;
  category: 'Backend & Database' | 'Frontend & Web' | 'AI/ML & Vision' | 'DevOps & Tools';
  projectContext: string;
  description: string;
}

const SKILLS_DATA: SkillItem[] = [
  // Backend & Database
  {
    name: 'Python 3.11+',
    slug: 'python',
    color: '3776AB',
    category: 'Backend & Database',
    projectContext: 'PT LKH (FastAPI), Windbreaker AI, Telegram OCR Bot, IT Help Desk (Flask)',
    description: 'Primary programming language for asynchronous backend microservices, data analytics pipelines, and deep learning / computer vision research.'
  },
  {
    name: 'FastAPI',
    slug: 'fastapi',
    color: '009688',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup & Windbreaker AI',
    description: 'High-performance asynchronous API framework utilizing Pydantic v2 validation, SlowAPI rate limiting, and stateless JWT authentication.'
  },
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    color: '4169E1',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup (SaaS Intranet) & IT Help Desk',
    description: 'Primary relational database for financial transactions, multi-stage inventory staging, and indexed ledger storage.'
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    color: 'FF2D20',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment Portal & IT Help Desk Monolith',
    description: 'Enterprise MVC framework powering applicant tracking pipelines, RBAC authorization middleware, and reactive Livewire search.'
  },
  {
    name: 'PHP',
    slug: 'php',
    color: '777BB4',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment & IT Help Desk',
    description: 'Server-side scripting engine for resilient monolithic architecture and structured relational database transactions.'
  },
  {
    name: 'MySQL',
    slug: 'mysql',
    color: '4479A1',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment Portal',
    description: 'High-capacity relational data store handling thousands of candidate registrations, file validation, and indexing.'
  },
  {
    name: 'SQLAlchemy',
    slug: 'sqlalchemy',
    color: 'D71F00',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'Enterprise Python ORM for atomic transactions, Work Order lifecycles, and inventory state transitions.'
  },
  {
    name: 'SQLite',
    slug: 'sqlite',
    color: '003B57',
    category: 'Backend & Database',
    projectContext: 'Windbreaker AI & Telegram OCR Bot',
    description: 'Lightweight embedded database with Docker Volume persistence and low-latency task queue state caching.'
  },

  // Frontend & Web
  {
    name: 'React 18',
    slug: 'react',
    color: '61DAFB',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup, Windbreaker AI, Portfolio Islands',
    description: 'Modern component-driven UI library leveraging concurrent rendering, custom hooks, and modular UI architectures.'
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    color: '3178C6',
    category: 'Frontend & Web',
    projectContext: 'PT LKH, Windbreaker AI, Portfolio SSG',
    description: 'Strict type safety ensuring robust API contract validation, predictable state flows, and runtime error prevention.'
  },
  {
    name: 'Astro SSG',
    slug: 'astro',
    color: 'BC52EE',
    category: 'Frontend & Web',
    projectContext: 'Personal Developer Portfolio',
    description: 'Static Site Generator with Islands architecture for lightning-fast page loads and zero unnecessary JavaScript overhead.'
  },
  {
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    color: '06B6D4',
    category: 'Frontend & Web',
    projectContext: 'All 7 Production Projects',
    description: 'Utility-first styling framework for rapid design system tokenization and responsive retro UI interfaces.'
  },
  {
    name: 'Zustand',
    slug: 'react',
    color: '443E38',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'Lightweight atomic state manager coordinating multi-step inventory workflows without boilerplate overhead.'
  },
  {
    name: 'TanStack Query v5',
    slug: 'reactquery',
    color: 'FF4154',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'Robust server-state synchronization with optimistic updates, query deduplication, and automated cache invalidation.'
  },
  {
    name: 'GSAP',
    slug: 'greensock',
    color: '88CE02',
    category: 'Frontend & Web',
    projectContext: 'Windbreaker AI & Portfolio Stage',
    description: 'High-performance animation engine driving 60 FPS telemetry counters, timeline scrubbing, and UI transitions.'
  },
  {
    name: 'Three.js',
    slug: 'threedotjs',
    color: '000000',
    category: 'Frontend & Web',
    projectContext: 'Personal Developer Portfolio',
    description: 'Interactive WebGL library rendering dynamic 3D compute visualizations and canvas graphics.'
  },

  // AI/ML & Vision
  {
    name: 'PyTorch',
    slug: 'pytorch',
    color: 'EE4C2C',
    category: 'AI/ML & Vision',
    projectContext: 'Medical AI Research (IEEE YESIST12)',
    description: 'Primary deep learning framework for training Hybrid CNN and Vision Transformer models for TB detection (97.0% accuracy).'
  },
  {
    name: 'Vision Transformers (Swin & DeiT)',
    slug: 'huggingface',
    color: 'FFD21E',
    category: 'AI/ML & Vision',
    projectContext: 'Medical AI Research (IEEE YESIST12)',
    description: 'Shifted Window Attention (Swin) and DeiT architectures for global context modeling on chest radiography datasets.'
  },
  {
    name: 'Grad-CAM',
    slug: 'pytorch',
    color: 'FF6F00',
    category: 'AI/ML & Vision',
    projectContext: 'Medical AI Research (IEEE YESIST12)',
    description: 'Class activation mapping producing interpretable pulmonary heatmaps for clinician verification and explainability.'
  },
  {
    name: 'XGBoost',
    slug: 'scikitlearn',
    color: '005571',
    category: 'AI/ML & Vision',
    projectContext: 'Windbreaker AI',
    description: 'Optimized gradient boosted decision tree ensembles (flight delay & pricing models) for low-latency telemetry inference.'
  },
  {
    name: 'Scikit-Learn',
    slug: 'scikitlearn',
    color: 'F7931E',
    category: 'AI/ML & Vision',
    projectContext: 'Windbreaker AI & IEEE Research',
    description: 'Feature preprocessing pipelines, stratified k-fold cross-validation, and multi-class classification metric evaluations.'
  },
  {
    name: 'OpenCV',
    slug: 'opencv',
    color: '5C3EE8',
    category: 'AI/ML & Vision',
    projectContext: 'Telegram OCR Bot & Medical IEEE Research',
    description: 'Digital image preprocessing (adaptive thresholding, noise removal, ROI extraction) prior to OCR and model inference.'
  },
  {
    name: 'Tesseract OCR',
    slug: 'google',
    color: '4285F4',
    category: 'AI/ML & Vision',
    projectContext: 'Telegram OCR Logistics & Purchasing',
    description: 'Optical Character Recognition engine parsing receipts and invoices with regex sanitization for ERP ingestion.'
  },
  {
    name: 'Hugging Face Embeddings',
    slug: 'huggingface',
    color: 'FFD21E',
    category: 'AI/ML & Vision',
    projectContext: 'Intelligent IT Help Desk',
    description: 'Semantic vector representations and cosine similarity indexing to detect duplicate IT tickets and slash backlog by 40%.'
  },

  // DevOps & Tools
  {
    name: 'Docker',
    slug: 'docker',
    color: '2496ED',
    category: 'DevOps & Tools',
    projectContext: 'Windbreaker AI & Microservices Deployment',
    description: 'Application containerization, multi-stage builds, Docker volume management, and reproducible production environments.'
  },
  {
    name: 'Git & GitHub',
    slug: 'git',
    color: 'F05032',
    category: 'DevOps & Tools',
    projectContext: 'All Portfolio Projects',
    description: 'Distributed version control, trunk-based feature branching, and automated CI/CD deployment pipelines.'
  },
  {
    name: 'Figma',
    slug: 'figma',
    color: 'F24E1E',
    category: 'DevOps & Tools',
    projectContext: 'PT IMIP E-Recruitment Portal & Portfolio UX',
    description: 'UI/UX wireframing, component tokenization, and rapid prototyping translated directly to clean frontend code.'
  },
  {
    name: 'Uvicorn',
    slug: 'gunicorn',
    color: '499848',
    category: 'DevOps & Tools',
    projectContext: 'PT LKH & Windbreaker AI',
    description: 'Lightning-fast ASGI server implementation powering high-throughput asynchronous FastAPI microservices.'
  }
];

const CATEGORIES = ['All', 'Backend & Database', 'Frontend & Web', 'AI/ML & Vision', 'DevOps & Tools'] as const;

export function RetroSkillsGrid(props?: Partial<RetroWindowProps>) {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS_DATA[0]);

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter(s => s.category === selectedCategory);

  return (
    <RetroWindow 
      id="skills"
      title="C:\SYSTEM\Skills.sys" 
      icon="/icons/retro/skills.svg"
      hasMenu={true}
      {...props}
    >
      <div className="bg-[#c0c0c0] p-2 flex flex-col gap-3 font-[Tahoma,sans-serif] text-black">
        
        {/* Top Category Filter Toolbar */}
        <div className="flex flex-wrap gap-1 p-1 win95-sunken bg-[#dfdfdf]">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2 py-1 font-bold transition-none ${
                selectedCategory === cat
                  ? 'win95-sunken bg-white text-[#000080]'
                  : 'win95-btn text-black'
              }`}
            >
              {cat === 'All' ? '📂 ALL STACKS' : cat}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 min-h-0 md:min-h-[360px]">
          
          {/* Left: Skill Grid (7 cols on desktop) */}
          <div className="md:col-span-7 win95-sunken bg-white p-1.5 sm:p-2 overflow-y-auto max-h-[260px] sm:max-h-[320px] md:max-h-[400px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {filteredSkills.map(skill => {
                const isSelected = activeSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => setActiveSkill(skill)}
                    className={`flex flex-col items-center justify-center p-1.5 sm:p-2 text-center rounded-none border transition-none select-none ${
                      isSelected
                        ? 'bg-[#000080] text-white border-dotted border-white'
                        : 'bg-[#f0f0f0] text-black border-gray-300 hover:bg-[#dfdfdf]'
                    }`}
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mb-1 bg-white border border-gray-400 p-1">
                      <img
                        src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/icons/retro/skills.svg';
                        }}
                      />
                    </div>
                    <span className="text-[10.5px] sm:text-[11px] font-bold truncate w-full leading-tight">
                      {skill.name}
                    </span>
                    <span className={`text-[8.5px] sm:text-[9px] truncate w-full ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                      {skill.category.split('&')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Properties Pane (5 cols on desktop) */}
          <div className="md:col-span-5 win95-raised p-2.5 sm:p-3 flex flex-col justify-between bg-[#c0c0c0]">
            <div>
              {/* Header in Properties */}
              <div className="flex items-center gap-2 pb-2 border-b border-gray-400 mb-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 win95-sunken bg-white p-1 flex items-center justify-center flex-shrink-0">
                  <img
                    src={`https://cdn.simpleicons.org/${activeSkill.slug}/${activeSkill.color}`}
                    alt={activeSkill.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/icons/retro/skills.svg';
                    }}
                  />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-xs sm:text-sm text-black leading-tight truncate">
                    {activeSkill.name}
                  </h4>
                  <span className="text-[9.5px] sm:text-[10px] text-[#000080] font-bold block">
                    [{activeSkill.category}]
                  </span>
                </div>
              </div>

              {/* Properties fields */}
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[9.5px] sm:text-[10px] uppercase font-bold text-gray-700 block mb-0.5">
                    Production Context &amp; Projects:
                  </span>
                  <div className="win95-sunken bg-white p-1.5 sm:p-2 text-[10.5px] sm:text-[11px] text-black leading-snug">
                    {activeSkill.projectContext}
                  </div>
                </div>

                <div>
                  <span className="text-[9.5px] sm:text-[10px] uppercase font-bold text-gray-700 block mb-0.5">
                    Technical Application &amp; Architecture:
                  </span>
                  <div className="win95-sunken bg-white p-1.5 sm:p-2 text-[10.5px] sm:text-[11px] text-gray-800 leading-relaxed min-h-[55px] sm:min-h-[70px]">
                    {activeSkill.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Status bar footer */}
            <div className="mt-2.5 pt-1.5 border-t border-gray-400 win95-sunken bg-[#dfdfdf] px-2 py-1 text-[9.5px] sm:text-[10px] text-gray-700 flex justify-between items-center font-mono">
              <span>STATUS: READY</span>
              <span className="text-green-700 font-bold">● ACTIVE</span>
            </div>

          </div>

        </div>

      </div>
    </RetroWindow>
  );
}
