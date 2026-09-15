const express = require('express');
const multer = require('multer');
const os = require('os');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { analyseDocument } = require('../controllers/forgescanController');

// Create a temporary upload directory
const uploadDir = path.join(os.tmpdir(), 'lexos-forgescan');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `forgescan-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});


// =====================================================
// FILE UPLOAD ANALYSIS
// POST /api/forgescan/analyse
// =====================================================

router.post(
  '/analyse',
  protect,
  upload.single('document'),
  analyseDocument
);


// =====================================================
// PASTED TEXT ANALYSIS
// POST /api/forgescan/analyse-text
// =====================================================

router.post('/analyse-text', protect, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({
        message: 'Text too short'
      });
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

Keep each point concise and in plain English. No legal jargon.`;

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        message: 'Groq API Error',
        error: data,
      });
    }

    res.json({
      analysis: data.choices[0].message.content,
    });

  } catch (error) {
    console.error('ForgeScan text analysis error:', error);

    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
});


module.exports = router;