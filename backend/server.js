const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors({ origin: '*' }));
    
// app.use(cors({ origin: 'http://localhost:5173' }));
// app.use(cors({ origin: 'http://localhost:4000' }));
app.use(express.json());

// Connect to the database
connectDB();

// Routes
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
