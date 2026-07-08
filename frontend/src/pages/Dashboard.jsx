import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const features = [
  { icon: '📡', title: 'ThreatRadar', desc: 'Track document expiry dates and get proactive alerts', path: '/threatradar', tag: 'Proactive' },
  { icon: '🛡️', title: 'ShieldMode', desc: 'Real-time rights display during police interactions', path: '/shieldmode', tag: 'Emergency' },
  { icon: '📝', title: 'QuickComplaint', desc: 'AI drafts formal complaint letters with legal sections', path: '/quickcomplaint', tag: 'AI Draft' },
  { icon: '🔍', title: 'ForgeScan', desc: 'AI identifies red flags in any legal document', path: '/forgescan', tag: 'Scanner' },
  { icon: '⚖️', title: 'LexCounsel', desc: 'Structured AI legal consultation for your situation', path: '/lexcounsel', tag: 'Counsel' },
  { icon: '📄', title: 'LexDraft', desc: 'Generate rent agreements, affidavits, notices instantly', path: '/lexdraft', tag: 'Generator' },
  { icon: '🧬', title: 'LegalInheritance', desc: 'Track legal documentation gaps for you and spouse', path: '/legalinheritance', tag: 'Planner' },
  { icon: '🤝', title: 'LexConnect', desc: 'Find free legal aid and lawyers across India', path: '/lexconnect', tag: 'Directory' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes goldPulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.4; }
        }
        @keyframes slideRight {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .feat-row {
          transition: background 0.18s ease;
          cursor: pointer;
        }
        .feat-row:hover { background: rgba(201,168,76,0.04) !important; }

        .nav-link {
          font-size: 13px; font-weight: 500;
          color: #555550; cursor: pointer;
          transition: color 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        .nav-link:hover { color: #F0EDE8; }

        .sign-out {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #444;
          padding: 7px 14px; border-radius: 8px;
          font-size: 12px; font-weight: 500;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .sign-out:hover {
          border-color: rgba(224,82,82,0.3);
          color: #E05252;
          background: rgba(224,82,82,0.06);
        }

        .cta-gold {
          background: #C9A84C; color: #080808;
          border: none; padding: 13px 26px;
          border-radius: 10px; font-size: 14px;
          font-weight: 700; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .cta-gold:hover {
          background: #E2C47A;
          box-shadow: 0 8px 24px rgba(201,168,76,0.3);
          transform: translateY(-1px);
        }

        .cta-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #888880; padding: 12px 20px;
          border-radius: 10px; font-size: 14px;
          font-weight: 500; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .cta-ghost:hover {
          background: rgba(255,255,255,0.04);
          color: #F0EDE8;
          border-color: rgba(255,255,255,0.15);
        }
      `}</style>

      {/* ── NAV ── */}
      <header style={s.nav}>
        <div style={s.navL}>
          <div style={s.logoBox}>⚖️</div>
          <span style={s.logoTxt}>LexOS</span>
          <span style={s.pipe}>|</span>
          <span style={s.navCap}>Legal Intelligence</span>
        </div>
        <div style={s.navR}>
          <span className="nav-link" onClick={() => navigate('/lexcounsel')}>Counsel</span>
          <span className="nav-link" onClick={() => navigate('/shieldmode')}>ShieldMode</span>
          <span className="nav-link" onClick={() => navigate('/lexconnect')}>Connect</span>
          <div style={s.chip}>
            <div style={s.chipAvatar}>{user?.name?.charAt(0).toUpperCase()}</div>
            <span style={s.chipName}>{user?.name?.split(' ')[0]}</span>
          </div>
          <button className="sign-out" onClick={() => { logout(); navigate('/login') }}>
            Sign out
          </button>
        </div>
      </header>

      {/* ── SPLIT BODY ── */}
      <div style={s.split}>

        {/* LEFT — Hero */}
        <div style={{
          ...s.left,
          opacity: mounted ? 1 : 0,
          animation: mounted ? 'fadeUp 0.65s ease forwards' : 'none'
        }}>
          <div style={s.leftGlow} />

          <div style={s.eyebrow}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#C9A84C', display: 'inline-block',
              animation: 'goldPulse 2.5s ease infinite'
            }} />
            <span style={s.eyebrowTxt}>AI-Powered · India-First · Always Free</span>
          </div>

          <h1 style={s.h1}>
            Know your<br />
            legal rights.<br />
            <em style={s.h1Em}>Act with confidence.</em>
          </h1>

          <p style={s.heroPara}>
            LexOS gives every Indian citizen instant access to
            AI-powered legal guidance — from police interactions
            to document drafting, completely free.
          </p>

          <div style={s.ctaRow}>
            <button className="cta-gold" onClick={() => navigate('/lexcounsel')}>
              Get Legal Consultation →
            </button>
            <button className="cta-ghost" onClick={() => navigate('/shieldmode')}>
              🛡️ ShieldMode
            </button>
          </div>

          {/* Stats */}
          <div style={s.statsRow}>
            {[
              { v: '9', l: 'AI Features' },
              { v: '₹0', l: 'Cost' },
              { v: '24/7', l: 'Available' },
              { v: '100%', l: 'India-Specific' },
            ].map((st, i) => (
              <div key={i} style={s.statItem}>
                <span style={s.statV}>{st.v}</span>
                <span style={s.statL}>{st.l}</span>
              </div>
            ))}
          </div>

          {/* Active feature preview */}
          <div style={s.previewBox}>
            <div style={s.previewEye}>Currently viewing</div>
            <div style={s.previewTitle}>
              {features[activeFeature].icon} {features[activeFeature].title}
            </div>
            <p style={s.previewDesc}>{features[activeFeature].desc}</p>
            <button
              className="cta-ghost"
              style={{marginTop: 16, fontSize: 13}}
              onClick={() => navigate(features[activeFeature].path)}
            >
              Open {features[activeFeature].title} →
            </button>
          </div>
        </div>

        {/* RIGHT — Feature List */}
        <div style={s.right}>
          <div style={s.rightHead}>
            <span style={s.rightEye}>Platform Features</span>
          </div>

          <div style={s.featList}>
            {features.map((f, i) => (
              <div
                key={i}
                className="feat-row"
                style={{
                  ...s.featRow,
                  background: activeFeature === i
                    ? 'rgba(201,168,76,0.05)'
                    : 'transparent',
                  borderLeftColor: activeFeature === i
                    ? '#C9A84C'
                    : 'transparent',
                  animation: mounted
                    ? `fadeUp 0.4s ease ${i * 0.05}s both`
                    : 'none'
                }}
                onClick={() => navigate(f.path)}
                onMouseEnter={() => setActiveFeature(i)}
              >
                <div style={s.featLeft}>
                  <span style={s.featNum}>0{i + 1}</span>
                  <div>
                    <div style={s.featName}>
                      {f.icon} {f.title}
                    </div>
                    <div style={s.featDesc}>{f.desc}</div>
                  </div>
                </div>
                <div style={s.featRight}>
                  <span style={{
                    ...s.featTag,
                    color: activeFeature === i ? '#C9A84C' : '#333330',
                    borderColor: activeFeature === i
                      ? 'rgba(201,168,76,0.2)'
                      : 'rgba(255,255,255,0.06)'
                  }}>
                    {f.tag}
                  </span>
                  <span style={{
                    fontSize: 14,
                    color: activeFeature === i ? '#C9A84C' : '#333330',
                    transition: 'all 0.2s ease',
                    transform: activeFeature === i ? 'translateX(3px)' : 'none',
                    display: 'inline-block'
                  }}>→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom disclaimer */}
          <div style={s.disclaimer}>
            ⚠️ LexOS provides AI-powered legal information based on Indian law.
            Not a substitute for professional legal advice.
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <span style={s.footL}>⚖️ LexOS · Legal Intelligence for India</span>
        <span style={s.footR}>© 2025 · Built for India 🇮🇳</span>
      </footer>
    </div>
  )
}

const GOLD = '#C9A84C'
const BORDER = 'rgba(255,255,255,0.06)'

const s = {
  root: {
    minHeight: '100vh', background: '#080808',
    color: '#F0EDE8',
    fontFamily: "'Inter', -apple-system, sans-serif",
    display: 'flex', flexDirection: 'column'
  },

  // Nav
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 48px', height: '62px',
    borderBottom: `1px solid ${BORDER}`,
    background: 'rgba(8,8,8,0.97)',
    backdropFilter: 'blur(16px)',
    position: 'sticky', top: 0, zIndex: 200, flexShrink: 0
  },
  navL: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoBox: {
    width: '30px', height: '30px', borderRadius: '7px',
    background: `linear-gradient(135deg, ${GOLD}, #E2C47A)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px'
  },
  logoTxt: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '19px', fontWeight: '700',
    background: `linear-gradient(135deg, #F0EDE8 40%, ${GOLD})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  pipe: { color: 'rgba(255,255,255,0.08)', fontSize: '16px', fontWeight: '300' },
  navCap: { fontSize: '12px', color: '#333330', fontWeight: '400' },
  navR: { display: 'flex', alignItems: 'center', gap: '24px' },
  chip: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${BORDER}`,
    borderRadius: '100px', padding: '3px 12px 3px 3px'
  },
  chipAvatar: {
    width: '24px', height: '24px', borderRadius: '50%',
    background: `linear-gradient(135deg, ${GOLD}, #E2C47A)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '10px', fontWeight: '700', color: '#080808'
  },
  chipName: { fontSize: '12px', color: '#888880', fontWeight: '500' },

  // Split
  split: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    flex: 1, minHeight: 'calc(100vh - 62px)'
  },

  // Left
  left: {
    padding: '72px 56px 72px 48px',
    borderRight: `1px solid ${BORDER}`,
    position: 'relative', overflow: 'hidden',
    display: 'flex', flexDirection: 'column', justifyContent: 'center'
  },
  leftGlow: {
    position: 'absolute', top: '-100px', left: '-60px',
    width: '400px', height: '400px', borderRadius: '50%',
    background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)`,
    pointerEvents: 'none'
  },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(201,168,76,0.08)',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: '100px', padding: '5px 14px', marginBottom: '28px',
    width: 'fit-content'
  },
  eyebrowTxt: { fontSize: '11px', fontWeight: '600', color: GOLD, letterSpacing: '0.08em' },
  h1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(36px, 4vw, 56px)',
    fontWeight: '800', lineHeight: '1.1',
    letterSpacing: '-0.02em', marginBottom: '20px', color: '#F0EDE8'
  },
  h1Em: {
    fontStyle: 'italic',
    background: `linear-gradient(135deg, ${GOLD} 0%, #E2C47A 60%, ${GOLD} 100%)`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  heroPara: {
    fontSize: '15px', color: '#555550', lineHeight: '1.8',
    marginBottom: '32px', maxWidth: '440px'
  },
  ctaRow: { display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' },
  statsRow: {
    display: 'flex', gap: '0',
    background: 'rgba(255,255,255,0.02)',
    border: `1px solid ${BORDER}`,
    borderRadius: '12px', marginBottom: '28px',
    width: 'fit-content'
  },
  statItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '14px 22px', borderRight: `1px solid ${BORDER}`
  },
  statV: { fontSize: '20px', fontWeight: '800', color: '#F0EDE8', lineHeight: '1', letterSpacing: '-0.02em' },
  statL: { fontSize: '10px', color: '#333330', marginTop: '3px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' },

  // Preview box
  previewBox: {
    background: '#0D0D0D',
    border: `1px solid ${BORDER}`,
    borderLeft: `2px solid ${GOLD}`,
    borderRadius: '12px', padding: '20px 22px'
  },
  previewEye: { fontSize: '10px', fontWeight: '700', color: '#333330', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' },
  previewTitle: { fontSize: '16px', fontWeight: '700', color: '#F0EDE8', marginBottom: '6px' },
  previewDesc: { fontSize: '13px', color: '#555550', lineHeight: '1.6' },

  // Right
  right: {
    display: 'flex', flexDirection: 'column',
    padding: '0', overflow: 'hidden'
  },
  rightHead: {
    padding: '24px 40px 20px',
    borderBottom: `1px solid ${BORDER}`
  },
  rightEye: {
    fontSize: '11px', fontWeight: '700', color: GOLD,
    letterSpacing: '0.15em', textTransform: 'uppercase'
  },
  featList: { flex: 1, overflowY: 'auto' },
  featRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 40px',
    borderLeft: '2px solid transparent',
    borderBottom: `1px solid ${BORDER}`,
    transition: 'all 0.18s ease'
  },
  featLeft: { display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 },
  featNum: {
    fontSize: '11px', fontWeight: '600', color: '#2a2a28',
    fontFamily: 'monospace', marginTop: '2px', flexShrink: 0
  },
  featName: { fontSize: '14px', fontWeight: '700', color: '#E8E5E0', marginBottom: '3px' },
  featDesc: { fontSize: '12px', color: '#444440', lineHeight: '1.5' },
  featRight: { display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: '16px' },
  featTag: {
    fontSize: '10px', fontWeight: '600',
    padding: '3px 9px', borderRadius: '100px',
    border: '1px solid',
    textTransform: 'uppercase', letterSpacing: '0.08em',
    transition: 'all 0.18s ease'
  },
  disclaimer: {
    padding: '16px 40px',
    borderTop: `1px solid ${BORDER}`,
    fontSize: '11px', color: '#2a2a28', lineHeight: '1.6'
  },

  // Footer
  footer: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 48px',
    borderTop: `1px solid ${BORDER}`,
    flexShrink: 0
  },
  footL: { fontSize: '12px', color: '#222220', fontFamily: "'Playfair Display', serif" },
  footR: { fontSize: '11px', color: '#1a1a18' }
}