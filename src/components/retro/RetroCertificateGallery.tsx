import React, { useState, useEffect } from 'react';
import { CERTIFICATES_DATA, type CertificateItem } from '../../data/certificates';

export function RetroCertificateGallery() {
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [isDesktopMinimized, setIsDesktopMinimized] = useState(false);
  const [isDesktopClosed, setIsDesktopClosed] = useState(false);
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

  const renderCertificateCards = () => (
    <div className="flex flex-col gap-2">
      {CERTIFICATES_DATA.map((cert: CertificateItem) => (
        <div
          key={cert.id}
          onClick={() => handleSelectCertificate(cert)}
          className="win95-raised p-1.5 bg-[#dfdfdf] hover:bg-[#efefef] transition-colors cursor-pointer group flex flex-col gap-1 border border-gray-400 select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleSelectCertificate(cert);
            }
          }}
          title={`Click to open ${cert.title} in Certificate Viewer popup`}
        >
          {/* Certificate Thumbnail Preview */}
          <div className="w-full h-16 win95-sunken bg-white overflow-hidden relative border border-gray-400 group-hover:border-blue-900">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
            <div className="absolute top-0.5 right-0.5 bg-black/80 text-[#FFEA00] text-[8.5px] font-mono px-1 py-0.2 border border-white/20">
              {cert.date}
            </div>
            <div className="absolute inset-0 bg-blue-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="win95-btn text-[9px] font-bold px-1.5 py-0.5 shadow bg-white text-black flex items-center gap-1">
                <span>🔍</span>
                <span>Open Preview</span>
              </span>
            </div>
          </div>

          {/* Certificate Metadata */}
          <div className="flex flex-col">
            <h4 className="text-[11px] font-bold font-[Tahoma] text-black leading-snug group-hover:text-[#000080] line-clamp-1">
              {cert.title}
            </h4>
            <span className="text-[9.5px] text-gray-700 font-mono truncate">
              {cert.issuer}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-0.5">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[8.5px] bg-white border border-gray-400 px-1 py-0.2 text-gray-800 font-mono truncate"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ── 1. Desktop Compact Window (Screens >= 1024px) ── */}
      {!isDesktopClosed && (
        <aside
          aria-label="Certificate Vault"
          className="fixed right-6 top-6 z-30 hidden lg:flex flex-col win95-raised shadow-xl border-2 border-white w-64 max-h-[380px] transition-all duration-200"
        >
          {/* Titlebar */}
          <div className="win95-titlebar-active px-2 py-1 flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5 font-bold text-xs text-white truncate">
              <img src="/icons/retro/certs.svg" alt="Certs" className="w-4 h-4 object-contain" />
              <span className="truncate">Certificates Vault ({CERTIFICATES_DATA.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsDesktopMinimized(!isDesktopMinimized)}
                className="win95-btn w-4 h-4 text-[10px] font-bold p-0 flex items-center justify-center leading-none text-black"
                title={isDesktopMinimized ? 'Restore Tab' : 'Minimize'}
                aria-label="Minimize or Restore Certificate Vault"
              >
                {isDesktopMinimized ? '□' : '_'}
              </button>
              <button
                type="button"
                onClick={() => setIsDesktopClosed(true)}
                className="win95-btn w-4 h-4 text-[10px] font-bold p-0 flex items-center justify-center leading-none text-black hover:text-red-700"
                title="Close"
                aria-label="Close Certificate Vault"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content Area (Hidden when minimized) */}
          {!isDesktopMinimized && (
            <div className="flex flex-col p-1.5 bg-[#c0c0c0] overflow-hidden">
              {/* Info Subheader */}
              <div className="bg-[#dfdfdf] win95-sunken px-1.5 py-0.5 mb-1.5 text-[9.5px] text-gray-800 font-mono flex items-center justify-between">
                <span>VERIFIED ({CERTIFICATES_DATA.length})</span>
                <span className="text-blue-900 font-bold">CLICK TO PREVIEW 🔍</span>
              </div>

              {/* Scrollable Container (Compact max-height) */}
              <div className="max-h-[280px] overflow-y-auto win95-sunken bg-[#eaeaea] p-1.5">
                {renderCertificateCards()}
              </div>

              {/* Footer Summary */}
              <div className="pt-1 text-[8.5px] font-mono text-gray-700 flex justify-between px-0.5">
                <span>Total: {CERTIFICATES_DATA.length} Credentials</span>
                <span className="text-green-800 font-bold">● READY</span>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* Desktop Restore Toggle if user closed it */}
      {isDesktopClosed && (
        <div className="fixed right-6 top-6 z-30 hidden lg:block">
          <button
            type="button"
            onClick={() => {
              setIsDesktopClosed(false);
              setIsDesktopMinimized(false);
            }}
            className="win95-btn px-2.5 py-1 text-xs font-bold flex items-center gap-1.5 shadow-lg text-black bg-[#dfdfdf]"
            title="Restore Certificate Vault"
          >
            <img src="/icons/retro/certs.svg" alt="Certs" className="w-4 h-4 object-contain" />
            <span>Certificates ({CERTIFICATES_DATA.length})</span>
          </button>
        </div>
      )}

      {/* ── 2. Mobile Floating Toggle Badge (Screens < 1024px) ── */}
      <div className="lg:hidden fixed bottom-14 right-3 z-40">
        <button
          type="button"
          onClick={() => setMobileModalOpen(true)}
          className="win95-btn px-2.5 py-1.5 flex items-center gap-1.5 font-bold text-xs shadow-xl border-2 border-black/40 bg-[#e8e8e8] active:bg-[#dfdfdf] text-black"
          aria-label="Open Certificate Vault"
        >
          <img src="/icons/retro/certs.svg" alt="Certs" className="w-4 h-4 object-contain" />
          <span>Certificates</span>
          <span className="w-4 h-4 rounded-full bg-[#000080] text-white text-[9.5px] flex items-center justify-center font-mono font-bold">
            {CERTIFICATES_DATA.length}
          </span>
        </button>
      </div>

      {/* ── 3. Mobile Compact Dialog / Modal (Drawer) ── */}
      {mobileModalOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs"
          onClick={() => setMobileModalOpen(false)}
        >
          <div
            className="w-full max-w-[320px] max-h-[75vh] win95-raised flex flex-col p-1.5 shadow-2xl border-2 border-white animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Titlebar */}
            <div className="win95-titlebar-active px-2 py-1 flex items-center justify-between select-none mb-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-white truncate">
                <img src="/icons/retro/certs.svg" alt="Certs" className="w-4 h-4 object-contain" />
                <span className="truncate">Certificates Vault ({CERTIFICATES_DATA.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                className="win95-btn w-5 h-5 text-xs font-bold p-0 flex items-center justify-center leading-none text-black hover:text-red-700"
                aria-label="Close Certificate Dialog"
              >
                ✕
              </button>
            </div>

            {/* Subheader */}
            <div className="bg-[#dfdfdf] win95-sunken px-1.5 py-1 mb-1.5 text-[10px] text-gray-800 font-[Tahoma] flex items-center justify-between">
              <span>Click any item to preview</span>
              <span className="text-blue-900 font-bold font-mono">
                {CERTIFICATES_DATA.length} ITEMS
              </span>
            </div>

            {/* Scrollable Mini-Cards Container */}
            <div className="flex-1 max-h-[50vh] overflow-y-auto win95-sunken bg-[#eaeaea] p-1.5">
              {renderCertificateCards()}
            </div>

            {/* Modal Footer Close Button */}
            <div className="mt-1.5 pt-1 border-t border-gray-400 flex justify-end">
              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                className="win95-btn font-bold text-xs px-3 py-1 w-full text-black"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. In-OS Certificate Viewer Popup Window ── */}
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
    </>
  );
}
