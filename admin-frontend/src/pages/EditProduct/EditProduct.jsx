import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../api/productApi';
import ProductForm from '../../components/ProductForm/ProductForm';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setInitialData(data.product);
            } catch (error) {
                alert("Failed to fetch product details");
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    const handleUpdate = async (formData) => {
        setSaving(true);
        try {
            // Our backend update route accepts JSON data to update text fields
            await updateProduct(id, formData);
            navigate('/products');
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update product");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={{ color: 'var(--text-main)', padding: '40px' }}>Loading product data...</div>;
    }

    return (
        <div>
            <h2 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: '700', color: 'var(--text-main)' }}>
                Edit Product
            </h2>
            {/* Using the advanced dark-theme form component we built */}
            <ProductForm 
                initialData={initialData} 
                onSubmit={handleUpdate} 
                loading={saving} 
                isEdit={true} 
            />
        </div>
    );
};

export default EditProduct;