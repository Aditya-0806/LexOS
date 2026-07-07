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
    tag: 'Proactive'
  },
  {
    icon: '🛡️',
    title: 'ShieldMode',
    desc: 'Real-time rights display during police interactions with live audio guidance',
    path: '/shieldmode',
    color: '#E45858',
    tag: 'Emergency'
  },
  {
    icon: '📝',
    title: 'QuickComplaint',
    desc: 'AI drafts a formal complaint letter with exact legal sections in seconds',
    path: '/quickcomplaint',
    color: '#3FC87A',
    tag: 'AI Powered'
  },
  {
    icon: '🔍',
    title: 'ForgeScan',
    desc: 'Upload any legal document — AI identifies red flags and missing clauses',
    path: '/forgescan',
    color: '#E4A838',
    tag: 'AI Powered'
  },
  {
    icon: '⚖️',
    title: 'LexCounsel',
    desc: 'Structured AI legal consultation with rights, options and next steps',
    path: '/lexcounsel',
    color: '#7C5CFC',
    tag: 'AI Powered'
  },
  {
    icon: '📄',
    title: 'LexDraft',
    desc: 'Generate rent agreements, affidavits, legal notices and more instantly',
    path: '/lexdraft',
    color: '#4F6EF7',
    tag: 'Generator'
  },
  {
    icon: '🧬',
    title: 'LegalInheritance',
    desc: 'Track legal documentation gaps for you and your spouse',
    path: '/legalinheritance',
    color: '#3FC87A',
    tag: 'Planner'
  },
  {
    icon: '🤝',
    title: 'LexConnect',
    desc: 'Find free legal aid, official helplines and lawyers across India',
    path: '/lexconnect',
    color: '#E4A838',
    tag: 'Directory'
  },
]

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const greeting = () => {
    const h = time.getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * { box-sizing: border-box; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(79,110,247,0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(79,110,247,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(79,110,247,0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .card-hover {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .card-hover:hover {
          transform: translateY(-4px) !important;
        }

        .nav-btn:hover {
          background: rgba(255,255,255,0.08) !important;
        }

        .feature-arrow {
          transition: transform 0.2s ease;
        }

        .card-hover:hover .feature-arrow {
          transform: translateX(4px);
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoMark}>
            <span style={{fontSize: '16px'}}>⚖️</span>
          </div>
          <span style={styles.logoText}>LexOS</span>
          <div style={styles.headerDivider} />
          <span style={styles.headerSub}>Legal Intelligence Platform</span>
        </div>

        <nav style={styles.nav}>
          <div style={styles.timeBadge}>
            {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={styles.userChip}>
            <div style={styles.avatarRing}>
              <div style={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <span style={styles.userName}>{user?.name}</span>
          </div>
          <button
            className="nav-btn"
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            Sign out
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{
        ...styles.hero,
        opacity: visible ? 1 : 0,
        animation: visible ? 'fadeUp 0.6s ease forwards' : 'none'
      }}>
        {/* Background orbs */}
        <div style={styles.orb1} />
        <div style={styles.orb2} />

        <div style={styles.heroInner}>
          <div style={styles.greetingBadge}>
            <span style={styles.liveIndicator} />
            {greeting()}, {user?.name?.split(' ')[0]} 
          </div>

          <h1 style={styles.heroTitle}>
            Your Legal Rights,<br />
            <span style={styles.heroGradient}>Always Within Reach</span>
          </h1>

          <p style={styles.heroDesc}>
            AI-powered legal intelligence built for every Indian citizen.
            From police interactions to document drafting — instant, accurate, free.
          </p>

          {/* Stats */}
          <div style={styles.statsWrap}>
            {[
              { val: '9', label: 'AI Features' },
              { val: '₹0', label: 'Cost to You' },
              { val: '24/7', label: 'Available' },
              { val: '100%', label: 'India-specific' },
            ].map((s, i) => (
              <div key={i} style={styles.statItem}>
                <div style={styles.statVal}>{s.val}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <main style={styles.main}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionEyebrow}>All Features</div>
          <h2 style={styles.sectionTitle}>Everything you need, legally speaking</h2>
        </div>

        <div style={styles.grid}>
          {features.map((f, i) => (
            <div
              key={i}
              className="card-hover"
              style={{
                ...styles.card,
                borderColor: hoveredCard === i ? `${f.color}40` : 'rgba(255,255,255,0.06)',
                boxShadow: hoveredCard === i ? `0 0 0 1px ${f.color}20, 0 20px 40px ${f.color}10` : 'none',
                animationDelay: `${i * 0.05}s`,
                animation: visible ? `fadeUp 0.5s ease ${i * 0.05}s both` : 'none'
              }}
              onClick={() => navigate(f.path)}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top accent line */}
              <div style={{
                ...styles.cardAccent,
                background: f.color,
                opacity: hoveredCard === i ? 1 : 0,
                transition: 'opacity 0.2s ease'
              }} />

              <div style={styles.cardHead}>
                <div style={{
                  ...styles.iconBox,
                  background: `${f.color}12`,
                  border: `1px solid ${f.color}20`
                }}>
                  <span style={{fontSize: '20px'}}>{f.icon}</span>
                </div>
                <span style={{
                  ...styles.tag,
                  color: f.color,
                  background: `${f.color}10`,
                  border: `1px solid ${f.color}20`
                }}>
                  {f.tag}
                </span>
              </div>

              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardDesc}>{f.desc}</p>

              <div style={{...styles.cardFooter, borderColor: hoveredCard === i ? `${f.color}20` : 'rgba(255,255,255,0.05)'}}>
                <span style={{...styles.openLabel, color: hoveredCard === i ? f.color : '#55556A'}}>
                  Open feature
                </span>
                <span className="feature-arrow" style={{color: hoveredCard === i ? f.color : '#55556A', fontSize: '14px'}}>
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLeft}>
            <span style={styles.footerLogo}>⚖️ LexOS</span>
            <span style={styles.footerTagline}>AI Legal Intelligence for India</span>
          </div>
          <p style={styles.footerNote}>
            ⚠️ LexOS provides AI-powered legal information based on Indian law. Not a substitute for professional legal advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#080910',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: '#E8E8EE',
    overflowX: 'hidden'
  },

  // Header
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px', height: '64px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    background: 'rgba(8,9,16,0.9)',
    backdropFilter: 'blur(20px)',
    position: 'sticky', top: 0, zIndex: 100
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoMark: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: 'linear-gradient(135deg, #4F6EF7, #7C5CFC)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  logoText: {
    fontSize: '18px', fontWeight: '800',
    background: 'linear-gradient(135deg, #E8E8EE 40%, #94abff)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  },
  headerDivider: { width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' },
  headerSub: { fontSize: '12px', color: '#3a3a55', fontWeight: '500' },
  nav: { display: 'flex', alignItems: 'center', gap: '12px' },
  timeBadge: {
    fontSize: '12px', color: '#55556A', fontWeight: '600',
    fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em'
  },
  userChip: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '100px', padding: '4px 12px 4px 4px'
  },
  avatarRing: {
    width: '28px', height: '28px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #4F6EF7, #7C5CFC)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    animation: 'pulse-ring 3s infinite'
  },
  avatar: {
    width: '24px', height: '24px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #4F6EF7, #7C5CFC)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: '700', color: '#fff'
  },
  userName: { fontSize: '13px', color: '#b4b4c4', fontWeight: '500' },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#55556A', padding: '7px 14px',
    borderRadius: '8px', fontSize: '12px',
    fontWeight: '500', cursor: 'pointer',
    transition: 'all 0.2s ease'
  },

  // Hero
  hero: {
    position: 'relative', overflow: 'hidden',
    padding: '80px 40px 64px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  orb1: {
    position: 'absolute', top: '-100px', left: '20%',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79,110,247,0.08) 0%, transparent 70%)',
    pointerEvents: 'none'
  },
  orb2: {
    position: 'absolute', bottom: '-150px', right: '10%',
    width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%)',
    pointerEvents: 'none'
  },
  heroInner: { position: 'relative', maxWidth: '720px', margin: '0 auto', textAlign: 'center' },
  greetingBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(79,110,247,0.08)',
    border: '1px solid rgba(79,110,247,0.15)',
    color: '#94abff', fontSize: '13px', fontWeight: '500',
    padding: '6px 16px', borderRadius: '100px', marginBottom: '28px'
  },
  liveIndicator: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: '#3FC87A', display: 'inline-block',
    boxShadow: '0 0 6px #3FC87A', animation: 'pulse-ring 2s infinite'
  },
  heroTitle: {
    fontSize: 'clamp(36px, 5vw, 62px)',
    fontWeight: '900', lineHeight: '1.08',
    letterSpacing: '-0.03em', marginBottom: '20px',
    color: '#E8E8EE'
  },
  heroGradient: {
    background: 'linear-gradient(135deg, #4F6EF7 0%, #7C5CFC 50%, #94abff 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite'
  },
  heroDesc: {
    fontSize: '17px', color: '#888898', lineHeight: '1.7',
    marginBottom: '40px', fontWeight: '400'
  },
  statsWrap: {
    display: 'inline-grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0', background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', overflow: 'hidden'
  },
  statItem: {
    padding: '20px 28px', textAlign: 'center',
    borderRight: '1px solid rgba(255,255,255,0.06)'
  },
  statVal: {
    fontSize: '26px', fontWeight: '800',
    color: '#E8E8EE', letterSpacing: '-0.02em', lineHeight: '1'
  },
  statLabel: { fontSize: '11px', color: '#55556A', marginTop: '4px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em' },

  // Features
  main: { padding: '56px 40px' },
  sectionHeader: { marginBottom: '32px' },
  sectionEyebrow: {
    fontSize: '11px', fontWeight: '700', color: '#4F6EF7',
    letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px'
  },
  sectionTitle: {
    fontSize: '22px', fontWeight: '700', color: '#E8E8EE',
    letterSpacing: '-0.01em'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '14px'
  },
  card: {
    background: '#0f1018',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px', padding: '22px',
    cursor: 'pointer', position: 'relative',
    overflow: 'hidden'
  },
  cardAccent: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: '2px', borderRadius: '16px 16px 0 0'
  },
  cardHead: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '16px'
  },
  iconBox: {
    width: '42px', height: '42px', borderRadius: '11px',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  tag: {
    fontSize: '10px', fontWeight: '700',
    padding: '3px 9px', borderRadius: '100px',
    letterSpacing: '0.06em', textTransform: 'uppercase'
  },
  cardTitle: {
    fontSize: '15px', fontWeight: '700',
    color: '#E8E8EE', marginBottom: '8px', letterSpacing: '-0.01em'
  },
  cardDesc: {
    fontSize: '13px', color: '#666680',
    lineHeight: '1.6', marginBottom: '20px'
  },
  cardFooter: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', paddingTop: '14px',
    borderTop: '1px solid'
  },
  openLabel: { fontSize: '12px', fontWeight: '600', transition: 'color 0.2s ease' },

  // Footer
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    padding: '24px 40px'
  },
  footerInner: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '12px'
  },
  footerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  footerLogo: { fontSize: '14px', fontWeight: '700', color: '#E8E8EE' },
  footerTagline: { fontSize: '12px', color: '#3a3a55' },
  footerNote: { fontSize: '11px', color: '#3a3a55', maxWidth: '480px', lineHeight: '1.5' }
}

export default Dashboard

