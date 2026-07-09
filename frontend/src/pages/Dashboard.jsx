import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../utils/api'

const navItems = [
  { icon: '🏠', label: 'Dashboard', path: '/dashboard', active: true },
  { icon: '⚖️', label: 'AI Counsel', path: '/lexcounsel' },
  { icon: '📝', label: 'QuickComplaint', path: '/quickcomplaint' },
  { icon: '📄', label: 'Documents', path: '/forgescan' },
  { icon: '📋', label: 'Acts & Rules', path: '/shieldmode' },
  { icon: '✍️', label: 'Templates', path: '/lexdraft' },
  { icon: '📡', label: 'Legal Alerts', path: '/threatradar' },
  { icon: '🤝', label: 'LexConnect', path: '/lexconnect' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard' },
]

const features = [
  { icon: '📡', title: 'ThreatRadar', desc: 'Track document expiry dates and get proactive alerts', path: '/threatradar', img: '🎯' },
  { icon: '🛡️', title: 'ShieldMode', desc: 'Real-time rights display during police interactions', path: '/shieldmode', img: '🛡️' },
  { icon: '📝', title: 'QuickComplaint', desc: 'AI drafts formal complaint letters with legal sections', path: '/quickcomplaint', img: '📋' },
  { icon: '🔍', title: 'ForgeScan', desc: 'AI identifies red flags in any legal document', path: '/forgescan', img: '🔍' },
  { icon: '⚖️', title: 'LexCounsel', desc: 'Structured AI legal consultation for your situation', path: '/lexcounsel', img: '⚖️' },
  { icon: '📄', title: 'LexDraft', desc: 'Generate agreements, affidavits, notices instantly', path: '/lexdraft', img: '📄' },
  { icon: '🧬', title: 'LegalInheritance', desc: 'Track legal documentation gaps for you and spouse', path: '/legalinheritance', img: '👨‍👩‍👧' },
  { icon: '🤝', title: 'LexConnect', desc: 'Find free legal aid and lawyers across India', path: '/lexconnect', img: '🤝' },
  { icon: '✨', title: 'Explore All Features', desc: 'Discover the full power of the LexOS platform', path: '/lexcounsel', img: '✨', highlight: true },
]

const recentActivity = [
  { title: 'Consumer complaint drafted', time: 'Today, 10:30 AM', feature: 'QuickComplaint', color: '#4CAF7D' },
  { title: 'Rent agreement generated', time: 'Yesterday, 04:15 PM', feature: 'LexDraft', color: '#4F6EF7' },
  { title: 'Legal notice reviewed', time: '12 May 2025, 11:20 AM', feature: 'ForgeScan', color: '#C9A84C' },
  { title: 'Legal consultation completed', time: '11 May 2025, 09:45 PM', feature: 'AI Counsel', color: '#7C5CFC' },
]

const suggestedQuestions = [
  'Can my employer terminate me without notice?',
  'Draft a consumer complaint for defective product',
  'What are my rights if police detains me?',
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [activeNav, setActiveNav] = useState('Dashboard')

  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #12100A; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #2a2820; border-radius: 4px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes goldGlow {
          0%,100% { box-shadow: 0 0 12px rgba(201,168,76,0.15); }
          50%      { box-shadow: 0 0 24px rgba(201,168,76,0.3); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(0.95); }
        }

        .nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 500;
          color: #6b6850; cursor: pointer;
          transition: all 0.18s ease;
          font-family: 'Inter', sans-serif;
        }
        .nav-item:hover { background: rgba(201,168,76,0.06); color: #C9A84C; }
        .nav-item.active { background: rgba(201,168,76,0.1); color: #C9A84C; border-left: 2px solid #C9A84C; }

        .feat-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px; padding: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex; flex-direction: column; gap: 8px;
        }
        .feat-card:hover {
          background: rgba(201,168,76,0.05);
          border-color: rgba(201,168,76,0.2);
          transform: translateY(-2px);
        }
        .feat-card.highlight {
          background: rgba(201,168,76,0.08);
          border-color: rgba(201,168,76,0.25);
        }
        .feat-card.highlight:hover {
          background: rgba(201,168,76,0.12);
        }

        .chat-input {
          flex: 1; background: transparent; border: none;
          color: #F0EDE8; font-size: 13px;
          font-family: 'Inter', sans-serif;
          outline: none;
        }
        .chat-input::placeholder { color: #444430; }

        .send-btn {
          background: #C9A84C; border: none;
          width: 30px; height: 30px; border-radius: 8px;
          cursor: pointer; display: flex;
          align-items: center; justify-content: center;
          font-size: 14px; transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .send-btn:hover { background: #E2C47A; transform: scale(1.05); }

        .suggested-q {
          font-size: 11px; color: #555540;
          padding: 7px 10px; border-radius: 6px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer; transition: all 0.18s ease;
          font-family: 'Inter', sans-serif;
          text-align: left;
        }
        .suggested-q:hover { background: rgba(201,168,76,0.06); color: #C9A84C; border-color: rgba(201,168,76,0.15); }

        .cta-gold {
          background: linear-gradient(135deg, #C9A84C, #E2C47A);
          color: #12100A; border: none;
          padding: 11px 22px; border-radius: 8px;
          font-size: 13px; font-weight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease; letter-spacing: 0.01em;
        }
        .cta-gold:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(201,168,76,0.35); }

        .cta-shield {
          background: rgba(255,255,255,0.06);
          color: #F0EDE8; border: 1px solid rgba(255,255,255,0.12);
          padding: 10px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .cta-shield:hover { background: rgba(255,255,255,0.1); }

        .sign-out-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #444430; padding: 5px 12px;
          border-radius: 6px; font-size: 11px;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .sign-out-btn:hover { color: #E05252; border-color: rgba(224,82,82,0.2); }

        .upgrade-btn {
          width: 100%; background: linear-gradient(135deg, #C9A84C, #E2C47A);
          color: #12100A; border: none; padding: 10px;
          border-radius: 8px; font-size: 12px; font-weight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease; animation: goldGlow 3s ease infinite;
        }
        .upgrade-btn:hover { transform: translateY(-1px); }

        .view-all {
          font-size: 11px; color: #C9A84C; cursor: pointer;
          font-weight: 600; transition: opacity 0.2s;
          background: none; border: none;
          font-family: 'Inter', sans-serif;
        }
        .view-all:hover { opacity: 0.7; }

        .feat-arrow {
          color: #333320; font-size: 14px;
          transition: all 0.18s ease;
        }
        .feat-card:hover .feat-arrow { color: #C9A84C; transform: translateX(3px); }
      `}</style>

      {/* ── TOPBAR ── */}
      <header style={s.topbar}>
        {/* Logo */}
        <div style={s.topLogo}>
          <div style={s.topLogoIcon}>
            <span style={{fontSize: 20}}>⚖️</span>
          </div>
          <div>
            <div style={s.topLogoText}>LexOS</div>
            <div style={s.topLogoSub}>LEGAL INTELLIGENCE</div>
          </div>
        </div>

        {/* Search */}
        <div style={s.searchWrap}>
          <span style={{color: '#444430', fontSize: 14}}>🔍</span>
          <input
            style={s.searchInput}
            placeholder="Search for laws, cases, acts..."
            className="chat-input"
          />
          <span style={s.searchShortcut}>⌘ K</span>
        </div>

        {/* Right */}
        <div style={s.topRight}>
          <div style={s.notifBell}>
            🔔
            <span style={s.notifDot}>3</span>
          </div>
          <div style={s.userChip}>
            <div style={s.userAvatar}>{user?.name?.charAt(0).toUpperCase()}</div>
            <div>
              <div style={s.userName}>{user?.name}</div>
              <div style={s.userPlan}>Free Plan</div>
            </div>
            <span style={{color: '#444430', fontSize: 12}}>▾</span>
          </div>
          <button className="sign-out-btn" onClick={() => { logout(); navigate('/login') }}>
            Sign out
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={s.body}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={s.sidebar}>
          <nav style={s.sideNav}>
            {navItems.map((item, i) => (
              <div
                key={i}
                className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
                onClick={() => { setActiveNav(item.label); navigate(item.path) }}
              >
                <span style={{fontSize: 16}}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          {/* Upgrade box */}
          <div style={s.upgradeBox}>
            <div style={s.upgradeIcon}>👑</div>
            <div style={s.upgradeTitle}>Upgrade to Premium</div>
            <div style={s.upgradeDesc}>Unlock all features and advanced AI capabilities.</div>
            <button className="upgrade-btn">Upgrade Now →</button>
          </div>

          {/* Quote */}
          <div style={s.quoteBox}>
            <div style={s.quoteIcon}>"</div>
            <p style={s.quoteText}>Justice delayed is justice denied.</p>
            <p style={s.quoteAuthor}>— Constitution of India</p>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={s.main}>

          {/* ── HERO ── */}
          <div style={s.hero}>
            {/* Supreme Court BG */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Supreme_Court_of_India_-_2011.jpg/1280px-Supreme_Court_of_India_-_2011.jpg"
              alt="Supreme Court of India"
              style={s.heroImg}
            />
            <div style={s.heroOverlay} />

            <div style={{
              ...s.heroContent,
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeUp 0.6s ease forwards' : 'none'
            }}>
              <h1 style={s.heroH1}>
                Know your<br />legal rights.
              </h1>
              <p style={s.heroH2}><em>Act with confidence.</em></p>
              <p style={s.heroSub}>India's Most Advanced AI Legal Platform</p>

              <div style={s.heroCtas}>
                <button className="cta-gold" onClick={() => navigate('/lexcounsel')}>
                  Get Legal Consultation →
                </button>
                <button className="cta-shield" onClick={() => navigate('/shieldmode')}>
                  🛡️ ShieldMode
                </button>
              </div>

              {/* Stats */}
              <div style={s.statsRow}>
                {[
                  { v: '9+', l: 'AI FEATURES' },
                  { v: '₹0', l: 'COST' },
                  { v: '24/7', l: 'AVAILABLE' },
                  { v: '100%', l: 'INDIA-SPECIFIC' },
                ].map((st, i) => (
                  <div key={i} style={s.statItem}>
                    <span style={s.statV}>{st.v}</span>
                    <span style={s.statL}>{st.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── FEATURES GRID ── */}
          <div style={s.featSection}>
            <div style={s.featSectionHead}>
              <span style={s.featEye}>FEATURES AT A GLANCE</span>
            </div>
            <div style={s.featGrid}>
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`feat-card ${f.highlight ? 'highlight' : ''}`}
                  onClick={() => navigate(f.path)}
                  style={{
                    animation: mounted ? `fadeUp 0.4s ease ${i * 0.04}s both` : 'none'
                  }}
                >
                  <div style={s.featCardHead}>
                    <span style={{fontSize: 20}}>{f.icon}</span>
                    <span style={{fontSize: 22}}>{f.img}</span>
                  </div>
                  <div style={s.featCardTitle}>{f.title}</div>
                  <div style={s.featCardDesc}>{f.desc}</div>
                  <span className="feat-arrow">→</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── QUOTE FOOTER ── */}
          <div style={s.quoteFooter}>
            <span style={{fontSize: 28, opacity: 0.3}}>⚖️</span>
            <p style={s.quoteFooterText}>
              "The Constitution is not a mere lawyer's document, it is a vehicle of Life, and its Spirit is always the Spirit of Age."
            </p>
            <p style={s.quoteFooterAuthor}>— Dr. B. R. Ambedkar</p>
          </div>
        </main>

        {/* ── RIGHT PANEL ── */}
        <aside style={s.rightPanel}>

          {/* AI Chat Widget */}
          <div style={s.chatWidget}>
            <div style={s.chatHead}>
              <div style={s.chatHeadLeft}>
                <span style={{fontSize: 16}}>✦</span>
                <span style={s.chatTitle}>LexOS AI</span>
              </div>
              <div style={s.onlineDot}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#4CAF7D', display: 'inline-block',
                  animation: 'pulse 2s ease infinite'
                }} />
                <span style={{fontSize: 11, color: '#4CAF7D', fontWeight: 600}}>Online</span>
              </div>
            </div>

            {/* AI Message */}
            <div style={s.chatBody}>
              <div style={s.aiMsg}>
                <div style={s.aiMsgBubble}>
                  Hi {user?.name?.split(' ')[0]},<br />
                  How can I help you today?
                </div>
              </div>

              {/* Suggested questions */}
              <div style={s.suggestedWrap}>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="suggested-q"
                    onClick={() => navigate('/lexcounsel')}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div style={s.chatInputWrap}>
              <input
                className="chat-input"
                placeholder="Ask anything legal..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && navigate('/lexcounsel')}
              />
              <button className="send-btn" onClick={() => navigate('/lexcounsel')}>
                ➤
              </button>
            </div>
            <div style={s.chatFootNote}>🔒 Trusted. Private. AI-Powered.</div>
          </div>

          {/* Recent Activity */}
          <div style={s.activityBox}>
            <div style={s.boxHead}>
              <span style={s.boxTitle}>RECENT ACTIVITY</span>
              <button className="view-all">View All</button>
            </div>
            {recentActivity.map((act, i) => (
              <div key={i} style={s.actItem}>
                <div style={{...s.actDot, background: act.color}} />
                <div style={s.actInfo}>
                  <div style={s.actTitle}>{act.title}</div>
                  <div style={s.actTime}>{act.time}</div>
                </div>
                <span style={{...s.actTag, color: act.color, background: `${act.color}12`, border: `1px solid ${act.color}25`}}>
                  {act.feature}
                </span>
              </div>
            ))}
          </div>

          {/* Legal Alerts */}
          <div style={s.alertBox}>
            <div style={s.boxHead}>
              <span style={s.boxTitle}>LEGAL ALERTS</span>
              <button className="view-all">View All</button>
            </div>
            <div style={s.alertItem}>
              <div style={s.alertIcon}>🔔</div>
              <div style={s.alertInfo}>
                <div style={s.alertTitle}>New Labour Code updates</div>
                <div style={s.alertSub}>5 new notifications</div>
              </div>
              <span style={{color: '#444430', fontSize: 14}}>→</span>
            </div>
            <div style={s.alertItem}>
              <div style={s.alertIcon}>⚖️</div>
              <div style={s.alertInfo}>
                <div style={s.alertTitle}>SC Judgment: Tenant Rights</div>
                <div style={s.alertSub}>Important ruling yesterday</div>
              </div>
              <span style={{color: '#444430', fontSize: 14}}>→</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

const GOLD = '#C9A84C'
const BORDER = 'rgba(255,255,255,0.06)'
const SURFACE = 'rgba(255,255,255,0.02)'

const s = {
  root: {
    minHeight: '100vh', background: '#12100A',
    color: '#F0EDE8',
    fontFamily: "'Inter', -apple-system, sans-serif",
    display: 'flex', flexDirection: 'column'
  },

  // Topbar
  topbar: {
    display: 'flex', alignItems: 'center',
    gap: '20px', padding: '0 24px', height: '58px',
    borderBottom: `1px solid ${BORDER}`,
    background: 'rgba(18,16,10,0.98)',
    backdropFilter: 'blur(16px)',
    position: 'sticky', top: 0, zIndex: 200, flexShrink: 0
  },
  topLogo: { display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 },
  topLogoIcon: {
    width: '36px', height: '36px', borderRadius: '8px',
    background: 'linear-gradient(135deg, #1a1600, #2a2200)',
    border: `1px solid rgba(201,168,76,0.3)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  topLogoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '17px', fontWeight: '700',
    background: `linear-gradient(135deg, #F0EDE8, ${GOLD})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  topLogoSub: { fontSize: '8px', color: '#444430', letterSpacing: '0.15em', fontWeight: '600' },
  searchWrap: {
    flex: 1, maxWidth: '360px',
    display: 'flex', alignItems: 'center', gap: '10px',
    background: SURFACE, border: `1px solid ${BORDER}`,
    borderRadius: '8px', padding: '8px 12px'
  },
  searchInput: {
    flex: 1, background: 'transparent', border: 'none',
    color: '#F0EDE8', fontSize: '13px',
    fontFamily: "'Inter', sans-serif", outline: 'none'
  },
  searchShortcut: {
    fontSize: '10px', color: '#333320',
    background: 'rgba(255,255,255,0.04)',
    padding: '2px 6px', borderRadius: '4px',
    border: `1px solid ${BORDER}`, flexShrink: 0
  },
  topRight: { display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto' },
  notifBell: {
    position: 'relative', fontSize: '18px', cursor: 'pointer',
    width: '34px', height: '34px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: '8px'
  },
  notifDot: {
    position: 'absolute', top: '-4px', right: '-4px',
    width: '16px', height: '16px', borderRadius: '50%',
    background: '#E05252', color: '#fff',
    fontSize: '9px', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  userChip: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: SURFACE, border: `1px solid ${BORDER}`,
    borderRadius: '8px', padding: '6px 10px', cursor: 'pointer'
  },
  userAvatar: {
    width: '26px', height: '26px', borderRadius: '50%',
    background: `linear-gradient(135deg, ${GOLD}, #E2C47A)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: '700', color: '#12100A', flexShrink: 0
  },
  userName: { fontSize: '12px', color: '#F0EDE8', fontWeight: '600', lineHeight: '1.2' },
  userPlan: { fontSize: '10px', color: '#444430' },

  // Body
  body: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr 280px',
    flex: 1, overflow: 'hidden', minHeight: 0
  },

  // Sidebar
  sidebar: {
    borderRight: `1px solid ${BORDER}`,
    padding: '20px 12px',
    display: 'flex', flexDirection: 'column', gap: '4px',
    overflowY: 'auto', background: 'rgba(18,16,10,0.6)'
  },
  sideNav: { display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 },
  upgradeBox: {
    background: 'linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.04))',
    border: `1px solid rgba(201,168,76,0.2)`,
    borderRadius: '12px', padding: '16px',
    marginTop: '16px', display: 'flex',
    flexDirection: 'column', gap: '8px'
  },
  upgradeIcon: { fontSize: '20px' },
  upgradeTitle: { fontSize: '13px', fontWeight: '700', color: GOLD },
  upgradeDesc: { fontSize: '11px', color: '#555540', lineHeight: '1.5' },
  quoteBox: {
    marginTop: '16px', padding: '12px',
    borderTop: `1px solid ${BORDER}`
  },
  quoteIcon: { fontSize: '24px', color: GOLD, opacity: 0.4, lineHeight: 1 },
  quoteText: { fontSize: '12px', color: '#555540', lineHeight: '1.6', fontStyle: 'italic', marginTop: '4px' },
  quoteAuthor: { fontSize: '10px', color: '#333320', marginTop: '6px' },

  // Main
  main: {
    overflowY: 'auto',
    display: 'flex', flexDirection: 'column'
  },

  // Hero
  hero: {
    position: 'relative', height: '280px',
    overflow: 'hidden', flexShrink: 0
  },
  heroImg: {
    width: '100%', height: '100%',
    objectFit: 'cover', objectPosition: 'center 30%'
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(90deg, rgba(18,16,10,0.92) 0%, rgba(18,16,10,0.75) 50%, rgba(18,16,10,0.5) 100%)'
  },
  heroContent: {
    position: 'absolute', top: '50%', left: '28px',
    transform: 'translateY(-50%)'
  },
  heroH1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '32px', fontWeight: '800',
    lineHeight: '1.1', color: '#F0EDE8',
    letterSpacing: '-0.02em', marginBottom: '4px'
  },
  heroH2: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '24px', fontStyle: 'italic',
    background: `linear-gradient(135deg, ${GOLD}, #E2C47A)`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text', marginBottom: '6px'
  },
  heroSub: { fontSize: '12px', color: '#888870', marginBottom: '16px', letterSpacing: '0.02em' },
  heroCtas: { display: 'flex', gap: '10px', marginBottom: '20px' },
  statsRow: { display: 'flex', gap: '0' },
  statItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '8px 16px',
    background: 'rgba(18,16,10,0.6)',
    borderRight: `1px solid ${BORDER}`,
    backdropFilter: 'blur(8px)'
  },
  statV: { fontSize: '16px', fontWeight: '800', color: '#F0EDE8', lineHeight: '1' },
  statL: { fontSize: '9px', color: '#444430', marginTop: '2px', fontWeight: '600', letterSpacing: '0.1em' },

  // Features
  featSection: { padding: '20px 24px', flex: 1 },
  featSectionHead: { marginBottom: '14px' },
  featEye: { fontSize: '10px', fontWeight: '700', color: GOLD, letterSpacing: '0.15em' },
  featGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  },
  featCardHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  featCardTitle: { fontSize: '13px', fontWeight: '700', color: '#E8E5E0' },
  featCardDesc: { fontSize: '11px', color: '#444430', lineHeight: '1.55', flex: 1 },

  // Quote footer
  quoteFooter: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '16px 24px',
    borderTop: `1px solid ${BORDER}`,
    background: 'rgba(255,255,255,0.01)'
  },
  quoteFooterText: {
    fontSize: '11px', color: '#333320',
    lineHeight: '1.6', flex: 1, fontStyle: 'italic'
  },
  quoteFooterAuthor: { fontSize: '10px', color: '#2a2818', flexShrink: 0 },

  // Right Panel
  rightPanel: {
    borderLeft: `1px solid ${BORDER}`,
    overflowY: 'auto', padding: '16px',
    display: 'flex', flexDirection: 'column', gap: '14px',
    background: 'rgba(18,16,10,0.4)'
  },

  // Chat Widget
  chatWidget: {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: '14px', overflow: 'hidden'
  },
  chatHead: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px',
    borderBottom: `1px solid ${BORDER}`,
    background: 'rgba(255,255,255,0.02)'
  },
  chatHeadLeft: { display: 'flex', alignItems: 'center', gap: '8px' },
  chatTitle: { fontSize: '14px', fontWeight: '700', color: '#F0EDE8' },
  onlineDot: { display: 'flex', alignItems: 'center', gap: '5px' },
  chatBody: { padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' },
  aiMsg: {},
  aiMsgBubble: {
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${BORDER}`,
    borderRadius: '10px 10px 10px 2px',
    padding: '10px 14px',
    fontSize: '13px', color: '#C8C5C0', lineHeight: '1.6'
  },
  suggestedWrap: { display: 'flex', flexDirection: 'column', gap: '6px' },
  chatInputWrap: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 14px',
    borderTop: `1px solid ${BORDER}`,
    background: 'rgba(255,255,255,0.02)'
  },
  chatFootNote: {
    fontSize: '10px', color: '#2a2818',
    textAlign: 'center', padding: '6px',
    borderTop: `1px solid ${BORDER}`
  },

  // Activity
  activityBox: {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: '14px', padding: '14px',
    display: 'flex', flexDirection: 'column', gap: '10px'
  },
  boxHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  boxTitle: { fontSize: '10px', fontWeight: '700', color: '#555540', letterSpacing: '0.12em' },
  actItem: { display: 'flex', alignItems: 'center', gap: '10px' },
  actDot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0 },
  actInfo: { flex: 1, minWidth: 0 },
  actTitle: { fontSize: '12px', color: '#C8C5C0', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  actTime: { fontSize: '10px', color: '#333320', marginTop: '1px' },
  actTag: { fontSize: '9px', fontWeight: '700', padding: '2px 7px', borderRadius: '4px', flexShrink: 0, letterSpacing: '0.04em' },

  // Alerts
  alertBox: {
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: '14px', padding: '14px',
    display: 'flex', flexDirection: 'column', gap: '10px'
  },
  alertItem: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  alertIcon: {
    width: '32px', height: '32px', borderRadius: '8px',
    background: 'rgba(201,168,76,0.08)',
    border: `1px solid rgba(201,168,76,0.15)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0
  },
  alertInfo: { flex: 1 },
  alertTitle: { fontSize: '12px', color: '#C8C5C0', fontWeight: '500' },
  alertSub: { fontSize: '10px', color: '#333320', marginTop: '1px' },
}