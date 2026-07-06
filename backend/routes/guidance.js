const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getGuidance } = require('../controllers/guidanceController');

router.post('/get', protect, getGuidance);

module.exports = router;