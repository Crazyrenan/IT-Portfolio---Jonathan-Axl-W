import { useState, useEffect, useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────
type FormState = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

// ── CLI typing intro lines ─────────────────────────────────────────────────────
const BOOT_LINES = [
  '> initializing_contact_terminal...',
  '> establishing_secure_channel...',
  '> encryption: AES-256 // status: ACTIVE',
  '> target: jonathan.axlw@gmail.com',
  '> awaiting_transmission...',
];

// ── Validation ─────────────────────────────────────────────────────────────────
function validate(data: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  if (!data.name.trim()) errors.name = 'NAME_REQUIRED';
  if (!data.email.trim()) {
    errors.email = 'EMAIL_REQUIRED';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'EMAIL_INVALID';
  }
  if (!data.message.trim()) errors.message = 'MESSAGE_REQUIRED';
  else if (data.message.trim().length < 10) errors.message = 'MESSAGE_TOO_SHORT';
  return errors;
}

// ── Shared input style ─────────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(15,15,17,0.8)',
  border: '1px solid rgba(104,24,38,0.35)',
  padding: '0.6rem 0.75rem',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.75rem',
  color: 'rgb(224,213,201)',
  outline: '2px solid transparent',   /* visible in forced-colors/HC mode */
  outlineOffset: '2px',
  letterSpacing: '0.04em',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  resize: 'none' as const,
};

const inputFocused: React.CSSProperties = {
  borderColor: 'rgba(255,102,0,0.6)',
  boxShadow: '0 0 0 2px rgba(255,102,0,0.08), inset 0 0 8px rgba(255,102,0,0.04)',
  outlineColor: 'rgba(255,102,0,0.5)',
};

const errorStyle: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.6rem',
  color: 'rgba(255,102,0,0.8)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginTop: '0.35rem',
  display: 'block',
};

const labelStyle: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.6rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(255,102,0,0.65)',
  display: 'block',
  marginBottom: '0.3rem',
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function ContactTerminal() {
  const [bootIndex, setBootIndex]   = useState(0);
  const [bootDone, setBootDone]     = useState(false);
  const [formData, setFormData]     = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors]         = useState<Partial<Record<keyof FormData, string>>>({});
  const [focused, setFocused]       = useState<keyof FormData | null>(null);
  const [formState, setFormState]   = useState<FormState>('idle');
  const [blink, setBlink]           = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // CLI typing boot sequence
  useEffect(() => {
    if (bootIndex >= BOOT_LINES.length) {
      setBootDone(true);
      return;
    }
    const delay = bootIndex === 0 ? 400 : 320 + Math.random() * 160;
    const t = setTimeout(() => setBootIndex(i => i + 1), delay);
    return () => clearTimeout(t);
  }, [bootIndex]);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  const handleChange = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(d => ({ ...d, [key]: e.target.value }));
    if (errors[key]) setErrors(err => ({ ...err, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setFormState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormState('error');
      }
    } catch {
      // Network failure — show fallback mailto
      setFormState('error');
    }
    setTimeout(() => setFormState('idle'), 6000);
  };

  const accentOrange = 'rgba(255,102,0,0.85)';

  return (
    <footer
      id="contact"
      style={{
        background: 'rgb(15,15,17)',
        borderTop: '1px solid rgba(104,24,38,0.3)',
        paddingTop: '5rem',
        paddingBottom: '3rem',
        marginTop: '5rem',
        position: 'relative',
        zIndex: 20,
        fontFamily: '"JetBrains Mono", monospace',
        overflow: 'hidden',
      }}
      aria-label="Contact terminal"
    >
      {/* Background glow */}
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width:'600px', height:'300px',
        background:'rgba(104,24,38,0.06)', filter:'blur(120px)',
        borderRadius:'50%', pointerEvents:'none',
      }} aria-hidden="true" />

      <div style={{ maxWidth:'56rem', margin:'0 auto', padding:'0 1.5rem', position:'relative' }}>

        {/* Section header */}
        <div style={{ marginBottom:'3rem' }}>
          <span style={{ fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:accentOrange, display:'block', marginBottom:'0.5rem' }}>
            // INITIATE_CONTACT
          </span>
          <h2 style={{ fontFamily:'"Space Grotesk",sans-serif', fontWeight:700, fontSize:'clamp(1.75rem,4vw,2.5rem)', color:'rgb(224,213,201)', letterSpacing:'-0.02em', lineHeight:1.1 }}>
            Open <span style={{ color:'rgb(209,38,54)' }}>Transmission</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'2.5rem' }} className="md:grid-cols-2">

          {/* ── Terminal window ── */}
          <div ref={terminalRef} style={{
            background:'rgba(27,27,30,0.9)', backdropFilter:'blur(16px)',
            border:'1px solid rgba(104,24,38,0.5)',
            position:'relative', overflow:'hidden',
          }}>
            {/* Corner brackets */}
            <div style={{ position:'absolute', top:0, left:0, width:'12px', height:'12px', borderTop:`1.5px solid ${accentOrange}`, borderLeft:`1.5px solid ${accentOrange}` }} aria-hidden="true" />
            <div style={{ position:'absolute', bottom:0, right:0, width:'12px', height:'12px', borderBottom:`1.5px solid ${accentOrange}`, borderRight:`1.5px solid ${accentOrange}` }} aria-hidden="true" />

            {/* Terminal chrome */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0.6rem 1rem', borderBottom:'1px solid rgba(104,24,38,0.3)', background:'rgba(15,15,17,0.6)' }}>
              <div style={{ display:'flex', gap:'0.4rem' }}>
                {['rgb(209,38,54)', 'rgba(255,102,0,0.8)', 'rgba(224,213,201,0.2)'].map((c, i) => (
                  <div key={i} style={{ width:'8px', height:'8px', borderRadius:'50%', background:c }} aria-hidden="true" />
                ))}
              </div>
              <span style={{ fontSize:'0.58rem', color:'rgba(224,213,201,0.3)', letterSpacing:'0.15em', textTransform:'uppercase' }}>
                TERMINAL_LINK // 0xAF
              </span>
            </div>

            {/* Boot lines */}
            <div style={{ padding:'1.25rem 1rem', minHeight:'11rem' }} aria-live="polite" aria-atomic="false">
              {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
                <div key={i} style={{ fontSize:'0.7rem', color: i === BOOT_LINES.length - 1 ? 'rgba(224,213,201,0.5)' : 'rgba(224,213,201,0.35)', marginBottom:'0.35rem', letterSpacing:'0.04em' }}>
                  <span style={{ color: accentOrange, marginRight:'0.3rem' }}>$</span>
                  {line.replace('> ', '')}
                </div>
              ))}

              {bootDone && (
                <>
                  <div style={{ display:'flex', alignItems:'center', marginTop:'0.5rem', fontSize:'0.7rem', color:'rgba(224,213,201,0.7)' }}>
                    <span style={{ color:accentOrange, marginRight:'0.4rem' }}>{'>'}</span>
                    <span style={{
                      display:'inline-block', width:'8px', height:'14px',
                      background: blink ? accentOrange : 'transparent',
                      transition: 'background 0.1s',
                      verticalAlign:'middle',
                    }} aria-hidden="true" />
                  </div>

                  {/* Status feedback */}
                  {formState === 'sending' && (
                    <div style={{ marginTop:'0.75rem', fontSize:'0.65rem', color:'rgba(255,102,0,0.8)', letterSpacing:'0.08em', animation:'pulse 1.5s ease-in-out infinite' }}>
                      TRANSMITTING...
                    </div>
                  )}
                  {formState === 'success' && (
                    <div style={{ marginTop:'0.75rem', fontSize:'0.65rem', color:'rgb(52,211,153)', letterSpacing:'0.08em' }}>
                      {'>'} TRANSMISSION_COMPLETE // ACK_RECEIVED<br />
                      <span style={{ color:'rgba(52,211,153,0.6)', marginTop:'0.2rem', display:'block' }}>
                        Response ETA: 24h — UTC+07:00
                      </span>
                    </div>
                  )}
                  {formState === 'error' && (
                    <div style={{ marginTop:'0.75rem', fontSize:'0.65rem', color:'rgba(255,102,0,0.8)', letterSpacing:'0.08em' }}>
                      {'>'} CONNECTION_FAILED // fallback via{' '}
                      <a href="mailto:jonathan.axlw@gmail.com" style={{ color:accentOrange, textDecoration:'underline' }}>
                        direct_email()
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── Contact form ── */}
          <form onSubmit={handleSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

            {/* Name */}
            <div>
              <label htmlFor="ct-name" style={labelStyle}>01 // YOUR_NAME</label>
              <input
                id="ct-name"
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                placeholder="Jonathan Doe"
                autoComplete="name"
                style={{ ...inputBase, ...(focused === 'name' ? inputFocused : {}), ...(errors.name ? { borderColor:'rgba(255,102,0,0.7)' } : {}) }}
              />
              {errors.name && <span style={errorStyle} role="alert">{errors.name}</span>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="ct-email" style={labelStyle}>02 // COMM_CHANNEL</label>
              <input
                id="ct-email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                placeholder="name@domain.com"
                autoComplete="email"
                style={{ ...inputBase, ...(focused === 'email' ? inputFocused : {}), ...(errors.email ? { borderColor:'rgba(255,102,0,0.7)' } : {}) }}
              />
              {errors.email && <span style={errorStyle} role="alert">{errors.email}</span>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="ct-message" style={labelStyle}>03 // PAYLOAD_DATA</label>
              <textarea
                id="ct-message"
                rows={5}
                value={formData.message}
                onChange={handleChange('message')}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                placeholder="Describe your mission..."
                style={{ ...inputBase, ...(focused === 'message' ? inputFocused : {}), ...(errors.message ? { borderColor:'rgba(255,102,0,0.7)' } : {}), resize:'vertical' }}
              />
              {errors.message && <span style={errorStyle} role="alert">{errors.message}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formState === 'sending'}
              style={{
                display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                padding:'0.75rem 1.5rem',
                background: formState === 'sending' ? 'rgba(255,102,0,0.15)' : 'rgba(255,102,0,0.12)',
                border:`1px solid ${accentOrange}`,
                color: accentOrange,
                fontFamily:'"JetBrains Mono",monospace', fontSize:'0.7rem',
                letterSpacing:'0.18em', textTransform:'uppercase',
                cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                transition:'background 0.2s ease, box-shadow 0.2s ease',
                outline:'none',
              }}
              onMouseOver={e => {
                if (formState !== 'sending') {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,102,0,0.2)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 16px rgba(255,102,0,0.15)';
                }
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,102,0,0.12)';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '';
              }}
              onFocus={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 2px rgba(255,102,0,0.3)`; }}
              onBlur={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = ''; }}
              aria-label="Send transmission"
            >
              {formState === 'sending' ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation:'spin 1s linear infinite' }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  TRANSMITTING...
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                  SEND_TRANSMISSION
                </>
              )}
            </button>

          </form>
        </div>

        {/* Footer info row */}
        <div style={{
          marginTop:'3.5rem', paddingTop:'1.5rem',
          borderTop:'1px solid rgba(104,24,38,0.2)',
          display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between',
          gap:'1rem',
        }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'1.5rem' }}>
            {[
              { label:'GitHub', href:'https://github.com/Crazyrenan' },
              { label:'LinkedIn', href:'https://www.linkedin.com/in/jonathan-axl-b10567253/' },
              { label:'Email', href:'mailto:jonathan.axlw@gmail.com' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                style={{ fontSize:'0.65rem', color:'rgba(224,213,201,0.35)', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', transition:'color 0.2s' }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.color = accentOrange; }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(224,213,201,0.35)'; }}
              >
                {'>'} {link.label}
              </a>
            ))}
          </div>
          <p style={{ fontSize:'0.58rem', color:'rgba(224,213,201,0.2)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
            © {new Date().getFullYear()} Jonathan Axl Wibowo // ALL_RIGHTS_RESERVED
          </p>
        </div>

      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 768px) { .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </footer>
  );
}
