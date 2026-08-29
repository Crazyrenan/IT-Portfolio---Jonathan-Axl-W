import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Data ──────────────────────────────────────────────────────────────────────
interface Milestone {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'industry' | 'research' | 'freelance';
  highlights: string[];
  tags: string[];
}

const milestones: Milestone[] = [
  {
    id: 'LKH_2026',
    period: 'MAY – JUL 2026',
    role: 'Full-Stack Web Developer',
    company: 'PT Lautan Kencana Hidup',
    location: 'Jakarta, ID',
    type: 'industry',
    highlights: [
      'Built end-to-end enterprise field service & operations portal',
      'SHA-256 blockchain hash-chaining for forensic-grade audit trail',
      'RBAC with atomic supply-chain transaction commits',
      'Two-stage inbound staging pipeline for inventory integrity',
    ],
    tags: ['FastAPI', 'React', 'PostgreSQL', 'Blockchain'],
  },
  {
    id: 'IEEE_2026',
    period: 'FEB – JUN 2026',
    role: 'AI Researcher & Lead Author',
    company: 'IEEE YESIST12 Competition',
    location: 'International',
    type: 'research',
    highlights: [
      'Comparative study: Hybrid CNN (ComNet) vs. Swin Transformer vs. DeiT',
      '97% overall accuracy on TBX11K Chest X-Ray dataset',
      '100% healthy-class recall via Swin Transformer',
      'Grad-CAM interpretability for clinical transparency',
    ],
    tags: ['PyTorch', 'Swin-T', 'DeiT', 'Grad-CAM', 'IEEE'],
  },
  {
    id: 'IMIP_2025',
    period: '2025 – 2026',
    role: 'IT Application Developer',
    company: 'Indonesia Morowali Industrial Park',
    location: 'Morowali, ID',
    type: 'industry',
    highlights: [
      'Enterprise e-recruitment portal for 1000+ applicant pipeline',
      'AI-assisted candidate screening & smart-search module',
      'Database query optimization — 40% load time reduction',
      'Figma → modular Blade component tokenization',
    ],
    tags: ['Laravel', 'Python', 'SCSS', 'Figma', 'MySQL'],
  },
  {
    id: 'FREELANCE_2022',
    period: '2022 – 2025',
    role: 'Freelance Editor & Tech Lead',
    company: 'Independent',
    location: 'Remote',
    type: 'freelance',
    highlights: [
      'VFX compositing & cinematic colour grading for corporate clients',
      'Company profile video production & direction',
      'Led Information System documentation team',
    ],
    tags: ['VFX', 'Colour Grading', 'Video Production'],
  },
];

const typeColor: Record<Milestone['type'], string> = {
  industry:  'rgba(255,102,0,0.85)',
  research:  'rgb(209,38,54)',
  freelance: 'rgba(224,213,201,0.4)',
};

const typeLabel: Record<Milestone['type'], string> = {
  industry:  'INDUSTRY',
  research:  'RESEARCH',
  freelance: 'FREELANCE',
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ExperienceTimeline() {
  const rootRef      = useRef<HTMLElement>(null);
  const nodeRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const railRef      = useRef<HTMLDivElement>(null);
  const railFillRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Static reveal — just make everything visible
      nodeRefs.current.forEach(n => { if (n) n.style.opacity = '1'; });
      cardRefs.current.forEach(c => { if (c) { c.style.opacity = '1'; c.style.transform = 'none'; } });
      if (railFillRef.current) railFillRef.current.style.transform = 'scaleY(1)';
      return;
    }

    const ctx = gsap.context(() => {
      // ── Rail fill driven by scroll ─────────────────────────────────────────
      if (railFillRef.current) {
        gsap.fromTo(
          railFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 75%',
              end: 'bottom 30%',
              scrub: 0.4,
            },
          }
        );
      }

      // ── Per-node active highlight + card entrance ──────────────────────────
      milestones.forEach((_, i) => {
        const node = nodeRefs.current[i];
        const card = cardRefs.current[i];
        if (!node || !card) return;

        // Card entrance
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -32 : 32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Node pulse on enter viewport
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            gsap.to(node, { scale: 1.35, duration: 0.25, ease: 'power2.out',
              onComplete: () => { gsap.to(node, { scale: 1, duration: 0.2, ease: 'power2.inOut' }); } });
            node.classList.add('is-active');
          },
          onLeave: () => node.classList.remove('is-active'),
          onEnterBack: () => node.classList.add('is-active'),
          onLeaveBack: () => node.classList.remove('is-active'),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="experience"
      style={{
        padding: '6rem 1.5rem',
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(104,24,38,0.2)',
        overflow: 'hidden',
      }}
      aria-label="Work experience timeline"
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '300px',
        background: 'rgba(104,24,38,0.04)', filter: 'blur(120px)',
        borderRadius: '50%', pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end',
          justifyContent: 'space-between', gap: '1rem',
          borderBottom: '1px solid rgba(104,24,38,0.25)',
          paddingBottom: '1.5rem', marginBottom: '4rem',
        }}>
          <div>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: '0.7rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgb(209,38,54)', display: 'block', marginBottom: '0.5rem',
            }}>
              // SERVICE_RECORD
            </span>
            <h2 style={{
              fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'rgb(224,213,201)',
              letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              Work <span style={{ color: 'rgb(209,38,54)' }}>Experience</span>
            </h2>
          </div>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace', fontSize: '0.65rem',
            color: 'rgba(224,213,201,0.25)', letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            DEPLOYMENT_HISTORY // {milestones.length} ENTRIES
          </span>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Vertical rail (desktop) */}
          <div
            ref={railRef}
            style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '1px', background: 'rgba(104,24,38,0.2)',
              transform: 'translateX(-50%)',
              display: 'none',
            }}
            className="md:block"
            aria-hidden="true"
          >
            {/* Animated fill */}
            <div
              ref={railFillRef}
              style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                background: 'linear-gradient(to bottom, rgba(255,102,0,0.6), rgba(209,38,54,0.4))',
                transformOrigin: 'top',
                height: '100%',
              }}
            />
          </div>

          {/* Mobile rail */}
          <div style={{
            position: 'absolute', left: '1rem', top: 0, bottom: 0,
            width: '1px', background: 'rgba(104,24,38,0.2)',
          }} className="md:hidden" aria-hidden="true" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {milestones.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={m.id}
                  style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                  }}
                  className="md:grid-cols-[1fr_auto_1fr]"
                >
                  {/* Left slot (even = card, odd = spacer) */}
                  <div
                    ref={el => { if (!isEven) cardRefs.current[i] = el; }}
                    style={{
                      opacity: isEven ? 1 : 0,
                      // Card styles applied below if slot has card
                      display: 'flex',
                      justifyContent: isEven ? 'flex-end' : 'flex-end',
                      paddingRight: isEven ? '0' : '0',
                    }}
                    className={isEven ? '' : 'hidden md:flex'}
                  />

                  {/* Node */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    paddingTop: '1.25rem',
                    position: 'absolute', left: '0.5rem',
                  }} className="md:static md:pt-5">
                    <div
                      ref={el => { nodeRefs.current[i] = el; }}
                      className="timeline-node"
                      style={{
                        width: '14px', height: '14px', borderRadius: '50%',
                        border: `2px solid ${typeColor[m.type]}`,
                        background: 'rgb(15,15,17)',
                        boxShadow: `0 0 0 4px rgba(15,15,17,0.8), 0 0 12px ${typeColor[m.type]}`,
                        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                        flexShrink: 0,
                        opacity: 0,
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Right slot (even = spacer, odd = card) */}
                  <div
                    ref={el => { cardRefs.current[i] = el; }}
                    style={{
                      paddingLeft: '3rem',
                      opacity: 0,
                      transform: isEven ? 'translateX(-32px)' : 'translateX(32px)',
                    }}
                    className="md:pl-8"
                  >
                    {/* Dossier card */}
                    <article style={{
                      background: 'rgba(27,27,30,0.7)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(104,24,38,0.25)',
                      padding: '1.25rem 1.5rem',
                      position: 'relative',
                      transition: 'border-color 0.3s ease',
                    }}
                      onMouseOver={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,102,0,0.35)';
                        (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(2px -2px 0px rgba(255,102,0,0.25))';
                      }}
                      onMouseOut={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = '';
                        (e.currentTarget as HTMLElement).style.filter = '';
                      }}
                    >
                      {/* Corner brackets */}
                      <div style={{ position:'absolute', top:0, left:0, width:'10px', height:'10px', borderTop:'1.5px solid rgba(255,102,0,0.3)', borderLeft:'1.5px solid rgba(255,102,0,0.3)' }} aria-hidden="true" />
                      <div style={{ position:'absolute', bottom:0, right:0, width:'10px', height:'10px', borderBottom:'1.5px solid rgba(255,102,0,0.3)', borderRight:'1.5px solid rgba(255,102,0,0.3)' }} aria-hidden="true" />

                      {/* Header */}
                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'0.75rem', marginBottom:'0.75rem', flexWrap:'wrap' }}>
                        <div>
                          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.3rem' }}>
                            <span style={{
                              fontFamily:'"JetBrains Mono",monospace', fontSize:'0.6rem',
                              padding:'0.15rem 0.5rem', border:`1px solid ${typeColor[m.type]}`,
                              color: typeColor[m.type], letterSpacing:'0.15em', textTransform:'uppercase',
                            }}>
                              {typeLabel[m.type]}
                            </span>
                            <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'0.6rem', color:'rgba(224,213,201,0.25)', letterSpacing:'0.1em' }}>
                              {m.id}
                            </span>
                          </div>
                          <h3 style={{ fontFamily:'"Space Grotesk",sans-serif', fontWeight:700, fontSize:'1rem', color:'rgb(224,213,201)', lineHeight:1.3 }}>
                            {m.role}
                          </h3>
                          <p style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'0.65rem', color:'rgba(224,213,201,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'0.2rem' }}>
                            @ {m.company} · {m.location}
                          </p>
                        </div>
                        <span style={{
                          fontFamily:'"JetBrains Mono",monospace', fontSize:'0.6rem',
                          padding:'0.2rem 0.5rem',
                          border:'1px solid rgba(104,24,38,0.4)',
                          color:'rgb(209,38,54)', letterSpacing:'0.1em', whiteSpace:'nowrap',
                          background:'rgba(104,24,38,0.1)',
                        }}>
                          {m.period}
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul style={{ listStyle:'none', padding:0, margin:'0.75rem 0', display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                        {m.highlights.map((h, hi) => (
                          <li key={hi} style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem', fontFamily:'"JetBrains Mono",monospace', fontSize:'0.7rem', color:'rgba(224,213,201,0.55)', lineHeight:1.5 }}>
                            <span style={{ marginTop:'0.45rem', width:'5px', height:'5px', borderRadius:'50%', background:'rgba(255,102,0,0.7)', flexShrink:0 }} aria-hidden="true" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem', paddingTop:'0.6rem', borderTop:'1px solid rgba(104,24,38,0.12)' }}>
                        {m.tags.map(t => (
                          <span key={t} style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:'0.58rem', padding:'0.15rem 0.45rem', border:'1px solid rgba(104,24,38,0.3)', color:'rgba(224,213,201,0.35)', textTransform:'uppercase', letterSpacing:'0.12em' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inline active-node CSS */}
      <style>{`
        .timeline-node { opacity: 0; }
        .timeline-node.is-active {
          box-shadow: 0 0 0 4px rgba(15,15,17,0.8), 0 0 20px rgba(255,102,0,0.7) !important;
          border-color: rgba(255,102,0,0.9) !important;
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-\\[1fr_auto_1fr\\] { grid-template-columns: 1fr auto 1fr; }
          .md\\:block { display: block !important; }
          .md\\:hidden { display: none !important; }
          .md\\:static { position: static !important; }
          .md\\:pt-5 { padding-top: 1.25rem; }
          .md\\:pl-8 { padding-left: 2rem; }
        }
      `}</style>
    </section>
  );
}
