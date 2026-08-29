import React from 'react';
import { RetroWindow } from './RetroWindow';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    skills: ['React', 'Astro', 'TypeScript', 'Tailwind CSS']
  },
  {
    title: 'Backend',
    skills: ['Laravel', 'Node.js', 'Python', 'PHP']
  },
  {
    title: 'AI & Machine Learning',
    skills: ['PyTorch', 'Swin-Transformer', 'Computer Vision', 'AI Agents']
  },
  {
    title: 'Tools & Database',
    skills: ['PostgreSQL', 'MySQL', 'Docker', 'Git']
  }
];

export function RetroSkillsGrid() {
  return (
    <section className="w-full max-w-4xl mx-auto p-4 mb-8">
      <RetroWindow title="Skills_Viewer.exe" hasMenu={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="flex flex-col gap-2">
              <h3 className="font-bold text-black text-sm px-1">
                {category.title}
              </h3>
              <div className="win95-sunken p-2 bg-white flex flex-wrap gap-2 min-h-[80px]">
                {category.skills.map(skill => (
                  <span 
                    key={skill} 
                    className="border border-gray-400 bg-gray-100 text-black px-2 py-1 text-xs hover:bg-blue-600 hover:text-white cursor-default select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RetroWindow>
    </section>
  );
}
