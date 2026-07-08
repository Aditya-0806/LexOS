import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const features = [
  { icon: '📡', title: 'ThreatRadar', desc: 'Track document expiry dates and get proactive alerts before deadlines hit', path: '/threatradar', tag: 'Proactive' },
  { icon: '🛡️', title: 'ShieldMode', desc: 'Real-time rights display during police interactions with live audio guidance', path: '/shieldmode', tag: 'Emergency' },
  { icon: '📝', title: 'QuickComplaint', desc: 'AI drafts a formal complaint letter with exact legal sections in seconds', path: '/quickcomplaint', tag: 'AI Draft' },
  { icon: '🔍', title: 'ForgeScan', desc: 'Upload any legal document — AI identifies red flags and missing clauses', path: '/forgescan', tag: 'Scanner' },
  { icon: '⚖️', title: 'LexCounsel', desc: 'Structured AI legal consultation with rights, options and next steps', path: '/lexcounsel', tag: 'Counsel' },
  { icon: '📄', title: 'LexDraft', desc: 'Generate rent agreements, affidavits, legal notices and more instantly', path: '/lexdraft', tag: 'Generator' },
  { icon: '🧬', title: 'LegalInheritance', desc: 'Track legal documentation gaps for you and your spouse', path: '/legalinheritance', tag: 'Planner' },
  { icon: '🤝', title: 'LexConnect', desc: 'Find free legal aid, official helplines and lawyers across India', path: '/lexconnect', tag: 'Directory' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
          background: #080808;
          color: #F0EDE8;
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes goldPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.5; }
        }

        .feat-card {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .feat-card:hover {
          border-color: rgba(201,168,76,0.25) !important;
          box-shadow: 0 0 0 1px rgba(201,168,76,0.08), 0 20px 40px rgba(0,0,0,0.5) !important;
          transform: translateY(-2px);
          cursor: pointer;
        }
        .feat-card:hover .card-arrow {
          color: #C9A84C !important;
          transform: translateX(3px);
        }
        .card-arrow {
          transition: color 0.2s ease, transform 0.2s ease;
          color: #333330;
          font-size: 14px;
        }

        .nav-link {
          color: #666660;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .nav-link:hover { color: #F0EDE8; }

        .sign-out {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #444440;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .sign-out:hover {
          border-color: rgba(224,82,82,0.3);
          color: #E05252;
          background: rgba(224,82,82,0.06);
        }

        .cta-primary {
          background: #C9A84C;
          color: #080808;
          border: none;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.01em;
          transition: all 0.2s ease;
        }
        .cta-primary:hover {
          background: #E2C47A;
          box-shadow: 0 8px 24px rgba(201,168,76,0.3);
          transform: translateY(-1px);
        }

        .cta-secondary {
          background: transparent;
          color: #888880;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 12px 22px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.04);
          color: #F0EDE8;
          border-color: rgba(255,255,255,0.15);
        }
      `}</style>

      {/* ── NAV ── */}
      <header style={s.nav}>
        <div style={s.navLeft}>
          <div style={s.logoIcon}>⚖️</div>
          <span style={s.logoWord}>LexOS</span>
          <span style={s.navDivider}>|</span>
          <span style={s.navCaption}>Legal Intelligence</span>
        </div>
        <div style={s.navRight}>
          <span className="nav-link" onClick={() => navigate('/lexcounsel')}>Counsel</span>
          <span className="nav-link" onClick={() => navigate('/shieldmode')}>ShieldMode</span>
          <span className="nav-link" onClick={() => navigate('/lexconnect')}>Connect</span>
          <div style={s.avatarChip}>
            <div style={s.avatarCircle}>{user?.name?.charAt(0).toUpperCase()}</div>
            <span style={s.avatarName}>{user?.name?.split(' ')[0]}</span>
          </div>
          <button className="sign-out" onClick={() => { logout(); navigate('/login') }}>
            Sign out
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={s.hero}>
        {/* Subtle glow */}
        <div style={s.heroGlowLeft} />
        <div style={s.heroGlowRight} />

        <div style={{
          ...s.heroContent,
          opacity: mounted ? 1 : 0,
          animation: mounted ? 'fadeUp 0.6s ease forwards' : 'none'
        }}>
          {/* Eyebrow */}
          <div style={s.eyebrow}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#C9A84C', display: 'inline-block',
              animation: 'goldPulse 2.5s ease infinite'
            }} />
            <span style={s.eyebrowText}>
              AI-Powered · India-First · Always Free
            </span>
          </div>

          {/* Main heading */}
          <h1 style={s.heroH1}>
            Your Legal Rights,
            <br />
            <em style={s.heroEm}>Always Within Reach.</em>
          </h1>

          <p style={s.heroP}>
            LexOS puts a full-time AI legal assistant in every Indian's pocket —
            from police interactions to document drafting, instant and free.
          </p>

          {/* CTAs */}
          <div style={s.ctaRow}>
            <button className="cta-primary" onClick={() => navigate('/lexcounsel')}>
              Get Legal Consultation →
            </button>
            <button className="cta-secondary" onClick={() => navigate('/shieldmode')}>
              🛡️ ShieldMode
            </button>
          </div>

          {/* Stats */}
          <div style={s.stats}>
            {[
              { v: '9', l: 'AI Features' },
              { v: '₹0', l: 'Cost to You' },
              { v: '24/7', l: 'Available' },
              { v: '100%', l: 'India-Specific' },
            ].map((st, i) => (
              <div key={i} style={s.statItem}>
                {i > 0 && <div style={s.statPipe} />}
                <span style={s.statV}>{st.v}</span>
                <span style={s.statL}>{st.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative sparkle */}
        <div style={s.sparkle}>✦</div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={s.divider}>
        <span style={s.dividerSymbol}>✦</span>
      </div>

      {/* ── FEATURES ── */}
      <section style={s.features}>
        <div style={s.featHead}>
          <p style={s.featEyebrow}>Platform Features</p>
          <h2 style={s.featTitle}>
            Everything legal,<br />in one place.
          </h2>
          <p style={s.featSub}>
            Nine AI-powered tools built specifically for Indian citizens —
            each solving a distinct, real problem no other app addresses.
          </p>
        </div>

        <div style={s.grid}>
          {features.map((f, i) => (
            <div
              key={i}
              className="feat-card"
              style={{
                ...s.card,
                animationDelay: `${i * 0.045}s`,
                animation: mounted ? `fadeUp 0.5s ease ${i * 0.045}s both` : 'none'
              }}
              onClick={() => navigate(f.path)}
            >
              {/* Gold top line */}
              <div style={s.cardTopLine} />

              <div style={s.cardInner}>
                <div style={s.cardHead}>
                  <span style={s.cardIcon}>{f.icon}</span>
                  <span style={s.cardTag}>{f.tag}</span>
                </div>
                <h3 style={s.cardTitle}>{f.title}</h3>
                <p style={s.cardDesc}>{f.desc}</p>
                <div style={s.cardFoot}>
                  <span style={s.cardOpen}>Open feature</span>
                  <span className="card-arrow">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerTop}>
          <div style={s.footerBrand}>
            <span style={s.footerLogo}>⚖️ LexOS</span>
            <span style={s.footerTagline}>Legal Intelligence for India</span>
          </div>
          <span style={s.footerSpark}>✦</span>
          <p style={s.footerDisclaimer}>
            LexOS provides AI-powered legal information based on Indian law.
            Not a substitute for professional legal advice.
          </p>
        </div>
        <div style={s.footerBottom}>
          <span style={s.footerCopy}>© 2025 LexOS · Built for India 🇮🇳</span>
        </div>
      </footer>
    </div>
  )
}

const GOLD = '#C9A84C'
const GOLD_DIM = 'rgba(201,168,76,0.08)'
const GOLD_BORDER = 'rgba(201,168,76,0.15)'
const BORDER = 'rgba(255,255,255,0.06)'

const s = {
  root: { minHeight: '100vh', background: '#080808', color: '#F0EDE8' },

  // Nav
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 48px', height: '62px',
    borderBottom: `1px solid ${BORDER}`,
    background: 'rgba(8,8,8,0.96)',
    backdropFilter: 'blur(16px)',
    position: 'sticky', top: 0, zIndex: 200
  },
  navLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  logoIcon: {
    width: '30px', height: '30px', borderRadius: '7px',
    background: `linear-gradient(135deg, ${GOLD}, #E2C47A)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px'
  },
  logoWord: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '19px', fontWeight: '700',
    background: `linear-gradient(135deg, #F0EDE8 40%, ${GOLD})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  navDivider: { color: 'rgba(255,255,255,0.1)', fontSize: '16px', fontWeight: '300' },
  navCaption: { fontSize: '12px', color: '#333330', fontWeight: '400' },
  navRight: { display: 'flex', alignItems: 'center', gap: '24px' },
  avatarChip: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${BORDER}`,
    borderRadius: '100px', padding: '4px 14px 4px 4px'
  },
  avatarCircle: {
    width: '26px', height: '26px', borderRadius: '50%',
    background: `linear-gradient(135deg, ${GOLD}, #E2C47A)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: '700', color: '#080808'
  },
  avatarName: { fontSize: '12px', color: '#888880', fontWeight: '500' },

  // Hero
  hero: {
    position: 'relative', overflow: 'hidden',
    padding: '110px 48px 90px',
    borderBottom: `1px solid ${BORDER}`
  },
  heroGlowLeft: {
    position: 'absolute', top: '-120px', left: '-80px',
    width: '480px', height: '480px', borderRadius: '50%',
    background: `radial-gradient(circle, ${GOLD_DIM} 0%, transparent 68%)`,
    pointerEvents: 'none'
  },
  heroGlowRight: {
    position: 'absolute', bottom: '-180px', right: '-60px',
    width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79,110,247,0.04) 0%, transparent 68%)',
    pointerEvents: 'none'
  },
  heroContent: { maxWidth: '660px', position: 'relative' },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
    borderRadius: '100px', padding: '5px 14px', marginBottom: '30px'
  },
  eyebrowText: { fontSize: '11px', fontWeight: '600', color: GOLD, letterSpacing: '0.08em' },
  heroH1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(42px, 6vw, 70px)',
    fontWeight: '800', lineHeight: '1.07',
    letterSpacing: '-0.02em', marginBottom: '22px',
    color: '#F0EDE8'
  },
  heroEm: {
    fontStyle: 'italic',
    background: `linear-gradient(135deg, ${GOLD} 0%, #E2C47A 60%, ${GOLD} 100%)`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  heroP: {
    fontSize: '16px', color: '#666660', lineHeight: '1.8',
    marginBottom: '36px', maxWidth: '500px'
  },
  ctaRow: { display: 'flex', gap: '12px', marginBottom: '52px', flexWrap: 'wrap' },
  stats: {
    display: 'inline-flex', alignItems: 'center',
    background: 'rgba(255,255,255,0.02)',
    border: `1px solid ${BORDER}`,
    borderRadius: '14px'
  },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 26px', position: 'relative' },
  statPipe: { position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '1px', background: BORDER },
  statV: { fontSize: '22px', fontWeight: '800', color: '#F0EDE8', letterSpacing: '-0.02em', lineHeight: '1' },
  statL: { fontSize: '10px', color: '#3a3a38', marginTop: '4px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' },
  sparkle: {
    position: 'absolute', bottom: '32px', right: '48px',
    fontSize: '32px', color: GOLD_BORDER, fontWeight: '400',
    userSelect: 'none', pointerEvents: 'none'
  },

  // Divider
  divider: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '32px 0', borderBottom: `1px solid ${BORDER}`,
    position: 'relative'
  },
  dividerSymbol: { fontSize: '14px', color: '#2a2a28', letterSpacing: '6px' },

  // Features
  features: { padding: '72px 48px 88px' },
  featHead: { maxWidth: '500px', marginBottom: '52px' },
  featEyebrow: {
    fontSize: '11px', fontWeight: '700', color: GOLD,
    letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px'
  },
  featTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(28px, 4vw, 40px)',
    fontWeight: '700', color: '#F0EDE8',
    lineHeight: '1.15', letterSpacing: '-0.02em', marginBottom: '14px'
  },
  featSub: { fontSize: '14px', color: '#555550', lineHeight: '1.75' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))',
    gap: '12px'
  },
  card: {
    background: '#0D0D0D',
    border: `1px solid ${BORDER}`,
    borderRadius: '14px',
    position: 'relative', overflow: 'hidden'
  },
  cardTopLine: {
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, transparent)`
  },
  cardInner: { padding: '22px' },
  cardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  cardIcon: { fontSize: '22px' },
  cardTag: {
    fontSize: '10px', fontWeight: '700',
    color: '#3a3a38', letterSpacing: '0.1em',
    textTransform: 'uppercase', fontFamily: "'Inter', sans-serif"
  },
  cardTitle: {
    fontSize: '15px', fontWeight: '700',
    color: '#E8E5E0', marginBottom: '8px', letterSpacing: '-0.01em'
  },
  cardDesc: { fontSize: '13px', color: '#555550', lineHeight: '1.65', marginBottom: '20px' },
  cardFoot: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: '14px', borderTop: `1px solid ${BORDER}`
  },
  cardOpen: { fontSize: '12px', color: '#333330', fontWeight: '500' },

  // Footer
  footer: {
    borderTop: `1px solid ${BORDER}`,
    padding: '32px 48px 40px'
  },
  footerTop: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', flexWrap: 'wrap',
    gap: '16px', marginBottom: '20px'
  },
  footerBrand: { display: 'flex', flexDirection: 'column', gap: '4px' },
  footerLogo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '16px', fontWeight: '700', color: GOLD
  },
  footerTagline: { fontSize: '11px', color: '#2a2a28' },
  footerSpark: { fontSize: '18px', color: '#222220' },
  footerDisclaimer: { fontSize: '11px', color: '#2a2a28', maxWidth: '420px', lineHeight: '1.6', textAlign: 'right' },
  footerBottom: { borderTop: `1px solid rgba(255,255,255,0.03)`, paddingTop: '20px' },
  footerCopy: { fontSize: '11px', color: '#222220' }
}