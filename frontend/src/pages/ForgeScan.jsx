import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PageHeader from '../components/PageHeader'

function ForgeScan() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [pastedText, setPastedText] = useState('')
  const [activeTab, setActiveTab] = useState('upload')

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setImagePreview(URL.createObjectURL(selected))
    setError('')
    setAnalysis('')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) {
      setFile(dropped)
      setImagePreview(URL.createObjectURL(dropped))
    }
  }

  const handleAnalyse = async () => {
    if (activeTab === 'upload' && !file) return
    if (activeTab === 'paste' && !pastedText.trim()) return

    setLoading(true)
    setError('')
    setAnalysis('')

    try {
      const token = localStorage.getItem('lexos_token')

      if (activeTab === 'paste') {
        // Send pasted text directly to Groq via backend
        const res = await axios.post(
          'https://lexos-backend-ek2i.onrender.com/api/forgescan/analyse-text',
          { text: pastedText },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setAnalysis(res.data.analysis)
      } else {
        // Send file
        const formData = new FormData()
        formData.append('document', file)
        const res = await axios.post(
          'https://lexos-backend-ek2i.onrender.com/api/forgescan/analyse',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        setAnalysis(res.data.analysis)
      }
    } catch (err) {
      setError('Failed to analyse document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatAnalysis = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('✅')) return <p key={i} style={{...styles.line, color: '#4CAF7D'}}>{line}</p>
      if (line.startsWith('⚠️')) return <p key={i} style={{...styles.line, color: '#E4A838'}}>{line}</p>
      if (line.startsWith('❌')) return <p key={i} style={{...styles.line, color: '#E05252'}}>{line}</p>
      if (line.startsWith('📋')) return <p key={i} style={{...styles.line, color: '#4F6EF7'}}>{line}</p>
      if (line.startsWith('💡')) return <p key={i} style={{...styles.line, color: '#C9A84C'}}>{line}</p>
      if (line.startsWith('DOCUMENT TYPE:') || line.startsWith('RISK LEVEL:')) {
        return <p key={i} style={{...styles.line, color: '#F0EDE8', fontWeight: '700'}}>{line}</p>
      }
      if (line.startsWith('-')) return <p key={i} style={{...styles.line, paddingLeft: '16px'}}>{line}</p>
      if (line === '') return <br key={i} />
      return <p key={i} style={styles.line}>{line}</p>
    })
  }

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #12100A; -webkit-font-smoothing: antialiased; }
        .tab-btn { transition: all 0.2s ease; cursor: pointer; font-family: 'Inter', sans-serif; }
        .analyse-btn { transition: all 0.2s ease; cursor: pointer; font-family: 'Inter', sans-serif; }
        .analyse-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.3); }
        .analyse-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <PageHeader title="ForgeScan" icon="🔍" />

      <div style={styles.content}>
        <div style={styles.pageHead}>
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowDot} />
            <span style={styles.eyebrowText}>AI Document Scanner</span>
          </div>
          <h1 style={styles.pageTitle}>Document Risk Scanner</h1>
          <p style={styles.pageSub}>
            Upload a PDF or paste document text — AI identifies red flags,
            suspicious clauses, missing sections and legal violations
          </p>
        </div>

        <div style={styles.twoCol}>
          {/* Left — Input */}
          <div style={styles.inputCard}>
            {/* Tabs */}
            <div style={styles.tabs}>
              <button
                className="tab-btn"
                style={{
                  ...styles.tab,
                  background: activeTab === 'upload' ? 'rgba(201,168,76,0.1)' : 'transparent',
                  color: activeTab === 'upload' ? '#C9A84C' : '#555540',
                  borderBottom: activeTab === 'upload' ? '2px solid #C9A84C' : '2px solid transparent'
                }}
                onClick={() => setActiveTab('upload')}
              >
                📎 Upload File
              </button>
              <button
                className="tab-btn"
                style={{
                  ...styles.tab,
                  background: activeTab === 'paste' ? 'rgba(201,168,76,0.1)' : 'transparent',
                  color: activeTab === 'paste' ? '#C9A84C' : '#555540',
                  borderBottom: activeTab === 'paste' ? '2px solid #C9A84C' : '2px solid transparent'
                }}
                onClick={() => setActiveTab('paste')}
              >
                📋 Paste Text
              </button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div>
                <div
                  style={{
                    ...styles.dropZone,
                    borderColor: dragOver ? '#C9A84C' : 'rgba(255,255,255,0.08)',
                    background: dragOver ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.02)'
                  }}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {file ? (
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '36px', marginBottom: '10px'}}>📄</div>
                      <p style={{color: '#4CAF7D', fontWeight: '600', fontSize: '14px'}}>{file.name}</p>
                      <p style={{color: '#555540', fontSize: '12px', marginTop: '4px'}}>
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  ) : (
                    <div style={{textAlign: 'center'}}>
                      <div style={{fontSize: '36px', marginBottom: '12px'}}>📎</div>
                      <p style={{color: '#F0EDE8', fontSize: '14px', fontWeight: '600'}}>
                        Drop file here or click to upload
                      </p>
                      <p style={{color: '#444430', fontSize: '12px', marginTop: '6px'}}>
                        PDF or TXT files supported
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
              </div>
            )}

            {/* Paste Tab */}
            {activeTab === 'paste' && (
              <div>
                <label style={styles.label}>Paste Document Text</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Paste your rental agreement, employment contract, legal notice, or any document text here..."
                  value={pastedText}
                  onChange={e => setPastedText(e.target.value)}
                  rows={10}
                />
                <div style={styles.charCount}>
                  {pastedText.length} characters
                  {pastedText.length < 100 && pastedText.length > 0 && (
                    <span style={{color: '#E4A838'}}> — Add more text for better analysis</span>
                  )}
                </div>
              </div>
            )}

            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                💡 Best results with rental agreements, employment contracts,
                loan documents, NDAs, and property deeds
              </p>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              className="analyse-btn"
              style={styles.analyseBtn}
              onClick={handleAnalyse}
              disabled={loading || (activeTab === 'upload' ? !file : !pastedText.trim())}
            >
              {loading ? '⏳ Analysing...' : '🔍 Analyse Document'}
            </button>
          </div>

          {/* Right — Output */}
          <div style={styles.outputCard}>
            <div style={styles.outputHeader}>
              <h3 style={styles.outputTitle}>Risk Analysis</h3>
            </div>

            {!analysis && !loading && (
              <div style={styles.emptyOutput}>
                <div style={{fontSize: '40px', marginBottom: '12px'}}>🔍</div>
                <p style={styles.emptyText}>Analysis will appear here</p>
                <p style={styles.emptySub}>Upload a document or paste text and click Analyse</p>
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
  container: { minHeight: '100vh', background: '#12100A', color: '#F0EDE8', fontFamily: "'Inter', sans-serif" },
  content: { padding: '40px', maxWidth: '1000px', margin: '0 auto' },
  pageHead: { marginBottom: '36px' },
  eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '100px', padding: '4px 12px', marginBottom: '14px' },
  eyebrowDot: { width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' },
  eyebrowText: { fontSize: '11px', fontWeight: '600', color: '#C9A84C', letterSpacing: '0.08em' },
  pageTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: '10px' },
  pageSub: { fontSize: '14px', color: '#555540', lineHeight: '1.7', maxWidth: '560px' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  inputCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' },
  tabs: { display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '4px' },
  tab: { flex: 1, padding: '10px', fontSize: '13px', fontWeight: '600', border: 'none', borderRadius: '0' },
  dropZone: { border: '2px dashed', borderRadius: '12px', padding: '36px 20px', textAlign: 'center', cursor: 'pointer', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' },
  label: { display: 'block', fontSize: '11px', color: '#888870', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' },
  textarea: { width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '14px', color: '#F0EDE8', fontSize: '13px', fontFamily: 'Inter, sans-serif', resize: 'vertical', lineHeight: '1.6' },
  charCount: { fontSize: '11px', color: '#444430', textAlign: 'right', marginTop: '4px' },
  infoBox: { background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '8px', padding: '12px 14px' },
  infoText: { fontSize: '12px', color: '#888860', lineHeight: '1.6' },
  error: { background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.15)', borderLeft: '2px solid #E05252', color: '#E05252', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' },
  analyseBtn: { width: '100%', background: 'linear-gradient(135deg, #C9A84C, #E2C47A)', color: '#12100A', border: 'none', padding: '13px', borderRadius: '10px', fontSize: '14px', fontWeight: '700' },
  outputCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' },
  outputHeader: { marginBottom: '16px' },
  outputTitle: { fontSize: '15px', fontWeight: '700', color: '#F0EDE8' },
  emptyOutput: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' },
  emptyText: { color: '#E8E5E0', fontSize: '15px', fontWeight: '600', marginBottom: '6px' },
  emptySub: { color: '#444430', fontSize: '13px' },
  analysisOutput: { overflowY: 'auto', maxHeight: '500px' },
  line: { color: '#B8B5B0', fontSize: '13px', lineHeight: '1.7', marginBottom: '4px' }
}

export default ForgeScan