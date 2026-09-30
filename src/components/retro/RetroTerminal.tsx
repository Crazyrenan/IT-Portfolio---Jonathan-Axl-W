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
      `Sender Name: ${formData.name}\nContact Email: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:vinny.jonathan.axl@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  return (
    <RetroWindow
      id="contact"
      title="Contact Transmission"
      icon="/icons/retro/contact.svg"
      hasMenu={true}
      {...props}
    >
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4 p-2 sm:p-2.5 bg-[#c0c0c0] font-[Tahoma,sans-serif] text-black text-xs h-full flex-1 min-h-0">

        {/* Left: Input Form (Full-height responsive) */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2.5 h-full min-h-0">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-black text-xs">Your Name:</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex / Engineering Lead"
              className="win95-sunken px-2 py-1.5 text-black outline-none text-xs bg-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-black text-xs">Your Email:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="win95-sunken px-2 py-1.5 text-black outline-none text-xs bg-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-black text-xs">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Job Opportunity / AI Research / Web Project"
              className="win95-sunken px-2 py-1.5 text-black outline-none text-xs bg-white"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-h-0">
            <label className="font-bold text-black text-xs">Message:</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here — whether it is an engineering opportunity, consulting project, or tech chat..."
              className="win95-sunken p-2 text-black outline-none resize-y text-xs bg-white min-h-[90px] flex-1"
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button type="submit" className="win95-btn font-bold text-xs px-4 py-1.5 active:bg-[#a0a0a0] flex items-center gap-1.5 text-black hover:bg-white shadow">
              <span>✉️</span>
              <span>Send Direct Email</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
              className="win95-btn text-xs px-3 py-1.5 text-black hover:bg-white shadow"
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Right: Official Channels Sidebar */}
        <div className="w-full md:w-[280px] flex flex-col gap-2.5">
          <fieldset className="win95-raised p-2.5 sm:p-3 flex flex-col gap-2 bg-[#dfdfdf] border border-gray-400">
            <legend className="text-xs font-bold text-black px-1">
              Official Channels &amp; Profiles
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
                <div className="font-bold text-[11px] text-[#EA4335]">Email (Gmail)</div>
                <div className="text-[10px] text-gray-700 truncate">vinny.jonathan.axl@gmail.com</div>
              </div>
            </a>

            {/* LinkedIn Channel */}
            <a
              href="https://www.linkedin.com/in/jonathan-axl"
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
                <div className="text-[10px] text-gray-700 truncate">in/jonathan-axl</div>
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
            <span className="font-bold text-[#000080] block mb-1">Open for Opportunities:</span>
            I am actively open to full-time software engineering roles, enterprise consulting, and applied deep learning research collaborations. Feel free to reach out!
          </div>
        </div>

      </div>
    </RetroWindow>
  );
}
