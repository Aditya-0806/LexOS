const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { generateComplaint } = require('../controllers/complaintController');

router.post('/generate', (req, res, next) => {
  console.log('Complaint route hit!')
  next()
}, protect, generateComplaint);

module.exports = router;