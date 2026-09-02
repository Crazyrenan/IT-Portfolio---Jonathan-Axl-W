import React from 'react';
import { RetroWindow } from './RetroWindow';

const EXPERIENCE = [
  {
    id: 'lkh',
    company: 'PT Lautan Kencana Hidup',
    role: 'Full-Stack Engineer (Intern)',
    date: '2026 - Sekarang',
    description: 'Merancang arsitektur dan mengembangkan aplikasi web internal perusahaan tingkat enterprise (Intranet SaaS) dengan Two-Stage Inventory Management, modul Work Orders, dan audit trail anti-fraud Cryptographic Blockchain Ledger (SHA-256 hash-chaining).',
    tags: ['Enterprise SaaS', 'FastAPI', 'PostgreSQL', 'React 18', 'Zustand', 'TanStack Query v5', 'SHA-256 Ledger']
  },
  {
    id: 'ieee',
    company: 'IEEE YESIST12 — Riset AI Medis',
    role: 'AI / Deep Learning Researcher',
    date: '2026',
    description: 'Meneliti dan merancang model pendeteksi Tuberkulosis komparatif antara Hybrid CNN (DenseNet–EfficientNetV2-B3) vs Vision Transformers (Swin & DeiT). Berhasil mencapai akurasi & F1-Score 97.0%, 100% Recall pada kelas Healthy, serta interpretabilitas klinis Grad-CAM.',
    tags: ['PyTorch', 'Vision Transformers', 'Swin Transformer', 'DeiT', 'Hybrid CNN', 'Grad-CAM', 'Computer Vision']
  },
  {
    id: 'imip',
    company: 'PT Indonesia Morowali Industrial Park (IMIP)',
    role: 'Full-Stack Software Developer (Intern)',
    date: '2025 - 2026',
    description: 'Membangun arsitektur portal E-Recruitment korporat tersentralisasi untuk menangani ribuan pelamar dengan validasi berkas massal, arsitektur Role-Based Access Control (RBAC), konversi desain Figma ke Laravel Blade/SCSS, dan modul pencarian cerdas AI Search Livewire.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Livewire AI Search', 'SCSS', 'Bootstrap', 'Figma', 'RBAC']
  },
  {
    id: 'umn',
    company: 'Universitas Multimedia Nusantara',
    role: 'S1 Sistem Informasi (IPK 3.78 / 4.00)',
    date: '2022 - 2026',
    description: 'Mendalami rekayasa perangkat lunak skala besar, basis data terdistribusi, dan kecerdasan buatan terapan. Mengembangkan multiple sistem terverifikasi termasuk Intelligent IT Help Desk (reduksi 40% tiket duplikat), Telegram OCR Bot, dan Windbreaker AI.',
    tags: ['Akademik', 'IPK 3.78', 'Software Engineering', 'Applied AI', 'Data Architecture']
  }
];

export function RetroTimeline() {
  return (
    <section className="w-full max-w-4xl mx-auto p-4 mb-8">
      <RetroWindow title="Experience_Log.txt - Notepad" hasMenu={true}>
        <div className="bg-white win95-sunken p-4 h-[400px] overflow-y-auto text-black text-xs font-mono leading-relaxed">
          <div className="text-gray-500 mb-4 pb-2 border-b border-gray-300">
            [SYSTEM LOG] C:\LOGS\CAREER_HISTORY.LOG — READ ONLY (4 RECORDS FOUND)
          </div>

          {EXPERIENCE.map((exp) => (
            <div key={exp.id} className="mb-6 border-b border-dashed border-gray-400 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-bold text-sm text-[#000080]">{exp.role}</h3>
                <span className="text-gray-600 text-[11px] font-bold bg-[#dfdfdf] px-1.5 py-0.5 border border-gray-400 w-fit">
                  {exp.date}
                </span>
              </div>

              <h4 className="font-bold text-gray-800 text-xs mb-2">
                🏢 {exp.company}
              </h4>

              <p className="text-gray-800 text-xs mb-3 leading-relaxed font-sans">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {exp.tags.map(tag => (
                  <span key={tag} className="win95-btn px-1.5 py-0.5 text-[10px] text-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center text-gray-500 italic text-[11px] pt-2">
            *** END OF LOG ARCHIVE ***
          </div>
        </div>
      </RetroWindow>
    </section>
  );
}
