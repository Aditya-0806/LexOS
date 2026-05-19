const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'LexOS Backend Running ✅' });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected ✅'))
  .catch((err) => console.log('MongoDB Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const protect = require('./middleware/authMiddleware');

// Protected test route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Access granted ✅', userId: req.userId });
});

const documentRoutes = require('./routes/documents');
app.use('/api/documents', documentRoutes);