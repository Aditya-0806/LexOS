const Document = require('../models/Document');

// Add document
const addDocument = async (req, res) => {
  try {
    const { type, name, expiryDate, notes } = req.body;

    const document = await Document.create({
      userId: req.userId,
      type,
      name,
      expiryDate,
      notes
    });

    res.status(201).json({ message: 'Document added ✅', document });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all documents for user
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.userId })
      .sort({ expiryDate: 1 });

    // Calculate days remaining for each
    const today = new Date();
    const docsWithDays = documents.map(doc => {
      const daysLeft = Math.ceil(
        (new Date(doc.expiryDate) - today) / (1000 * 60 * 60 * 24)
      );
      return {
        ...doc._doc,
        daysLeft,
        status: daysLeft < 0 ? 'expired' : 
                daysLeft <= 30 ? 'critical' : 
                daysLeft <= 90 ? 'warning' : 'safe'
      };
    });

    res.json({ documents: docsWithDays });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete document
const deleteDocument = async (req, res) => {
  try {
    await Document.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.userId 
    });
    res.json({ message: 'Document deleted ✅' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const scanDocument = async (req, res) => {
  try {
    const { text } = req.body

    const prompt = `You are a document reader. Extract information from this OCR text of an Indian document.

OCR Text:
${text}

Extract and return ONLY this JSON (no other text):
{
  "documentType": "passport/driving_license/vehicle_insurance/puc/other",
  "documentName": "descriptive name",
  "expiryDate": "YYYY-MM-DD format or null if not found",
  "found": true/false
}

Rules:
- documentType must be one of: passport, driving_license, vehicle_insurance, puc, rental_agreement, other
- If expiry date not clearly found set found to false
- Convert any date format to YYYY-MM-DD`

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
    const rawResponse = data.choices[0].message.content
    const clean = rawResponse.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    if (!parsed.found || !parsed.expiryDate) {
      return res.json({ success: false })
    }

    // Auto save to database
    const document = await Document.create({
      userId: req.userId,
      type: parsed.documentType,
      name: parsed.documentName,
      expiryDate: new Date(parsed.expiryDate),
      notes: 'Auto-scanned document'
    })

    res.json({ success: true, document })

  } catch (error) {
    console.log('Scan error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { addDocument, getDocuments, deleteDocument, scanDocument };

