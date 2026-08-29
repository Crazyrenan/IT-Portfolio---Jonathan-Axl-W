import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';

const PROJECTS = [
  {
    id: 'tb-detection-ai',
    name: 'IEEE YESIST12 TB Detection',
    type: 'File Folder',
    size: '97% Akurasi',
    metrics: ['Hybrid CNN', 'Grad-CAM', 'AI Research'],
    description: 'Proyek penelitian AI untuk deteksi Tuberculosis menggunakan arsitektur Swin-Transformer dan Hybrid CNN. Tervalidasi dengan akurasi klasifikasi 97% pada dataset medis klinis.',
    tech: ['PyTorch', 'Python', 'OpenCV'],
    link: '#'
  },
  {
    id: 'lkh-internal-platform',
    name: 'Portal Internal PT LKH',
    type: 'File Folder',
    size: 'Enterprise',
    metrics: ['RBAC', 'Web App', 'PostgreSQL'],
    description: 'Merancang dan membangun platform web internal perusahaan untuk mempermudah operasi bisnis, manajemen sumber daya, dan sistem akses berbasis peran (Role-Based Access Control).',
    tech: ['Laravel', 'PostgreSQL', 'React'],
    link: '#'
  },
  {
    id: 'imip-e-recruitment',
    name: 'IMIP E-Recruitment',
    type: 'File Folder',
    size: 'High Traffic',
    metrics: ['Centralized Arch', 'Scalable'],
    description: 'Mengembangkan arsitektur portal rekrutmen terpusat yang mampu menangani ribuan pelamar secara bersamaan dengan konkurensi tinggi dan infrastruktur server yang andal.',
    tech: ['Node.js', 'React', 'Docker'],
    link: '#'
  }
];

export function RetroProjectsDossier() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

  return (
    <section className="w-full max-w-4xl mx-auto p-4 mb-8">
      <RetroWindow title="Project_Explorer.exe" hasMenu={true}>
        <div className="flex flex-col md:flex-row min-h-[400px] gap-2">
          
          {/* Left / Top: Folder List */}
          <div className="w-full md:w-1/2 flex flex-col bg-white win95-sunken p-1 overflow-y-auto">
            <div className="flex border-b border-gray-400 pb-1 mb-1 text-xs text-gray-600 px-1">
              <div className="w-1/2 font-semibold">Name</div>
              <div className="w-1/4 font-semibold">Type</div>
              <div className="w-1/4 font-semibold">Details</div>
            </div>
            {PROJECTS.map(project => (
              <button
                key={project.id}
                onClick={() => setActiveId(project.id)}
                className={`flex text-left text-sm px-1 py-1 focus:outline-none ${
                  activeId === project.id ? 'bg-[#000080] text-white outline-dotted outline-1 outline-offset-[-1px]' : 'hover:bg-gray-200 text-black'
                }`}
              >
                <div className="w-1/2 flex items-center gap-2 truncate">
                  <span className="text-yellow-500">📁</span> {project.name}
                </div>
                <div className="w-1/4 truncate">{project.type}</div>
                <div className="w-1/4 truncate">{project.size}</div>
              </button>
            ))}
          </div>

          {/* Right / Bottom: File Details */}
          <div className="w-full md:w-1/2 bg-[#c0c0c0] flex flex-col p-2">
            <h2 className="font-bold text-lg text-black mb-2 flex items-center gap-2">
              <span className="text-2xl">📁</span> {activeProject.name}
            </h2>
            
            <div className="win95-sunken bg-white p-3 text-black text-sm leading-relaxed mb-4 min-h-[120px]">
              {activeProject.description}
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-700 mb-1">Tags & Metrics:</h4>
              <div className="flex flex-wrap gap-1">
                {activeProject.metrics.map(metric => (
                  <span key={metric} className="bg-gray-200 border border-gray-400 px-2 py-0.5 text-xs text-black">
                    {metric}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-700 mb-1">Tech Stack:</h4>
              <div className="flex flex-wrap gap-1">
                {activeProject.tech.map(tech => (
                  <span key={tech} className="bg-blue-100 border border-blue-300 px-2 py-0.5 text-xs text-blue-900">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex gap-2">
              <button className="win95-btn font-bold text-sm w-full py-1">
                Buka Proyek
              </button>
              <button className="win95-btn font-bold text-sm w-full py-1">
                Lihat Kode (GitHub)
              </button>
            </div>
          </div>

        </div>
      </RetroWindow>
    </section>
  );
}
