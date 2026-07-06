const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { getConsultation } = require('../controllers/counselController')

router.post('/consult', protect, getConsultation)

module.exports = router