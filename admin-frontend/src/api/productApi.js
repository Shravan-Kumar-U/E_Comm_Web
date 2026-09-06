import api from './axios';

export const getAllProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const createProduct = async (formData) => {
    // We must set multipart/form-data for image uploads
    const response = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    // Our backend currently handles text updates via JSON
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};