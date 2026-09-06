const cloudinary = require('../config/cloudinary');

/**
 * Deletes an image from Cloudinary using its public ID
 * @param {string} publicId - The Cloudinary public_id of the image
 * @returns {Promise<Object>} - Cloudinary API response
 */
const deleteImageFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error("Cloudinary Delete Error:", error);
        throw new Error("Failed to delete image from Cloudinary");
    }
};

module.exports = {
    deleteImageFromCloudinary
};