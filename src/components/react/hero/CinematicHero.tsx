import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGsapContext } from '../../../lib/gsap/useGsapContext';
import HUDOverlay from './HUDOverlay';

// ── Register once at module level (never inside component body) ───────────────
gsap.registerPlugin(ScrollTrigger);

// ── Constants ─────────────────────────────────────────────────────────────────
const VIDEO_SRC = '/assets/Cinematic_subtle_portrait_moti.mp4';
const PORTRAIT_SRC = '/assets/data diri.png';

// ── Component ─────────────────────────────────────────────────────────────────
export default function CinematicHero() {
  const rootRef = useRef<HTMLElement>(null);
  const typographyRef = useRef<HTMLHeadingElement>(null);
  const portraitStageRef = useRef<HTMLDivElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // ── GSAP pinned timeline (desktop/tablet) ─────────────────────────────────
  useGsapContext(
    rootRef as React.RefObject<HTMLElement>,
    () => {
      // ── Reduced-motion bailout ─────────────────────────────────────────────
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // ── Lazy-load video when scroll reaches 40% of hero ───────────────────
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: '40% top',
        once: true,
        onEnter: () => {
          if (videoElRef.current && !videoElRef.current.src) {
            videoElRef.current.src = VIDEO_SRC;
            videoElRef.current.load();
          }
        },
      });

      // ── Responsive scroll behaviour ────────────────────────────────────────
      ScrollTrigger.matchMedia({
        // ── Desktop / tablet: full pinned timeline ─────────────────────────
        '(min-width: 768px)': () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '+=150%',
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Drive the HUD progress fill
                if (progressFillRef.current) {
                  gsap.set(progressFillRef.current, {
                    scaleX: self.progress,
                  });
                }
              },
            },
          });

          tl
            // Phase 1: fade wordmark out + letter-spacing expand
            .to(
              typographyRef.current,
              {
                opacity: 0,
                letterSpacing: '0.1em',
                ease: 'power1.out',
                duration: 1,
              },
              0
            )
            // Phase 1: portrait zooms toward final docked position
            .to(
              portraitStageRef.current,
              {
                scale: 0.38,
                y: () => window.innerHeight * -0.14,
                ease: 'power2.inOut',
                duration: 1,
              },
              0
            )
            // Phase 2: video cross-fades in (overlapping portrait phase end)
            .to(
              videoStageRef.current,
              {
                autoAlpha: 1,
                ease: 'power1.in',
                duration: 0.5,
              },
              '-=0.35'
            )
            // Phase 2: trigger video play once cross-fade starts
            .call(
              () => {
                if (videoElRef.current) {
                  videoElRef.current.play().catch(() => {
                    // autoplay blocked — silently ignore (video is decorative)
                  });
                }
              },
              [],
              '-=0.2'
            );

          return () => {
            // ScrollTrigger created inside matchMedia is auto-killed on media change
            tl.kill();
          };
        },

        // ── Mobile: simple entrance fade, no pin ───────────────────────────
        '(max-width: 767px)': () => {
          gsap.fromTo(
            [typographyRef.current, portraitStageRef.current],
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
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

    const stage = portraitStageRef.current;
    if (!stage) return;

    const quickX = gsap.quickTo(stage, 'x', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const quickY = gsap.quickTo(stage, 'y', {
      duration: 0.6,
      ease: 'power3.out',
    });

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = ((e.clientX - cx) / cx) * 8;   // ±8px
      const dy = ((e.clientY - cy) / cy) * 8;
      quickX(dx);
      quickY(dy);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.set(stage, { x: 0, y: 0 });
    };
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={rootRef}
      className="hero-stage"
      aria-label="Portfolio hero"
    >
      {/* ── Giant ghost wordmark (z-1) ── */}
      <h2 ref={typographyRef} className="hero-wordmark" aria-hidden="true">
        PORTFOLIO
      </h2>

      {/* ── Portrait layer (z-2) ── */}
      <div ref={portraitStageRef} className="hero-portrait-stage">
        <picture>
          {/* Source: 3.3 MB PNG with alpha — served directly (no build-time optimization yet) */}
          <img
            src={PORTRAIT_SRC}
            alt="Jonathan Axl Wibowo — Full-Stack Engineer"
            // @ts-expect-error – fetchpriority is a valid HTML attribute
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      {/* ── Video cross-fade layer (z-3) — starts invisible ── */}
      <div ref={videoStageRef} className="hero-video-stage">
        {/*
          preload="none" — src is assigned programmatically by ScrollTrigger
          to avoid eager network cost on slow connections.
        */}
        <video
          ref={videoElRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      </div>

      {/* ── HUD telemetry decoration (z-20) ── */}
      <HUDOverlay progressFillRef={progressFillRef} />

      {/* ── Foreground identity copy (z-10) ── */}
      <div className="hero-foreground" aria-label="Identity">
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
          Full-Stack Engineer · High-Performance Web &amp; AI
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '0.75rem', pointerEvents: 'auto' }}>
          <a
            href="/cv.pdf"
            download
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
              transition: 'border-color 0.2s, background 0.2s',
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
