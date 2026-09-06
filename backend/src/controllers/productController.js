const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { deleteImageFromCloudinary } = require('../services/cloudinaryService');
const socket = require('../config/socket'); // Import socket config

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
    } else {
        throw new ApiError(400, "Please upload at least one product image");
    }

    const product = await Product.create({
        name, description, price, category, stock, images
    });

    // EMIT REAL-TIME EVENT
    socket.getIO().emit('product_created', product);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getAllProducts = asyncHandler(async (req, res) => {
    // Sort by newest first
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    res.status(200).json({
        success: true,
        product
    });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // EMIT REAL-TIME EVENT
    socket.getIO().emit('product_updated', product);

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product
    });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (product.images && product.images.length > 0) {
        for (const image of product.images) {
            await deleteImageFromCloudinary(image.public_id);
        }
    }

    await product.deleteOne();

    // EMIT REAL-TIME EVENT (Sending the deleted product ID)
    socket.getIO().emit('product_deleted', req.params.id);

    res.status(200).json({
        success: true,
        message: "Product and associated images deleted successfully"
    });
});