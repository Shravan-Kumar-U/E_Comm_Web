const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); // NEW IMPORT

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [process.env.ADMIN_FRONTEND_URL, process.env.USER_FRONTEND_URL, "https://e-comm-web-users.vercel.app/", "https://e-comm-web-neon.vercel.app"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running smoothly!' });
});

// ROUTE MOUNTING
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // NEW ROUTE

// Global error handler must be the last middleware
app.use(errorHandler);

module.exports = app;