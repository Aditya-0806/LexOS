const getConsultation = async (req, res) => {
  try {
    const { category, urgency, situation } = req.body

    const categoryContext = {
      property: 'Property and housing law in India — Rent Control Act, Transfer of Property Act, tenant rights',
      employment: 'Employment law in India — Industrial Disputes Act, Payment of Wages Act, labour rights',
      consumer: 'Consumer protection in India — Consumer Protection Act 2019, rights against fraud',
      police: 'Criminal law in India — IPC, CrPC, fundamental rights under Constitution',
      family: 'Family law in India — Hindu Marriage Act, Muslim Personal Law, Succession Act',
      cyber: 'Cybercrime law in India — IT Act 2000, IT Amendment Act 2008',
      medical: 'Medical law in India — Consumer Protection Act, Clinical Establishments Act',
      business: 'Business law in India — Contract Act, Companies Act, Negotiable Instruments Act'
    }

    const urgencyContext = {
      critical: 'This is CRITICAL — immediate action required within 24 hours',
      urgent: 'This is URGENT — action needed within a few days',
      normal: 'Normal urgency — action can be taken within a week',
      advisory: 'Advisory — user needs general guidance'
    }

    const prompt = `You are an expert Indian legal consultant with deep knowledge of Indian law.

Legal Domain: ${categoryContext[category]}
Urgency: ${urgencyContext[urgency]}

User's Situation:
${situation}

Provide a comprehensive legal consultation in this exact format:

## Legal Assessment
(2-3 lines assessing the legal situation)

## Your Legal Rights
✅ (right 1 with specific law/section)
✅ (right 2 with specific law/section)
✅ (right 3 with specific law/section)

## Legal Options Available
➡️ Option 1: (most recommended action)
➡️ Option 2: (alternative action)
➡️ Option 3: (last resort)

## Immediate Steps to Take
📋 Step 1: (what to do right now)
📋 Step 2: (what to do next)
📋 Step 3: (what to do after)

## Documents You Need
- (document 1)
- (document 2)
- (document 3)

## Relevant Laws & Sections
📋 (specific IPC/CrPC/Act section that applies)
📋 (another relevant section)

## Urgency Assessment
🚨 (how urgent this is and why)

## Estimated Timeline
💡 (realistic timeline for resolution)

## When to Hire a Lawyer
💰 (specific threshold when professional help is needed)

Be specific to Indian law. Use actual section numbers. Be direct and actionable.`

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2000
        })
      }
    )

    if (!situation || situation.trim().length < 20) {
  return res.status(400).json({ message: 'Please describe your situation in more detail.' })
}
if (situation.length > 5000) {
  return res.status(400).json({ message: 'Situation too long — please summarise.' })
}
if (!category || !urgency) {
  return res.status(400).json({ message: 'Please select category and urgency.' })
}

    const data = await response.json()
    const consultation = data.choices[0].message.content
    res.json({ consultation })

  } catch (error) {
    console.log('Counsel error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getConsultation }
