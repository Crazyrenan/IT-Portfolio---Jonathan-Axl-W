import React from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

const EXPERIENCE = [
  {
    id: 'lkh',
    company: 'PT Lautan Kencana Hidup',
    role: 'Full-Stack Engineer (Intern)',
    date: '2026 - Sekarang',
    description: 'Ngebangun intranet SaaS enterprise dari nol dengan Two-Stage Inventory Management, modul Work Orders, dan audit trail anti-fraud dengan cryptographic hash-chaining SHA-256 untuk memastikan keabsahan transaksi logistik.',
    tags: ['Enterprise SaaS', 'FastAPI', 'PostgreSQL', 'React 18', 'Zustand', 'TanStack Query', 'SHA-256 Ledger']
  },
  {
    id: 'ieee',
    company: 'IEEE YESIST12 — Riset AI Medis',
    role: 'AI / Deep Learning Researcher',
    date: '2026',
    description: 'Riset komparatif deteksi Tuberkulosis medis menggunakan Vision Transformers (Swin-T & DeiT) vs Hybrid CNN. Berhasil mencapai akurasi & F1-Score 97.0%, 100% recall pada kelas healthy, dan dilengkapi peta visualisasi Grad-CAM untuk dokter.',
    tags: ['PyTorch', 'Vision Transformers', 'Swin Transformer', 'DeiT', 'Hybrid CNN', 'Grad-CAM', 'Medical AI']
  },
  {
    id: 'imip',
    company: 'PT Indonesia Morowali Industrial Park (IMIP)',
    role: 'Full-Stack Software Developer (Intern)',
    date: '2025 - 2026',
    description: 'Membangun arsitektur portal E-Recruitment korporat terpusat buat menangani ribuan pelamar kerja bersamaan, validasi berkas otomatis, arsitektur RBAC multi-level, dan fitur pencarian pelamar interaktif.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Livewire AI Search', 'SCSS', 'Bootstrap', 'RBAC Security']
  },
  {
    id: 'umn',
    company: 'Universitas Multimedia Nusantara',
    role: 'S1 Sistem Informasi (IPK 3.78 / 4.00)',
    date: '2022 - 2026',
    description: 'Mendalami rekayasa perangkat lunak skala besar, basis data terdistribusi, dan kecerdasan buatan terapan. Mengembangkan berbagai sistem terverifikasi seperti Intelligent IT Help Desk (reduksi 40% tiket duplikat), Telegram OCR Bot, dan Windbreaker AI.',
    tags: ['Akademik', 'IPK 3.78', 'Software Engineering', 'Applied AI', 'Data Architecture']
  }
];

export function RetroTimeline(props?: Partial<RetroWindowProps>) {
  return (
    <section className="w-full max-w-4xl mx-auto p-2 sm:p-4 mb-4">
      <RetroWindow 
        id="experience"
        title="C:\LOGS\Quest_Log.bat" 
        icon="https://win98icons.alexmeub.com/icons/png/notepad_file-2.png"
        hasMenu={true}
        {...props}
      >
        <div className="bg-white win95-sunken p-2.5 sm:p-4 max-h-[380px] sm:max-h-[440px] overflow-y-auto text-black text-xs font-mono leading-relaxed">
          <div className="text-gray-600 mb-3 pb-2 border-b border-gray-300 flex items-center justify-between text-[11px]">
            <span>[LOG RECORD] RIWAYAT_KARIER.LOG</span>
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
    </section>
  );
}
