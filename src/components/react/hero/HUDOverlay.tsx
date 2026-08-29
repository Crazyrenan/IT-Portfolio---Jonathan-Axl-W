import { useLayoutEffect, useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';

// ── Types ─────────────────────────────────────────────────────────────────────
interface HUDOverlayProps {
  /** Ref to the progress fill div — parent drives scaleX via ScrollTrigger onUpdate */
  progressFillRef?: RefObject<HTMLDivElement | null>;
}

// ── Corner bracket SVG path (L-shape, top-left orientation) ──────────────────
const BRACKET_DASH = 68; // total stroke length of the L path (approx)

function CornerBracket({
  svgRef,
  flip,
}: {
  svgRef: RefObject<SVGSVGElement | null>;
  flip: { x: boolean; y: boolean };
}) {
  const scaleX = flip.x ? -1 : 1;
  const scaleY = flip.y ? -1 : 1;
  return (
    <svg
      ref={svgRef}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      style={{ transform: `scale(${scaleX}, ${scaleY})` }}
      aria-hidden="true"
    >
      <path
        d="M 2 34 L 2 2 L 34 2"
        stroke="rgb(255 102 0 / 0.65)"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeDasharray={BRACKET_DASH}
        strokeDashoffset={BRACKET_DASH}
      />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HUDOverlay({ progressFillRef }: HUDOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<SVGSVGElement>(null); // top-left bracket
  const trRef = useRef<SVGSVGElement>(null); // top-right bracket
  const blRef = useRef<SVGSVGElement>(null); // bottom-left bracket
  const brRef = useRef<SVGSVGElement>(null); // bottom-right bracket
  const labelBlockRef = useRef<HTMLDivElement>(null);
  const readoutTRRef = useRef<HTMLDivElement>(null);
  const coordsBLRef = useRef<HTMLDivElement>(null);
  const clockBRRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sectorLabelRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  // ── Bracket draw-on + HUD fade-in on mount ─────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // collect SVG paths inside each bracket SVG
      const paths = [tlRef, trRef, blRef, brRef].map(
        (r) => r.current?.querySelector('path')
      );

      const corners = [tlRef, trRef, blRef, brRef].map((r) => r.current);

      // 1. Fade in corner wrappers
      gsap.to(corners, {
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3,
      });

      // 2. Draw on each bracket (stroke-dashoffset 68 → 0)
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.inOut',
        delay: 0.4,
      });

      // 3. Fade in readout blocks with stagger
      const readouts = [
        labelBlockRef.current,
        readoutTRRef.current,
        coordsBLRef.current,
        clockBRRef.current,
      ];
      gsap.to(readouts, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.7,
      });
      // pre-position readouts slightly offset for the fade-in
      gsap.set(readouts, { opacity: 0, y: 4 });

      // 4. Fade in progress bar + sector label
      gsap.to([progressBarRef.current, sectorLabelRef.current], {
        opacity: 1,
        duration: 0.5,
        delay: 0.9,
        ease: 'power2.out',
      });
    }, overlayRef);

    return () => ctx.revert();
  }, []);

  // ── Live clock ticker ──────────────────────────────────────────────────────
  useEffect(() => {
    function tick() {
      if (!clockRef.current) return;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      clockRef.current.textContent = `${hh}:${mm}:${ss}`;
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={overlayRef} className="hud-overlay" aria-hidden="true">
      {/* ── Corner brackets ── */}
      <div className="hud-corner hud-corner--tl">
        <CornerBracket svgRef={tlRef} flip={{ x: false, y: false }} />
      </div>
      <div className="hud-corner hud-corner--tr">
        <CornerBracket svgRef={trRef} flip={{ x: true, y: false }} />
      </div>
      <div className="hud-corner hud-corner--bl">
        <CornerBracket svgRef={blRef} flip={{ x: false, y: true }} />
      </div>
      <div className="hud-corner hud-corner--br">
        <CornerBracket svgRef={brRef} flip={{ x: true, y: true }} />
      </div>

      {/* ── Top-left readout ── */}
      <div ref={labelBlockRef} className="hud-label-block hud-readout">
        <div>SECTOR 01 / 03</div>
        <div style={{ opacity: 0.5 }}>STATUS: ACTIVE</div>
      </div>

      {/* ── Top-right readout ── */}
      <div ref={readoutTRRef} className="hud-readout-tr hud-readout">
        <div>SCROLL TO EXPLORE</div>
        <div style={{ opacity: 0.5 }}>↓</div>
      </div>

      {/* ── Bottom-left coordinates ── */}
      <div ref={coordsBLRef} className="hud-coords-bl hud-readout">
        <div>LAT: 06.2088° S</div>
        <div>LNG: 106.8456° E</div>
      </div>

      {/* ── Bottom-right clock ── */}
      <div ref={clockBRRef} className="hud-clock-br hud-readout">
        <div>
          T+ <span ref={clockRef}>00:00:00</span>
        </div>
        <div style={{ opacity: 0.5 }}>UTC+07:00</div>
      </div>

      {/* ── Progress bar (scaleX driven by CinematicHero via ref) ── */}
      <div ref={progressBarRef} className="hud-progress-bar">
        <div ref={progressFillRef} className="hud-progress-fill" />
      </div>

      {/* ── Sector label below bar ── */}
      <div ref={sectorLabelRef} className="hud-sector-label">
        APEX FRAME // CINEMATIC SEQUENCE
      </div>
    </div>
  );
}
