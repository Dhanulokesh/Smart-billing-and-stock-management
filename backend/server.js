const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON (must come first)
app.use(express.json());

// Use product routes
app.use('/api/products', productRoutes);

// Connect to MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/smartbilling';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Default test route
app.get('/', (req, res) => {
  res.send('Smart Billing API is running...');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
