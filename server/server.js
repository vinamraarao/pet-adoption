const express = require('express');
const mongoose = require('mongoose');
const serviceManagerRoutes = require('./routes/serviceManager');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/serviceManager', serviceManagerRoutes);

// Database connection
mongoose.connect('mongodb://localhost:27017/petAdoption', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true // Ensure unique indexes are created
})
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));