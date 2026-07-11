import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'
import PageHeader from '../components/PageHeader'

const scenarios = {
  traffic_stop: {
    title: 'Traffic Stop',
    icon: '🚗',
    color: '#4F6EF7',
    rights: [
      {
        heading: 'Documents you MUST show',
        points: ['Driving License (DL)', 'Vehicle Registration Certificate (RC)', 'Insurance Certificate', 'PUC Certificate']
      },
      {
        heading: 'Your Rights',
        points: ["You can ask for the officer's name and badge number", 'Officer CANNOT seize your vehicle without valid reason', 'Fine amount must match official Motor Vehicles Act rates', 'You can pay fine online later via Parivahan portal', 'Demand a receipt for any on-spot fine paid']
      },
      {
        heading: 'They CANNOT do this',
        points: ['Demand money without issuing a challan', 'Seize your phone or personal belongings', 'Detain you for more than necessary time', 'Abuse or threaten you verbally']
      }
    ]
  },
  stopped_on_street: {
    title: 'Stopped on Street',
    icon: '🚶',
    color: '#C9A84C',
    rights: [
      {
        heading: 'Your Rights',
        points: ['You do NOT have to answer questions without being told why you are stopped', 'Ask clearly — "Why am I being stopped?"', 'You cannot be detained without arrest', "You can ask for the officer's name and badge number", 'You have the right to remain silent']
      },
      {
        heading: 'If they want to search you',
        points: ['Officer needs reasonable suspicion to search you', 'You can ask — "Do you have grounds to search me?"', 'Body search must be done by officer of same gender', 'You can refuse consent to search — state clearly "I do not consent"']
      },
      {
        heading: 'They CANNOT do this',
        points: ['Detain you without reason for more than a short time', 'Use physical force without legal justification', 'Take your phone without a court order', 'Threaten or intimidate you']
      }
    ]
  },
  being_arrested: {
    title: 'Being Arrested',
    icon: '🔒',
    color: '#E05252',
    rights: [
      {
        heading: 'Immediate Rights',
        points: ['Right to know the charges against you — demand this immediately', 'Right to inform ONE person of your arrest', 'Right to consult a lawyer before questioning', 'Right to be produced before a magistrate within 24 hours', 'Right to free legal aid if you cannot afford a lawyer']
      },
      {
        heading: 'During Custody',
        points: ['You cannot be held beyond 24 hours without magistrate order', 'You have the right to medical examination', 'No torture or third degree treatment is legal', 'You can refuse to sign any document without reading it fully', 'Women cannot be arrested after sunset and before sunrise']
      },
      {
        heading: 'Key Laws',
        points: ['Article 22 — Constitution of India', 'Section 50 CrPC — Right to know grounds of arrest', 'Section 41B CrPC — Procedure of arrest', 'Section 56 CrPC — Person arrested to be taken before magistrate']
      }
    ]
  },
  home_search: {
    title: 'Home Search / Raid',
    icon: '🏠',
    color: '#E4A838',
    rights: [
      {
        heading: 'Before they enter',
        points: ['Demand to see the Search Warrant — they must have one', 'Read the warrant carefully — it must specify what they are looking for', 'Warrant must be signed by a magistrate', 'Note the names and badge numbers of all officers present']
      },
      {
        heading: 'During the Search',
        points: ['Two independent witnesses must be present during search', 'You can call a family member or friend to witness', 'Officers must prepare a panchnama (search list) of seized items', 'You must be given a copy of the panchnama', 'Do not sign anything you have not read']
      },
      {
        heading: 'They CANNOT do this',
        points: ['Enter without a valid search warrant (except in emergencies)', 'Seize items not mentioned in the warrant', 'Harass or threaten family members', 'Conduct search without witnesses']
      }
    ]
  },
  police_station: {
    title: 'Called to Police Station',
    icon: '📋',
    color: '#4CAF7D',
    rights: [
      {
        heading: 'Important — Know the difference',
        points: ['Being "called" for questioning ≠ being arrested', 'Ask clearly — "Am I under arrest or am I free to go?"', 'If not arrested, you can leave after answering questions', 'You can bring a lawyer with you']
      },
      {
        heading: 'Your Rights',
        points: ['Right to have a lawyer present during questioning', 'Right to refuse to answer questions that may incriminate you', 'Right to know why you have been called', 'Do not sign any statement without reading it fully', 'You can ask for a copy of any statement you sign']
      },
      {
        heading: 'Practical Tips',
        points: ['Inform a trusted person before going', 'Carry your ID proof', 'Stay calm and be polite', 'Note the time you arrived and left', 'If detained unexpectedly — immediately ask to call a lawyer']
      }
    ]
  }
}

function LiveGuidance({ scenario }) {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [guidance, setGuidance] = useState('')
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('en')
  const [showLanguage, setShowLanguage] = useState(true)
  const recognitionRef = useRef(null)

  const languages = [
    { code: 'en-IN', label: 'English', value: 'en' },
    { code: 'hi-IN', label: 'हिंदी', value: 'hi' },
    { code: 'mr-IN', label: 'मराठी', value: 'mr' },
    { code: 'gu-IN', label: 'ગુજરાતી', value: 'gu' },
    { code: 'ta-IN', label: 'தமிழ்', value: 'ta' },
    { code: 'te-IN', label: 'తెలుగు', value: 'te' },
  ]

  const startListening = () => {
    setShowLanguage(false)
    setListening(true)
    setGuidance('')
    setTranscript('')

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { alert('Use Chrome browser for this feature'); return }

    const recognition = new SR()
    recognitionRef.current = recognition
    recognition.lang = languages.find(l => l.value === language)?.code || 'en-IN'
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onresult = async (event) => {
      const text = event.results[event.results.length - 1][0].transcript
      setTranscript(text)
      setLoading(true)
      try {
        const res = await API.post('/guidance/get', { transcript: text, scenario, language })
        setGuidance(res.data.guidance)
        const u = new SpeechSynthesisUtterance(res.data.guidance)
        u.lang = languages.find(l => l.value === language)?.code || 'en-IN'
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(u)
      } catch (e) { console.log(e) }
      finally { setLoading(false) }
    }
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setListening(false)
    setShowLanguage(true)
  }

  return (
    <div style={lg.wrap}>
      <h3 style={lg.title}>🎙️ Live Guidance</h3>
      {showLanguage && (
        <div style={lg.langSection}>
          <p style={lg.langLabel}>Select Language</p>
          <div style={lg.langGrid}>
            {languages.map(l => (
              <button key={l.value} style={{
                ...lg.langBtn,
                background: language === l.value ? '#C9A84C' : 'rgba(255,255,255,0.03)',
                color: language === l.value ? '#12100A' : '#888870',
                border: `1px solid ${language === l.value ? '#C9A84C' : 'rgba(255,255,255,0.08)'}`
              }} onClick={() => setLanguage(l.value)}>{l.label}</button>
            ))}
          </div>
          <button style={lg.startBtn} onClick={startListening}>🎙️ Start Live Guidance</button>
        </div>
      )}
      {listening && (
        <div style={lg.liveSection}>
          <div style={lg.indicator}>
            <div style={lg.redDot} />
            <span style={{color: '#E05252', fontWeight: 700, fontSize: 13}}>Listening...</span>
          </div>
          {transcript && (
            <div style={lg.transcriptBox}>
              <p style={lg.transcriptLabel}>Officer said:</p>
              <p style={lg.transcriptText}>"{transcript}"</p>
            </div>
          )}
          {loading && <p style={{color: '#555540', fontSize: 13, textAlign: 'center', padding: '8px'}}>⏳ Getting guidance...</p>}
          {guidance && !loading && (
            <div style={lg.guidanceBox}>
              <p style={lg.guidanceLabel}>💡 Guidance</p>
              <p style={lg.guidanceText}>{guidance}</p>
            </div>
          )}
          <button style={lg.stopBtn} onClick={stopListening}>⏹️ Stop Listening</button>
        </div>
      )}
    </div>
  )
}

const lg = {
  wrap: {
    background: 'rgba(224,82,82,0.04)',
    border: '1px solid rgba(224,82,82,0.12)',
    borderLeft: '2px solid #E05252',
    borderRadius: '12px', padding: '20px', marginTop: '20px'
  },
  title: { fontSize: '14px', fontWeight: '700', color: '#F0EDE8', marginBottom: '14px' },
  langSection: { display: 'flex', flexDirection: 'column', gap: '10px' },
  langLabel: { fontSize: '11px', color: '#555540', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' },
  langGrid: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  langBtn: { borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' },
  startBtn: { background: '#E05252', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', marginTop: '4px', fontFamily: 'Inter, sans-serif' },
  liveSection: { display: 'flex', flexDirection: 'column', gap: '12px' },
  indicator: { display: 'flex', alignItems: 'center', gap: '8px' },
  redDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#E05252', animation: 'pulse 1s infinite' },
  transcriptBox: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px' },
  transcriptLabel: { fontSize: '10px', color: '#444430', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' },
  transcriptText: { fontSize: '14px', color: '#F0EDE8', fontStyle: 'italic' },
  guidanceBox: { background: 'rgba(76,175,125,0.06)', border: '1px solid rgba(76,175,125,0.15)', borderRadius: '8px', padding: '14px' },
  guidanceLabel: { fontSize: '10px', color: '#4CAF7D', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginBottom: '6px' },
  guidanceText: { fontSize: '13px', color: '#a0d4b8', lineHeight: '1.7', whiteSpace: 'pre-wrap' },
  stopBtn: { background: 'rgba(224,82,82,0.08)', border: '1px solid rgba(224,82,82,0.15)', color: '#E05252', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }
}

export default function ShieldMode() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  if (selected) {
    const sc = scenarios[selected]
    return (
      <div style={s.root}>
        <style>{css}</style>
        <PageHeader title={`${sc.icon} ${sc.title}`} icon="🛡️" />
        <div style={s.content}>
          <div style={{...s.alertBanner, background: `${sc.color}10`, borderColor: `${sc.color}25`, borderLeft: `3px solid ${sc.color}`}}>
            <span style={{color: sc.color, fontWeight: '700', fontSize: '14px'}}>
              🛡️ ShieldMode Active — Know Your Rights
            </span>
          </div>
          {sc.rights.map((section, i) => (
            <div key={i} style={s.section}>
              <h3 style={s.sectionTitle}>{section.heading}</h3>
              <div style={s.pointsList}>
                {section.points.map((point, j) => (
                  <div key={j} style={s.point}>
                    <div style={{...s.pointDot, background: sc.color}} />
                    <span style={s.pointText}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {['traffic_stop', 'stopped_on_street', 'being_arrested'].includes(selected) && (
            <LiveGuidance scenario={selected} />
          )}
          <div style={s.disclaimer}>
            ⚠️ This information is for general awareness only and does not constitute legal advice.
            Contact a qualified lawyer for your specific situation.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={s.root}>
      <style>{css}</style>
      <PageHeader title="ShieldMode" icon="🛡️" />
      <div style={s.content}>
        <div style={s.pageHead}>
          <div style={s.eyebrow}>
            <span style={s.eyebrowDot} />
            <span style={s.eyebrowText}>Emergency Legal Rights</span>
          </div>
          <h1 style={s.pageTitle}>What is your situation?</h1>
          <p style={s.pageSub}>
            Tap your scenario — your exact legal rights appear instantly.
            Works offline. No internet needed.
          </p>
        </div>

        <div style={s.scenarioGrid}>
          {Object.entries(scenarios).map(([key, sc]) => (
            <div
              key={key}
              className="scenario-card"
              style={{...s.scenarioCard, borderLeft: `3px solid ${sc.color}40`}}
              onClick={() => setSelected(key)}
            >
              <div style={s.scenarioLeft}>
                <div style={{...s.scenarioIconBox, background: `${sc.color}10`, border: `1px solid ${sc.color}20`}}>
                  <span style={{fontSize: '24px'}}>{sc.icon}</span>
                </div>
                <div>
                  <div style={{...s.scenarioTitle, color: sc.color}}>{sc.title}</div>
                  <div style={s.scenarioCount}>{sc.rights.length} rights sections</div>
                </div>
              </div>
              <span style={{color: '#333320', fontSize: '16px'}} className="sc-arrow">→</span>
            </div>
          ))}
        </div>

        <div style={s.offlineNote}>
          ✅ ShieldMode content is cached locally — works without internet connection
        </div>
      </div>
    </div>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #12100A; -webkit-font-smoothing: antialiased; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.9)} }
  .scenario-card {
    transition: all 0.2s ease; cursor: pointer;
  }
  .scenario-card:hover {
    border-color: rgba(201,168,76,0.3) !important;
    background: rgba(201,168,76,0.03) !important;
    transform: translateX(4px);
  }
  .scenario-card:hover .sc-arrow { color: #C9A84C !important; }
`

const BORDER = 'rgba(255,255,255,0.06)'

const s = {
  root: { minHeight: '100vh', background: '#12100A', color: '#F0EDE8', fontFamily: "'Inter', sans-serif" },
  content: { padding: '40px', maxWidth: '720px', margin: '0 auto' },
  pageHead: { marginBottom: '36px' },
  eyebrow: { display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '100px', padding: '4px 12px', marginBottom: '16px' },
  eyebrowDot: { width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' },
  eyebrowText: { fontSize: '11px', fontWeight: '600', color: '#C9A84C', letterSpacing: '0.08em' },
  pageTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', color: '#F0EDE8', letterSpacing: '-0.02em', marginBottom: '10px' },
  pageSub: { fontSize: '15px', color: '#555540', lineHeight: '1.7' },
  scenarioGrid: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' },
  scenarioCard: { background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  scenarioLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  scenarioIconBox: { width: '44px', height: '44px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  scenarioTitle: { fontSize: '15px', fontWeight: '700', marginBottom: '2px' },
  scenarioCount: { fontSize: '11px', color: '#444430' },
  offlineNote: { background: 'rgba(76,175,125,0.06)', border: '1px solid rgba(76,175,125,0.15)', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#4CAF7D', textAlign: 'center' },
  alertBanner: { padding: '14px 18px', borderRadius: '10px', border: '1px solid', marginBottom: '24px' },
  section: { background: 'rgba(255,255,255,0.02)', border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px', marginBottom: '12px' },
  sectionTitle: { fontSize: '12px', fontWeight: '700', color: '#888870', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' },
  pointsList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  point: { display: 'flex', gap: '10px', alignItems: 'flex-start' },
  pointDot: { width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0, marginTop: '7px' },
  pointText: { color: '#B8B5B0', fontSize: '14px', lineHeight: '1.65' },
  disclaimer: { marginTop: '20px', color: '#333320', fontSize: '12px', textAlign: 'center', lineHeight: '1.6', padding: '14px', background: 'rgba(255,255,255,0.01)', borderRadius: '8px', border: `1px solid ${BORDER}` }
}