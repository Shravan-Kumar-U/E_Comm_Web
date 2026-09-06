const express = require('express');
const router = express.Router();
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes (accessible by user frontend)
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected Admin routes (accessible by admin frontend)
// Using upload.array('images', 5) allows up to 5 images to be uploaded under the field name "images"
router.post('/', protect, isAdmin, upload.array('images', 5), createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;