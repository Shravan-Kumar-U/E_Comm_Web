const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ecommerce-products', // The folder name in your Cloudinary dashboard
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        // Apply basic optimization: limit dimensions to preserve quality but reduce file size
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }] 
    }
});

// Initialize Multer
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per image
});

module.exports = upload;