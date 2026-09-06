const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

// Middleware to verify token and protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new ApiError(401, "Not authorized to access this route. No token provided.");
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to the request object
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            throw new ApiError(401, "User belonging to this token no longer exists.");
        }

        next();
    } catch (error) {
        throw new ApiError(401, "Not authorized to access this route. Invalid token.");
    }
});

// Middleware to restrict routes to Admins only
exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        next(new ApiError(403, "Access denied. Admin privileges required."));
    }
};