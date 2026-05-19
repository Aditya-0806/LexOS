const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['passport', 'driving_license', 'vehicle_insurance', 
           'puc', 'rental_agreement', 'other'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', documentSchema);