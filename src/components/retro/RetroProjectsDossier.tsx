import React, { useState } from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

const PROJECTS = [
  {
    id: 'tb-detection-ai',
    slug: 'tb-detection-comparative-study',
    name: 'IEEE YESIST12 TB Detection',
    type: 'AI Research',
    badge: '97% Accuracy',
    summary: 'Comparative clinical AI study on Tuberculosis detection evaluating Vision Transformers (Swin-T & DeiT) against Hybrid CNNs. Achieved 97.0% classification accuracy, augmented with Grad-CAM heatmaps for clinician interpretability.',
    metrics: ['Hybrid CNN', 'Grad-CAM', 'Medical AI'],
    tech: ['PyTorch', 'Python', 'OpenCV', 'Vision Transformers'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'lkh-internal-platform',
    slug: 'lkh-internal-platform',
    name: 'PT LKH Enterprise Platform',
    type: 'Enterprise SaaS',
    badge: 'Production',
    summary: 'Internal enterprise web application automating Work Order lifecycles, two-stage inventory staging, and cryptographic anti-fraud audit logs with SHA-256 hash chaining.',
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
    summary: 'High-throughput enterprise recruitment portal processing thousands of job applications with automated document verification, granular multi-tier RBAC, and responsive applicant search.',
    metrics: ['Thousands of Applicants', 'Multi-Tier RBAC', 'Live Search'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Livewire', 'Bootstrap'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'windbreaker-ai',
    slug: 'windbreaker-ai',
    name: 'Windbreaker AI Telemetry',
    type: 'ML Platform',
    badge: 'Predictive ML',
    summary: 'Real-time flight telemetry analytics platform powered by XGBoost delay prediction models, stateless JWT authentication, and interactive operational metrics.',
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
    summary: 'Automated document and receipt text extraction bot built on Tesseract OCR and OpenCV to expedite field operations and logistics data ingestion.',
    metrics: ['Automated Extraction', 'OCR Pipeline', 'Telegram API'],
    tech: ['Python', 'OpenCV', 'Tesseract OCR', 'Telegram Bot API'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'help-desk-ai',
    slug: 'help-desk-ai',
    name: 'Intelligent IT Help Desk',
    type: 'Internal Tool',
    badge: '-40% Duplicates',
    summary: 'AI-assisted IT ticketing management platform detecting duplicate problem reports with vector embeddings, reducing ticket backlog by 40%.',
    metrics: ['40% Duplicate Reduction', 'SLA Tracking', 'Role Management'],
    tech: ['Laravel', 'PostgreSQL', 'Tailwind CSS', 'Alpine.js'],
    githubUrl: 'https://github.com/crazyrenan'
  },
  {
    id: 'field-service-pro',
    slug: 'field-service-pro',
    name: 'Field Service Logistics Pro',
    type: 'Operations App',
    badge: 'Audit Trail',
    summary: 'Field technician fleet operations platform featuring real-time dispatch, spare parts inventory tracking, and verified digital servicing sign-offs.',
    metrics: ['Real-time Dispatch', 'Parts Tracking', 'Digital Reports'],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/crazyrenan'
  }
];

export function RetroProjectsDossier(props?: Partial<RetroWindowProps>) {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const activeProject = PROJECTS.find(p => p.id === activeId) || PROJECTS[0];

  return (
    <RetroWindow
      id="projects"
      title="C:\PROJECTS\Projects.exe"
      icon="/icons/retro/projects.svg"
      hasMenu={true}
      {...props}
    >
      <div className="bg-[#c0c0c0] p-1.5 sm:p-2 flex flex-col font-[Tahoma,sans-serif]">
        {/* Main 2-Column or Stack Area */}
        <div className="flex flex-col md:flex-row min-h-0 md:min-h-[410px] gap-2.5">
          
          {/* Left / Top: Folder & Project File List */}
          <div className="w-full md:w-5/12 flex flex-col bg-white win95-sunken p-1 overflow-y-auto max-h-[170px] sm:max-h-[220px] md:max-h-[410px]">
            <div className="flex border-b border-gray-400 pb-1 mb-1 text-[11px] text-gray-600 px-1 font-mono font-bold">
              <div className="w-7/12 truncate">Project Name</div>
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
                  Tech Stack:
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
                <span>Read Case Study</span>
              </a>
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn font-bold text-xs w-full py-1.5 text-center no-underline text-black hover:bg-white flex items-center justify-center gap-1.5 shadow"
              >
                <span>💻</span>
                <span>View on GitHub ↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </RetroWindow>
  );
}
