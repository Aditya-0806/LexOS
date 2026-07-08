import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const features = [
  {
    icon: '📡',
    title: 'ThreatRadar',
    desc: 'Track document expiry dates and get proactive alerts before deadlines hit',
    path: '/threatradar',
    color: '#4F6EF7',
    tag: 'Proactive',
    number: '01'
  },
  {
    icon: '🛡️',
    title: 'ShieldMode',
    desc: 'Real-time rights display during police interactions with live audio guidance',
    path: '/shieldmode',
    color: '#E05252',
    tag: 'Emergency',
    number: '02'
  },
  {
    icon: '📝',
    title: 'QuickComplaint',
    desc: 'AI drafts a formal complaint letter with exact legal sections in seconds',
    path: '/quickcomplaint',
    color: '#4CAF7D',
    tag: 'AI Draft',
    number: '03'
  },
  {
    icon: '🔍',
    title: 'ForgeScan',
    desc: 'Upload any legal document — AI identifies red flags and missing clauses',
    path: '/forgescan',
    color: '#C9A84C',
    tag: 'Scanner',
    number: '04'
  },
  {
    icon: '⚖️',
    title: 'LexCounsel',
    desc: 'Structured AI legal consultation with rights, options and next steps',
    path: '/lexcounsel',
    color: '#C9A84C',
    tag: 'Counsel',
    number: '05'
  },
  {
    icon: '📄',
    title: 'LexDraft',
    desc: 'Generate rent agreements, affidavits, legal notices and more instantly',
    path: '/lexdraft',
    color: '#4F6EF7',
    tag: 'Generator',
    number: '06'
  },
  {
    icon: '🧬',
    title: 'LegalInheritance',
    desc: 'Track legal documentation gaps for you and your spouse',
    path: '/legalinheritance',
    color: '#4CAF7D',
    tag: 'Planner',
    number: '07'
  },
  {
    icon: '🤝',
    title: 'LexConnect',
    desc: 'Find free legal aid, official helplines and lawyers across India',
    path: '/lexconnect',
    color: '#C9A84C',
    tag: 'Directory',
    number: '08'
  },
]

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 50)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div style={s.page}>
      <style>{`
        .dash-card {
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
        }
        .dash-card:hover {
          transform: translateY(-3px);
        }
        .nav-item {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .nav-item:hover {
          color: #F0EDE8 !important;
        }
        .logout-btn {
          transition: all 0.2s ease;
        }
        .logout-btn:hover {
          background: rgba(224,82,82,0.12) !important;
          color: #E05252 !important;
          border-color: rgba(224,82,82,0.2) !important;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .live-dot {
          animation: blink 2s ease infinite;
        }
        .gold-shimmer {
          background: linear-gradient(90deg, #C9A84C 0%, #E2C47A 50%, #C9A84C 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={s.nav}>
        <div style={s.navLeft}>
          <div style={s.logoMark}>⚖️</div>
          <span style={s.logoText} className="display-font">LexOS</span>
          <div style={s.navPipe} />
          <span style={s.navSub}>Legal Intelligence</span>
        </div>
        <div style={s.navRight}>
          <span
            className="nav-item"
            style={s.navLink}
            onClick={() => navigate('/lexcounsel')}
          >
            Counsel
          </span>
          <span
            className="nav-item"
            style={s.navLink}
            onClick={() => navigate('/lexconnect')}
          >
            Connect
          </span>
          <div style={s.userPill}>
            <div style={s.userAvatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={s.userNameText}>{user?.name?.split(' ')[0]}</span>
          </div>
          <button
            className="logout-btn"
            style={s.logoutBtn}
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroGlow1} />
        <div style={s.heroGlow2} />

        <div
          style={{
            ...s.heroInner,
            opacity: visible ? 1 : 0,
            animation: visible ? 'fadeUp 0.7s ease forwards' : 'none'
          }}
        >
          {/* Eyebrow */}
          <div style={s.eyebrow}>
            <span className="live-dot" style={s.liveDot} />
            <span style={s.eyebrowText}>AI-Powered · India-First · Always Free</span>
          </div>

          {/* Title */}
          <h1 style={s.heroTitle} className="display-font">
            {greeting()},<br />
            <span className="gold-shimmer">{user?.name?.split(' ')[0]}.</span>
          </h1>

          <p style={s.heroSub}>
            Your personal legal intelligence platform — built for every Indian citizen.
            Know your rights, protect your interests, act with confidence.
          </p>

          {/* CTA row */}
          <div style={s.ctaRow}>
            <button
              className="lex-btn-primary"
              onClick={() => navigate('/lexcounsel')}
            >
              Get Legal Consultation →
            </button>
            <button
              className="lex-btn-secondary"
              onClick={() => navigate('/shieldmode')}
            >
              🛡️ ShieldMode
            </button>
          </div>

          {/* Stats bar */}
          <div style={s.statsBar}>
            {[
              { v: '9', l: 'AI Features' },
              { v: '₹0', l: 'Cost to You' },
              { v: '24/7', l: 'Availability' },
              { v: '100%', l: 'India-Specific' },
            ].map((st, i) => (
              <div key={i} style={s.statItem}>
                {i > 0 && <div style={s.statPipe} />}
                <div style={s.statVal}>{st.v}</div>
                <div style={s.statLbl}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={s.featuresSection}>
        <div style={s.featuresHeader}>
          <div className="section-eyebrow">Platform Features</div>
          <h2 style={s.featuresTitle} className="display-font">
            Everything legal, in one place
          </h2>
        </div>

        <div style={s.grid}>
          {features.map((f, i) => (
            <div
              key={i}
              className="dash-card"
              style={{
                ...s.card,
                borderColor: hovered === i ? `${f.color}35` : 'rgba(255,255,255,0.06)',
                boxShadow: hovered === i
                  ? `0 0 0 1px ${f.color}15, 0 24px 48px rgba(0,0,0,0.3)`
                  : '0 2px 8px rgba(0,0,0,0.2)',
                animationDelay: `${i * 0.04}s`,
                animation: visible ? `fadeUp 0.5s ease ${i * 0.04}s both` : 'none'
              }}
              onClick={() => navigate(f.path)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Gold left border on hover */}
              <div style={{
                position: 'absolute',
                left: 0, top: '20%', bottom: '20%',
                width: '2px',
                background: f.color,
                borderRadius: '2px',
                opacity: hovered === i ? 1 : 0,
                transition: 'opacity 0.25s ease'
              }} />

              {/* Number */}
              <div style={s.cardNum}>{f.number}</div>

              {/* Icon + Tag row */}
              <div style={s.cardTop}>
                <div style={{
                  ...s.iconBox,
                  background: `${f.color}10`,
                  border: `1px solid ${f.color}20`
                }}>
                  <span style={{fontSize: '18px'}}>{f.icon}</span>
                </div>
                <span style={{
                  ...s.cardTag,
                  color: f.color,
                  background: `${f.color}10`,
                  border: `1px solid ${f.color}20`
                }}>
                  {f.tag}
                </span>
              </div>

              <h3 style={s.cardTitle}>{f.title}</h3>
              <p style={s.cardDesc}>{f.desc}</p>

              <div style={{
                ...s.cardFooter,
                borderTopColor: hovered === i ? `${f.color}20` : 'rgba(255,255,255,0.05)'
              }}>
                <span style={{
                  color: hovered === i ? f.color : '#444440',
                  fontSize: '12px', fontWeight: '600',
                  transition: 'color 0.2s ease'
                }}>
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCLAIMER FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerLine} />
        <div style={s.footerInner}>
          <span style={s.footerLogo} className="display-font">LexOS</span>
          <p style={s.footerNote}>
            ⚠️ LexOS provides AI-powered legal information based on Indian law.
            This is not a substitute for advice from a qualified legal professional.
          </p>
          <span style={s.footerRight}>Built for India 🇮🇳</span>
        </div>
      </footer>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#0D0D0D',
    fontFamily: "'Inter', sans-serif",
    color: '#F0EDE8'
  },

  // Nav
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px', height: '64px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(13,13,13,0.97)',
    backdropFilter: 'blur(20px)',
    position: 'sticky', top: 0, zIndex: 100
  },
  navLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoMark: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px'
  },
  logoText: {
    fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #F0EDE8, #C9A84C)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  navPipe: { width: '1px', height: '18px', background: 'rgba(255,255,255,0.08)' },
  navSub: { fontSize: '12px', color: '#444440', fontWeight: '500' },
  navRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  navLink: { fontSize: '13px', color: '#888880', fontWeight: '500' },
  userPill: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '100px', padding: '4px 14px 4px 4px'
  },
  userAvatar: {
    width: '28px', height: '28px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #C9A84C, #E2C47A)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: '700', color: '#0D0D0D'
  },
  userNameText: { fontSize: '13px', color: '#B8B5B0', fontWeight: '500' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#444440', padding: '7px 14px',
    borderRadius: '8px', fontSize: '12px', fontWeight: '500'
  },

  // Hero
  hero: {
    position: 'relative', overflow: 'hidden',
    padding: '100px 40px 80px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  heroGlow1: {
    position: 'absolute', top: '-200px', left: '-100px',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)',
    pointerEvents: 'none'
  },
  heroGlow2: {
    position: 'absolute', bottom: '-200px', right: '-100px',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 65%)',
    pointerEvents: 'none'
  },
  heroInner: { maxWidth: '680px', position: 'relative' },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(201,168,76,0.08)',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: '100px', padding: '5px 14px',
    marginBottom: '28px'
  },
  liveDot: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: '#C9A84C', display: 'inline-block'
  },
  eyebrowText: { fontSize: '11px', fontWeight: '600', color: '#C9A84C', letterSpacing: '0.08em' },
  heroTitle: {
    fontSize: 'clamp(40px, 6vw, 72px)',
    fontWeight: '700', lineHeight: '1.05',
    letterSpacing: '-0.03em', marginBottom: '20px',
    color: '#F0EDE8'
  },
  heroSub: {
    fontSize: '16px', color: '#888880', lineHeight: '1.75',
    marginBottom: '36px', maxWidth: '520px'
  },
  ctaRow: { display: 'flex', gap: '12px', marginBottom: '48px', flexWrap: 'wrap' },
  statsBar: {
    display: 'flex', alignItems: 'center', gap: '0',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px', padding: '18px 0',
    width: 'fit-content'
  },
  statItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 28px', position: 'relative' },
  statPipe: { position: 'absolute', left: 0, top: '10%', bottom: '10%', width: '1px', background: 'rgba(255,255,255,0.06)' },
  statVal: { fontSize: '24px', fontWeight: '800', color: '#F0EDE8', lineHeight: '1', letterSpacing: '-0.02em' },
  statLbl: { fontSize: '11px', color: '#444440', marginTop: '4px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em' },

  // Features
  featuresSection: { padding: '64px 40px 80px' },
  featuresHeader: { marginBottom: '40px' },
  featuresTitle: {
    fontSize: '32px', fontWeight: '700',
    color: '#F0EDE8', letterSpacing: '-0.02em', marginTop: '8px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '12px'
  },
  card: {
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px', padding: '22px',
    position: 'relative', overflow: 'hidden'
  },
  cardNum: {
    font: '500 11px/1 "JetBrains Mono", monospace',
    color: '#2A2A28', marginBottom: '16px',
    letterSpacing: '0.05em'
  },
  cardTop: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '14px'
  },
  iconBox: {
    width: '40px', height: '40px', borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  cardTag: {
    fontSize: '10px', fontWeight: '700',
    padding: '3px 9px', borderRadius: '100px',
    letterSpacing: '0.08em', textTransform: 'uppercase'
  },
  cardTitle: {
    fontSize: '15px', fontWeight: '700',
    color: '#F0EDE8', marginBottom: '8px', letterSpacing: '-0.01em'
  },
  cardDesc: {
    fontSize: '13px', color: '#666660',
    lineHeight: '1.65', marginBottom: '18px'
  },
  cardFooter: {
    paddingTop: '14px',
    borderTop: '1px solid'
  },

  // Footer
  footer: { padding: '0 40px 40px' },
  footerLine: { height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' },
  footerInner: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
  },
  footerLogo: { fontSize: '16px', fontWeight: '700', color: '#C9A84C' },
  footerNote: { fontSize: '11px', color: '#333330', maxWidth: '460px', lineHeight: '1.6' },
  footerRight: { fontSize: '12px', color: '#333330' }
}

export default Dashboard