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
    description: 'Bahasa inti untuk backend microservices asinkron, pemrosesan data analitik, dan pipeline machine learning / computer vision.'
  },
  {
    name: 'FastAPI',
    slug: 'fastapi',
    color: '009688',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup & Windbreaker AI',
    description: 'Framework API asinkron performa tinggi dengan validasi Pydantic v2, rate limiting (SlowAPI), dan otentikasi JWT stateless.'
  },
  {
    name: 'PostgreSQL',
    slug: 'postgresql',
    color: '4169E1',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup (SaaS Intranet) & IT Help Desk',
    description: 'Basis data relasional utama untuk transaksi finansial, inventory staging, dan ledger block storage berindeks.'
  },
  {
    name: 'Laravel',
    slug: 'laravel',
    color: 'FF2D20',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment Portal & IT Help Desk Monolith',
    description: 'Framework MVC enterprise untuk manajemen pipeline pelamar, RBAC middleware, dan integrasi Livewire reactive search.'
  },
  {
    name: 'PHP',
    slug: 'php',
    color: '777BB4',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment & IT Help Desk',
    description: 'Backend server scripting untuk arsitektur monolitik andal dan integrasi database relasional.'
  },
  {
    name: 'MySQL',
    slug: 'mysql',
    color: '4479A1',
    category: 'Backend & Database',
    projectContext: 'PT IMIP E-Recruitment Portal',
    description: 'Penyimpanan data relasional berskala besar untuk menangani ribuan registrasi dan validasi berkas pelamar.'
  },
  {
    name: 'SQLAlchemy',
    slug: 'sqlalchemy',
    color: 'D71F00',
    category: 'Backend & Database',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'ORM Python enterprise untuk eksekusi transaksi atomik Work Order dan mutasi inventaris.'
  },
  {
    name: 'SQLite',
    slug: 'sqlite',
    color: '003B57',
    category: 'Backend & Database',
    projectContext: 'Windbreaker AI & Telegram OCR Bot',
    description: 'Embedded database berkecepatan tinggi dengan integrasi Docker Volume dan task queue storage.'
  },

  // Frontend & Web
  {
    name: 'React 18',
    slug: 'react',
    color: '61DAFB',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup, Windbreaker AI, Portfolio Islands',
    description: 'Library UI modern berbasis komponen dengan concurrent rendering, custom hooks, dan modular architecture.'
  },
  {
    name: 'TypeScript',
    slug: 'typescript',
    color: '3178C6',
    category: 'Frontend & Web',
    projectContext: 'PT LKH, Windbreaker AI, Portfolio SSG',
    description: 'Strict type safety untuk menjamin integritas kontrak API, data flow state management, dan pencegahan runtime error.'
  },
  {
    name: 'Astro SSG',
    slug: 'astro',
    color: 'BC52EE',
    category: 'Frontend & Web',
    projectContext: 'Personal Developer Portfolio',
    description: 'Static Site Generator dengan arsitektur Islands untuk pemuatan super cepat tanpa JS overhead berlebih.'
  },
  {
    name: 'Tailwind CSS',
    slug: 'tailwindcss',
    color: '06B6D4',
    category: 'Frontend & Web',
    projectContext: 'Seluruh 7 Proyek Produksi',
    description: 'Utility-first CSS framework untuk pembuatan design system korporat dan retro UI yang responsif.'
  },
  {
    name: 'Zustand',
    slug: 'react',
    color: '443E38',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'Lightweight atomic state management untuk koordinasi state inventaris multi-step tanpa boilerplate.'
  },
  {
    name: 'TanStack Query v5',
    slug: 'reactquery',
    color: 'FF4154',
    category: 'Frontend & Web',
    projectContext: 'PT Lautan Kencana Hidup',
    description: 'Manajemen server-state, optimistic updates, auto-caching, dan sinkronisasi data real-time.'
  },
  {
    name: 'GSAP',
    slug: 'greensock',
    color: '88CE02',
    category: 'Frontend & Web',
    projectContext: 'Windbreaker AI & Portfolio Stage',
    description: 'Engine animasi performa tinggi untuk animated telemetri counter dan micro-interactions 60 FPS.'
  },
  {
    name: 'Three.js',
    slug: 'threedotjs',
    color: '000000',
    category: 'Frontend & Web',
    projectContext: 'Personal Developer Portfolio',
    description: 'WebGL interactive rendering untuk visualisasi kanvas komputasi 3D.'
  },

  // AI/ML & Vision
  {
    name: 'PyTorch',
    slug: 'pytorch',
    color: 'EE4C2C',
    category: 'AI/ML & Vision',
    projectContext: 'Riset AI Medis (IEEE YESIST12)',
    description: 'Framework Deep Learning utama untuk pelatihan model Hybrid CNN dan Vision Transformers deteksi TB (97.0% akurasi).'
  },
  {
    name: 'Vision Transformers (Swin & DeiT)',
    slug: 'huggingface',
    color: 'FFD21E',
    category: 'AI/ML & Vision',
    projectContext: 'Riset AI Medis (IEEE YESIST12)',
    description: 'Arsitektur atensi global berbasis Shifted Window Attention (Swin) dan DeiT untuk pemodelan citra medis radiografi dada.'
  },
  {
    name: 'Grad-CAM',
    slug: 'pytorch',
    color: 'FF6F00',
    category: 'AI/ML & Vision',
    projectContext: 'Riset AI Medis (IEEE YESIST12)',
    description: 'Visualisasi peta atensi (heat-map) pada area paru-paru untuk transparansi dan interpretabilitas klinis model.'
  },
  {
    name: 'XGBoost',
    slug: 'scikitlearn',
    color: '005571',
    category: 'AI/ML & Vision',
    projectContext: 'Windbreaker AI',
    description: 'Model Gradient Boosting teroptimasi (xgb_flight_delay.pkl & xgb_price.pkl) untuk inferensi telemetri penerbangan.'
  },
  {
    name: 'Scikit-Learn',
    slug: 'scikitlearn',
    color: 'F7931E',
    category: 'AI/ML & Vision',
    projectContext: 'Windbreaker AI & Riset IEEE',
    description: 'Pipeline preprocessing, k-fold cross validation, dan kalkulasi metrik evaluasi (F1-score, Precision, Recall).'
  },
  {
    name: 'OpenCV',
    slug: 'opencv',
    color: '5C3EE8',
    category: 'AI/ML & Vision',
    projectContext: 'Telegram OCR Bot & Riset IEEE Medis',
    description: 'Pra-pemrosesan citra digital (thresholding, de-noising, binarization, edge detection) sebelum inferensi model/OCR.'
  },
  {
    name: 'Tesseract OCR',
    slug: 'google',
    color: '4285F4',
    category: 'AI/ML & Vision',
    projectContext: 'Telegram OCR Logistics & Purchasing',
    description: 'Engine Optical Character Recognition untuk ekstraksi otomatis teks struk belanja dan nota faktur fisik.'
  },
  {
    name: 'Hugging Face Embeddings',
    slug: 'huggingface',
    color: 'FFD21E',
    category: 'AI/ML & Vision',
    projectContext: 'Intelligent IT Help Desk',
    description: 'Model semantic vector embeddings untuk komputasi cosine similarity dan reduksi 40% tiket duplikat.'
  },

  // DevOps & Tools
  {
    name: 'Docker',
    slug: 'docker',
    color: '2496ED',
    category: 'DevOps & Tools',
    projectContext: 'Windbreaker AI & Microservices Deployment',
    description: 'Kontainerisasi aplikasi, manajemen Docker volume untuk persistensi data, dan reproduktibilitas runtime server.'
  },
  {
    name: 'Git & GitHub',
    slug: 'git',
    color: 'F05032',
    category: 'DevOps & Tools',
    projectContext: 'Seluruh Proyek Portofolio',
    description: 'Version control system terdistribusi, branch workflows, dan integrasi Keystatic Git-based CMS.'
  },
  {
    name: 'Figma',
    slug: 'figma',
    color: 'F24E1E',
    category: 'DevOps & Tools',
    projectContext: 'PT IMIP E-Recruitment Portal & Portfolio UX',
    description: 'Perancangan antarmuka, tokenisasi desain warna/tipografi, dan penerjemahan desain visual ke Blade/SCSS.'
  },
  {
    name: 'Uvicorn',
    slug: 'gunicorn',
    color: '499848',
    category: 'DevOps & Tools',
    projectContext: 'PT LKH & Windbreaker AI',
    description: 'Lightning-fast ASGI server implementation untuk eksekusi endpoint FastAPI asinkron.'
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
    <section className="w-full max-w-4xl mx-auto p-2 sm:p-4 mb-4">
      <RetroWindow 
        id="skills"
        title="C:\SYSTEM\Skills.sys" 
        icon="https://win98icons.alexmeub.com/icons/png/hardware_wiz-1.png"
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[380px]">
            
            {/* Left: Skill Grid (7 cols on desktop) */}
            <div className="md:col-span-7 win95-sunken bg-white p-2 overflow-y-auto max-h-[400px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredSkills.map(skill => {
                  const isSelected = activeSkill.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setActiveSkill(skill)}
                      className={`flex flex-col items-center justify-center p-2 text-center rounded-none border transition-none select-none ${
                        isSelected
                          ? 'bg-[#000080] text-white border-dotted border-white'
                          : 'bg-[#f0f0f0] text-black border-gray-300 hover:bg-[#dfdfdf]'
                      }`}
                    >
                      <div className="w-7 h-7 flex items-center justify-center mb-1 bg-white border border-gray-400 p-1">
                        <img
                          src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'https://win98icons.alexmeub.com/icons/png/hardware_wiz-1.png';
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold truncate w-full leading-tight">
                        {skill.name}
                      </span>
                      <span className={`text-[9px] truncate w-full ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                        {skill.category.split('&')[0].trim()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Interactive Properties Pane (5 cols on desktop) */}
            <div className="md:col-span-5 win95-raised p-3 flex flex-col justify-between bg-[#c0c0c0]">
              <div>
                {/* Header in Properties */}
                <div className="flex items-center gap-2 pb-2 border-b border-gray-400 mb-3">
                  <div className="w-9 h-9 win95-sunken bg-white p-1.5 flex items-center justify-center flex-shrink-0">
                    <img
                      src={`https://cdn.simpleicons.org/${activeSkill.slug}/${activeSkill.color}`}
                      alt={activeSkill.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://win98icons.alexmeub.com/icons/png/hardware_wiz-1.png';
                      }}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-sm text-black leading-tight truncate">
                      {activeSkill.name}
                    </h4>
                    <span className="text-[10px] text-[#000080] font-bold block">
                      [{activeSkill.category}]
                    </span>
                  </div>
                </div>

                {/* Properties fields */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 block mb-0.5">
                      Verified Project Context:
                    </span>
                    <div className="win95-sunken bg-white p-2 text-[11px] text-black leading-snug">
                      {activeSkill.projectContext}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-700 block mb-0.5">
                      Technical Spec & Capabilities:
                    </span>
                    <div className="win95-sunken bg-white p-2 text-[11px] text-gray-800 leading-relaxed min-h-[70px]">
                      {activeSkill.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status bar footer */}
              <div className="mt-3 pt-2 border-t border-gray-400 win95-sunken bg-[#dfdfdf] px-2 py-1 text-[10px] text-gray-700 flex justify-between items-center font-mono">
                <span>STATUS: DRIVER_LOADED</span>
                <span className="text-green-700 font-bold">● OK</span>
              </div>

            </div>

          </div>

        </div>
      </RetroWindow>
    </section>
  );
}
