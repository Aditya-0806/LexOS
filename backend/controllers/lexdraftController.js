const generateDocument = async (req, res) => {
  try {
    const { documentType, details } = req.body

    const documentPrompts = {
      rent_agreement: `Generate a comprehensive rental agreement for India with these details:
${JSON.stringify(details)}
Include: parties involved, property description, rent amount, security deposit, duration, renewal terms, maintenance responsibilities, termination clauses, dispute resolution. Follow Indian Rent Control Act requirements.`,

      legal_notice: `Generate a formal legal notice under Indian law with these details:
${JSON.stringify(details)}
Include: sender details, recipient details, subject, facts, legal grounds (with specific IPC/CrPC sections), demand/relief sought, consequences of non-compliance, timeframe for response.`,

      affidavit: `Generate a formal affidavit for India with these details:
${JSON.stringify(details)}
Include: deponent details, sworn statement, facts declared, verification clause, place and date. Follow Indian Evidence Act requirements.`,

      power_of_attorney: `Generate a Power of Attorney document for India with these details:
${JSON.stringify(details)}
Include: grantor details, attorney details, specific powers granted, limitations, duration, revocation terms. Follow Indian Powers of Attorney Act.`,

      noc: `Generate a No Objection Certificate (NOC) for India with these details:
${JSON.stringify(details)}
Include: issuing party details, recipient details, purpose of NOC, specific permissions granted, conditions, validity period, authorized signatory.`,

      employment_offer: `Generate a formal employment offer letter for India with these details:
${JSON.stringify(details)}
Include: company details, candidate details, position, salary (CTC breakdown), joining date, probation period, benefits, terms and conditions. Follow Indian labour law requirements.`,

      freelance_agreement: `Generate a freelance service agreement for India with these details:
${JSON.stringify(details)}
Include: client and freelancer details, scope of work, deliverables, timeline, payment terms, intellectual property rights, confidentiality, termination clauses.`,

      vehicle_sale: `Generate a vehicle sale agreement for India with these details:
${JSON.stringify(details)}
Include: seller and buyer details, vehicle details (make, model, year, registration), sale price, payment terms, condition of vehicle, transfer of ownership, warranty disclaimer.`
    }

    const prompt = `You are an expert Indian legal document drafter.

${documentPrompts[documentType]}

Requirements:
- Write in formal legal English
- Include all legally required sections
- Add proper headings and structure
- Include signature blocks at the end
- Add date and place fields
- Make it ready to use with minimal editing

CRITICAL INSTRUCTION: Use the EXACT values provided above.
Do NOT use placeholders like [Name], [Date], [Amount], [Address].
Every field has been provided — insert them directly into the document.
Write the complete document with all actual values filled in.

Return ONLY the final document text. No explanations, no placeholders.`

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
          max_tokens: 3000
        })
      }
    )

    const data = await response.json()
    const document = data.choices[0].message.content
    res.json({ document })

  } catch (error) {
    console.log('LexDraft error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { generateDocument }