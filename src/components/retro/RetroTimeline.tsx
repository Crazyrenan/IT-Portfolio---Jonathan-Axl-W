import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';

const EXPERIENCE = [
  {
    id: 'lkh',
    company: 'PT Lautan Kencana Hidup',
    role: 'Full-Stack Engineer',
    date: '2023 - Sekarang',
    description: 'Merancang arsitektur dan mengembangkan aplikasi web internal perusahaan tingkat enterprise dengan fokus pada keamanan (Role-Based Access Control) dan manajemen database PostgreSQL berskala besar.',
    tags: ['Enterprise', 'RBAC', 'PostgreSQL', 'Laravel', 'React']
  },
  {
    id: 'imip',
    company: 'Indonesia Morowali Industrial Park (IMIP)',
    role: 'Full-Stack Software Developer',
    date: '2022 - 2023',
    description: 'Membangun arsitektur portal E-Recruitment tersentralisasi yang mengelola ribuan pendaftar dengan konkurensi tinggi, serta mengembangkan RESTful API yang aman dan andal.',
    tags: ['Architecture', 'Recruitment', 'Node.js', 'React']
  },
  {
    id: 'ieee',
    company: 'IEEE YESIST12',
    role: 'AI Researcher',
    date: '2021 - 2022',
    description: 'Meneliti dan merancang model pendeteksi Tuberkulosis menggunakan arsitektur Swin-Transformer dan Hybrid CNN. Berhasil mencapai akurasi sebesar 97% dengan validasi visualisasi Grad-CAM.',
    tags: ['AI/ML', 'PyTorch', 'Swin-Transformer', 'Computer Vision']
  }
];

export function RetroTimeline() {
  return (
    <section className="w-full max-w-4xl mx-auto p-4 mb-8">
      <RetroWindow title="Experience_Log.txt - Notepad" hasMenu={true}>
        <div className="bg-white win95-sunken p-4 h-[400px] overflow-y-auto text-black text-sm font-[Verdana]">
          {EXPERIENCE.map((exp, index) => (
            <div key={exp.id} className="mb-6 border-b border-dashed border-gray-400 pb-4">
              <h3 className="font-bold text-lg mb-1">{exp.role}</h3>
              <h4 className="font-semibold text-blue-900 mb-1">{exp.company}</h4>
              <p className="text-gray-600 text-xs mb-3 italic">{exp.date}</p>
              
              <p className="leading-relaxed mb-3">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 border border-gray-400 px-2 py-0.5 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center text-gray-400 italic">*** End of File ***</div>
        </div>
      </RetroWindow>
    </section>
  );
}
