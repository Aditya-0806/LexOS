const getGuidance = async (req, res) => {
  try {
    const { transcript, scenario, language } = req.body;

    const languageInstruction = language === 'hi' ? 'Respond in Hindi.' :
                                language === 'mr' ? 'Respond in Marathi.' :
                                language === 'gu' ? 'Respond in Gujarati.' :
                                language === 'ta' ? 'Respond in Tamil.' :
                                language === 'te' ? 'Respond in Telugu.' :
                                'Respond in English.';

    const scenarioContext = {
      traffic_stop: 'The user is in a traffic stop situation with a police officer in India.',
      stopped_on_street: 'The user has been stopped by police on the street in India.',
      being_arrested: 'The user is being arrested by police in India.'
    }

    const prompt = `You are a real-time legal rights assistant for Indian citizens.

Context: ${scenarioContext[scenario]}

The police officer just said: "${transcript}"

${languageInstruction}

Give extremely short, actionable guidance (maximum 3 points) telling the user:
1. What the officer is asking/doing
2. What the user's legal rights are in this moment
3. Exactly what the user should say or do right now

Format:
🚨 Situation: (one line)
✅ Your right: (one line)  
💬 Say/Do: (one line)

Be direct. No long explanations. This is a real emergency situation.`;

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
          max_tokens: 200
        })
      }
    )

    const data = await response.json()
    const guidance = data.choices[0].message.content
    res.json({ guidance })

  } catch (error) {
    console.log('Guidance error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
};

module.exports = { getGuidance };