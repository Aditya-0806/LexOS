const express = require('express');
const router = express.Router();
const multer = require('multer');
const protect = require('../middleware/authMiddleware');
const { analyseDocument } = require('../controllers/forgescanController');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 15 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'text/plain' ||
    file.originalname.endsWith('.pdf') ||
    file.originalname.endsWith('.txt')
  ) {
    cb(null, true)
  } else {
    cb(new Error('Only PDF and TXT files allowed'))
  }
}
});

router.post('/analyse', protect, upload.single('document'), analyseDocument);

module.exports = router;