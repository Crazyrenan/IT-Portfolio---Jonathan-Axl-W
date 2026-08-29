# CINEMATIC PORTFOLIO — Comprehensive Planning Document
**Codename:** `Apex Frame` — Racing-Editorial Hero System
**Stack:** Astro 4.x · React 18 (Islands) · GSAP 3 + ScrollTrigger · Tailwind CSS · Keystatic CMS
**Theme:** Deep Navy `#0B132B` / High-Contrast White / Racing Orange `#FF6600`

---

## 0. Creative Direction Note (Three.js-inspired, GSAP-executed)

You referenced Three.js as inspiration — we won't add a WebGL runtime for this hero (unnecessary weight for a portrait+typography scene), but we *will* borrow its visual grammar and fake it with cheap, GPU-friendly 2D layers:

| Three.js Idea | 2D/GSAP Equivalent We'll Build |
|---|---|
| Camera dolly-zoom | `scale()` + `z-translate` timeline on the portrait layer, eased with `power2.inOut` |
| Depth-of-field / parallax layers | 3–4 independent scroll-speed layers (typography, portrait, grain, HUD lines) via `data-speed` attributes |
| Rim/fresnel lighting shader | CSS `drop-shadow()` stack + `mix-blend-mode: screen` gradient overlay simulating top-right key light |
| Post-processing grain/vignette | SVG `feTurbulence` noise layer, opacity-locked at 4–6%, GPU-composited |
| Orbit controls / cursor react | Lightweight `mousemove` → `gsap.quickTo()` micro-parallax on portrait (±8px, damped) |
| HUD telemetry overlays (racing UI) | Animated corner brackets, scroll-progress "lap counter," coordinate readouts — pure SVG/CSS, GSAP-driven opacity/stroke-dashoffset |

This gets 90% of the "premium 3D feel" at near-zero JS bundle cost and zero WebGL context risk on low-end mobile.

---

## 1. Product Requirement Document (PRD)

### 1.1 Problem Statement
Current portfolio hero is static and doesn't communicate "high-performance engineering" identity. Need an editorial, motion-driven first impression that signals technical craft without sacrificing load performance or accessibility.

### 1.2 Scope

**In scope:**
- Rebuilt `Hero` section: giant background typography + portrait cutout + scroll-driven zoom-out → video transition
- Racing-HUD micro-interactions (corner brackets, scroll progress indicator, cursor parallax)
- Full content architecture below hero (Manifesto, Tech Arsenal, Case Studies via Keystatic, Experience Timeline, Contact Terminal)
- Design token system for monochrome navy/orange theme
- Performance-safe GSAP lifecycle inside Astro's View Transitions (no leaks on client-side nav)

**Out of scope (this cycle):**
- Full WebGL/Three.js scene
- CMS schema redesign beyond what Case Studies need
- i18n / multi-language support
- Blog/MDX content pipeline

### 1.3 Target Deliverables
1. `CinematicHero.tsx` — React island, GSAP-driven
2. `HUDOverlay.tsx` — reusable racing-telemetry decoration component
3. Updated `global.css` token layer + `tailwind.config.mjs` extension
4. Asset pipeline scripts (image/video optimization)
5. Section components: `Manifesto.astro`, `TechArsenal.tsx`, `CaseStudies.astro` (Keystatic-fed), `ExperienceTimeline.tsx`, `ContactTerminal.tsx`
6. This planning doc + a `PERFORMANCE_CHECKLIST.md` companion (Sprint 4 output)

### 1.4 User Journey Flow

```
[Landing] → sees giant "PORTFOLIO" wordmark + portrait, HUD brackets fade in
    ↓ (user scrolls)
[Pin starts] → scroll position locked, timeline scrubs:
    - typography opacity 1→0, letter-spacing expands slightly (editorial "explode")
    - portrait scale 1 → 0.35, translateY toward final docked position
    - HUD readouts update (progress %, "SECTOR 1/3" style labels)
    ↓ (scrub continues)
[Cross-fade zone] → portrait cutout cross-fades into looping showreel video
    at matched scale/position (no layout jump)
    ↓ (pin releases)
[Unpin] → normal document scroll resumes → Manifesto section
    ↓
[Manifesto] → statement typography, scroll-fade paragraphs
    ↓
[Tech Arsenal] → icon grid, hover = orange glow + micro-lift
    ↓
[Selected Case Studies] → Keystatic-driven cards, staggered reveal on IntersectionObserver
    ↓
[Experience Timeline] → vertical rail, scroll-synced active-node highlight
    ↓
[Contact Terminal] → CLI-style interactive contact block, blinking cursor, submit via form action
```

### 1.5 Success Metrics

| Metric | Target | Tool |
|---|---|---|
| Frame rate during pinned scroll | ≥ 60fps (≥ 50fps floor on mid-tier mobile) | Chrome Performance panel, `stats.js` overlay in dev |
| Lighthouse Performance | ≥ 90 (mobile, throttled) | Lighthouse CI |
| Lighthouse Accessibility | ≥ 95 | Lighthouse CI |
| LCP | < 2.0s | Web Vitals |
| CLS | < 0.02 (hero must not shift layout) | Web Vitals |
| Total hero asset weight (image+video, compressed) | < 1.8MB combined, lazy-loaded video | Bundle/network audit |
| Memory delta after 10x Astro page nav cycles | No unbounded growth (ScrollTrigger instances = 0 after unmount) | Chrome Memory profiler |
| `prefers-reduced-motion` compliance | Full fallback: static layout, no pin, no scrub | Manual + axe-core |

---

## 2. Technical Architecture & Component Tree

### 2.1 Astro Shell vs React Island Boundary

**Principle:** Astro owns structure, SSR content, and CMS data-fetching (zero JS by default). React islands own *only* what requires client-side interactivity/animation state. Never let a whole section hydrate as React just because one sub-element needs GSAP.

```
src/
├── layouts/
│   └── BaseLayout.astro                 # <head>, ViewTransitions, global.css import
│
├── pages/
│   └── index.astro                      # composes sections, passes CMS data as props
│
├── components/
│   ├── astro/                           # zero-JS, SSR-only
│   │   ├── Manifesto.astro
│   │   ├── CaseStudies.astro            # fetches Keystatic reader at build time
│   │   └── SectionHeading.astro
│   │
│   └── react/                           # islands — client:visible / client:load
│       ├── hero/
│       │   ├── CinematicHero.tsx        # client:load (above-fold, must be interactive immediately)
│       │   ├── HeroTypography.tsx       # child, receives GSAP timeline ref via context
│       │   ├── PortraitStage.tsx        # child: image ↔ video cross-fade layer
│       │   └── HUDOverlay.tsx           # child: telemetry decoration, purely presentational + tween-driven
│       │
│       ├── TechArsenal.tsx              # client:visible
│       ├── ExperienceTimeline.tsx       # client:visible
│       └── ContactTerminal.tsx          # client:visible (form state + fake-CLI typing effect)
│
├── lib/
│   ├── gsap/
│   │   ├── useGsapContext.ts            # shared hook: gsap.context + cleanup
│   │   └── scrollTriggerConfig.ts       # centralized ScrollTrigger defaults (scrub value, ease, markers flag)
│   └── keystatic/
│       └── reader.ts
│
├── content/                             # Keystatic collections (case-studies, experience)
│
└── styles/
    └── global.css                       # @theme tokens, CSS vars, base resets
```

**Hydration directive rules of thumb:**
- `CinematicHero.tsx` → `client:load` (it's the first paint interaction surface; delaying hydration causes a jarring "static then suddenly animates" pop)
- Everything below the fold → `client:visible` (defer JS cost until near viewport)
- `Manifesto.astro`, `CaseStudies.astro` → stay `.astro`, no hydration at all; if a card needs a hover tilt, scope that to a tiny dedicated island, not the whole grid

### 2.2 GSAP ScrollTrigger Strategy

#### 2.2.1 Pinning & Timeline Math

```ts
// CinematicHero.tsx (simplified core)
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapContext } from "../../../lib/gsap/useGsapContext";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero() {
  const root = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const typography = useRef<HTMLHeadingElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useGsapContext(root, (ctx) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return; // static fallback, no timeline built at all

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "+=150%",       // pin duration = 1.5x viewport height of scroll distance
        scrub: 0.6,           // slight lag smooths input jitter, still feels tied to scroll
        pin: true,
        anticipatePin: 1,     // prevents 1-frame jump on pin start
        invalidateOnRefresh: true, // recompute on resize/orientation change
      },
    });

    tl.to(typography.current, {
      opacity: 0,
      letterSpacing: "0.08em",
      ease: "power1.out",
    }, 0)
    .to(portrait.current, {
      scale: 0.35,
      y: () => window.innerHeight * -0.18,  // dock toward final position
      ease: "power2.inOut",
    }, 0)
    .to(video.current, {
      autoAlpha: 1,          // cross-fade in, matched to portrait's final scale/position
      ease: "power1.in",
    }, "-=0.35")              // overlap tail of previous tween for seamless cross-fade
    .call(() => video.current?.play(), [], "-=0.2");

  }, [root]);

  return (
    <section ref={root} className="hero-stage">
      <h1 ref={typography} className="hero-wordmark">PORTFOLIO</h1>
      <div ref={portrait} className="hero-portrait">
        <img src="/assets/portrait.webp" alt="Developer portrait" />
        <video ref={video} muted loop playsInline className="hero-video" src="/assets/showreel.mp4" />
      </div>
      <HUDOverlay progressSource={root} />
    </section>
  );
}
```

**Timeline math notes:**
- `end: "+=150%"` ties pin duration to viewport height, not a fixed px value → stays proportionally correct across screen sizes
- `scrub: 0.6` (not `true`) — a small lag (~0.6s catch-up) reads as "cinematic weight" instead of raw 1:1 scrollbar coupling, which feels mechanical
- Cross-fade uses timeline label overlap (`"-=0.35"`) rather than a separate ScrollTrigger instance — one pinned trigger, one timeline, avoids competing scrub calculations
- `invalidateOnRefresh: true` is mandatory — without it, resizing (e.g. mobile address-bar collapse) leaves stale start/end pixel values and the pin desyncs

#### 2.2.2 Cleanup Lifecycle (Astro View Transitions safety)

Astro's View Transitions swap DOM without a full page reload, which means React islands can re-mount while old GSAP/ScrollTrigger instances from the previous DOM are still alive → memory leak + duplicate pins + "ghost" scroll jank.

```ts
// lib/gsap/useGsapContext.ts
import { useLayoutEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapContext(
  scope: RefObject<HTMLElement>,
  setup: (ctx: gsap.Context) => void,
  deps: React.DependencyList
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => setup(ctx), scope);

    return () => {
      ctx.revert();          // reverts all tweens/triggers created inside this context
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === scope.current)
        .forEach((st) => st.kill());
    };
  }, deps);
}
```

```astro
---
// BaseLayout.astro — global safety net for Astro's client-side navigation
---
<script>
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  document.addEventListener("astro:before-swap", () => {
    // belt-and-suspenders: kill anything the component cleanup might have missed
    ScrollTrigger.getAll().forEach((st) => st.kill());
  });

  document.addEventListener("astro:after-swap", () => {
    ScrollTrigger.refresh(); // recalculate positions for the new DOM
  });
</script>
```

**Rule:** every component-local `useGsapContext` call handles its own scoped cleanup (`ctx.revert()`); the layout-level listener is a global safety net, not a substitute. Never rely on only one layer.

### 2.3 Image & Video Asset Optimization Pipeline

| Asset | Source | Pipeline | Output | Delivery |
|---|---|---|---|---|
| Portrait cutout | PNG/PSD export, alpha channel | `sharp` → resize to 1600px max height, strip EXIF, re-encode | `.webp` (q=82) + `.avif` fallback optional | `<picture>` with `srcset` 800w/1200w/1600w, `fetchpriority="high"`, `loading="eager"` (it's LCP-critical) |
| Showreel video | ProRes/MOV master | `ffmpeg -c:v libx264 -crf 23 -preset slow -vf scale=1280:-2 -an -movflags +faststart` | `.mp4` (H.264) + `.webm` (VP9) fallback | `<video preload="none">`, loaded via JS only when ScrollTrigger reaches the cross-fade zone (avoid eager network cost) |
| Wordmark typography | CSS text, not image | — | — | Pure CSS `clamp()` fluid type, zero asset weight |
| Grain/HUD overlays | Generated SVG | inline `<svg>` with `feTurbulence`, no external request | — | Inlined in `HUDOverlay.tsx`, cached as static string |

**Key perf rule:** the video source is **not** loaded on initial page load. Bind a `ScrollTrigger.create({ trigger: root, start: "40% top", onEnter: () => video.load() })` (or set `preload="none"` + assign `src` programmatically) so mobile users on slow connections never pay for it unless they actually scroll into the transition zone.

**Responsive scaling guard:** on viewports < 768px, skip the full pin-zoom choreography (device pixel/scroll behavior on mobile Safari makes long pins jittery). Use `ScrollTrigger.matchMedia()`:

```ts
ScrollTrigger.matchMedia({
  "(min-width: 768px)": () => { /* full pinned timeline as above */ },
  "(max-width: 767px)": () => { /* simpler: fade+scale on enter, no pin, no video swap — static portrait only */ },
});
```

---

## 3. Design System & CSS Token Schema

### 3.1 Semantic CSS Variables — `src/styles/global.css`

```css
:root {
  /* --- Core palette (raw) --- */
  --color-navy-950: #06091a;
  --color-navy-900: #0b132b;
  --color-navy-800: #131c3d;
  --color-navy-700: #1c2850;
  --color-white-100: #ffffff;
  --color-white-80: rgb(255 255 255 / 0.8);
  --color-white-40: rgb(255 255 255 / 0.4);
  --color-orange-500: #ff6600;
  --color-orange-400: #ff8533;
  --color-orange-glow: rgb(255 102 0 / 0.35);

  /* --- Semantic tokens (what components actually reference) --- */
  --bg-base: var(--color-navy-900);
  --bg-elevated: var(--color-navy-800);
  --bg-pinned-stage: var(--color-navy-950);

  --text-primary: var(--color-white-100);
  --text-secondary: var(--color-white-80);
  --text-muted: var(--color-white-40);

  --accent-primary: var(--color-orange-500);
  --accent-hover: var(--color-orange-400);
  --accent-glow: var(--color-orange-glow);

  --border-hairline: rgb(255 255 255 / 0.08);
  --border-hud: rgb(255 102 0 / 0.5);

  /* --- Motion tokens --- */
  --ease-cinematic: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-hud: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-scrub-lag: 0.6s;

  /* --- Typography scale (fluid) --- */
  --font-display-size: clamp(4.5rem, 14vw, 13rem);
  --font-hud-size: clamp(0.65rem, 1vw, 0.8rem);

  /* --- Rim light simulation --- */
  --rim-light-color: rgb(255 255 255 / 0.55);
  --rim-shadow-color: rgb(0 0 0 / 0.65);
}
```

### 3.2 Tailwind Config Extension — `tailwind.config.mjs`

```js
export default {
  theme: {
    extend: {
      colors: {
        navy: {
          950: "var(--color-navy-950)",
          900: "var(--color-navy-900)",
          800: "var(--color-navy-800)",
          700: "var(--color-navy-700)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          hover: "var(--accent-hover)",
        },
      },
      fontFamily: {
        display: ["'Neue Machina'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"], // HUD/terminal text
      },
      dropShadow: {
        "rim-light": [
          "6px -6px 0 rgb(255 102 0 / 0.15)",
          "0 24px 48px rgb(0 0 0 / 0.55)",
        ],
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
};
```

### 3.3 Rim-Light Simulation Formula (Top-Right Key Light)

Goal: fake a studio key light from top-right hitting the portrait cutout edge, plus ambient contact shadow grounding it against the navy background.

```css
.hero-portrait img {
  /* Layer 1: crisp orange rim on the top-right silhouette edge */
  /* Layer 2: soft white highlight bleed, tighter radius */
  /* Layer 3: large soft ambient drop shadow, bottom-left opposite the light source */
  filter:
    drop-shadow(3px -3px 0px rgb(255 102 0 / 0.55))
    drop-shadow(1px -1px 6px rgb(255 255 255 / 0.35))
    drop-shadow(-12px 20px 40px rgb(0 0 0 / 0.6));
}
```

**Formula logic:**
- Light source direction = top-right → shadow/highlight offsets use **positive-x, negative-y** for the rim (toward the light) and **negative-x, positive-y** for the cast shadow (away from the light) — this is the single rule to keep consistent everywhere lighting is simulated (HUD glows, card hovers, button states).
- Keep rim blur radius small (0–6px) — a *rim* light is a thin bright edge, not a glow; save the large blur for the ambient/contact shadow layer only.
- On hover/interaction states elsewhere in the site (Tech Arsenal icons, Case Study cards), reuse the same top-right-light logic at reduced intensity so the whole site reads as one consistent "studio" lit under one implied light source.

---

## 4. Sprint Breakdown & Task Roadmap

### Sprint 1 — Foundation (Asset Setup, Base Layout, Token Mapping)
- [ ] Set up `global.css` token layer + `tailwind.config.mjs` extension (Section 3)
- [ ] Import/optimize portrait source → generate `.webp`/`.avif` responsive set via `sharp` script
- [ ] Compress showreel master → `.mp4`/`.webm` via `ffmpeg` pipeline
- [ ] Build `BaseLayout.astro` with `<ViewTransitions />`, font loading (`font-display: swap`), global ScrollTrigger cleanup listener
- [ ] Scaffold empty section components (`.astro` for static, `.tsx` shells for islands) so `index.astro` composition is wired end-to-end
- [ ] Install/verify `gsap`, `@gsap/react` (or manual context hook), confirm `ScrollTrigger` registers without SSR errors in Astro

### Sprint 2 — `CinematicHero.tsx` Core
- [ ] Build static (non-animated) markup first: wordmark, portrait layer, video layer, HUD overlay skeleton — confirm it looks correct at scale 1 / opacity 1 with zero JS
- [ ] Implement `useGsapContext` hook + wire pinned timeline (Section 2.2.1)
- [ ] Implement cross-fade choreography (portrait → video) with label-overlap technique
- [ ] Add `ScrollTrigger.matchMedia()` responsive guard: full pin on desktop/tablet, simplified fade-only on mobile (Section 2.3)
- [ ] Add `prefers-reduced-motion` early-return (static, accessible fallback layout)
- [ ] Implement lazy video load: don't fetch `.mp4` until scroll reaches cross-fade zone
- [ ] Build `HUDOverlay.tsx`: corner brackets (SVG `stroke-dashoffset` draw-on), scroll-progress readout bound to `onUpdate` callback of the ScrollTrigger, cursor micro-parallax via `gsap.quickTo()`
- [ ] Verify cleanup: navigate away/back via Astro View Transitions 10x, confirm `ScrollTrigger.getAll().length === 0` after unmount each time (dev-only console assertion)

### Sprint 3 — Content Sections
- [ ] `Manifesto.astro`: static SSR, scroll-fade-in paragraphs via a tiny `IntersectionObserver`-based island (not full-section hydration)
- [ ] `TechArsenal.tsx`: icon grid, orange rim-light hover state reusing Section 3.3 formula
- [ ] `CaseStudies.astro`: wire Keystatic reader, map collection entries to cards, staggered reveal (`client:visible` island wraps only the reveal behavior, not the card markup)
- [ ] `ExperienceTimeline.tsx`: vertical rail, active-node highlight synced to scroll position (separate lightweight `ScrollTrigger.create()` per node, `toggleClass` only — no pinning needed here)
- [ ] `ContactTerminal.tsx`: CLI-style typing effect intro, real form wired to submission endpoint/action, focus states in accent orange

### Sprint 4 — Performance Audit & Hardening
- [ ] Run Lighthouse (mobile, throttled) on `index.astro` — target 90+ Performance / 95+ Accessibility, iterate on flagged items
- [ ] Verify `prefers-reduced-motion` path manually (macOS/Windows OS-level toggle) — confirm zero pin, zero autoplay video, layout still coherent
- [ ] Mobile fallback QA on real devices (iOS Safari + Android Chrome) — pin jitter is the #1 risk area, confirm `matchMedia` fallback triggers correctly at breakpoint
- [ ] Memory profiling: repeated View Transition navigation, confirm no ScrollTrigger/tween accumulation (Chrome Memory panel heap snapshot diff)
- [ ] CLS audit: confirm hero reserves correct space pre-hydration (no jump when React island mounts)
- [ ] Bundle audit: confirm GSAP + ScrollTrigger are the only motion dependency (no accidental duplicate animation libs), tree-shake unused GSAP plugins
- [ ] Final build validation: `astro build && astro preview`, smoke-test full scroll journey end-to-end
- [ ] Ship `PERFORMANCE_CHECKLIST.md` as a companion doc recording final measured metrics vs. targets from Section 1.5

---

## Appendix — Confirmed Decisions

Semua open decision di-lock dengan pilihan default paling aman/portable, supaya Sprint 2 tidak terblokir. Bisa direvisi kapan saja tanpa mengubah arsitektur di atas.

### A.1 Font Wordmark → `Space Grotesk`
Open-source (OFL license, gratis komersial), punya karakter geometrik-technical yang cocok dengan estetika racing-editorial, dan tersedia via `@fontsource/space-grotesk` (self-hosted, tidak bocor ke Google Fonts CDN → bagus untuk Lighthouse privacy/perf).
```bash
npm install @fontsource/space-grotesk
```
```css
/* global.css */
@import "@fontsource/space-grotesk/700.css"; /* wordmark */
@import "@fontsource/space-grotesk/500.css"; /* headings */
```
`--font-mono` tetap `JetBrains Mono` untuk HUD/terminal (kontras teknikal yang disengaja terhadap wordmark geometric-sans).

### A.2 Video Showreel → Placeholder Fallback (Sprint 2), Swap-in Ready
Belum ada footage final → Sprint 2 build dengan **placeholder generatif**, bukan file video statis kosong:
- Loop pendek animated code/terminal typing di atas canvas navy (bisa di-render sebagai CSS/SVG animation ringan, tanpa perlu render video sungguhan dulu)
- `PortraitStage.tsx` menerima `videoSrc` sebagai prop dengan default `/assets/placeholder-loop.mp4` — begitu showreel asli siap, tinggal ganti prop/file, tidak ada perubahan kode timeline
- Placeholder tetap ikut pipeline optimasi di Section 2.3 (H.264 + faststart) supaya perilaku loading identik dengan versi final, sehingga tidak ada kejutan perf saat swap

### A.3 Keystatic Collection Schema — Case Studies
```ts
// keystatic.config.ts
collections: {
  caseStudies: collection({
    label: "Case Studies",
    slugField: "title",
    path: "src/content/case-studies/*",
    schema: {
      title: fields.slug({ name: { label: "Title" } }),
      year: fields.text({ label: "Year" }),
      summary: fields.text({ label: "Summary", multiline: true }),
      cover: fields.image({ label: "Cover Image", directory: "src/assets/case-studies" }),
      stack: fields.array(fields.text({ label: "Tech" }), {
        label: "Stack Tags",
        itemLabel: (props) => props.value,
      }),
      liveUrl: fields.url({ label: "Live URL", validation: { isRequired: false } }),
      repoUrl: fields.url({ label: "Repo URL", validation: { isRequired: false } }),
      featured: fields.checkbox({ label: "Featured on homepage", defaultValue: false }),
      content: fields.markdoc({ label: "Full Write-up" }),
    },
  }),
},
```
`CaseStudies.astro` query filters `featured === true` for the homepage grid; full write-up (`content`) reserved for a future `/work/[slug].astro` detail page (out of scope this cycle, but schema already supports it — no rework needed later).

### A.4 Contact Terminal Backend → Astro API Route
Dipilih karena self-hosted (tidak bergantung kuota third-party seperti Formspree) dan konsisten dengan stack Astro yang sudah ada.
```
src/pages/api/contact.ts   →  POST handler, validasi input, kirim via email provider (Resend/SendGrid) atau simpan ke DB
```
```ts
// ContactTerminal.tsx submit handler
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, message }),
});
```
Butuh env var untuk API key provider email — dicatat sebagai task setup di Sprint 3 (`.env.example` update + deployment secret).