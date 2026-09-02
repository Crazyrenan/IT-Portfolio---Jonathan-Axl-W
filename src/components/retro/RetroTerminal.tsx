import React, { useState } from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

export function RetroTerminal(props?: Partial<RetroWindowProps>) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SubmitEvent | React.SyntheticEvent) => {
    e.preventDefault();
    const subjectEncoded = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const bodyEncoded = encodeURIComponent(
      `Nama Pengirim: ${formData.name}\nEmail Kontak: ${formData.email}\n\nPesan:\n${formData.message}`
    );
    window.location.href = `mailto:vinny.jonathan.axl@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-2 sm:p-4 mb-16">
      <RetroWindow
        id="contact"
        title="C:\COMM\Contact.exe"
        icon="https://win98icons.alexmeub.com/icons/png/envelope_closed-0.png"
        hasMenu={true}
        {...props}
      >
        <div className="flex flex-col md:flex-row gap-4 p-2 bg-[#c0c0c0] font-[Tahoma,sans-serif] text-black text-xs">

          {/* Left: Input Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-black text-xs">Nama Lengkap (Sender):</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Anda"
                className="win95-sunken px-2 py-1 text-black outline-none text-xs bg-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-black text-xs">Alamat Email (Reply-To):</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="email@domain.com"
                className="win95-sunken px-2 py-1 text-black outline-none text-xs bg-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-black text-xs">Subjek Pesan:</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Peluang Kerja / Kolaborasi Riset"
                className="win95-sunken px-2 py-1 text-black outline-none text-xs bg-white"
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="font-bold text-black text-xs">Isi Pesan:</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tuliskan pesan atau detail penawaran kerja Anda di sini..."
                className="win95-sunken p-2 text-black outline-none resize-y text-xs bg-white min-h-[90px]"
              ></textarea>
            </div>

            <div className="flex gap-2 pt-1">
              <button type="submit" className="win95-btn font-bold text-xs px-4 py-1.5 active:bg-[#a0a0a0]">
                ✉️ Kirim Pesan (SEND_MAIL)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                className="win95-btn text-xs px-3 py-1.5"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Right: Official Channels Sidebar */}
          <div className="w-full md:w-[280px] flex flex-col gap-3">
            <fieldset className="win95-raised p-3 flex flex-col gap-2.5 bg-[#dfdfdf] border border-gray-400">
              <legend className="text-xs font-bold text-black px-1">
                Official Channels &amp; Links
              </legend>

              {/* Gmail Channel */}
              <a
                href="mailto:vinny.jonathan.axl@gmail.com"
                className="win95-btn flex items-center gap-2.5 p-1.5 text-xs text-black no-underline hover:bg-white"
              >
                <div className="w-6 h-6 win95-sunken bg-white p-0.5 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/icons/gmail.svg"
                    alt="Gmail"
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-[11px] text-[#EA4335]">Gmail Official</div>
                  <div className="text-[10px] text-gray-700 truncate">jonathan.axl@gmail.com</div>
                </div>
              </a>

              {/* LinkedIn Channel */}
              <a
                href="https://linkedin.com/in/jonathan-axl-wibowo"
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn flex items-center gap-2.5 p-1.5 text-xs text-black no-underline hover:bg-white"
              >
                <div className="w-6 h-6 win95-sunken bg-white p-0.5 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-[11px] text-[#0A66C2]">LinkedIn Profile</div>
                  <div className="text-[10px] text-gray-700 truncate">in/jonathan-axl-wibowo</div>
                </div>
              </a>

              {/* GitHub Channel */}
              <a
                href="https://github.com/crazyrenan"
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn flex items-center gap-2.5 p-1.5 text-xs text-black no-underline hover:bg-white"
              >
                <div className="w-6 h-6 win95-sunken bg-white p-0.5 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/icons/github.svg"
                    alt="GitHub"
                    className="w-4 h-4 object-contain"
                  />
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-[11px] text-[#181717]">GitHub Repository</div>
                  <div className="text-[10px] text-gray-700 truncate">github.com/crazyrenan</div>
                </div>
              </a>
            </fieldset>

            <div className="win95-sunken bg-white p-2.5 text-[11px] text-gray-800 leading-snug flex-1">
              <span className="font-bold text-[#000080] block mb-1">Direct Communication Port:</span>
              Terbuka untuk peluang kerja full-time, kontrak rekayasa perangkat lunak, maupun kolaborasi penelitian kecerdasan buatan terapan.
            </div>
          </div>

        </div>
      </RetroWindow>
    </section>
  );
}
