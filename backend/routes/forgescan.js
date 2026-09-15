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
const prompt = `You are an expert legal document reviewer specialising in Indian law.

Your task is to review the document carefully and objectively.

IMPORTANT RULES:

1. FIRST identify what type of document this is (for example: NOC, agreement, affidavit, undertaking, lease, employment document, application, authorization letter, etc.).

2. Evaluate the document according to the PURPOSE and TYPE of the document. Do NOT apply requirements from unrelated types of legal documents.

3. Do NOT assume that every possible clause must be present.

4. A clause should be listed as "MISSING" only if:
   - it is genuinely necessary for this particular document's purpose, OR
   - it is specifically required by an applicable Indian law/regulation for this type of document.
   
5. Do NOT treat an optional, customary, or recommended clause as a legally required clause.

6. Do NOT classify the document as High Risk merely because it is short or because some optional information is absent.

7. Only identify a LEGAL VIOLATION when there is a reasonable basis for saying that the document conflicts with a specific applicable Indian law or legal requirement. Do not invent sections.

8. If no legal violation is apparent, clearly say:
   "No clear legal violation identified from the document."

9. Distinguish between:
   - an actual legal problem,
   - something that could be improved,
   - and something that is simply not applicable.

10. If the document appears normal and contains no significant legal red flags, give it a LOW risk rating.

11. Do not manufacture warnings just to fill every section.

Document Content:
${documentText.slice(0, 4000)}

Provide the analysis in exactly this format:

DOCUMENT TYPE:
- Identify the document and briefly explain its apparent purpose.

RISK LEVEL:
- Low / Medium / High

RISK REASON:
- Give 1-3 concise reasons for the selected risk level.

✅ SAFE / VALID CONTENT:
- Identify clauses or statements that appear appropriate and reasonable.

⚠️ WARNING CLAUSES:
- Identify only genuinely concerning, ambiguous, one-sided, or potentially risky clauses.
- If there are none, write:
  "No significant warning clauses identified."

❌ MISSING / POTENTIALLY MISSING:
- List only information or clauses that are genuinely necessary for this particular document.
- Clearly distinguish legally required items from recommended items.
- If nothing important appears to be missing, write:
  "No significant missing requirement identified."

📋 LEGAL VIOLATIONS:
- Identify only reasonably supported violations of Indian law.
- Mention the relevant law/section only when reasonably confident.
- If none are apparent, write:
  "No clear legal violation identified from the document."

💡 RECOMMENDATIONS:
- Give practical improvements, if any.
- Do not recommend unnecessary changes.
- If the document appears adequate, say so.

IMPORTANT:
The goal is to identify REAL legal risks, not to find problems in every document.
Be conservative when assigning High Risk.
Do not treat uncertainty or missing optional information as a legal violation.

Keep the language concise, clear, and understandable to a non-lawyer.`;`;

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