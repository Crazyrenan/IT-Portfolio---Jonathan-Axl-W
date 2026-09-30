import React, { useState } from 'react';
import { RetroWindow, type RetroWindowProps } from './RetroWindow';

// ── 1. PERSONA 5 ROYAL EASTER EGG ──────────────────────────────────────────
export function Persona5Window(props?: Partial<RetroWindowProps>) {
  const [showCallingCard, setShowCallingCard] = useState(false);
  const [allOutAttack, setAllOutAttack] = useState(false);

  return (
    <RetroWindow
      id="p5r"
      title="Persona 5 Royal"
      icon="/icons/retro/persona5.png"
      hasMenu={true}
      {...props}
    >
      <div className="bg-[#121212] text-white p-3 font-mono text-xs select-none h-full flex-1 min-h-0 flex flex-col gap-3 border border-red-600 overflow-y-auto">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#D91424] via-[#8B0000] to-black p-2 flex items-center justify-between border-b-2 border-yellow-400 shadow flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-black text-yellow-400 font-black px-1.5 py-0.5 text-xs tracking-wider transform -skew-x-12 border border-white">
              P5R
            </span>
            <span className="font-extrabold tracking-widest text-xs uppercase text-white drop-shadow">
              Take Your Heart // Phantom Thieves
            </span>
          </div>
          <span className="text-[10px] text-yellow-300 font-bold hidden sm:inline">
            CODENAME: JOKER
          </span>
        </div>

        {/* Calling Card Alert Box */}
        {showCallingCard ? (
          <div className="bg-[#D91424] text-black p-3 rounded-none border-2 border-black transform -rotate-1 shadow-2xl animate-pulse flex-shrink-0">
            <div className="bg-black text-white px-2 py-0.5 font-black text-xs inline-block mb-1">
              OFFICIAL CALLING CARD
            </div>
            <p className="font-bold text-xs leading-relaxed text-black bg-white p-2 border border-black font-sans">
              &quot;Sir / Madam Recruiter — We know of your desire to find an elite Full-Stack Software Engineer with proven Deep Learning expertise. Today, Jonathan Axl will steal your attention with bulletproof code, SHA-256 ledgers, and Swin-Transformer precision.&quot;
            </p>
            <div className="mt-2 text-right font-black text-xs text-white">
              — FROM THE PHANTOM THIEVES OF TECH
            </div>
          </div>
        ) : (
          <div className="bg-[#1c1c1c] border border-gray-700 p-2.5 flex items-center justify-between flex-shrink-0">
            <div>
              <span className="text-yellow-400 font-bold">Infiltration Status: </span>
              <span className="text-green-400">Security Level 0% (Clear to Recruit)</span>
            </div>
            <button
              type="button"
              onClick={() => setShowCallingCard(true)}
              className="win95-btn bg-[#D91424] text-white font-bold text-[11px] px-2.5 py-1 hover:bg-red-700 active:bg-black"
            >
              ✉️ View Calling Card
            </button>
          </div>
        )}

        {/* Character & Confidant Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-h-0">
          {/* Left: Persona Stats */}
          <div className="bg-[#1a1a1a] p-2.5 border border-red-900/60 flex flex-col gap-1.5 overflow-y-auto">
            <div className="text-yellow-400 font-bold border-b border-gray-700 pb-1 flex justify-between flex-shrink-0">
              <span>PERSONA: SATANAEL &amp; RAOUL</span>
              <span className="text-red-400">LV. 99</span>
            </div>
            <div className="text-[11px] flex justify-between text-gray-300">
              <span>ST (Backend Mastery):</span>
              <span className="text-yellow-300 font-bold">99 [FastAPI / PostgreSQL]</span>
            </div>
            <div className="text-[11px] flex justify-between text-gray-300">
              <span>MA (Vision Transformers):</span>
              <span className="text-yellow-300 font-bold">99 [97% Acc / Swin-T]</span>
            </div>
            <div className="text-[11px] flex justify-between text-gray-300">
              <span>EN (System Architecture):</span>
              <span className="text-yellow-300 font-bold">99 [Zero-Downtime]</span>
            </div>
            <div className="text-[11px] flex justify-between text-gray-300">
              <span>AG (Frontend Velocity):</span>
              <span className="text-yellow-300 font-bold">99 [React 18 / Zustand]</span>
            </div>
            <div className="text-[11px] flex justify-between text-gray-300">
              <span>LU (Bug-Free Deployments):</span>
              <span className="text-yellow-300 font-bold">95 [SHA-256 Ledger]</span>
            </div>
          </div>

          {/* Right: Equipped Battle Skills */}
          <div className="bg-[#1a1a1a] p-2.5 border border-red-900/60 flex flex-col gap-1.5 overflow-y-auto">
            <div className="text-yellow-400 font-bold border-b border-gray-700 pb-1 flex-shrink-0">
              <span>ACTIVE SKILL DECK</span>
            </div>
            <div className="text-[10.5px] text-gray-300">
              ⚡ <b className="text-white">Sinful Shell:</b> Enterprise ERP with SHA-256 cryptographic chain.
            </div>
            <div className="text-[10.5px] text-gray-300">
              🔥 <b className="text-white">Megidolaon:</b> IEEE TB classification with Grad-CAM heatmaps.
            </div>
            <div className="text-[10.5px] text-gray-300">
              🌀 <b className="text-white">Concentrate:</b> High-throughput applicant portal with Livewire &amp; RBAC.
            </div>
            <div className="text-[10.5px] text-gray-300">
              ✨ <b className="text-white">Salvation:</b> Instant debugging &amp; robust end-to-end tests.
            </div>
          </div>
        </div>

        {/* All-Out Attack Splash Action */}
        <div className="mt-auto pt-2 border-t border-gray-800 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
          {allOutAttack ? (
            <div className="bg-black border border-yellow-400 text-yellow-300 p-2 text-xs font-bold w-full text-center tracking-wider animate-bounce">
              💥 &quot;THE SHOW&apos;S OVER! BUG CRUSHED IN 0.04 SECONDS!&quot;
            </div>
          ) : (
            <span className="text-[10px] text-gray-400">
              Easter egg unlocked: Persona 5 Royal fan &amp; JRPG enthusiast.
            </span>
          )}

          <div className="flex gap-2 ml-auto">
            {showCallingCard && (
              <button
                type="button"
                onClick={() => setShowCallingCard(false)}
                className="win95-btn text-[11px] px-2 py-1 text-black bg-[#c0c0c0]"
              >
                Hide Card
              </button>
            )}
            <button
              type="button"
              onClick={() => setAllOutAttack(!allOutAttack)}
              className="win95-btn bg-[#c0c0c0] text-black font-bold text-[11px] px-3 py-1 hover:bg-white"
            >
              {allOutAttack ? 'Reset Finisher' : '⚡ Trigger All-Out Attack'}
            </button>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
}

// ── 2. APEX LEGENDS EASTER EGG ─────────────────────────────────────────────
export function ApexLegendsWindow(props?: Partial<RetroWindowProps>) {
  const [lootResult, setLootResult] = useState<string | null>(null);

  const lootTable = [
    '🏆 [GOLD BODY SHIELD] Fast Heal: Automated unit tests finish in under 3 seconds!',
    '🔴 [RED EVO SHIELD] Max Durability: Enterprise ERP handled 10,000+ simultaneous ledger operations.',
    '⚡ [KRABER .50-CAL SNIPER] One-Shot Precision: Swin-Transformer achieved 100% recall on medical diagnosis benchmark.',
    '🟣 [GOLD DIGITAL THREAT] Thermal Scope: Zero async state bugs survive into production.',
    '🚀 [PHOENIX KIT] 100% Recovery: System restores instantaneously with Docker container orchestration.'
  ];

  const handleOpenBin = () => {
    const randomIndex = Math.floor(Math.random() * lootTable.length);
    setLootResult(lootTable[randomIndex]);
  };

  return (
    <RetroWindow
      id="apex"
      title="Apex Legends"
      icon="/icons/retro/apex.png"
      hasMenu={true}
      {...props}
    >
      <div className="bg-[#1f2421] text-[#f4f4f2] p-3 font-mono text-xs select-none h-full flex-1 min-h-0 flex flex-col gap-3 border border-[#E63946] overflow-y-auto">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#E63946] to-[#457B9D] p-2 flex items-center justify-between border-b-2 border-white text-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-black text-red-500 font-bold px-1.5 py-0.5 text-xs">
              CHAMPION
            </span>
            <span className="font-extrabold tracking-wider text-xs uppercase">
              You Are The Champion // Squad Survived
            </span>
          </div>
          <span className="text-[10px] text-yellow-300 font-bold hidden sm:inline">
            PREDATOR RANK
          </span>
        </div>

        {/* Legend Profile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-shrink-0">
          {/* Tracker 1 */}
          <div className="bg-[#141715] p-2 border-l-4 border-red-500 flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase">Selected Main</span>
            <span className="font-bold text-sm text-white">Pathfinder / Octane</span>
            <span className="text-[10px] text-green-400 mt-1">High-speed grappling across repos</span>
          </div>

          {/* Tracker 2 */}
          <div className="bg-[#141715] p-2 border-l-4 border-yellow-500 flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase">Production Commits</span>
            <span className="font-bold text-sm text-yellow-300">1,500+ Commits</span>
            <span className="text-[10px] text-gray-300 mt-1">Clean git history &amp; atomic diffs</span>
          </div>

          {/* Tracker 3 */}
          <div className="bg-[#141715] p-2 border-l-4 border-blue-500 flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase">Preferred Loadout</span>
            <span className="font-bold text-sm text-cyan-300">R-301 &amp; Peacekeeper</span>
            <span className="text-[10px] text-gray-300 mt-1">Laser accuracy in typing &amp; syntax</span>
          </div>
        </div>

        {/* Tactical Abilities */}
        <div className="bg-[#141715] p-2.5 border border-gray-700 flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto">
          <span className="text-yellow-400 font-bold border-b border-gray-700 pb-1 flex-shrink-0">
            LEGEND ABILITY BREAKDOWN
          </span>
          <div className="text-[11px] text-gray-300">
            🔭 <b className="text-white">Passive (Survey Beacon):</b> Scans requirements and deciphers architectural bottlenecks before writing line 1.
          </div>
          <div className="text-[11px] text-gray-300">
            🪝 <b className="text-white">Tactical (Grapple Hook):</b> Seamlessly transitions between backend APIs (FastAPI) and frontend UX (React 18).
          </div>
          <div className="text-[11px] text-gray-300">
            ⚡ <b className="text-white">Ultimate (Zipline):</b> Deploys rapid continuous delivery pipelines for the entire engineering squad.
          </div>
        </div>

        {/* Interactive Supply Bin */}
        <div className="mt-auto bg-[#282d29] p-2.5 border border-gray-600 flex flex-col gap-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-yellow-400">
              📦 Supply Bin / Care Package Simulator
            </span>
            <button
              type="button"
              onClick={handleOpenBin}
              className="win95-btn bg-[#c0c0c0] text-black font-bold text-[11px] px-3 py-1 hover:bg-white"
            >
              Open Supply Bin
            </button>
          </div>

          {lootResult && (
            <div className="bg-black p-2 border border-red-500 text-yellow-300 text-xs font-bold animate-fadeIn">
              {lootResult}
            </div>
          )}
        </div>
      </div>
    </RetroWindow>
  );
}

// ── 3. ELDEN RING EASTER EGG ───────────────────────────────────────────────
export function EldenRingWindow(props?: Partial<RetroWindowProps>) {
  const [messageIndex, setMessageIndex] = useState(0);

  const soapstoneMessages = [
    '✨ &quot;Behold, Lord of Code! In short, praise the clean architecture!&quot;',
    '⚔️ &quot;Try finger, but beware of merge conflict ahead.&quot;',
    '🛡️ &quot;No bug ahead, therefore seek celebration!&quot;',
    '☕ &quot;Visions of caffeine... could this be a late night deployment?&quot;',
    '🔥 &quot;You don&apos;t have the right, O you don&apos;t have the right... but Jonathan Axl does!&quot;'
  ];

  const handleNextMessage = () => {
    setMessageIndex((prev) => (prev + 1) % soapstoneMessages.length);
  };

  return (
    <RetroWindow
      id="elden"
      title="Elden Ring"
      icon="/icons/retro/eldenring.png"
      hasMenu={true}
      {...props}
    >
      <div className="bg-[#14120f] text-[#d6c7a1] p-3 font-serif text-xs select-none h-full flex-1 min-h-0 flex flex-col gap-3 border border-[#b89758] overflow-y-auto">
        {/* Golden Order Banner */}
        <div className="bg-gradient-to-r from-[#2b2413] via-[#4d3d19] to-[#2b2413] p-2 flex items-center justify-between border-b-2 border-[#b89758] shadow flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-base">⚜️</span>
            <span className="font-bold tracking-widest text-xs uppercase text-yellow-200">
              Site of Grace Discovered // Rest at Bonfire
            </span>
          </div>
          <span className="text-[10px] text-yellow-400 font-mono font-bold hidden sm:inline">
            ELDEN LORD BUILD
          </span>
        </div>

        {/* Tarnished Status Sheet */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] flex-shrink-0">
          <div className="bg-[#1c1914] p-1.5 border border-[#3e3420]">
            <span className="text-gray-400 block text-[10px]">VIGOR</span>
            <span className="font-bold text-yellow-300">60</span>
            <span className="text-[9px] text-gray-500 block">Caffeine Resilience</span>
          </div>
          <div className="bg-[#1c1914] p-1.5 border border-[#3e3420]">
            <span className="text-gray-400 block text-[10px]">MIND</span>
            <span className="font-bold text-yellow-300">50</span>
            <span className="text-[9px] text-gray-500 block">Algorithmic Mana</span>
          </div>
          <div className="bg-[#1c1914] p-1.5 border border-[#3e3420]">
            <span className="text-gray-400 block text-[10px]">INTELLIGENCE</span>
            <span className="font-bold text-yellow-300">80</span>
            <span className="text-[9px] text-gray-500 block">PyTorch &amp; Transformers</span>
          </div>
          <div className="bg-[#1c1914] p-1.5 border border-[#3e3420]">
            <span className="text-gray-400 block text-[10px]">DEXTERITY</span>
            <span className="font-bold text-yellow-300">75</span>
            <span className="text-[9px] text-gray-500 block">Fast React Scaffolding</span>
          </div>
        </div>

        {/* Bosses Defeated & Legendary Armaments */}
        <div className="bg-[#1c1914] p-2.5 border border-[#3e3420] flex flex-col gap-1.5 font-sans flex-1 min-h-0 overflow-y-auto">
          <span className="text-yellow-400 font-bold border-b border-[#3e3420] pb-1 font-mono text-xs flex-shrink-0">
            LEGENDARY ARMAMENTS &amp; SLAIN FOES
          </span>
          <div className="text-[11px] text-gray-300">
            🗡️ <b className="text-yellow-200">Dark Moon Greatsword +10:</b> Scaled with TypeScript and rigorous clean code principles.
          </div>
          <div className="text-[11px] text-gray-300">
            🌙 <b className="text-yellow-200">Moonveil Katana +10:</b> Transient Moonlight unsheathed to carve through legacy codebases.
          </div>
          <div className="text-[11px] text-gray-300">
            👑 <b className="text-yellow-200">Great Enemy Felled:</b> Malenia, Blade of Miquella vanquished solo (and hundreds of race condition bugs).
          </div>
        </div>

        {/* Soapstone Multiplayer Messages */}
        <div className="mt-auto bg-[#241f18] p-2.5 border border-[#524427] flex flex-col gap-2 flex-shrink-0">
          <div className="flex items-center justify-between font-mono">
            <span className="text-xs font-bold text-yellow-300 flex items-center gap-1.5">
              <span>📜</span>
              <span>Tarnished Soapstone Message</span>
            </span>
            <button
              type="button"
              onClick={handleNextMessage}
              className="win95-btn bg-[#c0c0c0] text-black font-bold text-[11px] px-2.5 py-1 hover:bg-white font-sans"
            >
              Touch Next Bloodstain ➡
            </button>
          </div>

          <div
            className="bg-[#14120f] p-2 border border-[#b89758] text-yellow-200 text-xs italic"
            dangerouslySetInnerHTML={{ __html: soapstoneMessages[messageIndex] }}
          />
        </div>
      </div>
    </RetroWindow>
  );
}

// ── 4. RETRO INTERNET EXPLORER 5.0 EASTER EGG ──────────────────────────────
export function RetroBrowserWindow(props?: Partial<RetroWindowProps>) {
  const [addressBar, setAddressBar] = useState('http://www.axl-net.com/welcome.htm');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const sampleSearches: Record<string, string> = {
    react: 'Search Results: React 18, Concurrent Mode, Zustand, TanStack Query, and Virtual DOM optimization found in Jonathan Axl’s toolkit.',
    fastapi: 'Search Results: High-performance Python backend with Pydantic v2 validation, OpenAPI docs, and async PostgreSQL connection pooling.',
    pytorch: 'Search Results: Swin-Transformer & DeiT Vision models with 97.0% classification accuracy on medical imaging datasets.',
    hire: 'Top Recommendation: Jonathan Axl Wibowo — Full-Stack Engineer & AI Researcher. Contact via LinkedIn (in/jonathan-axl) or email!'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryClean = searchQuery.toLowerCase().trim();
    if (!queryClean) return;

    const matchKey = Object.keys(sampleSearches).find(k => queryClean.includes(k));
    if (matchKey) {
      setSearchResult(sampleSearches[matchKey]);
    } else {
      setSearchResult(`Found 1,024 results for "${searchQuery}" in Axl's web knowledge base! Key highlight: Jonathan builds robust full-stack software and machine learning models.`);
    }
  };

  return (
    <RetroWindow
      id="browser"
      title="Web Browser"
      icon="/icons/retro/browser.svg"
      hasMenu={true}
      {...props}
    >
      <div className="bg-[#c0c0c0] text-black font-[Tahoma,sans-serif] text-xs select-none flex flex-col h-full flex-1 min-h-0">
        {/* Navigation Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#dcdcdc] border-b border-gray-400 flex-shrink-0">
          <button
            type="button"
            onClick={() => setSearchResult(null)}
            className="win95-btn px-2 py-0.5 text-[11px] flex items-center gap-1 text-black"
          >
            ⬅ Back
          </button>
          <button
            type="button"
            className="win95-btn px-2 py-0.5 text-[11px] flex items-center gap-1 text-black opacity-60 cursor-not-allowed"
          >
            ➡ Forward
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchResult(null);
              setSearchQuery('');
            }}
            className="win95-btn px-2 py-0.5 text-[11px] flex items-center gap-1 text-black"
          >
            🔄 Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              setAddressBar('http://www.axl-net.com/welcome.htm');
              setSearchResult(null);
            }}
            className="win95-btn px-2 py-0.5 text-[11px] flex items-center gap-1 text-black"
          >
            🏠 Home
          </button>
          <div className="w-[1px] h-4 bg-gray-400 mx-1 hidden sm:block" />
          <span className="text-[11px] text-gray-700 font-mono hidden sm:inline">
            🌐 Modern 56k Modem: CONNECTED
          </span>
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-[#dfdfdf] border-b border-gray-400 flex-shrink-0">
          <span className="font-bold text-[11px] text-gray-800">Address:</span>
          <div className="win95-sunken flex-1 bg-white px-2 py-0.5 text-xs font-mono flex items-center">
            <span className="text-black">{addressBar}</span>
          </div>
          <button
            type="button"
            onClick={() => setSearchResult(null)}
            className="win95-btn font-bold px-2 py-0.5 text-[11px] text-black"
          >
            Go ➡
          </button>
        </div>

        {/* Quick Links Bookmarks Bar */}
        <div className="flex flex-wrap items-center gap-2 px-2 py-1 bg-[#efefef] border-b border-gray-300 text-[11px] flex-shrink-0">
          <span className="font-bold text-gray-600">Quick Links:</span>
          <a
            href="https://www.linkedin.com/in/jonathan-axl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 underline hover:text-blue-600 font-bold"
          >
            LinkedIn Profile
          </a>
          <span>|</span>
          <a
            href="https://github.com/crazyrenan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 underline hover:text-blue-600 font-bold"
          >
            GitHub
          </a>
          <span>|</span>
          <a
            href="mailto:vinny.jonathan.axl@gmail.com"
            className="text-blue-800 underline hover:text-blue-600 font-bold"
          >
            Email Me
          </a>
          <span>|</span>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-800 underline hover:text-blue-600 font-bold"
          >
            CV Resume (PDF)
          </a>
        </div>

        {/* Browser Page Body (Authentic 1998 Web Page Content - Responsive full height) */}
        <div className="flex-1 bg-white win95-sunken m-1.5 p-3 overflow-y-auto min-h-0">
          {/* 90s Web Banner */}
          <div className="text-center pb-2 border-b-2 border-dashed border-gray-400">
            <div className="text-xs font-black text-[#000080] tracking-wider mb-1">
              *** WELCOME TO JONATHAN AXL&apos;S CYBER HOME PAGE (EST. 1998) ***
            </div>
            <div className="inline-block bg-yellow-200 border border-black px-2 py-0.5 text-[11px] text-black font-mono">
              ⭐ Best viewed in 1024x768 resolution | 256 Colors | Netscape &amp; IE 5.0 Verified ⭐
            </div>
          </div>

          {/* AltaVista / Retro Search Form */}
          <form onSubmit={handleSearch} className="my-3 p-2 bg-[#f4f4f4] border border-gray-300">
            <div className="font-bold text-xs text-[#000080] mb-1 flex items-center justify-between">
              <span>🔍 Axl-Search 98 (Knowledge Crawler):</span>
              <span className="text-[10px] text-gray-500 font-normal">Try &quot;react&quot;, &quot;fastapi&quot;, &quot;pytorch&quot;, &quot;hire&quot;</span>
            </div>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech stack, skills, or hiring keywords..."
                className="win95-sunken flex-1 px-2 py-1 text-xs bg-white text-black outline-none font-mono"
              />
              <button
                type="submit"
                className="win95-btn font-bold px-3 py-1 text-xs bg-[#c0c0c0] text-black hover:bg-white"
              >
                Search The Web
              </button>
            </div>
          </form>

          {/* Search Result Display */}
          {searchResult && (
            <div className="mb-3 p-2 bg-blue-50 border border-blue-400 text-blue-900 text-xs animate-fadeIn">
              <div className="font-bold text-[11px] text-[#000080] mb-0.5">Top Result Found:</div>
              <p className="leading-relaxed">{searchResult}</p>
            </div>
          )}

          {/* Webrings & 90s Badges */}
          <div className="mt-4 pt-2 border-t border-gray-300 flex flex-wrap items-center justify-around gap-2 text-center">
            <div className="win95-raised px-2 py-1 bg-[#dfdfdf] text-[10px] font-bold text-gray-800">
              ☕ Powered by Coffee &amp; Clean Code
            </div>
            <div className="win95-raised px-2 py-1 bg-[#dfdfdf] text-[10px] font-bold text-blue-900">
              🚀 Fast 0-to-1 Engineering
            </div>
            <div className="win95-raised px-2 py-1 bg-[#dfdfdf] text-[10px] font-bold text-purple-900">
              🤖 Applied AI &amp; Transformers
            </div>
          </div>
        </div>
      </div>
    </RetroWindow>
  );
}
