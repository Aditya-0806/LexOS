import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'

const categories = [
  { id: 'property', icon: '🏠', label: 'Property & Housing', desc: 'Rent, ownership, eviction, disputes' },
  { id: 'employment', icon: '💼', label: 'Employment', desc: 'Salary, termination, workplace rights' },
  { id: 'consumer', icon: '🛒', label: 'Consumer Rights', desc: 'Fraud, refunds, defective products' },
  { id: 'police', icon: '👮', label: 'Police & Criminal', desc: 'FIR, arrest, bail, complaints' },
  { id: 'family', icon: '👨‍👩‍👧', label: 'Family & Personal', desc: 'Marriage, divorce, inheritance' },
  { id: 'cyber', icon: '💻', label: 'Cybercrime', desc: 'Online fraud, harassment, data theft' },
  { id: 'medical', icon: '🏥', label: 'Medical & Health', desc: 'Negligence, insurance, rights' },
  { id: 'business', icon: '🏢', label: 'Business & Finance', desc: 'Contracts, loans, disputes' },
]

const urgencyLevels = [
  { id: 'critical', label: '🚨 Critical — Immediate action needed', color: '#E45858' },
  { id: 'urgent', label: '⚠️ Urgent — Within a few days', color: '#E4A838' },
  { id: 'normal', label: '📋 Normal — Can wait a week', color: '#4F6EF7' },
  { id: 'advisory', label: '💡 Advisory — Just need guidance', color: '#3FC87A' },
]

function LexCounsel() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [urgency, setUrgency] = useState('')
  const [situation, setSituation] = useState('')
  const [consultation, setConsultation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!situation.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/counsel/consult', {
        category,
        urgency,
        situation
      })
      setConsultation(res.data.consultation)
      setStep(4)
    } catch (err) {
      setError('Failed to get consultation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep(1)
    setCategory('')
    setUrgency('')
    setSituation('')
    setConsultation('')
    setError('')
  }

  const handleCopyConsultation = () => {
    navigator.clipboard.writeText(consultation)
    alert('Copied to clipboard!')
  }

  const formatConsultation = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('##')) return <h3 key={i} style={styles.resultHeading}>{line.replace('##', '').trim()}</h3>
      if (line.startsWith('🚨')) return <p key={i} style={{...styles.resultLine, color: '#E45858'}}>{line}</p>
      if (line.startsWith('⚠️')) return <p key={i} style={{...styles.resultLine, color: '#E4A838'}}>{line}</p>
      if (line.startsWith('✅')) return <p key={i} style={{...styles.resultLine, color: '#3FC87A'}}>{line}</p>
      if (line.startsWith('📋')) return <p key={i} style={{...styles.resultLine, color: '#4F6EF7'}}>{line}</p>
      if (line.startsWith('💡')) return <p key={i} style={{...styles.resultLine, color: '#7C5CFC'}}>{line}</p>
      if (line.startsWith('💰')) return <p key={i} style={{...styles.resultLine, color: '#E4A838'}}>{line}</p>
      if (line.startsWith('➡️')) return <p key={i} style={{...styles.resultLine, color: '#94abff'}}>{line}</p>
      if (line.startsWith('-')) return <p key={i} style={{...styles.resultLine, paddingLeft: '16px'}}>{line}</p>
      if (line === '') return <br key={i} />
      return <p key={i} style={styles.resultLine}>{line}</p>
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={styles.logo}>LexOS</h1>
        </div>
        <span style={styles.pageTitle}>⚖️ LexCounsel</span>
      </div>

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.heading}>AI Legal Consultation</h2>
            <p style={styles.sub}>Get structured legal guidance based on Indian law — IPC, CrPC, Constitution of India</p>
          </div>
          {step > 1 && (
            <button style={styles.resetBtn} onClick={handleReset}>
              Start Over
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div style={styles.stepRow}>
          {['Category', 'Urgency', 'Situation', 'Consultation'].map((s, i) => (
            <div key={i} style={styles.stepItem}>
              <div style={{
                ...styles.stepDot,
                background: step > i ? '#4F6EF7' : step === i + 1 ? '#4F6EF7' : '#181a21',
                border: step === i + 1 ? '2px solid #4F6EF7' : '2px solid rgba(255,255,255,0.1)',
                color: step > i || step === i + 1 ? '#fff' : '#55556A'
              }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{
                ...styles.stepLabel,
                color: step === i + 1 ? '#E8E8EE' : '#55556A'
              }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Step 1 — Category */}
        {step === 1 && (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>What is your legal issue about?</h3>
            <div style={styles.categoryGrid}>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  style={{
                    ...styles.categoryCard,
                    borderColor: category === cat.id ? '#4F6EF7' : 'rgba(255,255,255,0.07)',
                    background: category === cat.id ? 'rgba(79,110,247,0.08)' : '#111217'
                  }}
                  onClick={() => setCategory(cat.id)}
                >
                  <div style={styles.categoryIcon}>{cat.icon}</div>
                  <div style={styles.categoryLabel}>{cat.label}</div>
                  <div style={styles.categoryDesc}>{cat.desc}</div>
                </div>
              ))}
            </div>
            <button
              style={{...styles.nextBtn, opacity: !category ? 0.5 : 1}}
              disabled={!category}
              onClick={() => setStep(2)}
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 — Urgency */}
        {step === 2 && (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>How urgent is your situation?</h3>
            <div style={styles.urgencyList}>
              {urgencyLevels.map(u => (
                <div
                  key={u.id}
                  style={{
                    ...styles.urgencyCard,
                    borderColor: urgency === u.id ? u.color : 'rgba(255,255,255,0.07)',
                    background: urgency === u.id ? `${u.color}10` : '#111217'
                  }}
                  onClick={() => setUrgency(u.id)}
                >
                  <span style={{fontSize: '15px', color: urgency === u.id ? u.color : '#888898'}}>
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{display: 'flex', gap: '12px', marginTop: '24px'}}>
              <button style={styles.backStepBtn} onClick={() => setStep(1)}>← Back</button>
              <button
                style={{...styles.nextBtn, opacity: !urgency ? 0.5 : 1, flex: 1}}
                disabled={!urgency}
                onClick={() => setStep(3)}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Situation */}
        {step === 3 && (
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Describe your situation in detail</h3>
            <p style={styles.stepSub}>The more detail you provide, the more accurate your legal consultation will be.</p>

            <textarea
              style={styles.textarea}
              placeholder={`Describe exactly what happened, when it happened, who is involved, what documents you have, and what outcome you are looking for...\n\nExample: My landlord has not returned my security deposit of Rs 50,000 even after 3 months of vacating the property. I have the rent agreement and all payment receipts. He is now threatening to deduct money for damages that were pre-existing.`}
              value={situation}
              onChange={e => setSituation(e.target.value)}
              rows={8}
            />

            <div style={styles.charCount}>
              {situation.length} characters — {situation.length < 100 ? 'Add more detail for better results' : 'Good detail level ✅'}
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
              <button style={styles.backStepBtn} onClick={() => setStep(2)}>← Back</button>
              <button
                style={{
                  ...styles.nextBtn,
                  flex: 1,
                  opacity: (!situation.trim() || loading) ? 0.5 : 1
                }}
                disabled={!situation.trim() || loading}
                onClick={handleGenerate}
              >
                {loading ? '⏳ Consulting AI...' : '⚖️ Get Legal Consultation'}
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Results */}
        {step === 4 && consultation && (
          <div style={styles.stepContent}>
            <div style={styles.resultHeader}>
              <h3 style={styles.stepTitle}>Your Legal Consultation</h3>
              <div style={{display: 'flex', gap: '10px'}}>
                <button style={styles.copyBtn} onClick={handleCopyConsultation}>
                  📋 Copy
                </button>
              </div>
            </div>

            <div style={styles.disclaimer}>
              ⚠️ This consultation is based on Indian law and is for informational purposes only. It does not constitute legal advice. Consult a qualified lawyer for your specific situation.
            </div>

            <div style={styles.resultCard}>
              {formatConsultation(consultation)}
            </div>

            <div style={styles.actionRow}>
              <button style={styles.resetBtn} onClick={handleReset}>
                New Consultation
              </button>
              <button
                style={styles.complaintBtn}
                onClick={() => navigate('/quickcomplaint')}
              >
                📝 Draft Complaint Letter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', background: '#0a0b0f' },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 32px', borderBottom: '1px solid rgba(255,255,255,0.07)',
    background: '#111217'
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  backBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#888898', padding: '8px 14px', borderRadius: '8px', fontSize: '13px'
  },
  logo: {
    fontSize: '22px', fontWeight: '800',
    background: 'linear-gradient(135deg, #E8E8EE, #4F6EF7)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  },
  pageTitle: { color: '#E8E8EE', fontSize: '15px', fontWeight: '600' },
  content: { padding: '40px 32px', maxWidth: '800px', margin: '0 auto' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' },
  heading: { fontSize: '26px', fontWeight: '700', color: '#E8E8EE', marginBottom: '6px' },
  sub: { color: '#888898', fontSize: '14px' },
  resetBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#888898', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
  },
  stepRow: {
    display: 'flex', alignItems: 'center', gap: '8px',
    marginBottom: '36px', flexWrap: 'wrap'
  },
  stepItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  stepDot: {
    width: '28px', height: '28px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: '700'
  },
  stepLabel: { fontSize: '13px', fontWeight: '500' },
  stepContent: {},
  stepTitle: { fontSize: '20px', fontWeight: '700', color: '#E8E8EE', marginBottom: '8px' },
  stepSub: { color: '#888898', fontSize: '13px', marginBottom: '20px' },
  categoryGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px', marginBottom: '24px'
  },
  categoryCard: {
    border: '1px solid', borderRadius: '12px', padding: '18px',
    cursor: 'pointer', transition: 'all 0.2s'
  },
  categoryIcon: { fontSize: '24px', marginBottom: '8px' },
  categoryLabel: { fontSize: '14px', fontWeight: '700', color: '#E8E8EE', marginBottom: '4px' },
  categoryDesc: { fontSize: '12px', color: '#888898' },
  urgencyList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  urgencyCard: {
    border: '1px solid', borderRadius: '12px', padding: '16px 20px',
    cursor: 'pointer', transition: 'all 0.2s'
  },
  nextBtn: {
    background: '#4F6EF7', color: '#fff', padding: '13px 28px',
    borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', border: 'none'
  },
  backStepBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#888898', padding: '13px 20px', borderRadius: '10px',
    fontSize: '14px', cursor: 'pointer'
  },
  textarea: {
    width: '100%', background: '#181a21',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px', padding: '16px',
    color: '#E8E8EE', fontSize: '14px',
    lineHeight: '1.7', fontFamily: 'inherit',
    resize: 'vertical'
  },
  charCount: { fontSize: '12px', color: '#55556A', marginTop: '8px', textAlign: 'right' },
  error: {
    background: 'rgba(228,88,88,0.1)', border: '1px solid rgba(228,88,88,0.2)',
    color: '#E45858', padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginTop: '12px'
  },
  resultHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px'
  },
  copyBtn: {
    background: 'rgba(79,110,247,0.1)', border: '1px solid rgba(79,110,247,0.2)',
    color: '#94abff', padding: '8px 16px', borderRadius: '8px',
    fontSize: '13px', cursor: 'pointer'
  },
  disclaimer: {
    background: 'rgba(228,168,56,0.08)', border: '1px solid rgba(228,168,56,0.15)',
    color: '#c8a440', padding: '12px 16px', borderRadius: '8px',
    fontSize: '12px', marginBottom: '20px', lineHeight: '1.6'
  },
  resultCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '28px'
  },
  resultHeading: {
    fontSize: '16px', fontWeight: '700', color: '#E8E8EE',
    marginBottom: '12px', marginTop: '20px'
  },
  resultLine: { fontSize: '14px', color: '#b4b4c4', lineHeight: '1.7', marginBottom: '6px' },
  actionRow: { display: 'flex', gap: '12px', marginTop: '24px' },
  complaintBtn: {
    background: '#4F6EF7', color: '#fff', padding: '12px 24px',
    borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', border: 'none'
  }
}

export default LexCounsel