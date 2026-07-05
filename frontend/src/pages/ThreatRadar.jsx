import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'
import DocumentScanner from '../components/DocumentScanner'

function ThreatRadar() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [form, setForm] = useState({
    type: 'passport',
    name: '',
    expiryDate: '',
    notes: ''
  })

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const res = await API.get('/documents')
      setDocuments(res.data.documents)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await API.post('/documents', form)
      setForm({ type: 'passport', name: '', expiryDate: '', notes: '' })
      setShowForm(false)
      fetchDocuments()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/documents/${id}`)
      fetchDocuments()
    } catch (err) {
      console.error(err)
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'expired': return '#E45858'
      case 'critical': return '#E4A838'
      case 'warning': return '#4F6EF7'
      default: return '#3FC87A'
    }
  }

  const getStatusLabel = (status, daysLeft) => {
    if (status === 'expired') return 'Expired'
    if (status === 'critical') return `${daysLeft} days left`
    if (status === 'warning') return `${daysLeft} days left`
    return `${daysLeft} days left`
  }

  return (
    <div style={styles.container}>

      {/* Scanner Modal */}
      {showScanner && (
        <DocumentScanner
          onDocumentScanned={(doc) => {
            setShowScanner(false)
            fetchDocuments()
          }}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={styles.logo}>LexOS</h1>
        </div>
        <span style={styles.pageTitle}>📡 ThreatRadar</span>
      </div>

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.heading}>Document Tracker</h2>
            <p style={styles.sub}>Track expiry dates and get alerts before it's too late</p>
          </div>
          <div style={{display: 'flex', gap: '12px'}}>
            <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ Add Document'}
            </button>
            <button style={styles.scanBtn} onClick={() => setShowScanner(true)}>
              📸 Scan Document
            </button>
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Add New Document</h3>
            <form onSubmit={handleAdd}>
              <select
                style={styles.input}
                value={form.type}
                onChange={e => setForm({...form, type: e.target.value})}
              >
                <option value="passport">Passport</option>
                <option value="driving_license">Driving License</option>
                <option value="vehicle_insurance">Vehicle Insurance</option>
                <option value="puc">PUC Certificate</option>
                <option value="rental_agreement">Rental Agreement</option>
                <option value="other">Other</option>
              </select>
              <input
                style={styles.input}
                type="text"
                placeholder="Document Name (e.g. My Passport)"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
              <input
                style={styles.input}
                type="date"
                value={form.expiryDate}
                onChange={e => setForm({...form, expiryDate: e.target.value})}
                required
              />
              <input
                style={styles.input}
                type="text"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
              />
              <button style={styles.submitBtn} type="submit">Save Document</button>
            </form>
          </div>
        )}

        {/* Documents List */}
        {loading ? (
          <p style={styles.empty}>Loading...</p>
        ) : documents.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={{fontSize: '48px', marginBottom: '16px'}}>📋</div>
            <p style={styles.emptyText}>No documents added yet</p>
            <p style={styles.emptySub}>Add your passport, driving license, insurance etc. to track their expiry</p>
          </div>
        ) : (
          <div style={styles.docGrid}>
            {documents.map(doc => (
              <div key={doc._id} style={styles.docCard}>
                <div style={styles.docTop}>
                  <div style={styles.docType}>{doc.type.replace('_', ' ').toUpperCase()}</div>
                  <div style={{
                    ...styles.statusBadge,
                    background: `${getStatusColor(doc.status)}20`,
                    color: getStatusColor(doc.status),
                    border: `1px solid ${getStatusColor(doc.status)}40`
                  }}>
                    {getStatusLabel(doc.status, doc.daysLeft)}
                  </div>
                </div>
                <div style={styles.docName}>{doc.name}</div>
                <div style={styles.docExpiry}>
                  Expires: {new Date(doc.expiryDate).toLocaleDateString('en-IN')}
                </div>
                {doc.notes && <div style={styles.docNotes}>{doc.notes}</div>}
                <div style={styles.progressBar}>
                  <div style={{
                    ...styles.progressFill,
                    width: doc.status === 'expired' ? '100%' :
                           doc.status === 'critical' ? '80%' :
                           doc.status === 'warning' ? '40%' : '10%',
                    background: getStatusColor(doc.status)
                  }} />
                </div>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(doc._id)}
                >
                  Delete
                </button>
              </div>
            ))}
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
  content: { padding: '40px 32px' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' },
  heading: { fontSize: '26px', fontWeight: '700', color: '#E8E8EE', marginBottom: '6px' },
  sub: { color: '#888898', fontSize: '14px' },
  addBtn: {
    background: '#4F6EF7', color: '#fff', padding: '10px 20px',
    borderRadius: '10px', fontSize: '14px', fontWeight: '600'
  },
  scanBtn: {
    background: 'rgba(63,200,122,0.1)',
    border: '1px solid rgba(63,200,122,0.2)',
    color: '#3FC87A', padding: '10px 20px',
    borderRadius: '10px', fontSize: '14px', fontWeight: '600'
  },
  formCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '28px', marginBottom: '28px'
  },
  formTitle: { fontSize: '16px', fontWeight: '700', color: '#E8E8EE', marginBottom: '16px' },
  input: {
    width: '100%', background: '#181a21', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '10px', padding: '12px 16px', color: '#E8E8EE',
    fontSize: '14px', marginBottom: '12px', display: 'block'
  },
  submitBtn: {
    background: '#4F6EF7', color: '#fff', padding: '12px 24px',
    borderRadius: '10px', fontSize: '14px', fontWeight: '600', marginTop: '4px'
  },
  emptyState: { textAlign: 'center', padding: '80px 20px' },
  emptyText: { color: '#E8E8EE', fontSize: '18px', fontWeight: '600', marginBottom: '8px' },
  emptySub: { color: '#888898', fontSize: '14px' },
  empty: { color: '#888898', textAlign: 'center', padding: '40px' },
  docGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' },
  docCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '22px'
  },
  docTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  docType: { fontSize: '10px', fontWeight: '700', color: '#55556A', letterSpacing: '0.1em' },
  statusBadge: { fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '100px' },
  docName: { fontSize: '16px', fontWeight: '700', color: '#E8E8EE', marginBottom: '6px' },
  docExpiry: { fontSize: '13px', color: '#888898', marginBottom: '8px' },
  docNotes: { fontSize: '12px', color: '#55556A', marginBottom: '12px', fontStyle: 'italic' },
  progressBar: { height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '16px' },
  progressFill: { height: '100%', borderRadius: '2px', transition: 'width 0.3s' },
  deleteBtn: {
    background: 'rgba(228,88,88,0.08)', border: '1px solid rgba(228,88,88,0.15)',
    color: '#E45858', padding: '6px 14px', borderRadius: '6px', fontSize: '12px'
  }
}

export default ThreatRadar