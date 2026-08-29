import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';

export function RetroTerminal() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nEmail Kontak: ${formData.email}`);
    window.location.href = `mailto:axlwibowo@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-4 mb-16">
      <RetroWindow title="Contact_Form.exe" hasMenu={true}>
        <div className="flex flex-col md:flex-row gap-6 p-2 bg-[#c0c0c0]">
          
          {/* Left: Input Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">Nama Anda:</label>
              <input 
                type="text" 
                name="name" 
                required
                value={formData.name}
                onChange={handleChange}
                className="win95-sunken p-1 text-black outline-none" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-black">Email Anda:</label>
              <input 
                type="email" 
                name="email" 
                required
                value={formData.email}
                onChange={handleChange}
                className="win95-sunken p-1 text-black outline-none" 
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm text-black">Pesan:</label>
              <textarea 
                name="message" 
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="win95-sunken p-1 text-black outline-none resize-none h-full" 
              ></textarea>
            </div>

            <button type="submit" className="win95-btn font-bold text-sm py-2 mt-2">
              Kirim Pesan
            </button>
          </form>

          {/* Right: Direct Channels */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <fieldset className="border border-gray-400 p-3 flex flex-col gap-3">
              <legend className="text-sm text-black px-1">Tautan Langsung</legend>
              
              <a href="mailto:axlwibowo@gmail.com" className="text-sm text-blue-900 underline hover:text-blue-600 flex items-center gap-2">
                <span>📧</span> axlwibowo@gmail.com
              </a>
              
              <a href="https://github.com/Crazyrenan" target="_blank" rel="noreferrer" className="text-sm text-blue-900 underline hover:text-blue-600 flex items-center gap-2">
                <span>💻</span> github.com/Crazyrenan
              </a>

              <a href="https://linkedin.com/in/jonathan-axl-w" target="_blank" rel="noreferrer" className="text-sm text-blue-900 underline hover:text-blue-600 flex items-center gap-2">
                <span>💼</span> in/jonathan-axl-w
              </a>
            </fieldset>
            
            <div className="win95-sunken bg-white p-2 text-xs text-gray-700 h-full">
              Silakan hubungi saya untuk peluang kerja, proyek kolaborasi, atau sekadar berdiskusi mengenai teknologi web dan AI.
            </div>
          </div>

        </div>
      </RetroWindow>
    </section>
  );
}
