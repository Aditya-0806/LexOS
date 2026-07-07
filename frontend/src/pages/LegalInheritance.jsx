import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'

const checklistItems = [
  { id: 'will', label: 'Has a registered Will', icon: '📜', law: 'Indian Succession Act 1925', importance: 'high' },
  { id: 'nominee_bank', label: 'Nominee added in all bank accounts', icon: '🏦', law: 'Banking Regulation Act', importance: 'high' },
  { id: 'nominee_insurance', label: 'Nominee in life insurance policy', icon: '🛡️', law: 'Insurance Act 1938', importance: 'high' },
  { id: 'nominee_pf', label: 'Nominee in PF/EPF updated', icon: '💰', law: 'EPF Act 1952', importance: 'high' },
  { id: 'property_docs', label: 'Property documents updated & clear', icon: '🏠', law: 'Transfer of Property Act', importance: 'high' },
  { id: 'health_insurance', label: 'Health insurance active', icon: '🏥', law: 'Insurance Regulatory Act', importance: 'medium' },
  { id: 'vehicle_insurance', label: 'Vehicle insurance valid', icon: '🚗', law: 'Motor Vehicles Act', importance: 'medium' },
  { id: 'pan_aadhaar', label: 'PAN linked with Aadhaar', icon: '🪪', law: 'Income Tax Act', importance: 'medium' },
  { id: 'joint_property', label: 'Joint property agreements clear', icon: '🤝', law: 'Transfer of Property Act', importance: 'medium' },
  { id: 'loans_documented', label: 'All loans properly documented', icon: '📋', law: 'Contract Act 1872', importance: 'medium' },
]

function ChecklistSection({ title, icon, storageKey }) {
  const [checklist, setChecklist] = useState({})

  useEffect(() => {
    const saved = localStorage.getItem(`lexos_${storageKey}`)
    if (saved) setChecklist(JSON.parse(saved))
  }, [storageKey])

  const handleCheck = (itemId) => {
    const newChecklist = { ...checklist, [itemId]: !checklist[itemId] }
    setChecklist(newChecklist)
    localStorage.setItem(`lexos_${storageKey}`, JSON.stringify(newChecklist))
  }

  const completed = Object.values(checklist).filter(Boolean).length
  const total = checklistItems.length
  const pct = Math.round((completed / total) * 100)

  const getColor = () => {
    if (pct >= 80) return '#3FC87A'
    if (pct >= 50) return '#E4A838'
    return '#E45858'
  }

  const highPriorityGaps = checklistItems.filter(
    item => item.importance === 'high' && !checklist[item.id]
  )

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <div style={styles.sectionTitleRow}>
          <span style={{fontSize: '28px'}}>{icon}</span>
          <h3 style={styles.sectionTitle}>{title}</h3>
        </div>
        <div style={{
          ...styles.scoreBadge,
          background: `${getColor()}20`,
          color: getColor(),
          border: `1px solid ${getColor()}40`
        }}>
          {pct}% Complete
        </div>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressBar}>
        <div style={{
          ...styles.progressFill,
          width: `${pct}%`,
          background: getColor()
        }} />
      </div>

      <p style={styles.scoreNote}>
        {pct === 100 ? '✅ All legal documents in order!' :
         pct >= 80 ? '🟡 Almost complete — a few gaps remaining' :
         pct >= 50 ? '🟠 Several important gaps to address' :
         '🔴 Critical gaps — immediate attention needed'}
      </p>

      {/* High Priority Gaps Alert */}
      {highPriorityGaps.length > 0 && (
        <div style={styles.alertBox}>
          <p style={styles.alertTitle}>🚨 High Priority Gaps:</p>
          {highPriorityGaps.map(item => (
            <p key={item.id} style={styles.alertItem}>• {item.icon} {item.label}</p>
          ))}
        </div>
      )}

      {/* Checklist */}
      <div style={styles.checklistCard}>
        {checklistItems.map(item => (
          <div
            key={item.id}
            style={{
              ...styles.checkItem,
              background: checklist[item.id] ? 'rgba(63,200,122,0.05)' : 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
            onClick={() => handleCheck(item.id)}
          >
            <div style={{
              ...styles.checkbox,
              background: checklist[item.id] ? '#3FC87A' : 'transparent',
              borderColor: checklist[item.id] ? '#3FC87A' :
                item.importance === 'high' ? 'rgba(228,88,88,0.5)' : 'rgba(255,255,255,0.2)'
            }}>
              {checklist[item.id] && <span style={{color: '#fff', fontSize: '11px'}}>✓</span>}
            </div>
            <div style={styles.checkContent}>
              <div style={styles.checkLabel}>
                {item.icon} {item.label}
                {item.importance === 'high' && (
                  <span style={styles.highBadge}>High Priority</span>
                )}
              </div>
              <div style={styles.checkLaw}>{item.law}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LegalInheritance() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={styles.logo}>LexOS</h1>
        </div>
        <span style={styles.pageTitle}>🧬 LegalInheritance</span>
      </div>

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.heading}>Family Legal Health</h2>
            <p style={styles.sub}>Track legal documentation gaps for you and your spouse — high priority items shown in red</p>
          </div>
        </div>

        <div style={styles.twoCol}>
          <ChecklistSection
            title="Your Legal Health"
            icon="👤"
            storageKey="self_checklist"
          />
          <ChecklistSection
            title="Spouse's Legal Health"
            icon="💑"
            storageKey="spouse_checklist"
          />
        </div>

        <div style={styles.infoBox}>
          <p style={styles.infoText}>
            💡 <strong>Why this matters:</strong> Without proper nominees and a registered Will, your assets may not reach your intended beneficiaries. Indian courts follow strict succession laws — gaps in documentation can cause years of legal disputes for your family.
          </p>
        </div>
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
    color: '#888898', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
  },
  logo: {
    fontSize: '22px', fontWeight: '800',
    background: 'linear-gradient(135deg, #E8E8EE, #4F6EF7)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  },
  pageTitle: { color: '#E8E8EE', fontSize: '15px', fontWeight: '600' },
  content: { padding: '40px 32px' },
  topRow: { marginBottom: '32px' },
  heading: { fontSize: '26px', fontWeight: '700', color: '#E8E8EE', marginBottom: '6px' },
  sub: { color: '#888898', fontSize: '14px' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' },
  section: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '24px'
  },
  sectionHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px'
  },
  sectionTitleRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#E8E8EE' },
  scoreBadge: { fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '100px' },
  progressBar: {
    height: '6px', background: 'rgba(255,255,255,0.05)',
    borderRadius: '3px', overflow: 'hidden', marginBottom: '10px'
  },
  progressFill: { height: '100%', borderRadius: '3px', transition: 'width 0.5s' },
  scoreNote: { fontSize: '12px', color: '#888898', marginBottom: '16px' },
  alertBox: {
    background: 'rgba(228,88,88,0.08)', border: '1px solid rgba(228,88,88,0.15)',
    borderRadius: '10px', padding: '14px', marginBottom: '16px'
  },
  alertTitle: { fontSize: '12px', fontWeight: '700', color: '#E45858', marginBottom: '8px' },
  alertItem: { fontSize: '12px', color: '#f08080', marginBottom: '4px' },
  checklistCard: {
    background: '#0a0b0f', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '12px', overflow: 'hidden'
  },
  checkItem: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '12px 16px', cursor: 'pointer'
  },
  checkbox: {
    width: '20px', height: '20px', borderRadius: '5px',
    border: '2px solid', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  checkContent: { flex: 1 },
  checkLabel: {
    fontSize: '13px', color: '#E8E8EE',
    fontWeight: '500', display: 'flex',
    alignItems: 'center', gap: '8px', flexWrap: 'wrap'
  },
  highBadge: {
    fontSize: '9px', fontWeight: '700',
    background: 'rgba(228,88,88,0.15)',
    color: '#E45858', padding: '2px 6px',
    borderRadius: '4px', letterSpacing: '0.05em'
  },
  checkLaw: { fontSize: '10px', color: '#55556A', marginTop: '2px' },
  infoBox: {
    background: 'rgba(79,110,247,0.06)', border: '1px solid rgba(79,110,247,0.12)',
    borderRadius: '12px', padding: '18px 22px'
  },
  infoText: { fontSize: '13px', color: '#94abff', lineHeight: '1.7' }
}

export default LegalInheritance