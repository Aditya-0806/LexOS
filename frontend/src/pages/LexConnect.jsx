import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = [
  { id: 'divorce', icon: '💔', label: 'Divorce & Family', color: '#E45858' },
  { id: 'property', icon: '🏠', label: 'Property & Will', color: '#4F6EF7' },
  { id: 'criminal', icon: '⚖️', label: 'Criminal & Police', color: '#E4A838' },
  { id: 'consumer', icon: '🛒', label: 'Consumer Rights', color: '#3FC87A' },
  { id: 'employment', icon: '💼', label: 'Employment', color: '#7C5CFC' },
  { id: 'cyber', icon: '💻', label: 'Cybercrime', color: '#4F6EF7' },
  { id: 'medical', icon: '🏥', label: 'Medical Negligence', color: '#E45858' },
  { id: 'business', icon: '🏢', label: 'Business & Finance', color: '#3FC87A' },
]

const legalAid = {
  divorce: {
    free: [
      { name: 'NALSA Women Cell', contact: '181', type: 'Helpline', available: '24/7' },
      { name: 'District Legal Services Authority', contact: 'Visit nearest court', type: 'Free legal aid', available: 'Mon-Sat' },
      { name: 'iCall Helpline', contact: '9152987821', type: 'Counselling', available: 'Mon-Sat 8am-10pm' },
    ],
    paid: {
      range: '₹5,000 — ₹50,000+',
      factors: 'Complexity of case, court level, property involved',
      avg_consultation: '₹1,000 — ₹3,000 per session'
    },
    tips: [
      'Always get a written fee agreement before hiring',
      'Family courts offer free mediation — try this first',
      'NALSA provides free lawyers if income is below ₹1 lakh/year',
      'Keep all marriage documents, photos, and communication records'
    ],
    search: 'family+divorce+lawyer'
  },
  property: {
    free: [
      { name: 'District Legal Services Authority', contact: 'Visit nearest court', type: 'Free legal aid', available: 'Mon-Sat' },
      { name: 'NALSA Helpline', contact: '15100', type: 'Legal aid', available: '24/7' },
      { name: 'Lok Adalat', contact: 'Visit District Court', type: 'Free mediation', available: 'Monthly' },
    ],
    paid: {
      range: '₹3,000 — ₹30,000+',
      factors: 'Property value, dispute complexity, registration issues',
      avg_consultation: '₹1,500 — ₹5,000 per session'
    },
    tips: [
      'Verify property documents at Sub-Registrar office before buying',
      'Lok Adalat resolves property disputes faster than courts — try first',
      'Will registration costs only ₹1,000-2,000 — highly recommended',
      'Keep all sale deeds, mutation records, and tax receipts safely'
    ],
    search: 'property+real+estate+lawyer'
  },
  criminal: {
    free: [
      { name: 'NALSA Helpline', contact: '15100', type: 'Free legal aid', available: '24/7' },
      { name: 'District Legal Services Authority', contact: 'Visit nearest court', type: 'Free lawyer', available: 'Mon-Sat' },
      { name: 'Human Rights Law Network', contact: 'hrln.org', type: 'Legal aid NGO', available: 'Mon-Fri' },
    ],
    paid: {
      range: '₹5,000 — ₹1,00,000+',
      factors: 'Severity of charges, court level, bail complexity',
      avg_consultation: '₹2,000 — ₹5,000 per session'
    },
    tips: [
      'You have the right to a free lawyer under Article 22 of Constitution',
      'Never sign any document at police station without reading it',
      'NALSA provides completely free lawyers for criminal cases',
      'Bail applications can be filed even at midnight in emergencies'
    ],
    search: 'criminal+defense+lawyer'
  },
  consumer: {
    free: [
      { name: 'National Consumer Helpline', contact: '1800-11-4000', type: 'Helpline', available: '24/7' },
      { name: 'Consumer Forum', contact: 'Visit District Consumer Forum', type: 'Free filing', available: 'Mon-Sat' },
      { name: 'NCDRC Online', contact: 'ncdrc.nic.in', type: 'Online complaint', available: '24/7' },
    ],
    paid: {
      range: '₹2,000 — ₹15,000',
      factors: 'Claim amount, complexity, number of hearings',
      avg_consultation: '₹500 — ₹2,000 per session'
    },
    tips: [
      'Consumer Forum filing fee is only ₹100-200 — very affordable',
      'You can represent yourself in Consumer Forum — no lawyer needed',
      'File complaint within 2 years of the issue (limitation period)',
      'Keep all bills, receipts, warranties, and communication as evidence'
    ],
    search: 'consumer+rights+lawyer'
  },
  employment: {
    free: [
      { name: 'Labour Commissioner Office', contact: 'Visit state labour office', type: 'Free mediation', available: 'Mon-Fri' },
      { name: 'NALSA Helpline', contact: '15100', type: 'Legal aid', available: '24/7' },
      { name: 'Labour Court', contact: 'Visit nearest labour court', type: 'Free filing', available: 'Mon-Sat' },
    ],
    paid: {
      range: '₹3,000 — ₹20,000',
      factors: 'Salary amount, wrongful termination, unpaid dues',
      avg_consultation: '₹1,000 — ₹3,000 per session'
    },
    tips: [
      'Always get termination letter in writing — verbal termination is harder to prove',
      'Labour Commissioner mediation is free and faster than courts',
      'You can file for unpaid salary in Labour Court within 1 year',
      'Keep offer letter, payslips, and all employment communication safely'
    ],
    search: 'employment+labour+lawyer'
  },
  cyber: {
    free: [
      { name: 'Cyber Crime Portal', contact: 'cybercrime.gov.in', type: 'Online complaint', available: '24/7' },
      { name: 'Cyber Crime Helpline', contact: '1930', type: 'Helpline', available: '24/7' },
      { name: 'Nearest Cyber Cell', contact: 'Visit local police station', type: 'FIR filing', available: '24/7' },
    ],
    paid: {
      range: '₹5,000 — ₹25,000+',
      factors: 'Financial loss involved, complexity of cybercrime',
      avg_consultation: '₹2,000 — ₹5,000 per session'
    },
    tips: [
      'Report cybercrime within 24 hours — golden hour for recovery',
      'Call 1930 immediately for financial fraud — bank can freeze transactions',
      'Screenshot all evidence before reporting — social media posts get deleted',
      'cybercrime.gov.in allows anonymous reporting for sensitive cases'
    ],
    search: 'cyber+crime+lawyer'
  },
  medical: {
    free: [
      { name: 'Consumer Forum', contact: 'Visit District Consumer Forum', type: 'Free filing', available: 'Mon-Sat' },
      { name: 'State Medical Council', contact: 'Visit state medical council', type: 'Doctor complaint', available: 'Mon-Fri' },
      { name: 'NALSA Helpline', contact: '15100', type: 'Legal aid', available: '24/7' },
    ],
    paid: {
      range: '₹10,000 — ₹1,00,000+',
      factors: 'Severity of negligence, compensation sought',
      avg_consultation: '₹2,000 — ₹8,000 per session'
    },
    tips: [
      'Always get medical records and discharge summary in writing',
      'File complaint with State Medical Council for doctor misconduct',
      'Medical negligence cases can be filed in Consumer Forum — cheaper',
      'Keep all prescriptions, bills, test reports as evidence'
    ],
    search: 'medical+negligence+lawyer'
  },
  business: {
    free: [
      { name: 'MSME Samadhaan', contact: 'samadhaan.msme.gov.in', type: 'Online portal', available: '24/7' },
      { name: 'Lok Adalat', contact: 'Visit District Court', type: 'Free mediation', available: 'Monthly' },
      { name: 'NALSA Helpline', contact: '15100', type: 'Legal aid', available: '24/7' },
    ],
    paid: {
      range: '₹5,000 — ₹50,000+',
      factors: 'Contract value, dispute complexity, arbitration',
      avg_consultation: '₹2,000 — ₹8,000 per session'
    },
    tips: [
      'Always have written contracts — verbal agreements are hard to enforce',
      'MSME Samadhaan portal resolves payment disputes in 45 days',
      'Arbitration is faster and cheaper than court for business disputes',
      'Register your business agreements with proper stamp duty'
    ],
    search: 'business+corporate+lawyer'
  }
}

function LexConnect() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [userCity, setUserCity] = useState('')

  const handleFindLawyers = () => {
    const city = userCity || 'India'
    const query = legalAid[selected.id].search
    window.open(`https://www.justdial.com/search?q=${query}&city=${city}`, '_blank')
  }

  const handleVakilSearch = () => {
    window.open(`https://vakilsearch.com/`, '_blank')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={styles.logo}>LexOS</h1>
        </div>
        <span style={styles.pageTitle}>🤝 LexConnect</span>
      </div>

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.heading}>Connect with Legal Help</h2>
            <p style={styles.sub}>Find free legal aid, official helplines, and lawyers by category</p>
          </div>
        </div>

        {/* Emergency Helplines */}
        <div style={styles.emergencyBox}>
          <h3 style={styles.emergencyTitle}>🚨 Emergency Legal Helplines</h3>
          <div style={styles.helplineGrid}>
            <div style={styles.helplineItem}>
              <span style={styles.helplineNumber}>15100</span>
              <span style={styles.helplineLabel}>NALSA — Free Legal Aid</span>
            </div>
            <div style={styles.helplineItem}>
              <span style={styles.helplineNumber}>1800-11-4000</span>
              <span style={styles.helplineLabel}>Consumer Helpline</span>
            </div>
            <div style={styles.helplineItem}>
              <span style={styles.helplineNumber}>1930</span>
              <span style={styles.helplineLabel}>Cyber Crime</span>
            </div>
            <div style={styles.helplineItem}>
              <span style={styles.helplineNumber}>181</span>
              <span style={styles.helplineLabel}>Women Helpline</span>
            </div>
            <div style={styles.helplineItem}>
              <span style={styles.helplineNumber}>112</span>
              <span style={styles.helplineLabel}>Police Emergency</span>
            </div>
            <div style={styles.helplineItem}>
              <span style={styles.helplineNumber}>14567</span>
              <span style={styles.helplineLabel}>Senior Citizen</span>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        {!selected && (
          <div>
            <h3 style={styles.sectionTitle}>Select Your Legal Issue</h3>
            <div style={styles.categoryGrid}>
              {categories.map(cat => (
                <div
                  key={cat.id}
                  style={{...styles.categoryCard, borderColor: `${cat.color}30`}}
                  onClick={() => setSelected(cat)}
                >
                  <div style={styles.catIcon}>{cat.icon}</div>
                  <div style={{...styles.catLabel, color: cat.color}}>{cat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Detail */}
        {selected && (
          <div>
            <button
              style={styles.backCatBtn}
              onClick={() => setSelected(null)}
            >
              ← All Categories
            </button>

            <h3 style={styles.selectedTitle}>
              {selected.icon} {selected.label} — Legal Help
            </h3>

            <div style={styles.detailGrid}>
              {/* Free Legal Aid */}
              <div style={styles.detailCard}>
                <h4 style={styles.detailTitle}>✅ Free Legal Aid</h4>
                {legalAid[selected.id].free.map((item, i) => (
                  <div key={i} style={styles.aidItem}>
                    <div style={styles.aidName}>{item.name}</div>
                    <div style={styles.aidContact}>📞 {item.contact}</div>
                    <div style={styles.aidMeta}>
                      <span style={styles.aidType}>{item.type}</span>
                      <span style={styles.aidAvail}>{item.available}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paid Lawyers */}
              <div style={styles.detailCard}>
                <h4 style={styles.detailTitle}>💰 Paid Lawyer Fees</h4>
                <div style={styles.feeBox}>
                  <div style={styles.feeRow}>
                    <span style={styles.feeLabel}>Typical Range</span>
                    <span style={styles.feeValue}>{legalAid[selected.id].paid.range}</span>
                  </div>
                  <div style={styles.feeRow}>
                    <span style={styles.feeLabel}>Consultation</span>
                    <span style={styles.feeValue}>{legalAid[selected.id].paid.avg_consultation}</span>
                  </div>
                  <div style={styles.feeNote}>
                    📋 Factors: {legalAid[selected.id].paid.factors}
                  </div>
                </div>

                {/* Find Lawyers */}
                <div style={styles.findSection}>
                  <h4 style={styles.detailTitle}>🔍 Find Lawyers Near You</h4>
                  <input
                    style={styles.cityInput}
                    type="text"
                    placeholder="Enter your city (e.g. Pune)"
                    value={userCity}
                    onChange={e => setUserCity(e.target.value)}
                  />
                  <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                    <button style={styles.justdialBtn} onClick={handleFindLawyers}>
                      🔍 Search JustDial
                    </button>
                    <button style={styles.vakilBtn} onClick={handleVakilSearch}>
                      ⚖️ VakilSearch
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div style={styles.tipsCard}>
              <h4 style={styles.tipsTitle}>💡 Important Tips for {selected.label}</h4>
              {legalAid[selected.id].tips.map((tip, i) => (
                <div key={i} style={styles.tipItem}>
                  <div style={styles.tipDot} />
                  <span style={styles.tipText}>{tip}</span>
                </div>
              ))}
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
    color: '#888898', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
  },
  logo: {
    fontSize: '22px', fontWeight: '800',
    background: 'linear-gradient(135deg, #E8E8EE, #4F6EF7)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
  },
  pageTitle: { color: '#E8E8EE', fontSize: '15px', fontWeight: '600' },
  content: { padding: '40px 32px' },
  topRow: { marginBottom: '28px' },
  heading: { fontSize: '26px', fontWeight: '700', color: '#E8E8EE', marginBottom: '6px' },
  sub: { color: '#888898', fontSize: '14px' },
  emergencyBox: {
    background: 'rgba(228,88,88,0.06)', border: '1px solid rgba(228,88,88,0.15)',
    borderRadius: '16px', padding: '24px', marginBottom: '32px'
  },
  emergencyTitle: { fontSize: '15px', fontWeight: '700', color: '#E45858', marginBottom: '16px' },
  helplineGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px'
  },
  helplineItem: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '10px', padding: '14px', textAlign: 'center'
  },
  helplineNumber: {
    display: 'block', fontSize: '20px', fontWeight: '800',
    color: '#E45858', marginBottom: '4px'
  },
  helplineLabel: { fontSize: '11px', color: '#888898' },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#E8E8EE', marginBottom: '16px' },
  categoryGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px'
  },
  categoryCard: {
    background: '#111217', border: '1px solid',
    borderRadius: '14px', padding: '20px',
    cursor: 'pointer', textAlign: 'center'
  },
  catIcon: { fontSize: '28px', marginBottom: '8px' },
  catLabel: { fontSize: '13px', fontWeight: '700' },
  backCatBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#888898', padding: '8px 16px', borderRadius: '8px',
    fontSize: '13px', cursor: 'pointer', marginBottom: '20px'
  },
  selectedTitle: { fontSize: '20px', fontWeight: '700', color: '#E8E8EE', marginBottom: '20px' },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  detailCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px', padding: '22px'
  },
  detailTitle: { fontSize: '13px', fontWeight: '700', color: '#E8E8EE', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  aidItem: {
    background: '#181a21', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '10px', padding: '14px', marginBottom: '10px'
  },
  aidName: { fontSize: '14px', fontWeight: '700', color: '#E8E8EE', marginBottom: '4px' },
  aidContact: { fontSize: '13px', color: '#4F6EF7', marginBottom: '8px' },
  aidMeta: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  aidType: {
    fontSize: '10px', background: 'rgba(63,200,122,0.1)',
    color: '#3FC87A', padding: '3px 8px', borderRadius: '4px', fontWeight: '600'
  },
  aidAvail: { fontSize: '11px', color: '#55556A' },
  feeBox: {
    background: '#181a21', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '10px', padding: '16px', marginBottom: '16px'
  },
  feeRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  feeLabel: { fontSize: '12px', color: '#888898' },
  feeValue: { fontSize: '13px', fontWeight: '700', color: '#E4A838' },
  feeNote: { fontSize: '11px', color: '#55556A', lineHeight: '1.5', marginTop: '8px' },
  findSection: { marginTop: '16px' },
  cityInput: {
    width: '100%', background: '#181a21',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px', padding: '10px 14px',
    color: '#E8E8EE', fontSize: '13px', display: 'block'
  },
  justdialBtn: {
    flex: 1, background: 'rgba(79,110,247,0.1)',
    border: '1px solid rgba(79,110,247,0.2)',
    color: '#94abff', padding: '10px',
    borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer'
  },
  vakilBtn: {
    flex: 1, background: 'rgba(63,200,122,0.1)',
    border: '1px solid rgba(63,200,122,0.2)',
    color: '#3FC87A', padding: '10px',
    borderRadius: '8px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer'
  },
  tipsCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px', padding: '22px'
  },
  tipsTitle: { fontSize: '14px', fontWeight: '700', color: '#E8E8EE', marginBottom: '14px' },
  tipItem: { display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' },
  tipDot: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: '#4F6EF7', flexShrink: 0, marginTop: '6px'
  },
  tipText: { fontSize: '13px', color: '#b4b4c4', lineHeight: '1.6' }
}

export default LexConnect