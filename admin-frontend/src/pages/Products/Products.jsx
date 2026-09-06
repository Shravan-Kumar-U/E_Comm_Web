import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import { getAllProducts, deleteProduct } from '../../api/productApi';
import { formatCurrency } from '../../utils/formatters';
import ImageModal from '../../components/ImageModal/ImageModal';
import './products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewingImages, setViewingImages] = useState(null); // State for modal

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data.products);
            } catch (error) {
                console.error("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    if (loading) return <div style={{ padding: '40px' }}>Loading products...</div>;

    return (
        <div>
            {/* Image Viewer Modal */}
            {viewingImages && (
                <ImageModal 
                    images={viewingImages} 
                    onClose={() => setViewingImages(null)} 
                />
            )}

            <div className="products-header">
                <h2>Product Inventory</h2>
                <Link to="/add-product" className="btn btn-primary">
                    <FiPlus style={{ fontSize: '18px' }} /> Add New Product
                </Link>
            </div>
            
            <div className="table-wrapper">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Product Info</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => {
                            const safeImages = Array.isArray(product.images) ? product.images : [];
                            
                            return (
                            <tr key={product._id}>
                                <td>
                                    <div 
                                        className="image-stack" 
                                        style={{ cursor: safeImages.length > 0 ? 'pointer' : 'default' }}
                                        onClick={() => safeImages.length > 0 && setViewingImages(safeImages)}
                                        title="Click to view all images"
                                    >
                                        {safeImages.length > 0 ? (
                                            <>
                                                {safeImages.slice(0, 3).map((img, index) => (
                                                    <img key={img.public_id || index} src={img.url} className="stacked-thumb" style={{ zIndex: 3 - index }} alt="product" />
                                                ))}
                                                {safeImages.length > 3 && (
                                                    <div className="more-images-badge">+{safeImages.length - 3}</div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="stacked-thumb" style={{ background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>N/A</div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '15px' }}>{product.name}</div>
                                </td>
                                <td><span style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid var(--primary-glow)' }}>{product.category}</span></td>
                                <td>{formatCurrency(product.price)}</td>
                                <td>
                                    <span style={{ color: product.stock < 5 ? '#ef4444' : '#10b981', fontWeight: '700' }}>
                                        {product.stock} Units
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right', display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                                    <Link to={`/edit-product/${product._id}`} style={{ color: 'var(--primary)', fontSize: '20px' }}><FiEdit /></Link>
                                    <button onClick={() => handleDelete(product._id)} style={{ color: '#ef4444', fontSize: '20px', background: 'none' }}><FiTrash2 /></button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;