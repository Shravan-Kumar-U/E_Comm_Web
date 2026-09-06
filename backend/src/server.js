// Load environment variables first
require('dotenv').config();

const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const socket = require('./config/socket'); // NEW: Import socket configuration

// Define port
const PORT = process.env.PORT || 5000;

// Create HTTP server (Wrapping Express app)
const server = http.createServer(app);

// NEW: Initialize Socket.io and bind it to the server
const io = socket.init(server);

// Listen for incoming socket connections
io.on('connection', (socketClient) => {
    console.log(`New client connected: ${socketClient.id}`);

    socketClient.on('disconnect', () => {
        console.log(`Client disconnected: ${socketClient.id}`);
    });
});

// Initialize Database Connection and start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start listening
        server.listen(PORT, () => {
            console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();