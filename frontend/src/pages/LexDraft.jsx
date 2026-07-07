import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'

const documentTypes = [
  {
    id: 'rent_agreement',
    icon: '🏠',
    label: 'Rent Agreement',
    desc: 'Residential or commercial rental agreement',
    fields: [
      { key: 'landlordName', label: 'Landlord Name', placeholder: 'Full name of landlord' },
      { key: 'tenantName', label: 'Tenant Name', placeholder: 'Full name of tenant' },
      { key: 'propertyAddress', label: 'Property Address', placeholder: 'Complete property address' },
      { key: 'rentAmount', label: 'Monthly Rent (₹)', placeholder: 'e.g. 15000' },
      { key: 'securityDeposit', label: 'Security Deposit (₹)', placeholder: 'e.g. 45000' },
      { key: 'duration', label: 'Agreement Duration', placeholder: 'e.g. 11 months' },
      { key: 'startDate', label: 'Start Date', placeholder: 'e.g. 1st August 2025' },
    ]
  },
  {
    id: 'legal_notice',
    icon: '⚖️',
    label: 'Legal Notice',
    desc: 'Formal legal notice to any party',
    fields: [
      { key: 'senderName', label: 'Your Name', placeholder: 'Your full name' },
      { key: 'senderAddress', label: 'Your Address', placeholder: 'Your complete address' },
      { key: 'recipientName', label: 'Recipient Name', placeholder: 'Name of person/company' },
      { key: 'recipientAddress', label: 'Recipient Address', placeholder: 'Their complete address' },
      { key: 'subject', label: 'Subject', placeholder: 'e.g. Non-payment of dues' },
      { key: 'grievance', label: 'Grievance Details', placeholder: 'Explain the issue in detail' },
      { key: 'demand', label: 'Your Demand', placeholder: 'What you want them to do' },
      { key: 'deadline', label: 'Response Deadline', placeholder: 'e.g. 15 days from receipt' },
    ]
  },
  {
    id: 'affidavit',
    icon: '📜',
    label: 'Affidavit',
    desc: 'Sworn statement for legal purposes',
    fields: [
      { key: 'deponentName', label: 'Your Name', placeholder: 'Your full name' },
      { key: 'deponentAge', label: 'Your Age', placeholder: 'e.g. 35' },
      { key: 'deponentAddress', label: 'Your Address', placeholder: 'Your complete address' },
      { key: 'purpose', label: 'Purpose of Affidavit', placeholder: 'e.g. Address proof, name change' },
      { key: 'statements', label: 'Facts to Declare', placeholder: 'List the facts you want to declare' },
      { key: 'place', label: 'Place', placeholder: 'City where affidavit is made' },
    ]
  },
  {
    id: 'power_of_attorney',
    icon: '✍️',
    label: 'Power of Attorney',
    desc: 'Authorize someone to act on your behalf',
    fields: [
      { key: 'grantorName', label: 'Your Name (Grantor)', placeholder: 'Your full name' },
      { key: 'grantorAddress', label: 'Your Address', placeholder: 'Your complete address' },
      { key: 'attorneyName', label: 'Attorney Name', placeholder: 'Name of person you are authorizing' },
      { key: 'attorneyAddress', label: 'Attorney Address', placeholder: 'Their complete address' },
      { key: 'powers', label: 'Powers Granted', placeholder: 'What they are authorized to do' },
      { key: 'duration', label: 'Validity Period', placeholder: 'e.g. 1 year, or until revoked' },
    ]
  },
  {
    id: 'noc',
    icon: '✅',
    label: 'NOC Letter',
    desc: 'No Objection Certificate for any purpose',
    fields: [
      { key: 'issuerName', label: 'Issuer Name', placeholder: 'Your name or organization name' },
      { key: 'issuerAddress', label: 'Issuer Address', placeholder: 'Your complete address' },
      { key: 'recipientName', label: 'Recipient Name', placeholder: 'Who this NOC is for' },
      { key: 'purpose', label: 'Purpose of NOC', placeholder: 'e.g. Vehicle transfer, travel, employment' },
      { key: 'conditions', label: 'Conditions (if any)', placeholder: 'Any conditions or limitations' },
      { key: 'validity', label: 'Validity Period', placeholder: 'e.g. 6 months from date of issue' },
    ]
  },
  {
    id: 'employment_offer',
    icon: '💼',
    label: 'Offer Letter',
    desc: 'Employment offer letter for new hires',
    fields: [
      { key: 'companyName', label: 'Company Name', placeholder: 'Your company name' },
      { key: 'companyAddress', label: 'Company Address', placeholder: 'Company address' },
      { key: 'candidateName', label: 'Candidate Name', placeholder: 'Employee full name' },
      { key: 'position', label: 'Job Position', placeholder: 'e.g. Software Engineer' },
      { key: 'salary', label: 'Annual CTC (₹)', placeholder: 'e.g. 600000' },
      { key: 'joiningDate', label: 'Joining Date', placeholder: 'e.g. 1st August 2025' },
      { key: 'probation', label: 'Probation Period', placeholder: 'e.g. 6 months' },
    ]
  },
  {
    id: 'freelance_agreement',
    icon: '🤝',
    label: 'Freelance Agreement',
    desc: 'Service agreement for freelance work',
    fields: [
      { key: 'clientName', label: 'Client Name', placeholder: 'Client full name or company' },
      { key: 'freelancerName', label: 'Freelancer Name', placeholder: 'Your full name' },
      { key: 'projectName', label: 'Project Name', placeholder: 'Name of the project' },
      { key: 'scope', label: 'Scope of Work', placeholder: 'Describe deliverables in detail' },
      { key: 'amount', label: 'Project Amount (₹)', placeholder: 'Total project cost' },
      { key: 'timeline', label: 'Timeline', placeholder: 'e.g. 30 days from signing' },
      { key: 'paymentTerms', label: 'Payment Terms', placeholder: 'e.g. 50% advance, 50% on delivery' },
    ]
  },
  {
    id: 'vehicle_sale',
    icon: '🚗',
    label: 'Vehicle Sale Agreement',
    desc: 'Agreement for buying or selling a vehicle',
    fields: [
      { key: 'sellerName', label: 'Seller Name', placeholder: 'Seller full name' },
      { key: 'buyerName', label: 'Buyer Name', placeholder: 'Buyer full name' },
      { key: 'vehicleDetails', label: 'Vehicle Details', placeholder: 'Make, model, year, color, registration number' },
      { key: 'salePrice', label: 'Sale Price (₹)', placeholder: 'Agreed sale amount' },
      { key: 'paymentMode', label: 'Payment Mode', placeholder: 'e.g. Cash, bank transfer, cheque' },
      { key: 'condition', label: 'Vehicle Condition', placeholder: 'e.g. Good condition, minor scratches' },
    ]
  }
]

function LexDraft() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState(null)
  const [details, setDetails] = useState({})
  const [document, setDocument] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setDetails({})
    setDocument('')
    setError('')
  }

  const handleGenerate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/lexdraft/generate', {
        documentType: selectedType.id,
        details
      })
      setDocument(res.data.document)
    } catch (err) {
      setError('Failed to generate document. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedType.label} - LexOS</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 60px; 
              line-height: 1.8; 
              font-size: 13px;
              color: #000;
            }
            h1 { text-align: center; font-size: 18px; margin-bottom: 30px; }
            pre { white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 13px; }
            .footer { 
              margin-top: 40px; 
              font-size: 10px; 
              color: #999; 
              text-align: center;
              border-top: 1px solid #eee;
              padding-top: 16px;
            }
          </style>
        </head>
        <body>
          <h1>${selectedType.label}</h1>
          <pre>${document}</pre>
          <div class="footer">Generated by LexOS — AI Legal Assistant | For reference only. Consult a lawyer before use.</div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(document)
    alert('Copied to clipboard!')
  }

  const allFieldsFilled = selectedType &&
    selectedType.fields.every(f => details[f.key] && details[f.key].trim())

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={styles.logo}>LexOS</h1>
        </div>
        <span style={styles.pageTitle}>📄 LexDraft</span>
      </div>

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.heading}>Legal Document Generator</h2>
            <p style={styles.sub}>Generate professional legal documents instantly — powered by AI</p>
          </div>
          {selectedType && (
            <button style={styles.resetBtn} onClick={() => { setSelectedType(null); setDocument('') }}>
              ← Change Document
            </button>
          )}
        </div>

        {/* Document Type Selection */}
        {!selectedType && (
          <div>
            <h3 style={styles.sectionTitle}>Select Document Type</h3>
            <div style={styles.typeGrid}>
              {documentTypes.map(type => (
                <div
                  key={type.id}
                  style={styles.typeCard}
                  onClick={() => handleTypeSelect(type)}
                >
                  <div style={styles.typeIcon}>{type.icon}</div>
                  <div style={styles.typeLabel}>{type.label}</div>
                  <div style={styles.typeDesc}>{type.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form + Output */}
        {selectedType && (
          <div style={styles.twoCol}>
            {/* Form */}
            <div style={styles.formCard}>
              <div style={styles.formHeader}>
                <span style={styles.typeIconLarge}>{selectedType.icon}</span>
                <h3 style={styles.formTitle}>{selectedType.label}</h3>
              </div>

              {selectedType.fields.map(field => (
                <div key={field.key} style={styles.fieldGroup}>
                  <label style={styles.label}>{field.label}</label>
                  {field.key === 'grievance' || field.key === 'statements' || field.key === 'scope' || field.key === 'powers' ? (
                    <textarea
                      style={{...styles.input, height: '80px', resize: 'vertical'}}
                      placeholder={field.placeholder}
                      value={details[field.key] || ''}
                      onChange={e => setDetails({...details, [field.key]: e.target.value})}
                    />
                  ) : (
                    <input
                      style={styles.input}
                      type="text"
                      placeholder={field.placeholder}
                      value={details[field.key] || ''}
                      onChange={e => setDetails({...details, [field.key]: e.target.value})}
                    />
                  )}
                </div>
              ))}

              {error && <div style={styles.error}>{error}</div>}

              <button
                style={{...styles.generateBtn, opacity: (!allFieldsFilled || loading) ? 0.6 : 1}}
                onClick={handleGenerate}
                disabled={!allFieldsFilled || loading}
              >
                {loading ? '⏳ Generating...' : '✨ Generate Document'}
              </button>
            </div>

            {/* Output */}
            <div style={styles.outputCard}>
              <div style={styles.outputHeader}>
                <h3 style={styles.formTitle}>Generated Document</h3>
                {document && (
                  <div style={{display: 'flex', gap: '8px'}}>
                    <button style={styles.copyBtn} onClick={handleCopy}>📋 Copy</button>
                    <button style={styles.downloadBtn} onClick={handleDownloadPDF}>⬇️ PDF</button>
                  </div>
                )}
              </div>

              {!document && !loading && (
                <div style={styles.emptyOutput}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>📄</div>
                  <p style={styles.emptyText}>Document will appear here</p>
                  <p style={styles.emptySub}>Fill in the details and click Generate</p>
                </div>
              )}

              {loading && (
                <div style={styles.emptyOutput}>
                  <div style={{fontSize: '40px', marginBottom: '12px'}}>⏳</div>
                  <p style={styles.emptyText}>AI is drafting your document...</p>
                  <p style={styles.emptySub}>This takes about 10-15 seconds</p>
                </div>
              )}

              {document && (
                <div>
                  <div style={styles.disclaimer}>
                    ⚠️ For reference only. Review carefully and consult a lawyer before use.
                  </div>
                  <pre style={styles.documentText}>{document}</pre>
                </div>
              )}
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
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' },
  heading: { fontSize: '26px', fontWeight: '700', color: '#E8E8EE', marginBottom: '6px' },
  sub: { color: '#888898', fontSize: '14px' },
  resetBtn: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#888898', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer'
  },
  sectionTitle: { fontSize: '16px', fontWeight: '700', color: '#E8E8EE', marginBottom: '20px' },
  typeGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px'
  },
  typeCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px', padding: '22px', cursor: 'pointer',
    transition: 'border-color 0.2s'
  },
  typeIcon: { fontSize: '28px', marginBottom: '10px' },
  typeLabel: { fontSize: '15px', fontWeight: '700', color: '#E8E8EE', marginBottom: '4px' },
  typeDesc: { fontSize: '12px', color: '#888898' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  formCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '28px'
  },
  formHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
  typeIconLarge: { fontSize: '24px' },
  formTitle: { fontSize: '16px', fontWeight: '700', color: '#E8E8EE' },
  fieldGroup: { marginBottom: '14px' },
  label: {
    display: 'block', fontSize: '11px', color: '#888898',
    marginBottom: '6px', fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: '0.05em'
  },
  input: {
    width: '100%', background: '#181a21',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px', padding: '10px 14px',
    color: '#E8E8EE', fontSize: '13px',
    display: 'block', fontFamily: 'inherit'
  },
  generateBtn: {
    width: '100%', background: '#4F6EF7', color: '#fff',
    padding: '13px', borderRadius: '10px',
    fontSize: '15px', fontWeight: '600',
    cursor: 'pointer', border: 'none', marginTop: '8px'
  },
  error: {
    background: 'rgba(228,88,88,0.1)', border: '1px solid rgba(228,88,88,0.2)',
    color: '#E45858', padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '12px'
  },
  outputCard: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '28px'
  },
  outputHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px'
  },
  copyBtn: {
    background: 'rgba(79,110,247,0.1)', border: '1px solid rgba(79,110,247,0.2)',
    color: '#94abff', padding: '7px 14px', borderRadius: '8px',
    fontSize: '12px', cursor: 'pointer'
  },
  downloadBtn: {
    background: 'rgba(63,200,122,0.1)', border: '1px solid rgba(63,200,122,0.2)',
    color: '#3FC87A', padding: '7px 14px', borderRadius: '8px',
    fontSize: '12px', cursor: 'pointer'
  },
  emptyOutput: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '60px 20px', textAlign: 'center'
  },
  emptyText: { color: '#E8E8EE', fontSize: '16px', fontWeight: '600', marginBottom: '6px' },
  emptySub: { color: '#888898', fontSize: '13px' },
  disclaimer: {
    background: 'rgba(228,168,56,0.08)', border: '1px solid rgba(228,168,56,0.15)',
    color: '#c8a440', padding: '10px 14px', borderRadius: '8px',
    fontSize: '12px', marginBottom: '16px'
  },
  documentText: {
    color: '#b4b4c4', fontSize: '12px', lineHeight: '1.8',
    whiteSpace: 'pre-wrap', fontFamily: 'inherit',
    overflowY: 'auto', maxHeight: '600px'
  }
}

export default LexDraft
