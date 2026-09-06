import { useState, useEffect, useContext } from 'react';
import { getAllProducts } from '../../api/productApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { SocketContext } from '../../context/SocketContext';
import './home.css'; // Explicitly importing CSS

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const socket = useContext(SocketContext);

    // Initial Data Fetch
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Real-Time Socket Listeners
    useEffect(() => {
        if (!socket) return;

        // When a new product is added by the admin, place it at the top of the grid
        socket.on('product_created', (newProduct) => {
            setProducts((prevProducts) => [newProduct, ...prevProducts]);
        });

        // When a product is edited, find it in the grid and replace it with the new data
        socket.on('product_updated', (updatedProduct) => {
            setProducts((prevProducts) => 
                prevProducts.map(p => p._id === updatedProduct._id ? updatedProduct : p)
            );
        });

        // When a product is deleted, filter it out of the grid
        socket.on('product_deleted', (deletedProductId) => {
            setProducts((prevProducts) => 
                prevProducts.filter(p => p._id !== deletedProductId)
            );
        });

        // Cleanup listeners when the component unmounts to prevent memory leaks
        return () => {
            socket.off('product_created');
            socket.off('product_updated');
            socket.off('product_deleted');
        };
    }, [socket]);

    if (loading) return <div className="container" style={{ padding: '40px' }}>Loading...</div>;

    return (
        <div className="home-container container">
            <div className="category-banner">
                <span className="category-item">Mobiles</span>
                <span className="category-item">Electronics</span>
                <span className="category-item">TVs & Appliances</span>
                <span className="category-item">Fashion</span>
                <span className="category-item">Home & Furniture</span>
                <span className="category-item">Beauty, Toys & More</span>
            </div>

            <div className="product-grid-section">
                <h2 className="section-header">Latest Products</h2>
                {products.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No products available right now.
                    </div>
                ) : (
                    <div className="grid">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;