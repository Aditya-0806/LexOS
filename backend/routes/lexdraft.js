const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { generateDocument } = require('../controllers/lexdraftController')

router.post('/generate', protect, generateDocument)

module.exports = router