import React, { useState } from 'react';
import { CERTIFICATES_DATA, type CertificateItem } from '../../data/certificates';

export function RetroCertificateGallery() {
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [isDesktopMinimized, setIsDesktopMinimized] = useState(false);
  const [isDesktopClosed, setIsDesktopClosed] = useState(false);

  const handleOpenCertificate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderCertificateCards = () => (
    <div className="flex flex-col gap-2">
      {CERTIFICATES_DATA.map((cert: CertificateItem) => (
        <div
          key={cert.id}
          onClick={() => handleOpenCertificate(cert.credentialUrl)}
          className="win95-raised p-1.5 bg-[#dfdfdf] hover:bg-[#efefef] transition-colors cursor-pointer group flex flex-col gap-1 border border-gray-400 select-none"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpenCertificate(cert.credentialUrl);
            }
          }}
          title="Klik untuk buka sertifikat resolusi penuh di tab baru ↗"
        >
          {/* Certificate Thumbnail Preview (Compact) */}
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
            <div className="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="win95-btn text-[9px] font-bold px-1.5 py-0.5 shadow bg-white text-black">
                Buka Dokumen ↗
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
              <span className="text-sm">📜</span>
              <span className="truncate">Certs.vault ({CERTIFICATES_DATA.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsDesktopMinimized(!isDesktopMinimized)}
                className="win95-btn w-4 h-4 text-[10px] font-bold p-0 flex items-center justify-center leading-none text-black"
                title={isDesktopMinimized ? 'Buka Tab' : 'Minimalkan'}
                aria-label="Minimize or Restore Certificate Vault"
              >
                {isDesktopMinimized ? '□' : '_'}
              </button>
              <button
                type="button"
                onClick={() => setIsDesktopClosed(true)}
                className="win95-btn w-4 h-4 text-[10px] font-bold p-0 flex items-center justify-center leading-none text-black hover:text-red-700"
                title="Tutup"
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
                <span className="text-blue-900 font-bold">CLICK TO VIEW ↗</span>
              </div>

              {/* Scrollable Container (Compact max-height) */}
              <div className="max-h-[280px] overflow-y-auto win95-sunken bg-[#eaeaea] p-1.5">
                {renderCertificateCards()}
              </div>

              {/* Footer Summary */}
              <div className="pt-1 text-[8.5px] font-mono text-gray-700 flex justify-between px-0.5">
                <span>Total: {CERTIFICATES_DATA.length} File JPG</span>
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
            title="Buka kembali Certs Vault"
          >
            <span>📜</span>
            <span>Certs ({CERTIFICATES_DATA.length})</span>
          </button>
        </div>
      )}

      {/* ── 2. Mobile Floating Toggle Badge (Screens < 1024px) ── */}
      <div className="lg:hidden fixed bottom-14 right-3 z-40">
        <button
          type="button"
          onClick={() => setMobileModalOpen(true)}
          className="win95-btn px-2.5 py-1.5 flex items-center gap-1.5 font-bold text-xs shadow-xl border-2 border-black/40 bg-[#e8e8e8] active:bg-[#dfdfdf] text-black"
          aria-label="Buka Galeri Sertifikat"
        >
          <span className="text-sm">📜</span>
          <span>Sertifikat</span>
          <span className="w-4 h-4 rounded-full bg-[#000080] text-white text-[9.5px] flex items-center justify-center font-mono font-bold">
            {CERTIFICATES_DATA.length}
          </span>
        </button>
      </div>

      {/* ── 3. Mobile Compact Dialog / Modal (Not full screen!) ── */}
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
                <span className="text-sm">📜</span>
                <span className="truncate">Certs.vault ({CERTIFICATES_DATA.length})</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileModalOpen(false)}
                className="win95-btn w-5 h-5 text-xs font-bold p-0 flex items-center justify-center leading-none text-black hover:text-red-700"
                aria-label="Tutup Dialog Sertifikat"
              >
                ✕
              </button>
            </div>

            {/* Subheader */}
            <div className="bg-[#dfdfdf] win95-sunken px-1.5 py-1 mb-1.5 text-[10px] text-gray-800 font-[Tahoma] flex items-center justify-between">
              <span>Klik untuk buka file resolusi penuh</span>
              <span className="text-blue-900 font-bold font-mono">
                {CERTIFICATES_DATA.length} ITEM
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
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
