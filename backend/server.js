const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')

// Security
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' }
})
app.use(limiter)

// AI routes stricter limit
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Too many AI requests, please wait a minute.' }
})
app.use('/api/complaint', aiLimiter)
app.use('/api/counsel', aiLimiter)
app.use('/api/lexdraft', aiLimiter)
app.use('/api/forgescan', aiLimiter)
app.use('/api/guidance', aiLimiter)
// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const complaintRoutes = require('./routes/complaint');
const forgescanRoutes = require('./routes/forgescan');
const protect = require('./middleware/authMiddleware');
const guidanceRoutes = require('./routes/guidance');
const counselRoutes = require('./routes/counsel')
const lexdraftRoutes = require('./routes/lexdraft')





app.use('/api/lexdraft', lexdraftRoutes)
app.use('/api/counsel', counselRoutes)
app.use('/api/guidance', guidanceRoutes);
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

