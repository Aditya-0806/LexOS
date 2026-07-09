import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/login', form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #12100A; -webkit-font-smoothing: antialiased; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes goldPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        .lex-input {
          width: 100%; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 13px 16px;
          color: #F0EDE8; font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none; transition: all 0.2s ease;
          display: block;
        }
        .lex-input:focus {
          border-color: rgba(201,168,76,0.4);
          background: rgba(201,168,76,0.04);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
        }
        .lex-input::placeholder { color: #333320; }

        .submit-btn {
          width: 100%; background: linear-gradient(135deg, #C9A84C, #E2C47A);
          color: #12100A; border: none; padding: 14px;
          border-radius: 10px; font-size: 15px; font-weight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease; letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.35);
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-link {
          color: #C9A84C; font-weight: 600;
          text-decoration: none; transition: opacity 0.2s;
        }
        .auth-link:hover { opacity: 0.75; }
      `}</style>

      <div style={s.wrap}>
        {/* Left — Branding */}
        <div style={s.left}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Supreme_Court_of_India_-_2011.jpg/1280px-Supreme_Court_of_India_-_2011.jpg"
            alt="Supreme Court"
            style={s.bgImg}
          />
          <div style={s.leftOverlay} />
          <div style={s.leftContent}>
            <div style={s.logoWrap}>
              <div style={s.logoIcon}>⚖️</div>
              <div>
                <div style={s.logoText}>LexOS</div>
                <div style={s.logoSub}>LEGAL INTELLIGENCE</div>
              </div>
            </div>

            <div style={s.leftMain}>
              <h1 style={s.leftH1}>
                Justice is just<br />
                <em style={s.leftEm}>one tap away.</em>
              </h1>
              <p style={s.leftP}>
                India's most advanced AI legal assistant.
                Know your rights. Act with confidence.
              </p>

              <div style={s.featurePills}>
                {[
                  '⚖️ AI Legal Consultation',
                  '🛡️ ShieldMode',
                  '📝 Smart Complaints',
                  '🔍 Document Scanner',
                ].map((f, i) => (
                  <div key={i} style={s.pill}>{f}</div>
                ))}
              </div>
            </div>

            <div style={s.leftQuote}>
              <span style={s.quoteIcon}>"</span>
              <p style={s.quoteText}>
                The Constitution is not a mere lawyer's document,
                it is a vehicle of Life.
              </p>
              <p style={s.quoteAuthor}>— Dr. B. R. Ambedkar</p>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div style={s.right}>
          <div style={s.formWrap}>
            {/* Mobile logo */}
            <div style={s.mobileLogo}>
              <span style={{fontSize: 20}}>⚖️</span>
              <span style={s.mobileLogoText}>LexOS</span>
            </div>

            <div style={s.formHead}>
              <div style={s.eyebrow}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#C9A84C', display: 'inline-block',
                  animation: 'goldPulse 2.5s ease infinite'
                }} />
                <span style={s.eyebrowText}>Welcome back</span>
              </div>
              <h2 style={s.formTitle}>Sign in to LexOS</h2>
              <p style={s.formSub}>Your AI-powered legal assistant awaits</p>
            </div>

            {error && (
              <div style={s.errorBox}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={s.form}>
              <div style={s.fieldGroup}>
                <label style={s.label}>Email Address</label>
                <input
                  className="lex-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  required
                />
              </div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Password</label>
                <input
                  className="lex-input"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  required
                />
              </div>

              <button
                className="submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <p style={s.switchText}>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">Create one free</Link>
            </p>

            <div style={s.divider}>
              <div style={s.dividerLine} />
              <span style={s.dividerText}>secured by LexOS</span>
              <div style={s.dividerLine} />
            </div>

            <div style={s.trustRow}>
              {['🔒 Private', '🇮🇳 India-First', '✦ AI-Powered'].map((t, i) => (
                <span key={i} style={s.trustItem}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GOLD = '#C9A84C'
const BORDER = 'rgba(255,255,255,0.07)'

const s = {
  root: { minHeight: '100vh', background: '#12100A', fontFamily: "'Inter', sans-serif" },
  wrap: { display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' },

  // Left
  left: { position: 'relative', overflow: 'hidden' },
  bgImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' },
  leftOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, rgba(18,16,10,0.95) 0%, rgba(18,16,10,0.85) 60%, rgba(18,16,10,0.7) 100%)'
  },
  leftContent: {
    position: 'relative', zIndex: 1,
    height: '100%', display: 'flex', flexDirection: 'column',
    padding: '40px 48px', justifyContent: 'space-between'
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: {
    width: '40px', height: '40px', borderRadius: '10px',
    background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.08))',
    border: '1px solid rgba(201,168,76,0.25)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '22px', fontWeight: '700',
    background: `linear-gradient(135deg, #F0EDE8, ${GOLD})`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  logoSub: { fontSize: '8px', color: '#444430', letterSpacing: '0.18em', fontWeight: '600' },
  leftMain: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  leftH1: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(32px, 4vw, 52px)',
    fontWeight: '800', lineHeight: '1.1',
    color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: '16px'
  },
  leftEm: {
    fontStyle: 'italic',
    background: `linear-gradient(135deg, ${GOLD}, #E2C47A)`,
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
  },
  leftP: { fontSize: '15px', color: '#666650', lineHeight: '1.7', marginBottom: '28px', maxWidth: '380px' },
  featurePills: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  pill: {
    fontSize: '12px', color: '#888870',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${BORDER}`,
    borderRadius: '100px', padding: '6px 14px'
  },
  leftQuote: { borderTop: `1px solid rgba(255,255,255,0.06)`, paddingTop: '20px' },
  quoteIcon: { fontSize: '28px', color: GOLD, opacity: 0.3, lineHeight: 1, display: 'block', marginBottom: '4px' },
  quoteText: { fontSize: '12px', color: '#444430', lineHeight: '1.7', fontStyle: 'italic' },
  quoteAuthor: { fontSize: '11px', color: '#2a2818', marginTop: '6px' },

  // Right
  right: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '48px 40px',
    background: '#0E0C07',
    borderLeft: `1px solid ${BORDER}`
  },
  formWrap: { width: '100%', maxWidth: '380px' },
  mobileLogo: {
    display: 'none', alignItems: 'center', gap: '8px',
    marginBottom: '32px'
  },
  mobileLogoText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '20px', fontWeight: '700', color: '#F0EDE8'
  },
  formHead: { marginBottom: '28px' },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    background: 'rgba(201,168,76,0.08)',
    border: '1px solid rgba(201,168,76,0.15)',
    borderRadius: '100px', padding: '4px 12px',
    marginBottom: '14px'
  },
  eyebrowText: { fontSize: '11px', fontWeight: '600', color: GOLD, letterSpacing: '0.08em' },
  formTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '28px', fontWeight: '700',
    color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: '6px'
  },
  formSub: { fontSize: '14px', color: '#444430' },
  errorBox: {
    background: 'rgba(224,82,82,0.08)',
    border: '1px solid rgba(224,82,82,0.2)',
    borderLeft: '2px solid #E05252',
    color: '#E05252', padding: '12px 14px',
    borderRadius: '8px', fontSize: '13px',
    marginBottom: '20px', lineHeight: '1.5'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: {
    fontSize: '11px', fontWeight: '600', color: '#555540',
    textTransform: 'uppercase', letterSpacing: '0.1em'
  },
  switchText: { fontSize: '13px', color: '#444430', textAlign: 'center', marginBottom: '24px' },
  divider: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  dividerLine: { flex: 1, height: '1px', background: BORDER },
  dividerText: { fontSize: '10px', color: '#2a2818', whiteSpace: 'nowrap', letterSpacing: '0.08em' },
  trustRow: { display: 'flex', justifyContent: 'center', gap: '16px' },
  trustItem: { fontSize: '11px', color: '#333320' }
}