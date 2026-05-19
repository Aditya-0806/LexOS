import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'

function Login() {
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
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>LexOS</h1>
        <p style={styles.tagline}>Your AI Legal Assistant</p>
        <h2 style={styles.title}>Welcome Back</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.link}>
          Don't have an account? <Link to="/register" style={styles.linkText}>Register</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0b0f',
    padding: '20px'
  },
  card: {
    background: '#111217',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '18px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px'
  },
  logo: {
    fontFamily: 'sans-serif',
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #E8E8EE, #4F6EF7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center'
  },
  tagline: {
    color: '#888898',
    textAlign: 'center',
    fontSize: '13px',
    marginBottom: '28px'
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#E8E8EE'
  },
  input: {
    width: '100%',
    background: '#181a21',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: '#E8E8EE',
    fontSize: '14px',
    marginBottom: '12px',
    display: 'block'
  },
  button: {
    width: '100%',
    background: '#4F6EF7',
    color: '#fff',
    padding: '13px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '8px',
    marginBottom: '20px'
  },
  error: {
    background: 'rgba(228,88,88,0.1)',
    border: '1px solid rgba(228,88,88,0.2)',
    color: '#E45858',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '16px'
  },
  link: {
    color: '#888898',
    fontSize: '13px',
    textAlign: 'center'
  },
  linkText: {
    color: '#4F6EF7',
    fontWeight: '600'
  }
}

export default Login
