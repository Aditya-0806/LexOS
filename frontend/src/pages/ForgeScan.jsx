import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function ForgeScan() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected) setFile(selected)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  const handleAnalyse = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    setAnalysis('')

    const formData = new FormData()
    formData.append('document', file)

    try {
      const token = localStorage.getItem('lexos_token')
      const res = await axios.post(
  'https://lexos-backend-ek2i.onrender.com/api/forgescan/analyse',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      setAnalysis(res.data.analysis)
    } catch (err) {
      setError('Failed to analyse document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatAnalysis = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('✅')) return <p key={i} style={{...styles.line, color: '#3FC87A'}}>{line}</p>
      if (line.startsWith('⚠️')) return <p key={i} style={{...styles.line, color: '#E4A838'}}>{line}</p>
      if (line.startsWith('❌')) return <p key={i} style={{...styles.line, color: '#E45858'}}>{line}</p>
      if (line.startsWith('📋')) return <p key={i} style={{...styles.line, color: '#4F6EF7'}}>{line}</p>
      if (line.startsWith('💡')) return <p key={i} style={{...styles.line, color: '#7C5CFC'}}>{line}</p>
      if (line.startsWith('DOCUMENT TYPE:') || line.startsWith('RISK LEVEL:')) {
        return <p key={i} style={{...styles.line, color: '#E8E8EE', fontWeight: '700'}}>{line}</p>
      }
      if (line.startsWith('-')) return <p key={i} style={{...styles.line, paddingLeft: '16px'}}>{line}</p>
      if (line === '') return <br key={i} />
      return <p key={i} style={styles.line}>{line}</p>
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={styles.logo}>LexOS</h1>
        </div>
        <span style={styles.pageTitle}>🔍 ForgeScan</span>
      </div>

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.heading}>Document Risk Scanner</h2>
            <p style={styles.sub}>Upload a .txt document — AI analyses it for red flags and missing clauses</p>
          </div>
        </div>

        <div style={styles.twoCol}>
          {/* Upload Section */}
          <div style={styles.uploadCard}>
            <h3 style={styles.formTitle}>Upload Document</h3>

            <div
              style={{
                ...styles.dropZone,
                borderColor: dragOver ? '#4F6EF7' : 'rgba(255,255,255,0.1)',
                background: dragOver ? 'rgba(79,110,247,0.05)' : '#181a21'
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
            >
              <div style={{fontSize: '40px', marginBottom: '12px'}}>📄</div>
              {file ? (
                <div>
                  <p style={{color: '#3FC87A', fontWeight: '600', fontSize: '14px'}}>{file.name}</p>
                  <p style={{color: '#888898', fontSize: '12px', marginTop: '4px'}}>
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{color: '#E8E8EE', fontSize: '14px', fontWeight: '600'}}>
                    Drop file here or click to upload
                  </p>
                  <p style={{color: '#888898', fontSize: '12px', marginTop: '4px'}}>
                    Supports .pdf & .txt files
                  </p>
                </div>
              )}
            </div>

            <input
              id="fileInput"
              type="file"
              accept=".pdf,.txt"
              style={{display: 'none'}}
              onChange={handleFileChange}
            />

            <div style={styles.infoBox}>
              <p style={styles.infoText}>💡 Upload any legal document as PDF or TXT — rental agreement, employment contract, loan document, NDA etc.</p>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              style={{
                ...styles.analyseBtn,
                opacity: (!file || loading) ? 0.6 : 1
              }}
              onClick={handleAnalyse}
              disabled={!file || loading}
            >
              {loading ? '⏳ Analysing...' : '🔍 Analyse Document'}
            </button>
          </div>

          {/* Analysis Output */}
          <div style={styles.outputCard}>
            <h3 style={styles.formTitle}>Risk Analysis</h3>

            {!analysis && !loading && (
              <div style={styles.emptyOutput}>
                <div style={{fontSize: '40px', marginBottom: '12px'}}>🔍</div>
                <p style={styles.emptyText}>Analysis will appear here</p>
                <p style={styles.emptySub}>Upload a document and click Analyse</p>
              </div>
            )}

            {loading && (
              <div style={styles.emptyOutput}>
                <div style={{fontSize: '40px', marginBottom: '12px'}}>⏳</div>
                <p style={styles.emptyText}>Scanning document...</p>
                <p style={styles.emptySub}>AI is checking for red flags</p>
              </div>
            )}

            {analysis && (
              <div style={styles.analysisOutput}>
                {formatAnalysis(analysis)}
              </div>
            )}
          </div>
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
    color: '#888898', padding: '8px 14px', borderRadius: '8px', fontSize: '13px'
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
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  uploadCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '28px'
  },
  formTitle: { fontSize: '16px', fontWeight: '700', color: '#E8E8EE', marginBottom: '16px' },
  dropZone: {
    border: '2px dashed', borderRadius: '12px',
    padding: '40px 20px', textAlign: 'center',
    cursor: 'pointer', marginBottom: '16px',
    transition: 'all 0.2s'
  },
  infoBox: {
    background: 'rgba(79,110,247,0.06)', border: '1px solid rgba(79,110,247,0.12)',
    borderRadius: '8px', padding: '12px 16px', marginBottom: '16px'
  },
  infoText: { color: '#94abff', fontSize: '12px', lineHeight: '1.6' },
  analyseBtn: {
    width: '100%', background: '#4F6EF7', color: '#fff',
    padding: '13px', borderRadius: '10px',
    fontSize: '15px', fontWeight: '600'
  },
  error: {
    background: 'rgba(228,88,88,0.1)', border: '1px solid rgba(228,88,88,0.2)',
    color: '#E45858', padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '16px'
  },
  outputCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '28px'
  },
  emptyOutput: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '60px 20px', textAlign: 'center'
  },
  emptyText: { color: '#E8E8EE', fontSize: '16px', fontWeight: '600', marginBottom: '6px' },
  emptySub: { color: '#888898', fontSize: '13px' },
  analysisOutput: { overflowY: 'auto', maxHeight: '500px' },
  line: { color: '#b4b4c4', fontSize: '13px', lineHeight: '1.7', marginBottom: '4px' }
}

export default ForgeScan