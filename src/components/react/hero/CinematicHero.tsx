import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext } from '../../../lib/gsap/useGsapContext';
import HUDOverlay from './HUDOverlay';

// ── Register once at module level (never inside component body) ───────────────
gsap.registerPlugin(ScrollTrigger);

// ── Component ─────────────────────────────────────────────────────────────────
export default function CinematicHero() {
  const rootRef = useRef<HTMLElement>(null);
  const typographyRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // ── GSAP entrance animation & scroll binding ──────────────────────────────
  useGsapContext(
    rootRef as React.RefObject<HTMLElement>,
    () => {
      // ── Reduced-motion bailout ─────────────────────────────────────────────
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Set static visibility
        gsap.set(typographyRef.current, { opacity: 0.06 });
        if (contentRef.current) {
          gsap.set(contentRef.current.children, { opacity: 1, y: 0 });
        }
        return;
      }

      const tl = gsap.timeline();

      // Phase 1: Ghost wordmark entrance
      tl.fromTo(
        typographyRef.current,
        { opacity: 0, scale: 0.95, letterSpacing: '0em' },
        {
          opacity: 0.06,
          scale: 1,
          letterSpacing: '-0.02em',
          duration: 2,
          ease: 'power3.out',
        },
        0
      );

      // Phase 2: Foreground content stagger entrance
      if (contentRef.current) {
        tl.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
          },
          0.5 // Start slightly after wordmark
        );
      }

      // Phase 3: Global scroll progress bound to HUD fill
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
        onUpdate: (self) => {
          if (progressFillRef.current) {
            gsap.set(progressFillRef.current, {
              scaleX: self.progress,
            });
          }
        },
      });
    },
    []
  );

  // ── Cursor micro-parallax (desktop only, no reduced-motion) ───────────────
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 767px)').matches
    ) {
      return;
    }

    const wordmark = typographyRef.current;
    const glow = glowRef.current;
    if (!wordmark || !glow) return;

    const quickX = gsap.quickTo(wordmark, 'x', {
      duration: 0.8,
      ease: 'power3.out',
    });
    const quickY = gsap.quickTo(wordmark, 'y', {
      duration: 0.8,
      ease: 'power3.out',
    });
    
    const quickGlowX = gsap.quickTo(glow, 'x', {
      duration: 1.5,
      ease: 'power3.out',
    });
    const quickGlowY = gsap.quickTo(glow, 'y', {
      duration: 1.5,
      ease: 'power3.out',
    });

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = ((e.clientX - cx) / cx) * -15; // inverse parallax
      const dy = ((e.clientY - cy) / cy) * -15;
      quickX(dx);
      quickY(dy);

      // Glow follows mouse softly
      quickGlowX(e.clientX - cx);
      quickGlowY(e.clientY - cy);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.set([wordmark, glow], { x: 0, y: 0 });
    };
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={rootRef}
      className="hero-stage"
      aria-label="Portfolio hero"
    >
      {/* ── Subtle grid overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          backgroundPosition: 'center center',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Ambient Radial Glow ── */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* ── Giant ghost wordmark (z-1) ── */}
      <h2 
        ref={typographyRef} 
        className="hero-wordmark" 
        style={{ color: 'rgb(255 255 255 / 0.06)' }}
        aria-hidden="true"
      >
        PORTFOLIO
      </h2>

      {/* ── HUD telemetry decoration (z-20) ── */}
      <HUDOverlay progressFillRef={progressFillRef} />

      {/* ── Foreground identity copy (z-10) ── */}
      <div ref={contentRef} className="hero-foreground" aria-label="Identity">
        {/* Status badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
            padding: '0.25rem 0.75rem',
            border: '1px solid rgb(209 38 54 / 0.4)',
            borderRadius: '9999px',
            background: 'rgb(15 15 17 / 0.85)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgb(209 38 54)',
              animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
              display: 'block',
            }}
          />
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgb(209 38 54)',
            }}
          >
            // System Online
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
            color: 'rgb(224 213 201)',
            letterSpacing: '-0.02em',
          }}
        >
          Jonathan{' '}
          <span style={{ color: 'rgb(209 38 54)' }}>Axl Wibowo</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
            color: 'rgb(224 213 201 / 0.6)',
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
          }}
        >
          Full-Stack Engineer × AI &amp; Data Systems
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '0.75rem', pointerEvents: 'auto' }}>
          <a
            href="/cv.pdf"
            download
            aria-label="Download Jonathan Axl Wibowo's CV as PDF"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.25rem',
              border: '1px solid rgb(104 24 38 / 0.6)',
              background: 'rgb(27 27 30 / 0.85)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgb(224 213 201)',
              textDecoration: 'none',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.2s, background 0.2s, outline-color 0.2s',
              outline: '2px solid transparent',
              outlineOffset: '2px',
            }}
            onFocus={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.outlineColor = 'rgba(255,102,0,0.7)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,102,0,0.6)';
            }}
            onBlur={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.outlineColor = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgb(104 24 38 / 0.6)';
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M12 12.75l-3-3m3 3l3-3m-3 3V3" />
            </svg>
            Download_CV
          </a>
        </div>
      </div>

      {/* ── Bottom gradient vignette ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background:
            'linear-gradient(to top, #06091a 0%, transparent 100%)',
          zIndex: 8,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}