import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api/productApi';
import ProductForm from '../../components/ProductForm/ProductForm';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreate = async (formData, images) => {
        if (images.length === 0) return alert("Please select at least one image.");
        if (images.length > 5) return alert("Maximum 5 images allowed.");

        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        
        images.forEach((image) => data.append('images', image));

        try {
            await createProduct(data);
            navigate('/products');
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: '700', color: 'var(--text-dark)' }}>
                Add New Product
            </h2>
            <ProductForm onSubmit={handleCreate} loading={loading} isEdit={false} />
        </div>
    );
};

export default AddProduct;