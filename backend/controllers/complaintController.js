const generateComplaint = async (req, res) => {
  try {
    const { situation, name, address, date } = req.body;

    const prompt = `You are a legal assistant helping Indian citizens write formal complaint letters to police stations.

Write a formal complaint letter based on this situation:
${situation}

Complainant Details:
- Name: ${name}
- Address: ${address}
- Date: ${date}

Requirements:
- Write in formal English
- Follow standard Indian police complaint letter format
- Include: To (Station House Officer), Subject line, Body with clear facts, Prayer/Request section, Declaration
- Be specific and factual
- Keep it under 500 words
- End with "Yours faithfully," and the complainant name
- After the letter add a section called "LEGAL PROVISIONS VIOLATED" listing the exact sections of IPC, CrPC, or Constitution of India that apply to this situation with a one line explanation of each
- Format this section clearly separated from the main letter

Return ONLY the letter text and legal provisions section, nothing else.`;

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
          max_tokens: 1000
        })
      }
    )

    const data = await response.json()
    console.log('Groq response:', JSON.stringify(data))
    const letter = data.choices[0].message.content
    res.json({ letter })

  } catch (error) {
    console.log('Error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
};

module.exports = { generateComplaint };