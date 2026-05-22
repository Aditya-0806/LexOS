const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const complaintRoutes = require('./routes/complaint');
const forgescanRoutes = require('./routes/forgescan');
const protect = require('./middleware/authMiddleware');


app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/forgescan', forgescanRoutes);


// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'LexOS Backend Running ✅' });
});

app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'Access granted ✅', userId: req.userId });
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

