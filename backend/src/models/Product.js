const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: { 
        type: String, 
        required: true 
    },
    public_id: { 
        type: String, 
        required: true 
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Please provide a product category']
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    images: [imageSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);