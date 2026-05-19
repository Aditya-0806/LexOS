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

module.exports = { addDocument, getDocuments, deleteDocument };
