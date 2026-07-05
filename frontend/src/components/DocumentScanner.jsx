import { useState, useRef } from 'react'
import { createWorker } from 'tesseract.js'
import API from '../utils/api'

function DocumentScanner({ onDocumentScanned, onClose }) {
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const fileInputRef = useRef(null)

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
    setExtractedText('')
    setProgress(0)
    setStatus('')
  }

  const handleScan = async () => {
    if (!image) return
    setScanning(true)
    setStatus('Loading scanner...')
    setProgress(0)

    try {
      // Step 1 — Tesseract reads text from image
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
            setStatus('Reading document...')
          }
        }
      })

      const { data: { text } } = await worker.recognize(image)
      await worker.terminate()

      setExtractedText(text)
      setStatus('Analysing with AI...')

      // Step 2 — Send extracted text to Groq for understanding
      const res = await API.post('/documents/scan', {
        text: text
      })

      if (res.data.success) {
        setStatus('Document scanned successfully!')
        onDocumentScanned(res.data.document)
      } else {
        setStatus('Could not find expiry date. Please add manually.')
      }

    } catch (error) {
      console.log('Scan error:', error)
      setStatus('Scanning failed. Please try again.')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>📸 Scan Document</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <p style={styles.modalSub}>
          Take a clear photo of your document — passport, DL, insurance, PUC etc.
        </p>

        {/* Upload Area */}
        <div
          style={styles.uploadArea}
          onClick={() => fileInputRef.current.click()}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Document"
              style={styles.preview}
            />
          ) : (
            <div style={styles.uploadPlaceholder}>
              <div style={{fontSize: '40px', marginBottom: '12px'}}>📷</div>
              <p style={{color: '#E8E8EE', fontSize: '14px', fontWeight: '600'}}>
                Click to upload photo
              </p>
              <p style={{color: '#888898', fontSize: '12px', marginTop: '4px'}}>
                JPG, PNG supported
              </p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{display: 'none'}}
          onChange={handleImageSelect}
        />

        {/* Progress */}
        {scanning && (
          <div style={styles.progressSection}>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${progress}%`}} />
            </div>
            <p style={styles.statusText}>{status}</p>
          </div>
        )}

        {/* Status message */}
        {!scanning && status && (
          <p style={{
            ...styles.statusText,
            color: status.includes('success') ? '#3FC87A' : '#888898',
            textAlign: 'center',
            marginTop: '12px'
          }}>
            {status}
          </p>
        )}

        {/* Extracted text preview */}
        {extractedText && !scanning && (
          <div style={styles.textPreview}>
            <p style={styles.textPreviewLabel}>Extracted Text:</p>
            <p style={styles.textPreviewContent}>
              {extractedText.slice(0, 200)}...
            </p>
          </div>
        )}

        {/* Scan Button */}
        <button
          style={{
            ...styles.scanBtn,
            opacity: (!image || scanning) ? 0.6 : 1
          }}
          onClick={handleScan}
          disabled={!image || scanning}
        >
          {scanning ? `⏳ Scanning... ${progress}%` : '🔍 Scan Document'}
        </button>

        <p style={styles.tip}>
          💡 Tip: Ensure document is flat, well-lit, and text is clearly visible
        </p>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', zIndex: 1000,
    padding: '20px'
  },
  modal: {
    background: '#111217',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '18px',
    padding: '28px',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '8px'
  },
  modalTitle: {
    fontSize: '18px', fontWeight: '700', color: '#E8E8EE'
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#888898', width: '32px', height: '32px',
    borderRadius: '8px', fontSize: '14px', cursor: 'pointer'
  },
  modalSub: {
    color: '#888898', fontSize: '13px',
    marginBottom: '20px', lineHeight: '1.5'
  },
  uploadArea: {
    border: '2px dashed rgba(255,255,255,0.1)',
    borderRadius: '12px', padding: '20px',
    textAlign: 'center', cursor: 'pointer',
    marginBottom: '16px', minHeight: '180px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#181a21'
  },
  uploadPlaceholder: { textAlign: 'center' },
  preview: {
    maxWidth: '100%', maxHeight: '200px',
    borderRadius: '8px', objectFit: 'contain'
  },
  progressSection: { marginBottom: '12px' },
  progressBar: {
    height: '4px', background: 'rgba(255,255,255,0.05)',
    borderRadius: '2px', overflow: 'hidden', marginBottom: '8px'
  },
  progressFill: {
    height: '100%', background: '#4F6EF7',
    borderRadius: '2px', transition: 'width 0.3s'
  },
  statusText: { fontSize: '13px', color: '#888898', textAlign: 'center' },
  textPreview: {
    background: '#181a21',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '10px', padding: '12px',
    marginBottom: '16px'
  },
  textPreviewLabel: {
    fontSize: '10px', color: '#55556A',
    textTransform: 'uppercase', letterSpacing: '0.1em',
    marginBottom: '6px', fontWeight: '600'
  },
  textPreviewContent: {
    fontSize: '11px', color: '#888898',
    lineHeight: '1.5', fontFamily: 'monospace'
  },
  scanBtn: {
    width: '100%', background: '#4F6EF7',
    color: '#fff', padding: '13px',
    borderRadius: '10px', fontSize: '15px',
    fontWeight: '600', cursor: 'pointer',
    border: 'none', marginBottom: '12px'
  },
  tip: {
    fontSize: '12px', color: '#55556A',
    textAlign: 'center', lineHeight: '1.5'
  }
}

export default DocumentScanner