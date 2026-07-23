router.post('/analyse-text', protect, async (req, res) => {
  try {
    const { text } = req.body
    if (!text || text.trim().length < 20) {
      return res.status(400).json({ message: 'Text too short' })
    }

    const prompt = `You are a legal document analyst specialising in Indian law. Analyse this document for red flags, suspicious clauses, missing legally required sections, and one-sided terms.

Document Content:
${text.slice(0, 4000)}

Provide analysis in this exact format:

DOCUMENT TYPE: (what type of document this appears to be)

RISK LEVEL: (Low / Medium / High)

✅ SAFE CLAUSES:
- List clauses that are fair and legally sound

⚠️ WARNING CLAUSES:
- List suspicious or one-sided clauses with explanation

❌ MISSING CLAUSES:
- List legally required clauses that are absent

📋 LEGAL VIOLATIONS:
- List any clauses that violate Indian law with specific sections

💡 RECOMMENDATIONS:
- List specific actions the person should take

Keep each point concise and in plain English. No legal jargon.`

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
          max_tokens: 1500
        })
      }
    )
    const data = await response.json()
    const analysis = data.choices[0].message.content
    res.json({ analysis })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})