import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.logo}>LexOS</h1>
        <div style={styles.headerRight}>
          <span style={styles.welcome}>👋 {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <h2 style={styles.heading}>Your Legal Dashboard</h2>
        <p style={styles.sub}>Welcome to LexOS — your AI legal assistant</p>

        <div style={styles.grid}>
          <div style={styles.card} onClick={() => navigate('/threatradar')}>
            <div style={styles.cardIcon}>📡</div>
            <div style={styles.cardTitle}>ThreatRadar</div>
            <div style={styles.cardDesc}>Track document deadlines and get alerts</div>
          </div>
          <div style={styles.card} onClick={() => navigate('/shieldmode')}>
            <div style={styles.cardIcon}>🛡️</div>
            <div style={styles.cardTitle}>ShieldMode</div>
            <div style={styles.cardDesc}>Know your rights instantly</div>
          </div>
          <div style={styles.card} onClick={() => navigate('/quickcomplaint')}>
            <div style={styles.cardIcon}>📝</div>
            <div style={styles.cardTitle}>QuickComplaint</div>
            <div style={styles.cardDesc}>Draft a legal complaint with AI</div>
          </div>
          <div style={styles.card} onClick={() => navigate('/forgescan')}>
            <div style={styles.cardIcon}>🔍</div>
            <div style={styles.cardTitle}>ForgeScan</div>
            <div style={styles.cardDesc}>Analyse documents for red flags</div>
          </div>
        </div>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 32px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    background: '#111217'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #E8E8EE, #4F6EF7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  welcome: {
    color: '#888898',
    fontSize: '14px'
  },
  logoutBtn: {
    background: 'rgba(228,88,88,0.1)',
    border: '1px solid rgba(228,88,88,0.2)',
    color: '#E45858',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600'
  },
  content: {
    padding: '40px 32px'
  },
  heading: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#E8E8EE',
    marginBottom: '8px'
  },
  sub: {
    color: '#888898',
    fontSize: '15px',
    marginBottom: '32px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  card: {
    background: '#111217',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'border-color 0.2s'
  },
  cardIcon: {
    fontSize: '28px',
    marginBottom: '12px'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#E8E8EE',
    marginBottom: '6px'
  },
  cardDesc: {
    fontSize: '13px',
    color: '#888898',
    lineHeight: '1.5'
  }
}

export default Dashboard