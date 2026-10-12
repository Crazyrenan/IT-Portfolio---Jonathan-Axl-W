import React, { useState, useEffect } from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';
import { CERTIFICATES_DATA, type CertificateItem } from '../../data/certificates';

export function RetroCertificateGallery(props?: Partial<RetroWindowProps>) {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  // Close preview popup with Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && selectedCert) {
        setSelectedCert(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  const handleSelectCertificate = (cert: CertificateItem) => {
    setSelectedCert(cert);
    setZoom(1);
  };

  return (
    <RetroWindow
      id="certificates"
      title="Licenses & Credentials — Certificate Vault"
      icon="/icons/retro/certs.svg"
      hasMenu={true}
      {...props}
    >
      <div className="flex flex-col h-full bg-[#ECE9D8] select-text">
        {/* Explorer Toolbar / Header */}
        <div className="bg-[#ECE9D8] border-b border-gray-300 p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold">Verified Credentials ({CERTIFICATES_DATA.length})</span>
            <span className="text-[11px] text-gray-500 hidden sm:inline">| Click any certificate to open viewer</span>
          </div>
          <div className="text-[11px] font-mono text-blue-900 bg-white/80 border border-gray-300 px-2 py-0.5 rounded self-start sm:self-auto">
            Official Certification Records
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="flex-1 overflow-y-auto p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-0">
          {CERTIFICATES_DATA.map((cert: CertificateItem) => (
            <div
              key={cert.id}
              onClick={() => handleSelectCertificate(cert)}
              className="win95-raised p-2 bg-[#dfdfdf] hover:bg-[#efefef] transition-colors cursor-pointer group flex flex-col gap-1.5 border border-gray-400 select-none rounded-[2px]"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelectCertificate(cert);
                }
              }}
              title={`Click to open ${cert.title} in Certificate Viewer`}
            >
              {/* Certificate Thumbnail Preview */}
              <div className="w-full h-28 win95-sunken bg-white overflow-hidden relative border border-gray-400 group-hover:border-blue-900">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
                <div className="absolute top-1 right-1 bg-black/80 text-[#FFEA00] text-[9px] font-mono px-1.5 py-0.5 border border-white/20 rounded-[2px]">
                  {cert.date}
                </div>
                <div className="absolute inset-0 bg-blue-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="win95-btn text-[10px] font-bold px-2 py-1 shadow bg-white text-black flex items-center gap-1">
                    <span>🔍</span>
                    <span>View Certificate</span>
                  </span>
                </div>
              </div>

              {/* Certificate Metadata */}
              <div className="flex flex-col">
                <h4 className="text-xs font-bold font-[Tahoma] text-black leading-snug group-hover:text-[#000080] line-clamp-1">
                  {cert.title}
                </h4>
                <span className="text-[10px] text-gray-700 font-mono truncate">
                  {cert.issuer}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mt-auto pt-1">
                {cert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] bg-white border border-gray-400 px-1 py-0.5 text-gray-800 font-mono truncate"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* In-OS Certificate Viewer Popup */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/60 backdrop-blur-[2px]"
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate Viewer - ${selectedCert.title}`}
          >
            <div
              className="win95-window w-full max-w-xl max-h-[90vh] flex flex-col font-mono text-black text-xs shadow-2xl relative border-2 border-white bg-[#c0c0c0] animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Titlebar */}
              <div className="win95-titlebar-active p-1.5 flex items-center justify-between select-none flex-shrink-0">
                <div className="flex items-center gap-2 font-bold text-xs text-white truncate pr-2">
                  <img src="/icons/retro/certs.svg" alt="Certificate" className="w-4 h-4 object-contain" />
                  <span className="truncate">Certificate Viewer - {selectedCert.title}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="win95-btn font-bold text-xs flex items-center justify-center w-5 h-5 p-0 text-black hover:text-red-700"
                    title="Close Certificate Viewer (Esc)"
                    aria-label="Close Certificate Viewer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Classic Menu Bar */}
              <div className="flex gap-3 px-2 py-0.5 text-xs bg-[#c0c0c0] border-b border-gray-400 select-none text-black flex-shrink-0">
                <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">F<span className="underline">i</span>le</span>
                <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">V<span className="underline">i</span>ew</span>
                <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">Z<span className="underline">o</span>om</span>
                <span className="cursor-pointer hover:bg-[#000080] hover:text-white px-1">H<span className="underline">e</span>lp</span>
              </div>

              {/* Toolbar: Zoom Controls & External Open */}
              <div className="flex flex-wrap items-center justify-between gap-1 p-1 bg-[#dfdfdf] border-b border-gray-400 text-xs flex-shrink-0">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoom(prev => Math.min(prev + 0.25, 2.5))}
                    className="win95-btn px-2 py-0.5 text-[11px] font-bold text-black"
                    title="Zoom In"
                  >
                    🔍+ Zoom
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.75))}
                    className="win95-btn px-2 py-0.5 text-[11px] font-bold text-black"
                    title="Zoom Out"
                  >
                    🔍-
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="win95-btn px-2 py-0.5 text-[11px] text-black"
                    title="Reset 100%"
                  >
                    100%
                  </button>
                  <span className="text-[10px] text-gray-700 font-mono ml-1 hidden xs:inline">
                    ({Math.round(zoom * 100)}%)
                  </span>
                </div>

                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win95-btn px-2 py-0.5 text-[11px] font-bold text-blue-900 no-underline hover:text-blue-700 flex items-center gap-1"
                  title="Open raw image file in new tab"
                >
                  <span>↗ Open Raw File</span>
                </a>
              </div>

              {/* Image Canvas Viewport */}
              <div className="flex-1 bg-[#404040] win95-sunken p-2 overflow-auto flex items-center justify-center min-h-[200px] max-h-[46vh]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  className="max-w-full max-h-[42vh] object-contain shadow-2xl border border-black/40 transition-transform duration-150"
                />
              </div>

              {/* Details & Metadata Footer Pane */}
              <div className="p-2 sm:p-2.5 bg-[#dfdfdf] border-t border-gray-400 flex flex-col gap-1.5 font-sans flex-shrink-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-xs sm:text-sm text-black leading-tight truncate">
                      {selectedCert.title}
                    </h3>
                    <div className="text-[10.5px] text-blue-900 font-semibold font-mono truncate">
                      {selectedCert.issuer} • Issued {selectedCert.date}
                    </div>
                  </div>
                  <span className="win95-sunken bg-white px-2 py-0.5 text-[10px] text-gray-800 font-mono flex-shrink-0">
                    {selectedCert.category}
                  </span>
                </div>

                <p className="text-[11px] text-gray-800 leading-snug line-clamp-2">
                  {selectedCert.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-white border border-gray-400 px-1.5 py-0.5 text-[9.5px] font-mono text-gray-800"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    className="win95-btn font-bold text-xs px-4 py-1 text-black bg-[#c0c0c0] hover:bg-white ml-auto shadow"
                  >
                    OK / Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RetroWindow>
  );
}
