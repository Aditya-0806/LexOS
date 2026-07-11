import { useNavigate } from 'react-router-dom'

export default function PageHeader({ title, icon }) {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        .back-btn {
          display: flex; align-items: center; gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          color: #555540; padding: 7px 14px;
          border-radius: 8px; font-size: 13px;
          font-weight: 500; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .back-btn:hover { background: rgba(255,255,255,0.04); color: #F0EDE8; border-color: rgba(255,255,255,0.12); }
      `}</style>
      <header style={s.header}>
        <div style={s.left}>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
          <div style={s.logoWrap}>
            <div style={s.logoIcon}>⚖️</div>
            <span style={s.logoText}>LexOS</span>
          </div>
        </div>
        <div style={s.pageTitle}>
          <span style={s.pageTitleIcon}>{icon}</span>
          <span style={s.pageTitleText}>{title}</span>
        </div>
      </header>
    </>
  )
}

const s = {
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px', height: '62px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(18,16,10,0.97)',
    backdropFilter: 'blur(16px)',
    position: 'sticky', top: 0, zIndex: 100,
    fontFamily: "'Inter', sans-serif"
  },
  left: { display: 'flex', alignItems: 'center', gap: '16px' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoIcon: {
    width: '28px', height: '28px', borderRadius: '7px',
    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.08))',
    border: '1px solid rgba(201,168,76,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px'
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '17px', fontWeight: '700',
    background: 'linear-gradient(135deg, #F0EDE8, #C9A84C)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  pageTitle: { display: 'flex', alignItems: 'center', gap: '8px' },
  pageTitleIcon: { fontSize: '18px' },
  pageTitleText: { fontSize: '14px', fontWeight: '600', color: '#888870', letterSpacing: '0.01em' }
}