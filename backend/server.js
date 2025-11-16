const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crop_recommendation_karnataka';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/seeds', require('./routes/seeds'));
app.use('/api/stores', require('./routes/stores'));
app.use('/api/admin', require('./routes/admin'));

// Default route
app.get('/', (req, res) => {
    res.json({ 
        message: '🌾 Karnataka Crop Recommendation System API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            crops: '/api/crops',
            seeds: '/api/seeds',
            stores: '/api/stores',
            admin: '/api/admin'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;

// Start server with retry on EADDRINUSE (try next ports)
function startServer(port, attempts = 5) {
    const server = app.listen(port, () => {
        console.log(`🚀 Server running on port ${port}`);
        console.log(`🌐 API available at: http://localhost:${port}`);
    });

    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use.`);
            if (attempts > 0) {
                const nextPort = port + 1;
                console.log(`Trying port ${nextPort} (${attempts} attempts left)...`);
                setTimeout(() => startServer(nextPort, attempts - 1), 500);
            } else {
                console.error('No available ports found. Please free the port or set PORT environment variable.');
                process.exit(1);
            }
        } else {
            console.error('Server error:', err);
            process.exit(1);
        }
    });
}

startServer(DEFAULT_PORT, 10);