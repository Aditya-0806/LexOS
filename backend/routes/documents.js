const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');


const { addDocument, getDocuments, deleteDocument, scanDocument } = require('../controllers/documentController');

router.post('/scan', protect, scanDocument);
router.post('/', protect, addDocument);
router.get('/', protect, getDocuments);
router.delete('/:id', protect, deleteDocument);

module.exports = router;