import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: '📡',
    title: 'ThreatRadar',
    desc: 'Track document expiry dates and get proactive legal alerts before deadlines hit',
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
    desc: 'Upload any legal document — AI identifies red flags, missing clauses and violations',
    path: '/forgescan',
    color: '#E4A838',
    tag: 'AI Powered'
  },
  {
    icon: '⚖️',
    title: 'LexCounsel',
    desc: 'Get structured AI legal consultation with rights, options and next steps',
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
    desc: 'Track legal documentation gaps for you and your spouse — Will, nominees and more',
    path: '/legalinheritance',
    color: '#3FC87A',
    tag: 'Planner'
  },
  {
    icon: '🤝',
    title: 'LexConnect',
    desc: 'Find free legal aid, official helplines and lawyers by category across India',
    path: '/lexconnect',
    color: '#E4A838',
    tag: 'Directory'
  },
]

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoWrap}>
            <span style={styles.logoIcon}>⚖️</span>
            <h1 style={styles.logo}>LexOS</h1>
          </div>
          <span style={styles.tagline}>AI Legal Assistant for India</span>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userBadge}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span style={styles.userName}>{user?.name}</span>
          </div>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.heroBadgeDot} />
          AI Powered Legal Intelligence
        </div>
        <h2 style={styles.heroTitle}>
          Your Legal Rights,<br />
          <span style={styles.heroAccent}>Instantly Accessible</span>
        </h2>
        <p style={styles.heroSub}>
          LexOS gives every Indian citizen access to AI-powered legal guidance —
          from police interactions to document drafting, all in one place.
        </p>

        {/* Quick Stats */}
        <div style={styles.statsRow}>
          <div style={styles.stat}>
            <div style={styles.statValue}>9</div>
            <div style={styles.statLabel}>AI Features</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <div style={styles.statValue}>1B+</div>
            <div style={styles.statLabel}>Target Users</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <div style={styles.statValue}>₹0</div>
            <div style={styles.statLabel}>Cost to User</div>
          </div>
          <div style={styles.statDivider} />
          <div style={styles.stat}>
            <div style={styles.statValue}>24/7</div>
            <div style={styles.statLabel}>Available</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={styles.content}>
        <h3 style={styles.sectionTitle}>All Features</h3>
        <div style={styles.grid}>
          {features.map((feature, i) => (
            <div
              key={i}
              style={styles.card}
              onClick={() => navigate(feature.path)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${feature.color}50`
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 8px 30px ${feature.color}15`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={styles.cardTop}>
                <div style={{
                  ...styles.cardIconWrap,
                  background: `${feature.color}15`
                }}>
                  <span style={styles.cardIcon}>{feature.icon}</span>
                </div>
                <span style={{
                  ...styles.cardTag,
                  background: `${feature.color}15`,
                  color: feature.color,
                  border: `1px solid ${feature.color}30`
                }}>
                  {feature.tag}
                </span>
              </div>
              <h4 style={styles.cardTitle}>{feature.title}</h4>
              <p style={styles.cardDesc}>{feature.desc}</p>
              <div style={{...styles.cardArrow, color: feature.color}}>
                Open → 
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          ⚠️ LexOS provides AI-powered legal information based on Indian law.
          It is not a substitute for professional legal advice.
        </p>
        <p style={styles.footerSub}>
          Built with ❤️ for Indian citizens · Powered by Groq AI
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0a0b0f',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(17,18,23,0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky', top: 0, zIndex: 100
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoIcon: { fontSize: '20px' },
  logo: {
    fontSize: '22px', fontWeight: '800',
    background: 'linear-gradient(135deg, #E8E8EE, #4F6EF7)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    margin: 0
  },
  tagline: {
    color: '#55556A', fontSize: '12px',
    borderLeft: '1px solid rgba(255,255,255,0.1)',
    paddingLeft: '16px'
  },
  headerRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  userBadge: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '100px', padding: '6px 14px 6px 6px'
  },
  avatar: {
    width: '28px', height: '28px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #4F6EF7, #7C5CFC)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', fontWeight: '700', color: '#fff'
  },
  userName: { fontSize: '13px', color: '#E8E8EE', fontWeight: '500' },
  logoutBtn: {
    background: 'rgba(228,88,88,0.08)',
    border: '1px solid rgba(228,88,88,0.15)',
    color: '#E45858', padding: '8px 16px',
    borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer'
  },
  hero: {
    padding: '60px 40px 48px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,110,247,0.08) 0%, transparent 70%)',
    textAlign: 'center'
  },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(79,110,247,0.1)',
    border: '1px solid rgba(79,110,247,0.2)',
    color: '#94abff', fontSize: '12px', fontWeight: '600',
    padding: '6px 16px', borderRadius: '100px',
    letterSpacing: '0.05em', marginBottom: '24px'
  },
  heroBadgeDot: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: '#4F6EF7', display: 'inline-block'
  },
  heroTitle: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: '800', color: '#E8E8EE',
    lineHeight: '1.1', marginBottom: '16px',
    letterSpacing: '-0.02em'
  },
  heroAccent: {
    background: 'linear-gradient(135deg, #4F6EF7, #7C5CFC)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  },
  heroSub: {
    color: '#888898', fontSize: '16px', lineHeight: '1.7',
    maxWidth: '560px', margin: '0 auto 36px'
  },
  statsRow: {
    display: 'inline-flex', alignItems: 'center', gap: '0',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', padding: '20px 32px',
    flexWrap: 'wrap', justifyContent: 'center'
  },
  stat: { textAlign: 'center', padding: '0 24px' },
  statValue: {
    fontSize: '28px', fontWeight: '800',
    color: '#E8E8EE', lineHeight: '1'
  },
  statLabel: { fontSize: '12px', color: '#55556A', marginTop: '4px' },
  statDivider: {
    width: '1px', height: '40px',
    background: 'rgba(255,255,255,0.08)'
  },
  content: { padding: '48px 40px' },
  sectionTitle: {
    fontSize: '13px', fontWeight: '700',
    color: '#55556A', letterSpacing: '0.1em',
    textTransform: 'uppercase', marginBottom: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px'
  },
  card: {
    background: '#111217',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  cardTop: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '16px'
  },
  cardIconWrap: {
    width: '44px', height: '44px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  cardIcon: { fontSize: '22px' },
  cardTag: {
    fontSize: '10px', fontWeight: '700',
    padding: '4px 10px', borderRadius: '100px',
    letterSpacing: '0.06em', textTransform: 'uppercase'
  },
  cardTitle: {
    fontSize: '16px', fontWeight: '700',
    color: '#E8E8EE', marginBottom: '8px', margin: '0 0 8px 0'
  },
  cardDesc: {
    fontSize: '13px', color: '#888898',
    lineHeight: '1.6', marginBottom: '16px'
  },
  cardArrow: {
    fontSize: '13px', fontWeight: '600'
  },
  footer: {
    padding: '24px 40px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '12px', color: '#55556A',
    marginBottom: '6px', lineHeight: '1.6'
  },
  footerSub: { fontSize: '11px', color: '#3a3a4a' }
}

export default Dashboard