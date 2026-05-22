const fs = require('fs');

const analyseDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let documentText = '';

    if (req.file.mimetype === 'application/pdf' || req.file.originalname.endsWith('.pdf')) {
      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const pdfBuffer = fs.readFileSync(req.file.path);
      const uint8Array = new Uint8Array(pdfBuffer);
      const pdfDoc = await pdfjsLib.getDocument({ data: uint8Array }).promise;
      
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        documentText += pageText + '\n';
      }
    } else {
      documentText = fs.readFileSync(req.file.path, 'utf8');
    }

    if (!documentText || documentText.trim().length < 20) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Could not extract text from document.' });
    }

    const prompt = `You are a legal document analyst specialising in Indian law. Analyse this document for red flags, suspicious clauses, missing legally required sections, and one-sided terms.

Document Content:
${documentText.slice(0, 4000)}

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

Keep each point concise and in plain English. No legal jargon.`;

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

    fs.unlinkSync(req.file.path)
    res.json({ analysis })

  } catch (error) {
    console.log('ForgeScan error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
};

module.exports = { analyseDocument };