# 8-BIT NEO-RETRO OS — System Rebuild Document
**Codename:** `PitStop OS // Axl-8Bit`
**Theme:** Red Bull Racing Palette (#12142D Navy Base, #1B2B5A Surface, #FF0026 Bull Red, #FFEA00 Telemetry Yellow, #6674A3 Soft Steel)
**Design Metaphor:** Vintage Slack / 8-Bit Desktop Workstation x F1 Pit-Wall Telemetry

## 1. System Philosophy & Aesthetic Rules
- **Pixel-Solid Geometry:** Border hitam pekat 2px-3px (`border-2 border-black`), offset hard drop-shadows (`box-shadow: 4px 4px 0px #000000`).
- **Typography:** Space Grotesk (Heading display), JetBrains Mono (Telemetry/Metadata), VT323 / Pixel font fallback.
- **Window Metaphor:** Kontainer berbasis Retro OS Window dengan title bar, traffic light window controls (Red/Yellow/Blue dots), dan tabs/channels ala Slack vintage.
- **Micro-Interactions (Emil Kowalski Skill Patterns):** Springy layout morphs, magnetic hover micro-lifts, pixel-dithered active states.

## 2. Component Structure

src/
├── styles/
│   └── global.css                   # Token Red Bull 8-bit & utility box-shadow 8-bit
├── components/
│   ├── retro/
│   │   ├── RetroWindow.tsx          # Window container dengan titlebar + control buttons
│   │   ├── PixelHero.tsx            # Left: Pixel ID Card stage; Right: Dialogue greeting box + Action chips
│   │   ├── RetroSkillsGrid.tsx      # Interactive 8-bit skill inventory (Core, AI/Data, Web, Tools)
│   │   ├── RetroProjectsDossier.tsx # Project feed styled as Slack channel / Finder file explorer
│   │   ├── RetroTimeline.tsx        # Career/Research milestones styled as RPG quest log
│   │   └── RetroTerminal.tsx        # CLI console contact box with blinking caret
│   └── navigation/
│       └── TopMenuBar.astro         # Classic Mac/Retro OS desktop top menu bar
└── pages/
    └── index.astro                  # Master clean assembly