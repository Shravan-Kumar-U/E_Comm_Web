const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // NEW IMPORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman or mobile apps)
        if (!origin) return callback(null, true);
        
        // Normalize the origin by removing any trailing slash just in case
        const cleanOrigin = origin.replace(/\/$/, '');
        
        const allowedOrigins = [
            "https://e-comm-web-users.vercel.app",
            "https://e-comm-web-neon.vercel.app",
            "http://localhost:5173",
            "http://localhost:5174"
        ];

        // If the normalized origin is in the list, allow it
        if (allowedOrigins.includes(cleanOrigin)) {
            return callback(null, true);
        }
        
        // Log exactly what is being blocked in Render logs for future debugging
        console.error("CORS BLOCKED Origin:", origin);
        return callback(new Error('CORS policy violation'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// CRITICAL: Explicitly handle preflight requests for all routes
app.options('*', cors());

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running smoothly!' });
});

// ROUTE MOUNTING
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // NEW ROUTE

// Global error handler must be the last middleware
app.use(errorHandler);

module.exports = app;