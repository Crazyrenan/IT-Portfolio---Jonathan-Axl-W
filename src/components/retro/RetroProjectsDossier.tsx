import React, { useState } from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

const PROJECTS = [
  {
    id: 'tb-detection-ai',
    slug: 'tb-detection-comparative-study',
    name: 'IEEE YESIST12 TB Detection',
    type: 'AI Research',
    badge: '97% Akurasi',
    summary: 'Riset komparatif deteksi Tuberkulosis medis pakai Vision Transformers (Swin-T & DeiT) vs Hybrid CNN. Sukses capai akurasi 97.0% dan dilengkapi visualisasi Grad-CAM untuk interpretabilitas klinis dokter.',
    metrics: ['Hybrid CNN', 'Grad-CAM', 'Medical AI'],
    tech: ['PyTorch', 'Python', 'OpenCV', 'Vision Transformers'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'lkh-internal-platform',
    slug: 'lkh-internal-platform',
    name: 'Portal Internal PT LKH',
    type: 'Enterprise SaaS',
    badge: 'Production',
    summary: 'Aplikasi web internal perusahaan untuk otomatisasi Work Orders, Two-Stage Inventory Management, dan audit trail anti-fraud dengan cryptographic hash-chaining SHA-256.',
    metrics: ['Two-Stage Inventory', 'RBAC Security', 'SHA-256 Ledger'],
    tech: ['FastAPI', 'PostgreSQL', 'React 18', 'Zustand', 'Docker'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'imip-e-recruitment',
    slug: 'imip-recruitment',
    name: 'IMIP E-Recruitment Portal',
    type: 'Web Portal',
    badge: 'High Traffic',
    summary: 'Portal rekrutmen terpusat berskala besar untuk menangani ribuan pelamar kerja, validasi berkas otomatis, arsitektur RBAC multi-role, dan fitur pencarian pelamar cerdas.',
    metrics: ['Ribuan Pelamar', 'RBAC Multi-Level', 'Live Search'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Livewire', 'Bootstrap'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'windbreaker-ai',
    slug: 'windbreaker-ai',
    name: 'Windbreaker AI Telemetry',
    type: 'ML Platform',
    badge: 'Predictive ML',
    summary: 'Platform telemetri penerbangan real-time dengan model prediksi delay XGBoost, autentikasi stateless JWT, dan dashboard analitik interaktif.',
    metrics: ['XGBoost Models', 'Stateless JWT', 'Real-time Telemetry'],
    tech: ['FastAPI', 'Python', 'React', 'Docker', 'SQLite'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'optical-intel-ocr',
    slug: 'optical-intel-ocr',
    name: 'Telegram OCR Intelligence Bot',
    type: 'Automation Bot',
    badge: 'Computer Vision',
    summary: 'Bot Telegram otomatisasi ekstraksi teks dokumen dan resi berbasis Tesseract OCR dan OpenCV untuk mempercepat verifikasi data operasional lapangan.',
    metrics: ['Automated Extraction', 'OCR Pipeline', 'Telegram API'],
    tech: ['Python', 'OpenCV', 'Tesseract OCR', 'Telegram Bot API'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'help-desk-ai',
    slug: 'help-desk-ai',
    name: 'Intelligent IT Help Desk',
    type: 'Internal Tool',
    badge: '-40% Duplikat',
    summary: 'Sistem manajemen tiket IT cerdas yang mendeteksi kesamaan masalah secara otomatis, berhasil memangkas 40% duplikasi tiket kendala operasional.',
    metrics: ['Reduksi 40% Duplikat', 'SLA Tracking', 'Role Management'],
    tech: ['Laravel', 'PostgreSQL', 'Tailwind CSS', 'Alpine.js'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'field-service-pro',
    slug: 'field-service-pro',
    name: 'Field Service Logistics Pro',
    type: 'Operations App',
    badge: 'Audit Trail',
    summary: 'Platform manajemen tim teknisi lapangan dengan dispatching tugas real-time, tracking inventaris suku cadang, dan pelaporan digital terverifikasi.',
    metrics: ['Real-time Dispatch', 'Parts Tracking', 'Digital Reports'],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/crazyrenan'
  }
];

export function RetroProjectsDossier(props?: Partial<RetroWindowProps>) {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

  return (
    <section className="w-full max-w-4xl mx-auto p-2 sm:p-4 mb-4">
      <RetroWindow
        id="projects"
        title="C:\PROJECTS\Projects.exe"
        icon="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png"
        hasMenu={true}
        {...props}
      >
        <div className="bg-[#c0c0c0] p-1.5 sm:p-2 flex flex-col font-[Tahoma,sans-serif]">
          {/* Main 2-Column or Stack Area */}
          <div className="flex flex-col md:flex-row min-h-0 md:min-h-[410px] gap-2.5">
            
            {/* Left / Top: Folder & Project File List */}
            <div className="w-full md:w-5/12 flex flex-col bg-white win95-sunken p-1 overflow-y-auto max-h-[170px] sm:max-h-[220px] md:max-h-[410px]">
              <div className="flex border-b border-gray-400 pb-1 mb-1 text-[11px] text-gray-600 px-1 font-mono font-bold">
                <div className="w-7/12 truncate">Nama Proyek</div>
                <div className="w-5/12 text-right truncate">Status / Highlight</div>
              </div>

              <div className="space-y-0.5">
                {PROJECTS.map((project) => {
                  const isSelected = activeId === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveId(project.id)}
                      className={`w-full flex items-center justify-between text-left text-xs px-1.5 py-1 transition-none select-none ${
                        isSelected
                          ? 'bg-[#000080] text-white font-bold'
                          : 'hover:bg-gray-100 text-black'
                      }`}
                    >
                      <div className="w-7/12 flex items-center gap-1.5 truncate">
                        <span className="text-sm">📁</span>
                        <span className="truncate">{project.name}</span>
                      </div>
                      <div className={`w-5/12 text-right text-[10px] truncate font-mono ${
                        isSelected ? 'text-yellow-200' : 'text-gray-600'
                      }`}>
                        {project.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right / Bottom: File Details Pane */}
            <div className="w-full md:w-7/12 win95-raised p-2.5 sm:p-3 flex flex-col bg-[#c0c0c0] justify-between">
              <div>
                {/* Title */}
                <div className="flex items-center gap-2 border-b border-gray-400 pb-2 mb-2.5">
                  <span className="text-2xl">📂</span>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-sm sm:text-base text-black truncate leading-tight">
                      {activeProject.name}
                    </h3>
                    <span className="text-[10px] text-blue-900 font-mono font-bold block">
                      [{activeProject.type}] // VERIFIED_CODEBASE
                    </span>
                  </div>
                </div>
                
                {/* Summary / Description */}
                <div className="win95-sunken bg-white p-2.5 sm:p-3 text-black text-xs leading-relaxed mb-3 min-h-[70px] sm:min-h-[85px]">
                  {activeProject.summary}
                </div>

                {/* Metrics & Highlights */}
                <div className="mb-2.5">
                  <h4 className="text-[10px] uppercase font-bold text-gray-700 mb-1">
                    Key Highlights &amp; Metrics:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {activeProject.metrics.map(metric => (
                      <span key={metric} className="win95-sunken bg-white px-2 py-0.5 text-[10px] text-black font-mono">
                        ✓ {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-3">
                  <h4 className="text-[10px] uppercase font-bold text-gray-700 mb-1">
                    Teknologi yang Dipakai:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {activeProject.tech.map(tech => (
                      <span key={tech} className="bg-[#dfdfdf] border border-gray-400 px-1.5 py-0.5 text-[10px] text-blue-950 font-bold font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto pt-2 border-t border-gray-400 flex flex-wrap sm:flex-nowrap gap-2">
                <a
                  href={`/projects/${activeProject.slug}`}
                  className="win95-btn font-bold text-xs w-full py-1.5 text-center no-underline text-black hover:bg-white flex items-center justify-center gap-1.5 shadow"
                >
                  <span>📄</span>
                  <span>Baca Studi Kasus Detail</span>
                </a>
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win95-btn font-bold text-xs w-full py-1.5 text-center no-underline text-black hover:bg-white flex items-center justify-center gap-1.5 shadow"
                >
                  <span>💻</span>
                  <span>Lihat di GitHub ↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </RetroWindow>
    </section>
  );
}
