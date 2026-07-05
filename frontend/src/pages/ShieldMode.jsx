
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'



const scenarios = {
  traffic_stop: {
    title: 'Traffic Stop',
    icon: '🚗',
    color: '#4F6EF7',
    rights: [
      {
        heading: 'Documents you MUST show',
        points: [
          'Driving License (DL)',
          'Vehicle Registration Certificate (RC)',
          'Insurance Certificate',
          'PUC Certificate'
        ]
      },
      {
        heading: 'Your Rights',
        points: [
          'You can ask for the officer\'s name and badge number',
          'Officer CANNOT seize your vehicle without valid reason',
          'Fine amount must match official Motor Vehicles Act rates',
          'You can pay fine online later via Parivahan portal',
          'Demand a receipt for any on-spot fine paid'
        ]
      },
      {
        heading: 'They CANNOT do this',
        points: [
          'Demand money without issuing a challan',
          'Seize your phone or personal belongings',
          'Detain you for more than necessary time',
          'Abuse or threaten you verbally'
        ]
      }
    ]
  },
  stopped_on_street: {
    title: 'Stopped on Street',
    icon: '🚶',
    color: '#7C5CFC',
    rights: [
      {
        heading: 'Your Rights',
        points: [
          'You do NOT have to answer questions without being told why you are stopped',
          'Ask clearly — "Why am I being stopped?"',
          'You cannot be detained without arrest',
          'You can ask for the officer\'s name and badge number',
          'You have the right to remain silent'
        ]
      },
      {
        heading: 'If they want to search you',
        points: [
          'Officer needs reasonable suspicion to search you',
          'You can ask — "Do you have grounds to search me?"',
          'Body search must be done by officer of same gender',
          'You can refuse consent to search — state clearly "I do not consent"'
        ]
      },
      {
        heading: 'They CANNOT do this',
        points: [
          'Detain you without reason for more than a short time',
          'Use physical force without legal justification',
          'Take your phone without a court order',
          'Threaten or intimidate you'
        ]
      }
    ]
  },
  being_arrested: {
    title: 'Being Arrested',
    icon: '🔒',
    color: '#E45858',
    rights: [
      {
        heading: 'Immediate Rights',
        points: [
          'Right to know the charges against you — demand this immediately',
          'Right to inform ONE person of your arrest',
          'Right to consult a lawyer before questioning',
          'Right to be produced before a magistrate within 24 hours',
          'Right to free legal aid if you cannot afford a lawyer'
        ]
      },
      {
        heading: 'During Custody',
        points: [
          'You cannot be held beyond 24 hours without magistrate order',
          'You have the right to medical examination',
          'No torture or third degree treatment is legal',
          'You can refuse to sign any document without reading it fully',
          'Women cannot be arrested after sunset and before sunrise'
        ]
      },
      {
        heading: 'Key Laws',
        points: [
          'Article 22 — Constitution of India',
          'Section 50 CrPC — Right to know grounds of arrest',
          'Section 41B CrPC — Procedure of arrest',
          'Section 56 CrPC — Person arrested to be taken before magistrate'
        ]
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
        points: [
          'Demand to see the Search Warrant — they must have one',
          'Read the warrant carefully — it must specify what they are looking for',
          'Warrant must be signed by a magistrate',
          'Note the names and badge numbers of all officers present'
        ]
      },
      {
        heading: 'During the Search',
        points: [
          'Two independent witnesses must be present during search',
          'You can call a family member or friend to witness',
          'Officers must prepare a panchnama (search list) of seized items',
          'You must be given a copy of the panchnama',
          'Do not sign anything you have not read'
        ]
      },
      {
        heading: 'They CANNOT do this',
        points: [
          'Enter without a valid search warrant (except in emergencies)',
          'Seize items not mentioned in the warrant',
          'Harass or threaten family members',
          'Conduct search without witnesses'
        ]
      }
    ]
  },
  police_station: {
    title: 'Called to Police Station',
    icon: '📋',
    color: '#3FC87A',
    rights: [
      {
        heading: 'Important — Know the difference',
        points: [
          'Being "called" for questioning ≠ being arrested',
          'Ask clearly — "Am I under arrest or am I free to go?"',
          'If not arrested, you can leave after answering questions',
          'You can bring a lawyer with you'
        ]
      },
      {
        heading: 'Your Rights',
        points: [
          'Right to have a lawyer present during questioning',
          'Right to refuse to answer questions that may incriminate you',
          'Right to know why you have been called',
          'Do not sign any statement without reading it fully',
          'You can ask for a copy of any statement you sign'
        ]
      },
      {
        heading: 'Practical Tips',
        points: [
          'Inform a trusted person before going',
          'Carry your ID proof',
          'Stay calm and be polite',
          'Note the time you arrived and left',
          'If detained unexpectedly — immediately ask to call a lawyer'
        ]
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

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech recognition not supported. Please use Chrome browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    const selectedLang = languages.find(l => l.value === language)
    recognition.lang = selectedLang.code
    recognition.continuous = true
    recognition.interimResults = false

    recognition.onresult = async (event) => {
      const lastResult = event.results[event.results.length - 1]
      const spokenText = lastResult[0].transcript
      setTranscript(spokenText)
      await getGuidance(spokenText)
    }

    recognition.onerror = (e) => {
      console.log('Speech error:', e.error)
    }

    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setListening(false)
    setShowLanguage(true)
  }

  const getGuidance = async (spokenText) => {
    setLoading(true)
    try {
      const res = await API.post('/guidance/get', {
        transcript: spokenText,
        scenario: scenario,
        language: language
      })
      setGuidance(res.data.guidance)

      // Text to speech
      const utterance = new SpeechSynthesisUtterance(res.data.guidance)
      const selectedLang = languages.find(l => l.value === language)
      utterance.lang = selectedLang.code
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)

    } catch (err) {
      console.log('Guidance error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={liveStyles.container}>
      <h3 style={liveStyles.title}>🎙️ Live Guidance</h3>

      {showLanguage && (
        <div style={liveStyles.langSection}>
          <p style={liveStyles.langLabel}>Select Language:</p>
          <div style={liveStyles.langGrid}>
            {languages.map(lang => (
              <button
                key={lang.value}
                style={{
                  ...liveStyles.langBtn,
                  background: language === lang.value ? '#4F6EF7' : '#181a21',
                  borderColor: language === lang.value ? '#4F6EF7' : 'rgba(255,255,255,0.1)',
                  color: language === lang.value ? '#fff' : '#888898'
                }}
                onClick={() => setLanguage(lang.value)}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button style={liveStyles.startBtn} onClick={startListening}>
            🎙️ Start Live Guidance
          </button>
        </div>
      )}

      {listening && (
        <div style={liveStyles.listeningSection}>
          <div style={liveStyles.listeningIndicator}>
            <div style={liveStyles.redDot} />
            <span style={{color: '#E45858', fontWeight: '700'}}>Listening...</span>
          </div>

          {transcript && (
            <div style={liveStyles.transcriptBox}>
              <p style={liveStyles.transcriptLabel}>Officer said:</p>
              <p style={liveStyles.transcriptText}>"{transcript}"</p>
            </div>
          )}

          {loading && (
            <div style={liveStyles.loadingBox}>
              <p style={{color: '#888898', fontSize: '13px'}}>⏳ Getting guidance...</p>
            </div>
          )}

          {guidance && !loading && (
            <div style={liveStyles.guidanceBox}>
              <p style={liveStyles.guidanceLabel}>💡 Guidance:</p>
              <p style={liveStyles.guidanceText}>{guidance}</p>
            </div>
          )}

          <button style={liveStyles.stopBtn} onClick={stopListening}>
            ⏹️ Stop Listening
          </button>
        </div>
      )}
    </div>
  )
}

const liveStyles = {
  container: {
    background: 'rgba(228,88,88,0.05)',
    border: '1px solid rgba(228,88,88,0.15)',
    borderRadius: '14px',
    padding: '22px',
    marginTop: '24px'
  },
  title: {
    fontSize: '15px', fontWeight: '700',
    color: '#E8E8EE', marginBottom: '16px'
  },
  langSection: { display: 'flex', flexDirection: 'column', gap: '12px' },
  langLabel: { fontSize: '12px', color: '#888898', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' },
  langGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  langBtn: {
    border: '1px solid', borderRadius: '8px',
    padding: '7px 14px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer'
  },
  startBtn: {
    background: '#E45858', color: '#fff',
    border: 'none', borderRadius: '10px',
    padding: '12px 24px', fontSize: '14px',
    fontWeight: '700', cursor: 'pointer',
    marginTop: '8px', width: '100%'
  },
  listeningSection: { display: 'flex', flexDirection: 'column', gap: '14px' },
  listeningIndicator: {
    display: 'flex', alignItems: 'center', gap: '10px'
  },
  redDot: {
    width: '10px', height: '10px',
    borderRadius: '50%', background: '#E45858',
    animation: 'pulse 1s infinite'
  },
  transcriptBox: {
    background: '#181a21',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '10px', padding: '14px'
  },
  transcriptLabel: { fontSize: '11px', color: '#888898', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' },
  transcriptText: { fontSize: '15px', color: '#E8E8EE', fontStyle: 'italic' },
  loadingBox: { textAlign: 'center', padding: '12px' },
  guidanceBox: {
    background: 'rgba(63,200,122,0.08)',
    border: '1px solid rgba(63,200,122,0.2)',
    borderRadius: '10px', padding: '16px'
  },
  guidanceLabel: { fontSize: '11px', color: '#3FC87A', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase' },
  guidanceText: { fontSize: '14px', color: '#b4f0c8', lineHeight: '1.7', whiteSpace: 'pre-wrap' },
  stopBtn: {
    background: 'rgba(228,88,88,0.1)',
    border: '1px solid rgba(228,88,88,0.2)',
    color: '#E45858', borderRadius: '10px',
    padding: '10px 20px', fontSize: '14px',
    fontWeight: '600', cursor: 'pointer'
  }
}



function ShieldMode() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  if (selected) {
    const scenario = scenarios[selected]
    return (
      
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.backBtn} onClick={() => setSelected(null)}>← Back</button>
            <h1 style={styles.logo}>LexOS</h1>
          </div>
          <span style={{...styles.pageTitle, color: scenario.color}}>
            {scenario.icon} {scenario.title}
          </span>
        </div>

        <div style={styles.content}>
          <div style={{
            ...styles.alertBanner,
            background: `${scenario.color}15`,
            borderColor: `${scenario.color}30`
          }}>
            <span style={{color: scenario.color, fontWeight: '700', fontSize: '15px'}}>
              🛡️ ShieldMode Active — Know Your Rights
            </span>
          </div>

          {scenario.rights.map((section, i) => (
            <div key={i} style={styles.section}>
              <h3 style={styles.sectionTitle}>{section.heading}</h3>
              <div style={styles.pointsList}>
                {section.points.map((point, j) => (
                  <div key={j} style={styles.point}>
                    <div style={{...styles.pointDot, background: scenario.color}} />
                    <span style={styles.pointText}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        
        {['traffic_stop', 'stopped_on_street', 'being_arrested'].includes(selected) && (
            <LiveGuidance scenario={selected} />
          )}

          
          <div style={styles.disclaimer}>
            ⚠️ This information is for general awareness only and does not constitute legal advice. Contact a qualified lawyer for your specific situation.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
          <h1 style={styles.logo}>LexOS</h1>
        </div>
        <span style={styles.pageTitle}>🛡️ ShieldMode</span>
      </div>

      <div style={styles.content}>
        <h2 style={styles.heading}>What is your situation?</h2>
        <p style={styles.sub}>Tap your scenario — your rights appear instantly</p>

        <div style={styles.scenarioGrid}>
          {Object.entries(scenarios).map(([key, scenario]) => (
            <div
              key={key}
              style={{...styles.scenarioCard, borderColor: `${scenario.color}30`}}
              onClick={() => setSelected(key)}
            >
              <div style={styles.scenarioIcon}>{scenario.icon}</div>
              <div style={{...styles.scenarioTitle, color: scenario.color}}>
                {scenario.title}
              </div>
              <div style={styles.scenarioArrow}>→</div>
            </div>
          ))}
        </div>

        <div style={styles.offlineNote}>
          ✅ ShieldMode works offline — no internet required
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
  content: { padding: '40px 32px', maxWidth: '800px', margin: '0 auto' },
  heading: { fontSize: '26px', fontWeight: '700', color: '#E8E8EE', marginBottom: '8px' },
  sub: { color: '#888898', fontSize: '14px', marginBottom: '32px' },
  scenarioGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  scenarioCard: {
    background: '#111217', border: '1px solid',
    borderRadius: '14px', padding: '20px 24px',
    display: 'flex', alignItems: 'center', gap: '16px',
    cursor: 'pointer'
  },
  scenarioIcon: { fontSize: '28px', flexShrink: 0 },
  scenarioTitle: { fontSize: '16px', fontWeight: '700', flex: 1 },
  scenarioArrow: { color: '#55556A', fontSize: '18px' },
  offlineNote: {
    marginTop: '32px', color: '#3FC87A', fontSize: '13px',
    textAlign: 'center', padding: '12px',
    background: 'rgba(63,200,122,0.05)',
    border: '1px solid rgba(63,200,122,0.15)',
    borderRadius: '8px'
  },
  alertBanner: {
    padding: '14px 20px', borderRadius: '10px',
    border: '1px solid', marginBottom: '28px', textAlign: 'center'
  },
  section: {
    background: '#111217', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px', padding: '22px', marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '14px', fontWeight: '700', color: '#E8E8EE',
    marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em'
  },
  pointsList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  point: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  pointDot: { width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginTop: '6px' },
  pointText: { color: '#b4b4c4', fontSize: '14px', lineHeight: '1.6' },
  disclaimer: {
    marginTop: '24px', color: '#55556A', fontSize: '12px',
    textAlign: 'center', lineHeight: '1.6',
    padding: '16px', background: '#111217',
    borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)'
  }
}
export default ShieldMode